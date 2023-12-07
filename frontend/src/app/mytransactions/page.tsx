"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { fetchTransactions } from "@/redux/transactions/transactions";

// Components
import TransactionItem from "@/components/transaction_item/transaction_item.component";

export default function MyTransactions() {
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const status = useSelector((state: RootState) => state.transactions.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log("Transactions!, ", status);
    if (status === "idle") {
      dispatch(fetchTransactions());
    }
  }, [status]);

  return (
    <main className="p-24 flex min-h-screen flex-col items-center text-[#fcfcfa] z-0">
      <h1 className="text-3xl font-semibold ">My Transactions</h1>
      <div className="xl:w-11/12 mx-auto h-[70vh] p-2 grid md:grid-cols-3 xl:grid-cols-6 gap-4 overflow-y-auto">
        {transactions.length
          ? transactions.map((item) => (
              <TransactionItem key={item.id} transaction={item} />
            ))
          : ""}
      </div>
    </main>
  );
}
