"use client";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { fetchUserCards, selectCardById } from "@/redux/user_cards/user_cards";
import { switchCardShowcase } from "@/redux/utils/utils";

// Components
import Card from "@/components/card/card.component";
import CardShowcase from "@/components/card_showcase/card_showcase.component";
import NotAuthenticated from "@/components/not_authenticated/not_authenticated.component";
import Loading from "@/components/loading/loading.component";
import CardShowcaseImage from "@/components/card_showcase_image/card_showcase_image.component";
import CardShowcaseInfo from "@/components/card_showcase_info/card_showcase_info.component";
import CardShowcaseTradeBtn from "@/components/card_showcase_trade_btn/card_showcase_trade_btn.component";
import CardTradeSellPanel from "@/components/card_trade_sell_panel/card_trade_sell_panel.component";

export default function MyCards() {
  const hideCardShowcase = useSelector(
    (state: RootState) => state.utils.hideCardShowcase
  );
  const hideTradeSellPanel = useSelector(
    (state: RootState) => state.utils.hideTradeSellPanel
  );
  const status = useSelector((state: RootState) => state.usercards.status);
  const userStatus = useSelector((state: RootState) => state.user.status);
  const cards = useSelector(
    (state: RootState) => state.usercards.userFilteredCards
  );
  const card = useSelector(
    (state: RootState) => state.usercards.userSelectedCard
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserCards());
    }
  }, [status]);

  const handleCardShowcase = (cardId: number) => {
    dispatch(selectCardById(cardId));
    dispatch(switchCardShowcase());
  };

  if (status === "idle") {
    return <Loading />;
  }
  if (userStatus === "user info failed to be retrieved") {
    return <NotAuthenticated />;
  } else {
    return (
      <>
        {hideTradeSellPanel ? "" : <CardTradeSellPanel />}

        {hideCardShowcase ? (
          ""
        ) : (
          <CardShowcase>
            <div className="md:w-[70vw] xl:w-[40vw] h-[60vh] mt-36 p-4 flex xl:justify-center bg-black/80 rounded">
              {/* Card Image and Tier Switch Buttons */}

              <div className="self-center ">
                <CardShowcaseImage
                  card_img={card.base_image}
                  card_frame={card.frame_image!}
                />
                <CardShowcaseTradeBtn cardId={card.id!} />
              </div>

              {/* Card Showcase Info */}
              <CardShowcaseInfo card={card} />
            </div>
          </CardShowcase>
        )}

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
}
