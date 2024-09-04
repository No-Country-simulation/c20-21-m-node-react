import React from 'react';
import { Link } from 'react-router-dom';
import "./card.styles.css";

const Card = ({ product }) => {
  return (
    <div className="card-container">
      <Link to={`/home/${product._id}`}>
        {product.productImage && product.productImage.length > 0 ? (
          product.productImage.map((image) => (
            <img
              key={image.public_id}
              src={image.secure_url}
              alt={product.title}
              className="product-image"
            />
          ))
        ) : (
          <img 
            src="https://via.placeholder.com/150" 
            alt={product.title} 
            className="product-image"
          />
        )}
        <h3>{product.title}</h3>
        <p>${product.price}</p>
      </Link>
    </div>
  );
};

export default Card;


