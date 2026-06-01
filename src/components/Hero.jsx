// import heroImg from "../assets/hero.jpg";

// export default function Hero() {
//   return (
//     <section className="w-full h-[calc(70svh-1px)] bg-white flex items-center justify-center overflow-hidden">

//       <img
//         src={heroImg}
//         alt="Hero"
//         className="max-h-full max-w-full w-auto h-auto object-contain"
//       />

//     </section>
//   );
// }



import heroImg from "../assets/hero.jpg";

export default function Hero() {
  return (
    <section className="w-full h-[calc(100vh-70px)]">
      
      <img
        src={heroImg}
        alt="Hero"
        className="w-full h-full object-fill"
      />

    </section>
  );
}