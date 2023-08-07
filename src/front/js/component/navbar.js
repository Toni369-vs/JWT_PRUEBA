import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const logOut = () => {
		actions.cleanStore();
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="ms-3">
				<h2>Registro JWT</h2>
			</div>
			<div className="d-flex justify-content-end">

				<Link to={'/register'} className="btn btn-primary btn-lg me-3">Registro</Link>

				{
					!store.user.token ?
						(
							<Link to="/">
								<button className="btn btn-primary btn-lg me-3">Login</button>
							</Link>
						)
						:
						(
							<Link to="/">
								<button className="btn btn-primary btn-lg me-3" onClick={logOut}>Logout</button>
							</Link>
						)

				}



			</div>
		</nav>
	);
};