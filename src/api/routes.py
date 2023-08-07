"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

    # ENDPOINT PARA LOGIN


@api.route("/login", methods=["POST"])
def login():

    email = request.json.get("email")
    password = request.json.get("password")

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify("Credenciales incorrectas"), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200

# ENDPOINTS PARA CREACIÓN DE USUARIO


@api.route('/user', methods=['POST'])
def create_user():
    request_body = request.get_json(force=True)
    if 'email' not in request_body or 'password' not in request_body:
        return jsonify({"error": "Missing required fields"}), 400

    existing_user = User.query.filter_by(
        email=request_body['email']).first()
    if existing_user:
        return jsonify({"error": "User with this email already exists"}), 409

    user = User(email=request_body['email'],
                password=request_body['password'], is_active=True)

    db.session.add(user)
    db.session.commit()

    response_body = {
        "results": 'User Created',
        "user": user.serialize()
    }

    response = jsonify(response_body)
    return response, 200

# ENDPOINT DE VALIDACIÓN


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():

    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    response_body = {
        "logged_in_as": current_user,
        "user": user.serialize()
    }

    return jsonify(logged_in_as=response_body), 200


# ENDPOINT PARA VALIDAR TOKEN

@api.route("/validToken", methods=["GET"])
@jwt_required()
def get_profile():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    if user:
        return jsonify(True), 200
    return jsonify(False), 403
