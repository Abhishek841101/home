





import { Check, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PricingSection({
  billing = "full",
  discount = 0,
  activePlan,
}) {
  const navigate = useNavigate();

  const plans = [
    {
      title: "Project Trial Plus",
      duration: "2 Months",
      price: 30000,
      popular: false,
      features: [
        "Minimum 100 Leads",
        "5-10 Site Visits",
        "Monthly Sales Training",
        "Common Relationship Manager",
        "Marketing Material",
        "1 Social Media Post",
        "1 Social Media Video Reel",
        "Follow-up Tracker",
        "Digital Broker System",
        "Lead Management System",
        "Digital Profile",
      ],
    },
    {
      title: "Project Starter",
      duration: "3 Months",
      price: 50000,
      popular: true,
      features: [
        "Minimum 300 Leads",
        "15-20 Site Visits",
        "Monthly Sales Training",
        "Marketing Material",
        "Follow-up Tracker",
        "Digital Broker System",
        "Landing Page",
        "Team Support",
        "Business Community Access",
      ],
    },
    {
      title: "Project Standard",
      duration: "6 Months",
      price: 118000,
      popular: false,
      features: [
        "Minimum 700 Leads",
        "40-50 Site Visits",
        "2 Social Media Posts",
        "2 Video Reels",
        "Incoming Call System",
        "Team Development",
        "Landing Page",
        "AI Lead Filtration",
        "Business Community Access",
      ],
    },
    {
      title: "Project Icon",
      duration: "12 Months",
      price: 295000,
      popular: false,
      features: [
        "1500-2500 Leads",
        "75-200 Site Visits",
        "Dedicated Manager",
        "Unlimited Property Upload",
        "Brand Promotion",
        "PR Support",
        "AI Filtration",
        "Business Community",
        "Priority Support",
      ],
    },
  ];

  // 🔥 PRICE CALCULATION
  const getPrice = (price) => {
    let final = price - (price * discount) / 100;

    if (billing === "emi") {
      return `₹${Math.round(final / 6)}/month`;
    }

    return `₹${final.toLocaleString()}`;
  };

  return (
    <section className="py-16 bg-gray-50">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          Choose Your Plan
        </h2>
        <p className="text-gray-500 mt-2">
          Flexible subscription options for your business 🚀
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-10">

        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between transition
            hover:shadow-xl hover:-translate-y-1
            ${plan.popular ? "border-2 border-blue-600 scale-105" : ""}`}
          >

            {/* MOST POPULAR */}
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <Star size={14} /> Most Popular
              </div>
            )}

            {/* TITLE */}
            <div>
              <p className="text-sm text-gray-400">{plan.duration}</p>

              <h3 className="text-xl font-bold mt-1">
                {plan.title}
              </h3>

              <p className="text-2xl font-bold mt-2">
                {getPrice(plan.price)}
                <span className="text-sm text-gray-500"> /plan</span>
              </p>

              {discount > 0 && (
                <p className="text-green-600 text-sm mt-1">
                  {discount}% OFF Applied
                </p>
              )}
            </div>

            {/* FEATURES */}
            <ul className="mt-5 space-y-2 text-sm max-h-60 overflow-y-auto pr-2">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="text-green-500 mt-1" size={16} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* BUTTON */}
            <button
              onClick={() =>
                navigate("/checkout", {
                  state: {
                    plan,
                    billing,
                    discount,
                  },
                })
              }
              className={`mt-6 py-2 rounded-xl font-semibold transition
              ${
                activePlan === plan.title
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {activePlan === plan.title
                ? "Active Plan"
                : "Subscribe"}
            </button>

          </div>
        ))}

      </div>
    </section>
  );
}