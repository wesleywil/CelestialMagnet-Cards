import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  createTransaction,
  resetStatus,
} from "@/redux/transactions/transactions";
import { Transaction, TransactionType } from "@/utils/interfaces";
import { switchCardSellTrade } from "@/redux/utils/utils";

// Components
import CardShowcaseImage from "../card_showcase_image/card_showcase_image.component";

const CardSell = () => {
  const [message, setMessage] = useState("");
  const card = useSelector(
    (state: RootState) => state.usercards.userSelectedCard
  );
  const user = useSelector((state: RootState) => state.user.user);
  const status = useSelector((state: RootState) => state.transactions.status);
  const dispatch = useDispatch<AppDispatch>();

  const handleSellRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const data: Transaction = {
      user: user.id!,
      owner_card: card.id!,
      transaction_type: TransactionType.Sell,
    };
    dispatch(createTransaction(data));
  };

  useEffect(() => {
    if (status === "creating transaction") {
      setMessage("loading...");
    } else if (status === "transaction created successfully") {
      setMessage("DONE");
      dispatch(resetStatus());
      dispatch(switchCardSellTrade());
    }
  }, [status]);
  return (
    <div className="xl:w-1/2 md:w-3/4 h-[42rem] mt-8  flex border border-[#e05f5f] rounded-xl overflow-hidden">
      <div className="hidden w-1/2 md:w-full xl:w-1/2 p-4 md:flex flex-col items-center justify-center bg-[#e05f5f]">
        <h1 className="text-4xl text-[#1e2027] font-bold text-center">
          List Your Card To Sell
        </h1>
      </div>
      <div className="w-full xl:w-1/2 h-[60vh] p-2 flex flex-col justify-between text-center text-[#e6eeee]">
        <div className="w-full pb-1 flex flex-col gap-2 border-b border-[#e05f5f]">
          <h1 className="text-4xl  font-bold">Selling</h1>
          <span className="text-sm font-light text-gray-300">
            You're listing your card to be bought by another user!
          </span>
        </div>

        <div className="py-4 flex flex-col items-center">
          <h2 className="mb-1 text-xl font-bold">{card.name}</h2>
          <CardShowcaseImage
            card_frame={card.frame_image!}
            card_img={card.base_image}
          />
        </div>
        <form onSubmit={handleSellRequest} className="flex flex-col gap-2">
          <span className="text-3xl">Price</span>
          <input
            type="text"
            required
            placeholder="Desired Price - ex: $00.00"
            className="px-2 py-1 bg-[#e6eeee] text-[#1e2027] text-xl text-center font-semibold outline-0 rounded"
          />
          <button
            type="submit"
            disabled={message === "" ? false : true}
            className="px-2 py-1 text-xl font-bold text-[#1e2027] disabled:bg-gray-600 bg-[#e05f5f] enabled:hover:bg-[#e6eeee] rounded transform duration-700 ease-in-out"
          >
            {message === ""
              ? "SELL"
              : message === "loading"
              ? "LOADING"
              : message}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CardSell;
