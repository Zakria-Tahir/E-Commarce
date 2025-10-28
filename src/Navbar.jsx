import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import CartDropdown from "./CartDropdown.jsx";
import "./Components/Navbar.css";

export default function Navbar({ cart, removeFromCart }) {
  const [showCart, setShowCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Left Logo */}
      <div className="nav-left">
        <h2 className="logo">🛍️ MyShop</h2>
      </div>

      {/* Toggle button (mobile) */}
      <div className="flex-set">
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✖" : "☰"}
      </div>

      {/* Center Navigation Links */}
      <div className={`nav-center ${menuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li>
            Home
          </li>
          <li>
            About
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Products
            </NavLink>
          </li>
          <li>
            Contact
          </li>
        </ul>
      </div>

      {/* Cart */}
      <div
        className="nav-cart"
        onMouseEnter={() => setShowCart(true)}
        onMouseLeave={() => setShowCart(false)}
      >
        <NavLink to="/cart" className="cart-link">
          🛒 Cart <span className="len">{cart.length}</span>
        </NavLink>
        {showCart && <CartDropdown cart={cart} removeFromCart={removeFromCart} />}
      </div>
      </div>
    </nav>
  );
}
