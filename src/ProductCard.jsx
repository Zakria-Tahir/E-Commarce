/* ProductCard.jsx */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Components/ProductCard.css";
import trash from "./assets/trash.png";

export default function ProductCard({ product, addToCart, removeFromCart, inCart }) {
  const navigate = useNavigate();

  return (
    <div className="product-card" >
      <div className="product-img" onClick={() => navigate(`/product/${product.id}`)}>
        <img className="pro-img" src={product.image} alt={product.name} />
      </div>

      <h3>{product.name}</h3>
      <p className="price-tag">${product.price}</p>

      <div className="card-actions">
        <button className="learn-btn" onClick={() => navigate(`/product/${product.id}`)}>
          Learn More
        </button>

        {inCart ? (
          <button className="remove-1" onClick={() => removeFromCart(product.id)}>
            <img src={trash} className="remove" alt="remove" />
          </button>
        ) : (
          <button className="btn-1" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
