// import React from 'react';
// import { Link } from 'react-router-dom';
// import "./card.styles.css";

// const Card = ({ product }) => {
//   return (
//     <div className="card-container">
//       <Link to={`/home/${product._id}`}>
//         <img 
//           src={product.productImage && product.productImage[0] ? `data:image/webp;base64,${product.productImage[0]}` : "https://via.placeholder.com/150"} 
//           alt={product.title} 
//         />
//         <h3>{product.title}</h3>
//         <p>${product.price}</p>
//       </Link>
//     </div>
//   );
// };

// export default Card;

import React from 'react';
import { Link } from 'react-router-dom';
import "./card.styles.css";

const Card = ({ product }) => {
  const imageSrc = product.productImage && product.productImage[0]
    ? (product.productImage[0].startsWith('data:image/webp;base64,') ? product.productImage[0] : product.productImage[0])
    : "https://via.placeholder.com/150";

  return (
    <div className="card-container">
      <Link to={`/home/${product._id}`}>
        <img 
          src={imageSrc} 
          alt={product.title} 
          className="product-image"
        />
        <h3>{product.title}</h3>
        <p>${product.price}</p>
      </Link>
    </div>
  );
};

export default Card;
