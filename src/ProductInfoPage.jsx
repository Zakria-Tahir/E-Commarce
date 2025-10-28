import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Components/ProductInfoPage.css";

export default function ProductInfoPage({ products = [], addToCart }) {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === String(id));
  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  if (!product) return <h2>Product not found</h2>;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000); // Hide after 2 sec
  };

  return (
    <div className="product-info-container">
      <div className="info-image">
        <img className="info-img" src={product.image} alt={product.name} />
      </div>

      <div className="info-details">
        <h2 className="Product-Name">{product.name}</h2>
        <p className="price">${product.price}</p>
        <p className="desc">{product.description || "Product description..."}</p>

        <div className="quantity-section">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)}>+</button>
        </div>

        <button className="add-btn" onClick={handleAddToCart}>
          Add {quantity} to Cart
        </button>

        <p className="total-price">
          Total: ${(product.price * quantity).toFixed(2)}
        </p>
      </div>

      {/* ✅ Center Popup Message */}
      {showMessage && (
        <div className="popup-message-center">
          <div className="popup-box">
            <h3>Added to Cart Successfully!</h3>
          </div>
        </div>
      )}
    </div>
  );
}
