import { useEffect, useState } from "react";

const Loading = () => {
  const url = "http://localhost:8000/images/card_bases";
  const [images] = useState([
    `${url}/Inferno_Dragon.jpg`,
    `${url}/Pyro_Phoenix.jpg`,
    `${url}/Molten_Golem.jpg`,
    `${url}/Flame_Salamander.jpg`,
    `${url}/Ember_Elemental.jpg`,
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <main className="p-24 flex min-h-screen flex-col items-center justify-center text-[#fcfcfa] z-0">
      <div className="flex flex-col gap-4 items-center">
        <img
          src={images[currentImageIndex]}
          alt="card"
          className="w-60 rounded animate_loading"
        />
        <h1 className="text-2xl text-[#f3c842] animate-pulse">Loading</h1>
      </div>
    </main>
  );
};

export default Loading;
