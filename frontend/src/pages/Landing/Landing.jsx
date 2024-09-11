import React from "react";
import "./landing.styles.css";
import logoImage from "../../assets/logoImage.svg";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logoImage} alt="Logo" className="login-logo" />
        <h1 className="login-title">POPMART</h1>
        <p className="login-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit saepe
          ut quidem nisi. Ut, earum deserunt provident fugiat dolorum voluptate,
          quisquam soluta quas iure officiis architecto sunt blanditiis.
          Aperiam, quae?
        </p>

        <form className="login-form">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="login-input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="login-input"
          />
          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
        </form>

        <div className="login-footer">
          <a href="#" className="forgot-password">
            ¿Olvidaste tu contraseña?
          </a>
          <a href="#" className="create-account">
            Crear cuenta nueva
          </a>
        </div>

        <Link to="/home">
          <button className="guest-button">Entrar como Invitado</button>
        </Link>
      </div>
    </div>
  );
};
