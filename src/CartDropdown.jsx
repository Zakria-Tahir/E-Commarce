import React from "react";
import { Link } from "react-router-dom";
import "./Components/CartDropdown.css";
import trash from './assets/trash.png'

export default function CartDropdown({ cart, removeFromCart }) {
  return (
    <div className="cart-dropdown">
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <img className="drop-trash" src={trash}onClick={() => removeFromCart(item.id)} />
            </div>
          ))}
          <Link to="/cart" className="view-cart-btn">View Cart</Link>
        </>
      )}
    </div>
  );
}
