/* App.jsx */
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import ProductPage from "./ProductPage.jsx";
import { PRODUCTS } from "./products.jsx";
import ProductInfoPage from "./ProductInfoPage.jsx";
import CartPage from "./CartPage.jsx";
import CheckoutPage from "./CheckoutPage.jsx";

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // addToCart accepts product object and optional product.quantity
  const addToCart = (product) => {
  const qtyToAdd = product.quantity && product.quantity > 0 ? product.quantity : 1;

  setCart((prev) => {
    const existingIndex = prev.findIndex((item) => item.id === product.id);

    if (existingIndex !== -1) {
      // Update existing product quantity
      const updatedCart = [...prev];
      const existing = updatedCart[existingIndex];
      updatedCart[existingIndex] = {
        ...existing,
        quantity: (existing.quantity || 1) + qtyToAdd,
      };
      return updatedCart;
    } else {
      // Add new product with default quantity
      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: qtyToAdd,
        date: new Date().toLocaleString(),
      };
      return [...prev, newItem];
    }
  });
};

  // increase quantity by 1
  const increaseQuantity = (id) => {
    setCart((prev) => prev.map((it) => (it.id === id ? { ...it, quantity: (it.quantity || 1) + 1 } : it)));
  };

  // decrease quantity by 1, but keep >= 1; if you want remove when 0, filter it out
  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((it) =>
          it.id === id ? { ...it, quantity: Math.max(1, (it.quantity || 1) - 1) } : it
        )
    );
  };

  // remove item completely
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((it) => it.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const safeProducts = Array.isArray(PRODUCTS) ? PRODUCTS : [];

  return (
    <div className="app-container">
      <Navbar cart={cart} removeFromCart={removeFromCart} />

      <Routes>
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
          path="/product/:id"
          element={<ProductInfoPage products={safeProducts} addToCart={addToCart} />}
        />

        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />

        <Route path="/checkout" element={<CheckoutPage cart={cart} clearCart={clearCart} />} />

        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", marginTop: 100 }}>
              <h2>404 — Page Not Found</h2>
              <p>
                Try going back to <a href="/products">Products</a>
              </p>
            </div>
          }
        />
      </Routes>
    </div>
  );
}
