"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { fetchCards, selectGroupCards } from "@/redux/cards/cards";

// Components
import Card from "@/components/card/card.component";
import CardShowcase from "@/components/card_showcase/card_showcase.component";
import { Tier } from "@/utils/interfaces";
import CardTypeFilter from "@/components/card_type_filter/card_type_filter.component";
import { switchCardShowcase } from "@/redux/utils/utils";
import CardShowcaseMenu from "@/components/card_showcase_menu/card_showcase_menu.component";

export default function Cards() {
  const hideCardShowcase = useSelector(
    (state: RootState) => state.utils.hideCardShowcase
  );
  const status = useSelector((state: RootState) => state.cards.status);
  const cards = useSelector((state: RootState) => state.cards.filtered_cards);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log("cards page effect!");
    if (status === "idle") {
      dispatch(fetchCards());
    }
  }, [status]);

  const handleCardShowcase = (cardname: string) => {
    dispatch(selectGroupCards(cardname));
    dispatch(switchCardShowcase());
  };
  return (
    <>
      {hideCardShowcase ? (
        ""
      ) : (
        <CardShowcase>
          <CardShowcaseMenu />
        </CardShowcase>
      )}
      <main
        className="p-24 flex min-h-screen flex-col items-center 
      text-[#fcfcfa] z-0"
      >
        <h1 className="text-3xl font-semibold ">Celestial Magnet Cards</h1>
        <CardTypeFilter />
        <div className="xl:w-11/12 mx-auto h-[70vh] p-2 grid md:grid-cols-3 xl:grid-cols-6 gap-4 overflow-y-auto">
          {cards.length
            ? cards
                .filter((item) => item.tier === Tier.Bronze!)
                .map((item) => (
                  <Card
                    key={item.id}
                    card={item}
                    action={() => handleCardShowcase(item.name)}
                  />
                ))
            : ""}
        </div>
      </main>
    </>
  );
}
