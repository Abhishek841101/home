
// import homeImg from "../assets/home.png";
// import rentImg from "../assets/rent.jpg";
// import saleImg from "../assets/sale.jpg";

// const cards = [
//   {
//     id: 1,
//     title: "Featured New Launch",
//     img: homeImg,
//   },
//   {
//     id: 2,
//     title: "Luxury Townhouse",
//     img: rentImg,
//   },
//   {
//     id: 3,
//     title: "Premium Villa",
//     img: saleImg,
//   },
// ];

// export default function OverlapCards() {
//   return (
//     <section className="relative z-20 -mt-24 px-6 pb-10">

//       <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

//         {cards.map((card) => (
//           <div
//             key={card.id}
//             className="bg-white rounded-2xl shadow-lg overflow-hidden 
//             transition hover:scale-[1.03] duration-300"
//           >
//             <img
//               src={card.img}
//               className="h-48 w-full object-cover"
//               alt={card.title}
//             />

//             <div className="p-4">
//               <h3 className="font-semibold text-gray-800">
//                 {card.title}
//               </h3>

//               <button className="mt-2 text-purple-600 text-sm">
//                 Explore →
//               </button>
//             </div>
//           </div>
//         ))}

//       </div>

//     </section>
//   );
// }



import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import homeImg from "../assets/home.png";
import rentImg from "../assets/rent.jpg";
import saleImg from "../assets/sale.jpg";

const cards = [
  { id: 1, title: "Featured New Launch", img: homeImg },
  { id: 2, title: "Luxury Townhouse", img: rentImg },
  { id: 3, title: "Premium Villa", img: saleImg },
];

export default function OverlapCards() {
  const [index, setIndex] = useState(0);

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (!isMobile) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isMobile]);

  return (
    <section className="relative z-20 -mt-24 px-4 pb-10">

      {/* 💻 DESKTOP (UNCHANGED GRID) */}
      <div className="hidden md:grid max-w-6xl mx-auto grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden 
            transition hover:scale-[1.03] duration-300"
          >
            <img
              src={card.img}
              className="h-48 w-full object-cover"
              alt={card.title}
            />

            <div className="p-4">
              <h3 className="font-semibold text-gray-800">
                {card.title}
              </h3>

              <button className="mt-2 text-purple-600 text-sm">
                Explore →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 📱 MOBILE (FRAMER MOTION SLIDER) */}
      <div className="md:hidden flex justify-center">
        <div className="w-full relative h-[340px]">

          <AnimatePresence mode="wait">
            <motion.div
              key={cards[index].id}
              initial={{ x: 80, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -80, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute w-full flex justify-center"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-[92%]">

                <img
                  src={cards[index].img}
                  className="h-56 w-full object-cover"
                  alt={cards[index].title}
                />

                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {cards[index].title}
                  </h3>

                  <button className="mt-2 text-purple-600 text-sm font-medium">
                    Explore →
                  </button>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

    </section>
  );
}