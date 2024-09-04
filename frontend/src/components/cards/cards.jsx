import React from "react";
import Card from "../card/Card";
import "./cards.styles.css";

function Cards({ allProducts }) {
  return (
    <div className="cards-list">
      {allProducts.map((product) => (
        <Card key={product._id} product={product} />
      ))}
    </div>
  );
}

export default Cards;
