import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import logoImage from "../../assets/logoImage.svg";
import "./Chat.styles.css"; 

export const Chat = () => {
  const { sellerId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${sellerId}`);
        if (!response.ok) throw new Error('Error al obtener el producto');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
    
    
    setMessages([
      { sender: "Comprador", content: "Hola, ¿este producto está disponible?" },
      { sender: "Vendedor", content: "Sí, aún está disponible." },
    ]);
  }, [sellerId]);

  const handleSendMessage = () => {
    const newMsg = { sender: "Comprador", content: newMessage };
    setMessages([...messages, newMsg]);
    setNewMessage(""); 
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
      <div className="popmart-logo-container">
          <img src={logoImage} alt="PopMart logo" className="chat-logo" />
        </div>
        
         {/* Tratando de hacer que tome la foto del producto para que este presente en el chat */}
        {/* {product && (
          <>
            <img src={product.productImage[0]?.secure_url || "https://via.placeholder.com/50"} 
                 alt={product.title} className="chat-image" />
            <h2>{product.title}</h2>
          </>
        )} */}
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </p>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="input-message"
        />
        <button onClick={handleSendMessage} className="send-button">Enviar</button>
      </div>

      <Link to="/home/"> 
        <button className="return-button">
            Volver al Home
        </button>  
      </Link>
    </div>
  );
};
