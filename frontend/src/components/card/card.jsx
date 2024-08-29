import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ product }) => {
  return (
    <div className="card">
      <h2>{product.title}</h2>  
      <p>Price: ${product.price}</p>
      <Link to={`/product/${product._id}`}>View Details</Link>
    </div>
  );
};

export default Card;
