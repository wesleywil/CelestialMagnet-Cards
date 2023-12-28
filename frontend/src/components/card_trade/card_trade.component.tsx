import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import type { AppDispatch, RootState } from "@/redux/store";
import { fetchCardsByName } from "@/redux/cards/cards";
import { createTransaction } from "@/redux/transactions/transactions";
import { Transaction, TransactionType } from "@/utils/interfaces";

// Components
import CardShowcaseImage from "../card_showcase_image/card_showcase_image.component";
import CardTradeRequest from "../card_trade_request/card_trade_request.component";

const CardTrade = () => {
  const [search, setSearch] = useState("");
  const card = useSelector(
    (state: RootState) => state.usercards.userSelectedCard
  );
  const card_selected = useSelector(
    (state: RootState) => state.cards.selectedCard
  );
  const user = useSelector((state: RootState) => state.user.user);
  const statusTransaction = useSelector(
    (state: RootState) => state.transactions.status
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSearchCard = () => {
    dispatch(fetchCardsByName(search));
  };

  const handleTradeRequest = () => {
    const data: Transaction = {
      user: user.id!,
      owner_card: card.id!,
      desired_card: card_selected.id!,
      transaction_type: TransactionType.Trade,
    };
    dispatch(createTransaction(data));
  };

  useEffect(() => {
    console.log("Transaction Status ==> ", statusTransaction);
  }, [statusTransaction]);
  return (
    <div className="xl:w-1/2  md:w-3/4 h-[42rem] mt-8 p-2 flex flex-col justify-between gap-2 text-[#e05f5f] border border-[#e05f5f] rounded-xl">
      <h1 className="text-4xl font-bold text-[#e6eeee] text-center border-b border-[#e05f5f]">
        TRADE
      </h1>
      <div className="flex gap-2 justify-center">
        <div className="self-center mt-[42px] flex flex-col gap-2">
          <CardShowcaseImage
            cardFrame={card.frame_image!}
            cardImg={card.base_image}
            containerWidth="w-72"
            containerHeight="w-96"
            backgroundSize="contain"
            baseHeight="w-[22rem]"
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
                className="w-full px-2 py-1 text-center text-[#e6eeee] bg-transparent outline-0 border-0 border-b-2 border-[#e6eeee] focus:border-[#e05f5f]"
              />
              <button onClick={handleSearchCard} className="-ml-8">
                <FaSearch />
              </button>
            </div>
            {/* Card Request */}
            <CardTradeRequest />
          </div>
          {/* Search Card List */}
        </div>
      </div>
      {/* Action */}
      <button
        onClick={handleTradeRequest}
        className="px-2 py-1 font-bold text-3xl text-[#1e2027] bg-[#e05f5f] hover:bg-[#e6eeee] rounded transform duration-700 ease-in-out"
      >
        Create Trade Offer
      </button>
    </div>
  );
};

export default CardTrade;
