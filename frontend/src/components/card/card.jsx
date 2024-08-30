import React from 'react';
import { Link } from 'react-router-dom';
import "./card.styles.css";

const Card = ({ product }) => {
  return (
    <div className="card-container">
      <Link to={`/home/${product._id}`}>
        <img src={product.productImage} alt={product.title} />
        <h3>{product.title}</h3>
        <p>{product.price}</p>
      </Link>
    </div>
  );
};

export default Card;
