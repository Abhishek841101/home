



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";

const API_URL = import.meta.env.VITE_API_URL;

export default function CarWashingRepair() {
  const [cart, setCart] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const fetchCarWashing = async () => {
      try {
        console.log("Fetching:", `${API_URL}/api/carwashing`);

        const res = await fetch(`${API_URL}/api/carwashing`);

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();

        console.log("FULL API RESPONSE:", data);

        if (data.success) {
          setVendors(data.carwashing || []);
        } else {
          setVendors([]);
        }
      } catch (err) {
        console.error("FETCH ERROR:", err);
        setError(err.message || "Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchCarWashing();
  }, []);

  const addAndNavigate = (item) => {
    addToCart(item);
    navigate("/servicesData", { state: item });
  };

  const washing = vendors.filter(
    (item) =>
      item.serviceType?.toLowerCase().trim() === "washing services"
  );

  const detailing = vendors.filter(
    (item) =>
      item.serviceType?.toLowerCase().trim() === "detailing services"
  );

  const repair = vendors.filter(
    (item) =>
      item.serviceType?.toLowerCase().trim() === "repair services"
  );

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
      {item.image && (
        <img
          src={
            item.image.startsWith("http")
              ? item.image
              : `${API_URL}/${item.image}`
          }
          alt={item.name}
          style={{
            width: "100%",
            height: "160px",
            objectFit: "cover",
            borderRadius: "12px",
            marginBottom: "10px",
          }}
        />
      )}

      <h3>{item.name}</h3>

      {item.location && <p>📍 {item.location}</p>}

      <h2>₹{item.price}</h2>

      <button
        onClick={() => addToCart(item)}
        style={{
          width: "100%",
          padding: "10px",
          background: "#ff4d2d",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </div>
  );

  if (loading) {
    return (
      <h2 style={{ color: "white", padding: "20px" }}>
        Loading...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 style={{ color: "red", padding: "20px" }}>
        {error}
      </h2>
    );
  }

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
      <div style={{ flex: 3, padding: "30px" }}>
        <h1 style={{ fontSize: "36px" }}>
          🚗 Car Service Booking
        </h1>

        <Section
          title="🚿 Washing Services"
          data={washing}
          Card={Card}
          type="washing"
        />

        <Section
          title="✨ Detailing Services"
          data={detailing}
          Card={Card}
          type="detailing"
        />

        <Section
          title="🔧 Repair Services"
          data={repair}
          Card={Card}
          type="repair"
        />

        <div
          style={{
            marginTop: "40px",
            padding: "15px",
            border: "1px solid #ff4d2d",
            borderRadius: "16px",
            background: "rgba(0,0,0,0.15)",
          }}
        >
          <h2>💎 Premium Packages</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
              gap: "15px",
            }}
          >
            {[
              {
                id: 1,
                name: "Starter Plan",
                price: 999,
                desc: "4 Washes / Month",
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
            ].map((p) => (
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
                  onClick={() => addAndNavigate(p)}
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
      </div>

      <div style={{ flex: 1 }}>
        <Cart cart={cart} removeItem={removeItem} />
      </div>
    </div>
  );
}

function Section({ title, data, Card, type }) {
  const borderColors = {
    washing: "#00c6ff",
    detailing: "#a855f7",
    repair: "#ff9800",
  };

  return (
    <div
      style={{
        marginTop: "25px",
        padding: "15px",
        borderRadius: "16px",
        border: `1px solid ${borderColors[type]}`,
        background: "rgba(0,0,0,0.15)",
      }}
    >
      <h2>{title}</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "15px",
        }}
      >
        {data.length > 0 ? (
          data.map((item) => (
            <Card
              key={item._id || item.id}
              item={item}
            />
          ))
        ) : (
          <p>No data found</p>
        )}
      </div>
    </div>
  );
}