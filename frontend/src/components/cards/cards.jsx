import React from 'react';

const Cards = ({ product }) => {
  return (
    <div className="cards">
      <img 
        src={product.productImage ? product.productImage[0] : "https://via.placeholder.com/150"}
        alt={product.title}
         
      />
      <h2>{product.title}</h2> 
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default Cards;
