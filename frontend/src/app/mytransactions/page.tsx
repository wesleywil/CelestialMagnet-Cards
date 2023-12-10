"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { fetchUserTransactions } from "@/redux/transactions/transactions";
import { retrieveUser } from "@/redux/user/user";

// Components
import TransactionItem from "@/components/transaction_item/transaction_item.component";
import Loading from "@/components/loading/loading.component";
import NotAuthenticated from "@/components/not_authenticated/not_authenticated.component";

export default function MyTransactions() {
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const status = useSelector((state: RootState) => state.transactions.status);
  const userStatus = useSelector((state: RootState) => state.user.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log("Transactions!, ", userStatus);
    if (status === "idle") {
      dispatch(fetchUserTransactions());
    }
    if (userStatus === "idle") {
      dispatch(retrieveUser());
    }
  }, [status]);

  if (status === "idle" || userStatus === "trying to retrieve user info") {
    return <Loading />;
  }

  if (userStatus === "user info failed to be retrieved") {
    return <NotAuthenticated />;
  } else {
    return (
      <main className="p-24 flex min-h-screen flex-col items-center text-[#fcfcfa] z-0">
        <h1 className="text-3xl font-semibold ">My Transactions</h1>
        {transactions.length ? (
          <div className="xl:w-11/12 mx-auto h-[70vh] p-2 flex justify-center gap-4 overflow-y-auto">
            {transactions.map((item) => (
              <TransactionItem key={item.id} transaction={item} />
            ))}
          </div>
        ) : (
          <div className="w-full h-[75vh] p-8 flex justify-center items-center text-4xl font-bold">
            <h1 className="self-center">NO TRANSACTIONS!</h1>
          </div>
        )}
      </main>
    );
  }
}
