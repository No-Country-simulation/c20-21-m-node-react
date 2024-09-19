import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import "./post.styles.css";
import { FaEye, FaPen, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Post = () => {
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch(import.meta.env.VITE_URL_BACKEND + `/api/products/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === "success") {
            setProducts(data.payload);
          } else {
            throw new Error(data.error || "Error fetching products");
          }
        })
        .catch((error) => {
          setError(error.message); // Guarda el mensaje de error
        });
    } else {
      setError("No token provided");
    }
  }, []);

  const handleDelete = async (productId) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}/api/products/${productId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error deleting product: ${response.status}`);
        }

        // Filter out the deleted product from the state
        setProducts(products.filter(product => product._id !== productId));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  //Función para preformatear la hora devuelta por mongo
  const formatDateAndTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes en dos dígitos
    const day = String(date.getDate()).padStart(2, '0'); // Día en dos dígitos
    const hours = String(date.getHours()).padStart(2, '0'); // Horas en dos dígitos
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutos en dos dígitos

    return `${year}/${month}/${day} - ${hours}:${minutes}`;
}

  return (
    <div>
      <NavBar />
      <div className="main-container">
        <div className="cards-container">
          {error ? ( // Mostrar el error en caso de que ocurra
            <p>Error: {error}</p>
          ) : isAuthenticated && products.length > 0 ? (
            //recorre todos los productos creados por quien inició sesión
            products.map((product) => (
              <div key={product._id} className="post-card">
                <div className="post-image-container">
                  <img src={product.productImage[0].secure_url} alt="image" />
                </div>
                <div className="title-container">
                  <Link to={`/home/${product._id}`}>
                    <p className="post-title">{product.title}</p>
                  </Link>
                  <label>{formatDateAndTime(product.createdAt)}</label>
                </div>
                <div className="icons-container">
                  <Link to={`/home/${product._id}`}>
                    <FaEye className="icon" /> {/* Ícono de ojo */}
                  </Link>
                  <Link to={`/edit/${product._id}`}>
                    <FaPen className="icon" /> {/* Ícono de lápiz */}
                  </Link>
                    <FaTimes className="icon delete" onClick={() => handleDelete(product._id)}/> {/* Ícono de cruz */}
              
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </div>
  );
};
