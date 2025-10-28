/* CartPage.jsx */
import React from "react";
import { Link } from "react-router-dom";
import "./Components/CartPage.css";
import trash from "./assets/trash.png";

export default function CartPage({ cart = [], increaseQuantity, decreaseQuantity, removeFromCart }) {
  const grandTotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => {
              const qty = item.quantity || 1;
              return (
                <div key={item.id} className="cart-item">
                  <div className="cart-info">
                    <h4>{item.name}</h4>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span className="qty-count">{qty}</span>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>
                    <p className="item-total">Subtotal: ${(item.price * qty).toFixed(2)}</p>
                    <small>Added on: {item.date}</small>
                  </div>

                  <div className="cart-actions">
                    <img className="cart-trash" src={trash} alt="remove" onClick={() => removeFromCart(item.id)} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="check-close">
            <h3 className="total">Grand Total: ${grandTotal.toFixed(2)}</h3>
            <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
}
