import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  //Función para limpiar el token del store
  const logOut = () => {
    actions.cleanStore();
  }

  // MENSAJE WARNING

  const invalidLogin = () => { 
    toast.warn('Usuario o contraseña incorrecta.', {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
  }

  const handleClick = async() => {
    let response = await actions.login(email, password);
    console.log(response)
    response ? navigate("/private") : invalidLogin()
    setEmail("");
    setPassword("");
  };

  

  return (
    <div className="text-center mt-5 mb-5">
      <h1>Estás en la página de Login</h1>
            <div className="mt-5">
              <input autoFocus type="text" placeholder="email" value={email} onChange={(e) => {
                setEmail(e.target.value)
              }} />
              <input type="text" placeholder="password" value={password} onChange={(e) => {
                setPassword(e.target.value)
              }} />
              <button onClick={handleClick}>Login</button>
            </div>
          
      
      <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    </div>
  );
};
