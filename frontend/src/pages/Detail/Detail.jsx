import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./Detail.styles.css";
import NavBar from "../../components/Navbar";
import Carousel from "../../components/Carousel/Carousel.jsx";
import { CartContext } from "../../context/CartContext";
export const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);

  const token = localStorage.getItem("token");
  const isGuest = localStorage.getItem("guest");

  const { addItemToCart } = useContext(CartContext);
  // const sellerId = "123456789";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URL_BACKEND}/api/products/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error fetching product");
        }
        const data = await response.json();
    
        // Usa el ownerId del producto
        setProduct({ ...data, sellerId: data.ownerId }); // Asegúrate de que ownerId esté en los datos del producto
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error.message);
      }
    };
    fetchProduct();
  }, [id, token]);

  const handleAddToCart = () => {
    if (isGuest) {
      alert("Debes registrarte para agregar productos a favoritos.");
      navigate("/register");
    } else {
      if (product) {
        const productToAdd = {
          ...product,
          image: product.productImage[imgIndex].secure_url,
        };
        addItemToCart(productToAdd);
        alert("Producto agregado a favoritos");
      }
    }
  };

  const handleChat = () => {
    if (product && product.ownerId) {
      navigate(`/chat/${product.ownerId}`);
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

        <Carousel imgIndex={imgIndex} setImgIndex={setImgIndex}>
          {product.productImage && product.productImage.length > 0 ? (
            product.productImage.map((image, index) => (
              <div className="detail-image-container" key={index}>
                <img
                  className="detail-image"
                  src={image.secure_url}
                  alt={product.title}
                />
              </div>
            ))
          ) : (
            <div className="detail-image-container">
              <img
                className="detail-image"
                src="https://via.placeholder.com/150"
                alt="Placeholder"
              />
            </div>
          )}
        </Carousel>

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

        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Agregar a Favoritos
        </button>
      </div>
    </>
  );
};
