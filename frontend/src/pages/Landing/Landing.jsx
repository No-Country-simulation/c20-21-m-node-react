import React, { useState } from "react";
import "./landing.styles.css";
import logoImage from "../../assets/logoImage.svg";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const body = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(import.meta.env.VITE_URL_BACKEND + "/api/users/login", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.removeItem("guest"); 
        navigate("/home");
      }else {
        setError(data.message || "Correo o contraseña incorrectos");
      }
    } catch (error) {
      setError("Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.");
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem("guest", true); 
    localStorage.removeItem("token");
    navigate("/home");
  };

  const handleCreateAccount = () => {
    navigate("/register");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logoImage} alt="Logo" className="login-logo" />
        <h1 className="login-title">POPMART</h1>
        <p className="login-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
        </form>

        <button onClick={handleGuestLogin} className="guest-button">
          Entrar como invitado
        </button>

        <div className="login-footer">
          <a href="#" className="forgot-password">
            ¿Olvidaste tu contraseña?
          </a>

          <a onClick={handleCreateAccount} className="create-account">
            Crear cuenta nueva
          </a>
        </div>
      </div>
    </div>
  );
};
