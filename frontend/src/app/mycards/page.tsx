"use client";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { fetchUserCards, selectCardById } from "@/redux/cards/cards";
import { switchCardShowcase } from "@/redux/utils/utils";

// Components
import Card from "@/components/card/card.component";
import CardShowcase from "@/components/card_showcase/card_showcase.component";

export default function MyCards() {
  const hideCardShowcase = useSelector(
    (state: RootState) => state.utils.hideCardShowcase
  );
  const status = useSelector((state: RootState) => state.cards.status);
  const cards = useSelector((state: RootState) => state.cards.filtered_cards);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserCards());
    }
  }, [status]);

  const handleCardShowcase = (cardId: number) => {
    //dispatch(selectGroupCards(cardname));
    dispatch(selectCardById(cardId));
    dispatch(switchCardShowcase());
  };
  return (
    <>
      {hideCardShowcase ? "" : <CardShowcase />}

      <main className="p-24 flex min-h-screen flex-col items-center text-[#fcfcfa] z-0">
        <h1 className="text-3xl font-semibold ">My Cards</h1>
        <div className="xl:w-11/12 mx-auto h-[70vh] p-2 grid md:grid-cols-3 xl:grid-cols-6 gap-4 overflow-y-auto">
          {cards.length
            ? cards.map((item) => (
                <Card
                  key={item.id}
                  card={item}
                  action={() => handleCardShowcase(item.id!)}
                />
              ))
            : ""}
        </div>
      </main>
    </>
  );
}
