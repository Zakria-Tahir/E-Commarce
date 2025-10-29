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

  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ Automatically clear message after 2 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // ✅ Add to cart
  const addToCart = (product) => {
    const qtyToAdd = product.quantity && product.quantity > 0 ? product.quantity : 1;

    if (product.stock === 0 || qtyToAdd > product.stock) {
      setMessage(`Stock unavailable for ${product.name}`);
      return;
    }

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);

      if (existingIndex !== -1) {
        const updatedCart = [...prev];
        const existing = updatedCart[existingIndex];
        const newQty = (existing.quantity || 1) + qtyToAdd;

        if (newQty > product.stock) {
          setMessage(`Only ${product.stock} units available in stock!`);
          return prev;
        }

        updatedCart[existingIndex] = { ...existing, quantity: newQty };
        setMessage(`Added more ${product.name} to cart`);
        return updatedCart;
      } else {
        const newItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          stock: product.stock,
          quantity: qtyToAdd,
          date: new Date().toLocaleString(),
        };
        setMessage(`${product.name} added to cart successfully`);
        return [...prev, newItem];
      }
    });
  };

  // ✅ Quantity controls
  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextQty = item.quantity + 1;
          if (nextQty > item.stock) {
            setMessage(`Stock unavailable for ${item.name}`);
            return item;
          }
          return { ...item, quantity: nextQty };
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((it) => it.id !== id));
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const safeProducts = Array.isArray(PRODUCTS) ? PRODUCTS : [];

  return (
    <div className="app-container">
      <Navbar cart={cart} removeFromCart={removeFromCart} />

      {/* ✅ Auto-hide message box */}
      {message && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            border: "2px solid #2563eb",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgba(37, 99, 235, 0.3)",
            zIndex: 9999,
            color: "#424443",
            textAlign: "center",
            minWidth: "250px",
          }}
        >
          <p>{message}</p>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route
          path="/products"
          element={<ProductPage addToCart={addToCart} cart={cart} />}
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
        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} clearCart={clearCart} />}
        />
      </Routes>
    </div>
  );
}
