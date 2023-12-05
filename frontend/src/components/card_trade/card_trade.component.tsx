import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchCardsByName } from "@/redux/cards/cards";

// Components
import CardShowcaseImage from "../card_showcase_image/card_showcase_image.component";
import CardTradeSearchList from "../card_trade_search_list/card_trade_search_list.component";

const CardTrade = () => {
  const [search, setSearch] = useState("");
  const card = useSelector((state: RootState) => state.usercards.card);
  const dispatch = useDispatch<AppDispatch>();

  const handleSearchCard = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("SEARCH CARD=> ", search);
    dispatch(fetchCardsByName(search));
  };
  return (
    <div className="w-11/12 md:w-[60vw] h-[70vh] mt-8 p-2 flex flex-col justify-between gap-2 text-[#7bc6a2] border rounded">
      <h1 className="text-3xl font-bold text-[#fcfcfa] text-center border-b">
        TRADE
      </h1>
      <div className="flex gap-2 justify-center">
        <div className="self-center mt-[42px] flex flex-col gap-2">
          {/* <img src="http://dummyimage.com/300x400" alt="offered trade card" /> */}
          <CardShowcaseImage
            card_frame={card.frame_image!}
            card_img={card.base_image}
          />
          <h2 className="text-2xl font-bold text-center">
            {card.name} - {card.tier}
          </h2>
        </div>
        <div className="self-center text-3xl font-bold">
          <FaArrowRight />
        </div>
        <div className="flex gap-2 text-xl">
          {/* Search + Card Request */}
          <div className="flex flex-col">
            <div className="flex gap-2">
              {/* Search */}
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Card"
                className="w-full px-2 py-1 text-center text-[#fcfcfa] bg-transparent outline-0 border-0 border-b-2 border-[#fcfcfa] focus:border-[#7bc6a2]"
              />
              <button onClick={handleSearchCard} className="-ml-8">
                <FaSearch />
              </button>
            </div>
            {/* Card Request */}
            {search.length ? (
              <CardTradeSearchList />
            ) : (
              <>
                <img
                  src="http://dummyimage.com/300x400"
                  alt="desired trade card"
                  className="w-72 h-96"
                />
                <h2 className="text-2xl font-bold text-center">
                  Card Name - Tier
                </h2>
              </>
            )}
          </div>
          {/* Search Card List */}
        </div>
      </div>
      {/* Action */}
      <button className="px-2 py-1 font-bold text-3xl text-[#262c35] bg-[#7bc6a2] hover:bg-[#fcfcfa] rounded transform duration-700 ease-in-out">
        Create Trade Offer
      </button>
    </div>
  );
};

export default CardTrade;