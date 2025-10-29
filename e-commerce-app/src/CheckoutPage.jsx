import React, { useState, useMemo } from "react";
import "./Components/CheckoutPage.css";
import { FaCreditCard, FaPaypal, FaMoneyBillWave } from "react-icons/fa";

export default function CheckoutPage({ cart, clearCart }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    instructions: "",
    payment: "Credit Card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    paypalEmail: "",
  });
  const [showDialog, setShowDialog] = useState(false);

  // 🧮 Calculate total dynamically
  const totalAmount = useMemo(
    () => cart.reduce((sum, item) => sum + item.price, 0),
    [cart]
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    setForm({
      name: "",
      email: "",
      address: "",
      instructions: "",
      payment: "Credit Card",
      cardNumber: "",
      expiry: "",
      cvv: "",
      paypalEmail: "",
    });
    setShowDialog(true);
    setTimeout(() => setShowDialog(false), 2500);
  };

  return (
   <div className="zik">
    <div className="checkout-page">
      <h2 className="checkout-title">Checkout</h2>
      <form className="checkout-form" onSubmit={handleSubmit}>
        {/* 🧾 Customer Info */}
        <div className="checkout-section">
          <h3>Customer Information</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={handleChange}
          />
          <textarea
            name="address"
            placeholder="Shipping Address"
            required
            value={form.address}
            onChange={handleChange}
          />
        </div>

        {/* 📝 Other Instructions */}
        <div className="checkout-section">
          <h3>Other Instructions</h3>
          <textarea
            name="instructions"
            placeholder="Any special delivery notes?"
            value={form.instructions}
            onChange={handleChange}
          />
        </div>

        {/* 💳 Payment Method */}
        <div className="checkout-section">
          <h3>Payment Method</h3>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="Credit Card"
                checked={form.payment === "Credit Card"}
                onChange={handleChange}
              />
              <FaCreditCard /> Credit / Debit Card
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="PayPal"
                checked={form.payment === "PayPal"}
                onChange={handleChange}
              />
              <FaPaypal /> PayPal
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={form.payment === "Cash on Delivery"}
                onChange={handleChange}
              />
              <FaMoneyBillWave /> Cash on Delivery
            </label>
          </div>

          {/* 💳 Credit Card Info */}
          {form.payment === "Credit Card" && (
            <div className="credit-card-box">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={form.cardNumber}
                onChange={handleChange}
                required
              />
              <div className="card-row">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={form.expiry}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={form.cvv}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          {/* 💸 PayPal Info */}
          {form.payment === "PayPal" && (
            <div className="paypal-box">
              <input
                type="email"
                name="paypalEmail"
                placeholder="PayPal Email"
                value={form.paypalEmail}
                onChange={handleChange}
                required
              />
            </div>
          )}
        </div>

        {/* 💰 Total Amount */}
        <div className="checkout-section total-section">
          <h3>Order Summary</h3>
          {cart.length > 0 ? (
            <div className="total-container">
              <p>Total Items: {cart.length}</p>
              <h4>Total Amount: ${totalAmount.toFixed(2)}</h4>
            </div>
          ) : (
            <p className="empty-cart">Your cart is empty.</p>
          )}
        </div>

        {/* ✅ Submit */}
        <button type="submit" className="confirm-btn" disabled={cart.length === 0}>
          Confirm Order
        </button>
      </form>

      {/* ✅ Success Dialog */}
      {showDialog && (
        <div className="success-dialog">
          <div className="dialog-box">
            <h3>🎉 Order Confirmed!</h3>
            <p>Thank you for your purchase.</p>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
