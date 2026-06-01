// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import Footer from "../components/Footer";

// export default function Checkout() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const { plan, billing, discount } = state || {};

//   const [loading, setLoading] = useState(false);
//   const [method, setMethod] = useState("card");
//   const [months, setMonths] = useState(6);

//   const [card, setCard] = useState({
//     number: "",
//     name: "",
//     expiry: "",
//     cvv: "",
//   });

//   const [success, setSuccess] = useState(false);

//   if (!plan) {
//     return <div className="p-10">No plan selected</div>;
//   }

//   // 🔥 PRICE
//   const finalPrice = plan.price - (plan.price * discount) / 100;
//   const emi = Math.round(finalPrice / months);

//   // 🔥 CARD VALIDATION (Luhn)
//   const validateCard = (num) => {
//     let arr = (num + "")
//       .split("")
//       .reverse()
//       .map((x) => parseInt(x));

//     let lastDigit = arr.splice(0, 1)[0];

//     let sum = arr.reduce((acc, val, i) => {
//       if (i % 2 !== 0) val *= 2;
//       if (val > 9) val -= 9;
//       return acc + val;
//     }, 0);

//     sum += lastDigit;
//     return sum % 10 === 0;
//   };

//   const handlePayment = () => {
//     if (method === "card" && !validateCard(card.number)) {
//       alert("❌ Invalid Card Number");
//       return;
//     }

//     setLoading(true);

//     setTimeout(() => {
//       setSuccess(true);

//       // 🔥 SAVE PLAN
//       localStorage.setItem("userPlan", plan.title);

//       // 🔥 EXPIRY
//       const expiryDate = new Date();
//       expiryDate.setMonth(expiryDate.getMonth() + months);
//       localStorage.setItem("planExpiry", expiryDate);

//       setTimeout(() => {
//         navigate("/profile");
//       }, 2000);
//     }, 2000);
//   };

//   const downloadInvoice = () => {
//     const data = `
// Invoice
// Plan: ${plan.title}
// Amount: ₹${finalPrice}
// Date: ${new Date().toLocaleDateString()}
// `;
//     const blob = new Blob([data], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "invoice.txt";
//     a.click();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col">

//       <div className="flex-grow flex justify-center p-6">

//         <div className="max-w-6xl w-full grid md:grid-cols-2 gap-6">

//           {/* 🔥 LEFT */}
//           <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl">

//             <h2 className="text-xl font-bold mb-4">
//               Payment Method
//             </h2>

//             {/* METHODS */}
//             <div className="flex gap-3 mb-5">
//               {["card", "upi", "netbanking"].map((m) => (
//                 <button
//                   key={m}
//                   onClick={() => setMethod(m)}
//                   className={`px-4 py-2 rounded-xl border transition
//                   ${method === m ? "bg-blue-600 text-white" : ""}`}
//                 >
//                   {m.toUpperCase()}
//                 </button>
//               ))}
//             </div>

//             {/* CARD */}
//             {method === "card" && (
//               <div className="space-y-3">
//                 <input
//                   placeholder="Card Number"
//                   className="input"
//                   value={card.number}
//                   onChange={(e) =>
//                     setCard({ ...card, number: e.target.value })
//                   }
//                 />

//                 <input
//                   placeholder="Card Holder Name"
//                   className="input"
//                   value={card.name}
//                   onChange={(e) =>
//                     setCard({ ...card, name: e.target.value })
//                   }
//                 />

//                 <div className="flex gap-3">
//                   <input
//                     placeholder="MM/YY"
//                     className="input"
//                     value={card.expiry}
//                     onChange={(e) =>
//                       setCard({ ...card, expiry: e.target.value })
//                     }
//                   />

//                   <input
//                     placeholder="CVV"
//                     className="input"
//                     value={card.cvv}
//                     onChange={(e) =>
//                       setCard({ ...card, cvv: e.target.value })
//                     }
//                   />
//                 </div>
//               </div>
//             )}

//             {/* UPI */}
//             {method === "upi" && (
//               <div className="space-y-3">
//                 <input
//                   placeholder="example@upi"
//                   className="input"
//                 />
//                 <div className="flex gap-2">
//                   <span className="badge">GPay</span>
//                   <span className="badge">PhonePe</span>
//                   <span className="badge">Paytm</span>
//                 </div>
//               </div>
//             )}

//             {/* NETBANKING */}
//             {method === "netbanking" && (
//               <select className="input">
//                 <option>Select Bank</option>
//                 <option>SBI</option>
//                 <option>HDFC</option>
//                 <option>ICICI</option>
//               </select>
//             )}
//           </div>

//           {/* 🔥 RIGHT */}
//           <div className="bg-white p-6 rounded-2xl shadow-xl">

//             <h2 className="text-xl font-bold mb-4">
//               Order Summary
//             </h2>

//             <p className="font-semibold">{plan.title}</p>
//             <p className="text-sm text-gray-500">
//               {plan.duration}
//             </p>

//             {/* EMI */}
//             {billing === "emi" && (
//               <div className="mt-4">
//                 <select
//                   className="input"
//                   value={months}
//                   onChange={(e) => setMonths(e.target.value)}
//                 >
//                   <option value={3}>3 Months</option>
//                   <option value={6}>6 Months</option>
//                   <option value={12}>12 Months</option>
//                 </select>
//               </div>
//             )}

//             <div className="mt-4 space-y-2 text-sm">
//               <div className="flex justify-between">
//                 <span>Price</span>
//                 <span>₹{plan.price}</span>
//               </div>

//               {discount > 0 && (
//                 <div className="flex justify-between text-green-600">
//                   <span>Discount</span>
//                   <span>-{discount}%</span>
//                 </div>
//               )}

//               <div className="border-t pt-2 flex justify-between font-bold">
//                 <span>Total</span>
//                 <span>
//                   {billing === "emi"
//                     ? `₹${emi}/month`
//                     : `₹${finalPrice}`}
//                 </span>
//               </div>
//             </div>

//             {/* PAY */}
//             <button
//               onClick={handlePayment}
//               className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
//             >
//               {loading ? "Processing..." : "Pay Now"}
//             </button>

//             {/* INVOICE */}
//             {success && (
//               <button
//                 onClick={downloadInvoice}
//                 className="w-full mt-3 bg-green-500 text-white py-2 rounded-xl"
//               >
//                 Download Invoice
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* 🎉 SUCCESS ANIMATION */}
//       {success && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center text-white text-3xl font-bold">
//           🎉 Payment Successful
//         </div>
//       )}

//       <Footer />

//       {/* STYLE */}
//       <style>
//         {`
//           .input {
//             width: 100%;
//             padding: 12px;
//             border: 1px solid #e5e7eb;
//             border-radius: 12px;
//           }
//           .badge {
//             background: #f3f4f6;
//             padding: 6px 10px;
//             border-radius: 8px;
//             font-size: 12px;
//           }
//         `}
//       </style>

//     </div>
//   );
// }




import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { plan, billing, discount } = state || {};

  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("card");
  const [months, setMonths] = useState(6);

  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [success, setSuccess] = useState(false);

  if (!plan) {
    return <div className="p-10">No plan selected</div>;
  }

  const finalPrice = plan.price - (plan.price * discount) / 100;
  const emi = Math.round(finalPrice / months);

  const validateCard = (num) => {
    let arr = (num + "").split("").reverse().map(Number);
    let lastDigit = arr.splice(0, 1)[0];

    let sum = arr.reduce((acc, val, i) => {
      if (i % 2 !== 0) val *= 2;
      if (val > 9) val -= 9;
      return acc + val;
    }, 0);

    sum += lastDigit;
    return sum % 10 === 0;
  };

  const handlePayment = () => {
    if (method === "card" && !validateCard(card.number)) {
      alert("❌ Invalid Card Number");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setSuccess(true);

      localStorage.setItem("userPlan", plan.title);

      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + months);
      localStorage.setItem("planExpiry", expiryDate);

      setTimeout(() => navigate("/profile"), 2000);
    }, 1500);
  };

  const downloadInvoice = () => {
    const data = `
Invoice
Plan: ${plan.title}
Amount: ₹${finalPrice}
Date: ${new Date().toLocaleDateString()}
`;
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "invoice.txt";
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#FDF2F8] flex flex-col">

      <div className="flex-grow flex justify-center p-6">

        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-6">

          {/* LEFT */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-pink-100">

            <h2 className="text-xl font-extrabold text-gray-900 mb-5">
              💳 Payment Method
            </h2>

            {/* METHODS */}
            <div className="flex gap-3 mb-5">
              {["card", "upi", "netbanking"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`px-4 py-2 rounded-xl font-semibold border transition
                  ${
                    method === m
                      ? "bg-[#EC4899] text-white shadow"
                      : "bg-white text-gray-700 hover:bg-pink-50"
                  }`}
                >
                  {m.toUpperCase()}
                </button>
              ))}
            </div>

            {/* CARD */}
            {method === "card" && (
              <div className="space-y-3">
                <input className="input" placeholder="Card Number"
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: e.target.value })}
                />

                <input className="input" placeholder="Card Holder Name"
                  value={card.name}
                  onChange={(e) => setCard({ ...card, name: e.target.value })}
                />

                <div className="flex gap-3">
                  <input className="input" placeholder="MM/YY"
                    value={card.expiry}
                    onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                  />
                  <input className="input" placeholder="CVV"
                    value={card.cvv}
                    onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* UPI */}
            {method === "upi" && (
              <div>
                <input className="input" placeholder="example@upi" />
                <div className="flex gap-2 mt-3">
                  {["GPay", "PhonePe", "Paytm"].map((b) => (
                    <span key={b} className="badge">{b}</span>
                  ))}
                </div>
              </div>
            )}

            {/* NETBANKING */}
            {method === "netbanking" && (
              <select className="input">
                <option>Select Bank</option>
                <option>SBI</option>
                <option>HDFC</option>
                <option>ICICI</option>
              </select>
            )}
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-pink-100">

            <h2 className="text-xl font-extrabold text-gray-900 mb-4">
              📦 Order Summary
            </h2>

            <p className="font-bold text-gray-800">{plan.title}</p>
            <p className="text-sm text-gray-500">{plan.duration}</p>

            {/* EMI */}
            {billing === "emi" && (
              <div className="mt-4">
                <select
                  className="input"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                >
                  <option value={3}>3 Months</option>
                  <option value={6}>6 Months</option>
                  <option value={12}>12 Months</option>
                </select>
              </div>
            )}

            {/* PRICE BOX */}
            <div className="mt-5 space-y-2 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-600">Price</span>
                <span className="font-semibold">₹{plan.price}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Discount</span>
                  <span>-{discount}%</span>
                </div>
              )}

              <div className="border-t pt-3 flex justify-between font-extrabold text-lg">
                <span>Total</span>
                <span className="text-[#EC4899]">
                  {billing === "emi" ? `₹${emi}/month` : `₹${finalPrice}`}
                </span>
              </div>
            </div>

            {/* PAY BUTTON */}
            <button
              onClick={handlePayment}
              className="w-full mt-6 bg-[#EC4899] text-white py-3 rounded-xl font-bold shadow hover:scale-105 transition"
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>

            {/* INVOICE */}
            {success && (
              <button
                onClick={downloadInvoice}
                className="w-full mt-3 bg-green-500 text-white py-2 rounded-xl font-semibold hover:scale-105 transition"
              >
                Download Invoice
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SUCCESS */}
      {success && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center text-white text-2xl font-bold">
          🎉 Payment Successful
        </div>
      )}

      <Footer />

      {/* STYLE */}
      <style>{`
        .input {
          width: 100%;
          padding: 12px;
          border: 1px solid #fbcfe8;
          border-radius: 12px;
          outline: none;
        }

        .input:focus {
          border-color: #EC4899;
          box-shadow: 0 0 0 2px rgba(236,72,153,0.2);
        }

        .badge {
          background: #FCE7F3;
          color: #EC4899;
          padding: 6px 10px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
        }
      `}</style>

    </div>
  );
}