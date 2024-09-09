import "./card.styles.css";
import Carousel from "../Carousel/Carousel";

const Card = ({ product }) => {
  return (
    <div className="card-container">
      <Carousel>
        {product.productImage && product.productImage.length > 0 ? (
          product.productImage.map((image) => (
            <div key={image.public_id} className="product-image">
              <img src={image.secure_url} alt={product.title} />
            </div>
          ))
        ) : (
          <img
            src="https://via.placeholder.com/150"
            alt={product.title}
            className="product-image"
          />
        )}
      </Carousel>
      <h3>{product.title}</h3>
      <p>${product.price}</p>
    </div>
  );
};

export default Card;
