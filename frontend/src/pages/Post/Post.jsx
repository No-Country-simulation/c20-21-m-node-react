import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import "./post.styles.css";
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

  return (
    <div>
      <NavBar />
      <div className="main-container">
        <div className="cards-container">
          {error ? ( // Mostrar el error en caso de que ocurra
            <p>Error: {error}</p>
          ) : isAuthenticated && products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="post-card">
                <div className="post-image-container">
                  <img src={product.productImage[0].secure_url} alt="image" />
                </div>
                <Link to={`/home/${product._id}`}>
                    <p className="post-title">{product.title}</p>
                </Link>
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
