import React, { useState } from "react";
import { PRODUCTS } from "./products.jsx";
import ProductCard from "./ProductCard.jsx";
import "./Components/ProductPage.css";




export default function ProductPage({ addToCart, cart, removeFromCart }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Electronics", "Fashion", "Office"];
  const filtered = PRODUCTS.filter((p) => filter === "All" || p.category === filter);

  return (
    <div className="product-container">
      <h2 className="page-heading">Everything Available For My Store</h2>

      <div className="filter-bar">
        {categories.map((cat) => (
          <button key={cat} className={filter === cat ? "active" : ""} onClick={() => setFilter(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div className="product-list">
        {filtered.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            inCart={cart.some((c) => c.id === p.id)}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
    </div>
  );
}


