import React, { useState } from "react";
import ProductCard from "./ProductCard.jsx";
import "./Components/ProductPage.css";
import Headphone from './assets/headphone2.jpg';
import shoes from './assets/shoes1.jpg';
import lamp from './assets/lamp.jpg';
import coffee from './assets/coffee.jpg';
import bluetooth from './assets/bluetooth2.jpg';
import backpack from './assets/backpack.jpg';
import chair from './assets/chair3.jpg';
import Headphone2 from './assets/headphone.jpg';
import shoes2 from './assets/shoes2.jpg';



const PRODUCTS = [
  { id: 1, name: "Head Phones", price: 120, category: "Electronics", image:Headphone},
  { id: 2, name: "Running Shoes", price: 80, category: "Fashion", image:shoes},
  { id: 3, name: "Coffee Maker", price: 150, category: "Office",image:coffee },
  { id: 4, name: "Backpack", price: 60, category: "Fashion", image:backpack},
  { id: 5, name: "Desk Lamp", price: 40, category: "Office", image:lamp },
  { id: 6, name: "Bluetooth Speaker", price: 90, category: "Electronics", image:bluetooth },
  { id: 7, name: "Head Phones", price: 120, category: "Electronics", image:Headphone2},
  { id: 8, name: "Running Shoes", price: 80, category: "Fashion", image:shoes2},
  { id: 9, name: "Chair", price: 150, category: "Office",image:chair },
];

export default function ProductPage({ addToCart, removeFromCart, cart }) {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Electronics", "Fashion", "Office"];
  const filtered = PRODUCTS.filter(
    (p) => filter === "All" || p.category === filter
  );

  return (
    <div className="product-container">
      <h2 className="page-heading">Eevery Thing Availble For My Store</h2>
      <div className="filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={filter === cat ? "active" : ""}
            onClick={() => setFilter(cat)}
          >
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
