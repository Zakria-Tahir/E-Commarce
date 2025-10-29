import React from "react";
import "./Components/ProductCard.css";
import trash from './assets/trash.png';

export default function ProductCard({ product, addToCart, removeFromCart, inCart }) {
  return (
    <div className="product-card">
      <div className="product-img"> 
        <img className="pro-img" src={product.image} alt={product.name} />
        </div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      {inCart ? (
      <button className="remove-1" onClick={() => removeFromCart(product.id)}>
        <img src={trash} className="remove"  />
        </button>
      ) : (
        <button className="btn-1" onClick={() => addToCart(product)}>Add to Cart</button>
      )}
    </div>
  );
}
