import React from "react";
import { Link } from "react-router-dom";
import "./Components/CartPage.css";
import trash from './assets/trash.png';

export default function CartPage({ cart, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                  <small>Added on: {item.date}</small>
                </div>
                <img className="cart-trash" src={trash}  onClick={() => removeFromCart(item.id)}  />
              </div>
            ))}
            <div className="check-close">
            <h3 className="total">Total: ${total}</h3>
          <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
          </div>
          </div>
          
          
        </>
      )}
    </div>
  );
}
