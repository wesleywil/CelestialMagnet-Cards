"use client";

import { useEffect, useState } from "react";

const HomeShowcase = () => {
  const url = "http://localhost:8000/images/card_bases";
  const [images] = useState([
    `${url}/Mermaid.jpg`,
    `${url}/Tidal_Leviathan.jpg`,
    `${url}/Inferno_Dragon.jpg`,
    `${url}/Storm_Griffin.jpg`,
  ]);
  const [names] = useState([
    "Mermaid",
    "Tidal Leviathan",
    "Infeno Dragon",
    "Storm Griffin",
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <div className="self-center">
      <div className="relative w-[24.2rem] h-[30rem] card_effect transform duration-500 ease-in-out">
        {/* Name */}
        <h1 className="absolute w-full py-1 text-center font-bold text-3xl  text-[#e6eeee] bg-[#1e2027]/80 top-6 left-0 z-10">
          {names[currentImageIndex]}
        </h1>
        {/* Frame */}
        <div
          style={{
            backgroundImage: `url(http://localhost:8000/images/card_frames/golden.png)`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
          className="w-full h-[30rem] absolute top-0 left-0 z-10"
        ></div>
        {/* Base image */}
        <div
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
            backgroundSize: "cover",
          }}
          className="w-[23rem] h-[30rem] absolute top-0 left-0 z-0 "
        ></div>
      </div>
    </div>
  );
};

export default HomeShowcase;
