import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import "./Cart.styles.css";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar"; 

export const Cart = () => {
  const { cartItems, updateItemQuantity, removeItem, clearCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotal(totalAmount);
    };
    calculateTotal();
  }, [cartItems]);

  // const handleCheckout = () => {
  //   alert("Procediendo al pago...");
  //   clearCart();
  //   navigate('/home');
  // };

  if (cartItems.length === 0) {
    return (
      <>
        <NavBar />
        <div className="cart-empty">
          <h2>Tu Favoritos está vacío</h2>
          <Link to="/home">Encuentra tus Favoritos</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="cart-container">
        <h1>Tus Favoritos</h1>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="cart-image-container">
                    <img className="cart-image" src={item.image} alt={item.title} />
                  </div>
                </td>
                <td>{item.title}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                  {item.quantity}
                  <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeItem(item.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="cart-summary">
          <h2>Total: ${total.toFixed(2)}</h2>
          <button onClick={clearCart}>Limpiar Favoritos</button>
          {/* <button onClick={handleCheckout}>Comprar</button> */}
        </div>
      </div>
    </>
  );
};

export default Cart;
