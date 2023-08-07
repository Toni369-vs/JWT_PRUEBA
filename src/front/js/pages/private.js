import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export const Private = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  const redirigir = () => {
    
    setTimeout(()=>{
      navigate("/")
    }, 5000)
  }

  
  

  return (
    <div className="text-center mt-5">
      {
        (store.user.token && store.user.token != "" && store.user.token != undefined) ? 
          (
            <div>
              <h1 className="text-center">Bienvenido a la tu página privada</h1>
              <p>Estas logado con el token: {store.user.token}</p>
            </div>
          )
        :
         (
          <div>
            <h1 className="text-center">Usuario no registrado</h1>
            <p>Será redirigido a la página de login en 5 segundos</p>
            {redirigir()}
          </div>
         )
      }
    </div>
  );
}