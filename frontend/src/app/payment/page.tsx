"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { processTransaction } from "@/utils/transactionUtils";

export default function Payment() {
  const transaction = useSelector(
    (state: RootState) => state.transactions.transaction
  );

  const { ownerCard, user, cardType } = processTransaction(transaction);

  return (
    <main
      className="p-2 py-24 md:p-24 flex min-h-screen flex-col items-center 
        text-[#e6eeee] z-0"
    >
      <h1 className="text-5xl font-bold">Payment Page</h1>
      <div className="md:w-3/4 xl:w-1/3 flex flex-col mt-4 p-2 border">
        <div className="p-2 border rounded flex gap-2">
          <img
            src="https://dummyimage.com/100x150"
            alt="card"
            className="rounded"
          />
          <div className="w-full p-2 flex justify-between">
            {/* Info */}
            <div className="w-full mt-2 flex flex-col text-2xl">
              <h2>{ownerCard.name}</h2>
              <div className="mt-3 flex gap-2 text-base">
                <h3>
                  <span className="text-gray-400">Tier:</span> {ownerCard.tier}
                </h3>
                |
                <h3>
                  <span className="text-gray-400">Type:</span> {cardType!.title}
                </h3>
              </div>
              <h2 className="mt-2 text-xl">
                <span className="text-gray-400">Owner:</span> {user.username}
              </h2>
            </div>
            <div className="h-full border"></div>
            {/* Price */}
            <h1 className="w-full self-center text-4xl text-center">
              $ {transaction.price}
            </h1>
          </div>
        </div>
        <button className="w-full mt-2 px-2 py-2 text-3xl font-bold hover:text-[#1e2027] bg-[#e05f5f] hover:bg-[#e6eeee] rounded transform duration-500 ease-in-out">
          Pay
        </button>
      </div>
    </main>
  );
}
