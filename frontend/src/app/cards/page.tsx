"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

// Components
import Card from "@/components/card/card.component";
import CardShowcase from "@/components/card_showcase/card_showcase.component";

export default function Cards() {
  const hideCardShowcase = useSelector(
    (state: RootState) => state.utils.hideCardShowcase
  );
  return (
    <>
      {hideCardShowcase ? "" : <CardShowcase />}
      <main
        className="p-24 flex min-h-screen flex-col items-center 
      text-[#fcfcfa] z-0"
      >
        <h1 className="text-3xl font-semibold ">Celestial Magnet Cards</h1>
        <div className="h-[70vh] mt-12 p-2 grid md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </main>
    </>
  );
}
