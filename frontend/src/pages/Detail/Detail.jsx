import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./Detail.styles.css";
import NavBar from "../../components/Navbar";

export const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  //Prueba
  const sellerId = "123456789"; 
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error fetching product");
        }
        const data = await response.json();

        setProduct({ ...data, sellerId: sellerId });
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error.message);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChat = () => {
    if (product && product.sellerId) {
      navigate(`/chat/${product.sellerId}`);
    } else {
      alert("No se puede iniciar el chat. El vendedor no está disponible.");
    }
  };

  if (error) {
    return <div>Error loading product: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="detail-container">
        <h1 className="detail-title">{product.title}</h1>
        <p className="detail-price">Price: ${product.price}</p>
        <p className="detail-description">Description: {product.description}</p>
        <img
          className="detail-image"
          src={
            product.productImage && product.productImage[0]
              ? product.productImage[0].secure_url
              : "https://via.placeholder.com/150"
          }
          alt={product.title}
        />
        <p>Category: {product.category}</p>
        <Link to="/home/">
          <button className="return-button">Return</button>
        </Link>

        {product.sellerId ? (
          <button className="chat-button" onClick={handleChat}>
            Chatear con el Vendedor
          </button>
        ) : (
          <p>El vendedor no está disponible para chatear.</p>
        )}
      </div>
    </>
  );
};
