import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function Cart({ cart, removeItem }) {
  const [showBooking, setShowBooking] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((sum, i) => sum + i.price, 0);

  const [booking, setBooking] = useState({
    date: null,
    slot: "",
    location: "",
  });

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [slots, setSlots] = useState([]);

  // AUTO OPEN BOOKING
  useEffect(() => {
    if (cart.length > 0 && !showBooking) {
      setShowBooking(true);
      detectLocation();
    }
  }, [cart]);

  // SLOT GENERATION (7 AM - 7 PM)
  const generateSlots = () => {
    const arr = [];
    for (let i = 7; i <= 19; i++) {
      const hour = i > 12 ? i - 12 : i;
      const ampm = i >= 12 ? "PM" : "AM";
      arr.push(`${hour} ${ampm}`);
    }
    setSlots(arr);
  };

  // GPS (optional)
  const detectLocation = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;

      setBooking((prev) => ({
        ...prev,
        location: `${latitude}, ${longitude}`,
      }));
    });
  };

  // OPEN POPUP
  const handlePlaceOrder = () => {
    if (!booking.date || !booking.slot) {
      return alert("Select date & slot first");
    }
    setShowModal(true);
  };

  // CONFIRM ORDER
  const confirmOrder = () => {
    if (!customer.name || !customer.phone || !customer.address) {
      return alert("Fill all details");
    }

    const order = {
      id: "ORD-" + Date.now(),
      items: cart,
      booking,
      customer,
      total,
    };

    console.log("ORDER:", order);

    alert("Order Placed 🚀");

    // CLOSE MODAL + BOOKING
    setShowModal(false);
    setShowBooking(false);
    setOpenCalendar(false);

    // SHOW SUCCESS SCREEN
    setOrderPlaced(true);

    // RESET STATE
    setBooking({ date: null, slot: "", location: "" });
    setCustomer({ name: "", phone: "", address: "" });
    setSlots([]);
  };

  // ================= SUCCESS SCREEN =================
  if (orderPlaced) {
    return (
      <div style={styles.success}>
        <h1>🎉 Order Placed Successfully</h1>
        <p>Your booking is confirmed</p>

        <button onClick={() => setOrderPlaced(false)} style={styles.successBtn}>
          Back to Cart
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h2>🛒 Cart</h2>

      {/* CART ITEMS */}
      {cart.map((c, i) => (
        <div key={i} style={styles.card}>
          <div style={styles.left}>
            <div style={styles.icon}>🚗</div>
            <div>
              <h4 style={styles.title}>{c.name}</h4>
              <p style={styles.price}>₹{c.price}</p>
            </div>
          </div>

          <button onClick={() => removeItem(i)} style={styles.removeBtn}>
            Remove
          </button>
        </div>
      ))}

      {/* BOOKING */}
      {showBooking && (
        <div style={{ marginTop: 20 }}>
          <h3>Booking</h3>

          {/* CALENDAR ICON */}
          <div
            onClick={() => setOpenCalendar(!openCalendar)}
            style={styles.calendarBtn}
          >
            <FaRegCalendarAlt />
            <span>
              {booking.date ? booking.date.toDateString() : "Select Date"}
            </span>
          </div>

          {/* CALENDAR */}
          {openCalendar && (
            <DatePicker
              selected={booking.date}
              onChange={(date) => {
                setBooking({ ...booking, date, slot: "" });
                setOpenCalendar(false);
                generateSlots();
              }}
              minDate={new Date()}
              inline
            />
          )}

          {/* SLOTS */}
          {booking.date && (
            <div style={{ marginTop: 15 }}>
              <p>Select Slot (7 AM - 7 PM)</p>

              <div style={styles.slotWrap}>
                {slots.map((s) => (
                  <button
                    key={s}
                    onClick={() => setBooking({ ...booking, slot: s })}
                    style={{
                      ...styles.slotBtn,
                      background: booking.slot === s ? "#22c55e" : "#111827",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <hr />

      <h3>Total: ₹{total}</h3>

      <button onClick={handlePlaceOrder} style={styles.placeBtn}>
        Place Order
      </button>

      {/* ================= POPUP ================= */}
      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>Customer Details</h2>

            <input
              placeholder="Name"
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
              style={styles.input}
            />

            <input
              placeholder="Phone"
              value={customer.phone}
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
              style={styles.input}
            />

            <textarea
              placeholder="Address"
              value={customer.address}
              onChange={(e) =>
                setCustomer({ ...customer, address: e.target.value })
              }
              style={styles.textarea}
            />

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setShowModal(false)}
                style={styles.cancelBtn}
              >
                Cancel
              </button>

              <button onClick={confirmOrder} style={styles.confirmBtn}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    background: "#0b1220",
    padding: 20,
    minHeight: "100vh",
    color: "white",
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(135deg, #111827, #0f172a)",
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    border: "1px solid #1f2937",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  icon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    background: "#22c55e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  title: { margin: 0, fontSize: 16 },
  price: { margin: 0, fontSize: 14, color: "#9ca3af" },

  removeBtn: {
    background: "rgba(239, 68, 68, 0.15)",
    color: "#ef4444",
    border: "1px solid #ef4444",
    padding: "6px 10px",
    borderRadius: 8,
  },

  calendarBtn: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "#111827",
    padding: 10,
    width: "fit-content",
    borderRadius: 8,
    cursor: "pointer",
  },

  slotWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },

  slotBtn: {
    padding: "8px 12px",
    color: "white",
    border: "none",
    borderRadius: 6,
  },

  placeBtn: {
    width: "100%",
    padding: 12,
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: 8,
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    background: "#111827",
    padding: 20,
    borderRadius: 12,
    width: 350,
  },

  input: {
    width: "100%",
    padding: 10,
    margin: "8px 0",
  },

  textarea: {
    width: "100%",
    padding: 10,
    margin: "8px 0",
    minHeight: 80,
  },

  cancelBtn: {
    flex: 1,
    padding: 10,
    background: "#ef4444",
    color: "white",
    border: "none",
  },

  confirmBtn: {
    flex: 1,
    padding: 10,
    background: "#22c55e",
    color: "white",
    border: "none",
  },

  success: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#0b1220",
    color: "white",
  },

  successBtn: {
    marginTop: 20,
    padding: 12,
    background: "#22c55e",
    border: "none",
    color: "white",
  },
};
