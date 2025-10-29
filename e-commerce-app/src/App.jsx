import React, { useState, useEffect } from "react"; // ✅ Added useEffect
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import ProductPage from "./ProductPage.jsx";
import CartPage from "./CartPage.jsx";
import CheckoutPage from "./CheckoutPage.jsx";

export default function App() {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage when app starts
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const itemWithDate = { ...product, date: new Date().toLocaleString() };
    setCart((prev) => [...prev, itemWithDate]);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart"); // optional: clear from localStorage
  };

  return (
    <div className="app-container">
      <Navbar cart={cart} removeFromCart={removeFromCart} />
      <Routes>
        {/* Default route — redirect to /products */}
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route
          path="/products"
          element={
            <ProductPage
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cart={cart}
            />
          }
        />
        <Route
          path="/cart"
          element={<CartPage cart={cart} removeFromCart={removeFromCart} />}
        />
        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} clearCart={clearCart} />}
        />
      </Routes>
    </div>
  );
}
