import React from 'react';

const Cards = ({ product }) => {
  return (
    <div className="cards">
      <img 
        src="https://via.placeholder.com/150" 
        alt="Producto"
        style={{ width: '100%', height: 'auto' }} 
      />
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default Cards;
