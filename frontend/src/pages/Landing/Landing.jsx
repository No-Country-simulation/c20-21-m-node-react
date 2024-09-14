import React, { useState } from "react";
import "./landing.styles.css";
import logoImage from "../../assets/logoImage.svg";
import { useNavigate } from "react-router-dom";

const usuariosPrueba = [
  { email: "test1@example.com", password: "password123" },
  { email: "test2@example.com", password: "password456" },
  { email: "admin@example.com", password: "adminpass" },
];

export const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);

    const user = usuariosPrueba.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("token", "mockToken123");
      navigate("/home");
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem("guest", true); // Marcar como invitado en el localStorage
    navigate("/home");
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
          <a href="#" className="create-account">
            Crear cuenta nueva
          </a>
        </div>
      </div>
    </div>
  );
};
