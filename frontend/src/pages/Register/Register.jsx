import "./register.style.css";
import logoImage from "../../assets/logoImage.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const regex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);

  const navigate = useNavigate()

  const resetAllFields = () => {
    setEmail("")
    setPassword("")
    setName("")
    setPasswordError("")
    setIsPassVisible(false)
    document.getElementById("register-form").reset();
  }

  const handleResponseOk = (data) => {
    toast.success('Product created successfully');
    resetAllFields();
    setTimeout(()=>navigate("/"), 2000)
    
  };

  const handleResponseError = (error) => {
    console.error('Error:', error);
    toast.error(error?.message || 'An error occurred');
  };

  const handleCheck = (e) => {
    if (e.currentTarget.checked) {
      setIsPassVisible(true)
    } else {
      setIsPassVisible(false)
    }

  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setPasswordError("")
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!regex.test(password)) {
      return setPasswordError("El password debe tener al menos 6 carácteres con una mayúscula y símbolo")
    }

    const body = {
      email: email,
      password: password,
      name: name,
      lastname: lastname
    }

    fetch(import.meta.env.VITE_URL_BACKEND + "/api/users/register", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => handleResponseOk(data))
      .catch(error => handleResponseError(error))


  }
  return (
    <div className="register-page">
      <div className="register-container">
        <img src={logoImage} alt="Logo" className="register-logo" />
        <h1 className="register-title">POPMART</h1>
        <p className="register-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit saepe
          ut quidem nisi. Ut, earum deserunt provident fugiat dolorum voluptate,
          quisquam soluta quas iure officiis architecto sunt blanditiis.
          Aperiam, quae?
        </p>

        <form className="register-form" onSubmit={handleSubmit} id="register-form">
          <label htmlFor="">
            Name
            <input
              type="text"
              placeholder="Juan"
              className="register-input"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label htmlFor="">
            Lastname
            <input
              type="text"
              placeholder="Perez"
              className="register-input"
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </label>
          <label htmlFor="">
            Email
            <input
              type="email"
              placeholder="email@gmail.com"
              className="register-input"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label htmlFor="">
            Password
            <input
              type={isPassVisible ? "text" : "password"}
              placeholder=""
              className="register-input"
              onChange={(e) => handlePasswordChange(e)}
              required
            />

            <p className="visibility">Ver password <input type="checkbox" onChange={(e) => handleCheck(e)} /></p>
            {passwordError && <p className="error-msg">{passwordError}</p>}
          </label>

          <button type="submit" className="register-button">
            Registrarse
          </button>
          <Link to="/">
            <button className="retornar-button">Return</button>
          </Link>
        </form>

      </div>
    </div>
  )
}

export default Register;