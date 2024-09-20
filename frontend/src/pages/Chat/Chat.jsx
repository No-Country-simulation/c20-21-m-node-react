import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import logoImage from "../../assets/logoImage.svg";
import "./Chat.styles.css"; 

export const Chat = () => {
  const { sellerId } = useParams(); 
  const userId = localStorage.getItem("userId"); 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState(null); 

  useEffect(() => {
   
    const loadOrCreateChat = async () => {
      try {
        
        const response = await fetch(`http://localhost:5000/api/chats`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
          body: JSON.stringify({ ownerId: sellerId }), 
        });

        if (!response.ok) throw new Error("Error al crear o cargar el chat");
        const chat = await response.json();
        setChatId(chat.chat._id); 
        setMessages(chat.chat.messages || []); 
      } catch (error) {
        console.error("Error al cargar o crear el chat:", error);
      }
    };

    loadOrCreateChat();
  }, [sellerId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; 

    try {
      const response = await fetch(`http://localhost:5000/api/chats/${chatId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ contenido: newMessage }),
      });

      if (!response.ok) throw new Error("Error al enviar el mensaje");
      const updatedChat = await response.json();
      setMessages(updatedChat.message.messages); 
      setNewMessage(""); 
    } catch (error) {
      console.error("Error enviando mensaje:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="popmart-logo-container">
          <img src={logoImage} alt="PopMart logo" className="chat-logo" />
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.emisor === userId ? "Tú" : "Comprador"}:</strong> {msg.contenido}

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
        <button className="return-button">Volver al Home</button>
      </Link>
    </div>
  );
};
