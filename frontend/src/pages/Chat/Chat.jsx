import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import logoImage from "../../assets/logoImage.svg";
import "./Chat.styles.css";

export const Chat = () => {
  const userId = localStorage.getItem("userId");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // const [chats, setChats] = useState([]);
  const { chatId } = useParams();

  // useEffect(() => {
  //   const loadChats = async () => {
  //     try {
  //       const response = await fetch(
  //         `${import.meta.env.VITE_URL_BACKEND}/api/chats`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );

  //       if (!response.ok) throw new Error("Error al cargar los chats");
  //       const data = await response.json();
  //       console.log("Chats", data);

  //       setChats(data.chats);
  //     } catch (error) {
  //       console.error("Error al cargar los chats:", error);
  //     }
  //   };

  //   loadChats();
  // }, []);

  useEffect(() => {
    const loadChatMessages = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URL_BACKEND}/api/chats/${chatId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok)
          throw new Error("Error al cargar los mensajes del chat");
        const chatData = await response.json();
        setMessages(chatData.chat.messages || []);
      } catch (error) {
        console.error("Error al cargar los mensajes:", error);
      }
    };

    if (chatId) {
      loadChatMessages();
    }
  }, [chatId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL_BACKEND}/api/chats/${chatId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ contenido: newMessage }),
        }
      );

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
        {messages.map((msg) => (
          <p key={msg._id}>
            <strong>{msg.emisor === userId ? "Tú" : "Comprador"}:</strong>{" "}
            {msg.contenido}
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
        <button onClick={handleSendMessage} className="send-button">
          Enviar
        </button>
      </div>

      <Link to="/home/">
        <button className="return-button">Volver al Home</button>
      </Link>

      {/* Opcional: Mostrar los chats disponibles */}
      {/* <div className="available-chats">
        <h3>Chats Disponibles:</h3>
        {chats.map((chat) => (
          <div key={chat._id}>
            <Link to={`/chat/${chat.ownerId}`}>
              <p>{chat.ownerName}</p>
            </Link>
          </div>
        ))}
      </div> */}
    </div>
  );
};
