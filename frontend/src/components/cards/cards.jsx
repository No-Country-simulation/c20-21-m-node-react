import Card from "../card/card";
import "./cards.styles.css";
import { Link } from "react-router-dom";

function Cards({ allProducts }) {
  return (
    <div className="cards-list">
      {allProducts.map((product) => (
        <Link to={`/home/${product._id}`}>
          <Card key={product._id} product={product} />
        </Link>
      ))}
    </div>
  );
}

export default Cards;
