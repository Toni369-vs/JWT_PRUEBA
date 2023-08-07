import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";

export const Register = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState ("");
	const [password, setPassword] = useState ("");
	let navigate = useNavigate();

	
	 const handleClick = async() => {
		const responde = await actions.register(email, password);
		if (responde === true) {
			navigate("/")
		}
		setEmail("");
        setPassword("");
	}


	return (
		<div className="container text-center mt-5 mb-5">
			<h1 className="mb-5 ms-3">Estás en la página de Registro</h1>
            <input type="text" className="inputs" placeholder="email" value={email} onChange={(e) => {
              setEmail(e.target.value);
			  
            }} />
            <input type="text" placeholder="password" value={password} onChange={(e) => {
              setPassword(e.target.value);
			  
            }} />
            <button onClick={handleClick}>Registro</button>
            <div>
              <Link to={'/'} className="btn btn-primary btn-lg mt-5 ms-3">Volver</Link>
            </div>
 
		</div>
	);
};
