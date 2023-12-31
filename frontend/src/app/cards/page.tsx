"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { fetchCards, selectGroupCards } from "@/redux/cards/cards";
import { Tier } from "@/utils/interfaces";
import { switchCardShowcase } from "@/redux/utils/utils";

// Components
import Card from "@/components/card/card.component";
import CardShowcase from "@/components/card_showcase/card_showcase.component";
import CardTypeFilter from "@/components/card_type_filter/card_type_filter.component";
import CardShowcaseMenu from "@/components/card_showcase_menu/card_showcase_menu.component";
import CardShowcaseImage from "@/components/card_showcase_image/card_showcase_image.component";
import CardShowcaseInfo from "@/components/card_showcase_info/card_showcase_info.component";
import { group } from "console";

export default function Cards() {
  const hideCardShowcase = useSelector(
    (state: RootState) => state.utils.hideCardShowcase
  );
  const status = useSelector((state: RootState) => state.cards.status);
  const cards = useSelector((state: RootState) => state.cards.filteredByType);
  const groupCards = useSelector(
    (state: RootState) => state.cards.groupedCards
  );
  const card = useSelector((state: RootState) => state.cards.selectedCard);
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
          <div className="md:w-[70vw] xl:w-[40vw] h-[60vh] mt-36 p-4 flex xl:justify-center bg-black/80 rounded">
            {/* Card Image and Tier Switch Buttons */}

            <div className="self-center ">
              {Object.keys(card).length === 0 ? (
                <CardShowcaseImage
                  cardImg={groupCards[0].base_image}
                  cardFrame={groupCards[0].frame_image!}
                  containerWidth="w-72"
                  containerHeight="h-96"
                  backgroundSize="contain"
                  baseHeight="h-[22rem]"
                />
              ) : (
                <CardShowcaseImage
                  cardImg={card.base_image}
                  cardFrame={card.frame_image!}
                  containerWidth="w-72"
                  containerHeight="h-96"
                  backgroundSize="contain"
                  baseHeight="h-[22rem]"
                />
              )}
              {/* Card Showcase Menu */}
              <CardShowcaseMenu />
            </div>
            {/* Card Showcase Info */}
            {Object.keys(card).length === 0 ? (
              <CardShowcaseInfo card={groupCards[0]} />
            ) : (
              <CardShowcaseInfo card={card} />
            )}
          </div>
        </CardShowcase>
      )}
      <main
        className="p-24 flex min-h-screen flex-col items-center 
      text-[#e6eeee] z-0"
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
