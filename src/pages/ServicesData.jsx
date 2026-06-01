import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Cart from "./Cart";

export default function ServicesData() {
  const location = useLocation();

  // expected:
  // location.state = { type: "washing" } OR { type: "detailing" }
  const serviceType = location.state?.type;

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // ================= DISCOUNT LOGIC =================
  const getDiscount = () => {
    if (serviceType === "washing") return 0.5; // 50%
    if (serviceType === "detailing") return 0.3; // 30%
    return 0;
  };

  const discount = getDiscount();

  // ================= BASE PRICES =================
  const basePlans = [
    {
      id: 1,
      name: "Starter Plan",
      price: 1000,
      desc: "Basic Monthly Plan",
      color: "#ff4d2d",
    },
    {
      id: 2,
      name: "Premium Plan",
      price: 4999,
      desc: "6 Months Unlimited Wash",
      color: "#ff7a18",
    },
    {
      id: 3,
      name: "Elite Plan",
      price: 8999,
      desc: "1 Year Unlimited Service",
      color: "#ffb347",
    },
  ];

  // ================= APPLY DISCOUNT =================
  const premium = basePlans.map((plan) => {
    let discountedPrice = plan.price - plan.price * discount;

    // optional cap logic (your requirement)
    if (serviceType === "detailing" && discountedPrice > 5000) {
      discountedPrice = 5000;
    }

    return {
      ...plan,
      price: Math.round(discountedPrice),
    };
  });

  // ================= UI CARD =================
  const Card = ({ item }) => (
    <div
      style={{
        background: "linear-gradient(145deg, #0b1220, #111827)",
        padding: "16px",
        borderRadius: "16px",
        border: "1px solid #1f2937",
        boxShadow: "0 8px 20px rgba(0,0,0,0.7)",
        color: "white",
      }}
    >
      <h3>{item.name}</h3>
      <p>{item.desc}</p>
      <h2>₹{item.price}</h2>

      <button
        onClick={() => addToCart(item)}
        style={{
          width: "100%",
          padding: "10px",
          background: item.color,
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Buy Plan
      </button>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial",
        background: "linear-gradient(135deg, #ff512f, #dd2476)",
        color: "white",
      }}
    >
      {/* LEFT SIDE */}
      <div style={{ flex: 3, padding: "30px" }}>
        <h1 style={{ fontSize: "36px" }}>💎 Premium Plans</h1>

        {/* SHOW DISCOUNT INFO */}
        {serviceType && (
          <div
            style={{
              marginBottom: "20px",
              padding: "10px",
              background: "rgba(0,0,0,0.3)",
              borderRadius: "10px",
            }}
          >
            {serviceType === "washing" && (
              <h3>🚿 50% Discount Applied (Washing Service)</h3>
            )}
            {serviceType === "detailing" && (
              <h3>✨ 30% Discount Applied (Detailing Service)</h3>
            )}
          </div>
        )}

        {/* PLANS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "15px",
          }}
        >
          {premium.map((p) => (
            <div
              key={p.id}
              style={{
                background: "rgba(255,255,255,0.08)",
                padding: "18px",
                borderRadius: "16px",
                border: `2px solid ${p.color}`,
              }}
            >
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <h2>₹{p.price}</h2>

              <button
                onClick={() => addToCart(p)}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "none",
                  borderRadius: "10px",
                  background: p.color,
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Buy Plan
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CART */}
      <div style={{ flex: 1 }}>
        <Cart cart={cart} removeItem={removeItem} />
      </div>
    </div>
  );
}
