import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { tradeCardTransaction } from "@/redux/transactions/transactions";
import { Transaction } from "@/utils/interfaces";

const TransactionTradeButton = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const [hideConfirmation, setHideConfirmation] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const status = useSelector((state: RootState) => state.transactions.status);
  const dispatch = useDispatch<AppDispatch>();
  const handleTrade = () => {
    dispatch(tradeCardTransaction(transaction.id!));
  };

  useEffect(() => {
    console.log("THE STATUS IS => ", status);
    if (status === "trying to trade card") {
      setLoading(true);
    } else if (status === "card was traded successfully") {
      setLoading(false);
    } else {
      setLoading(false);
      setMessage("Failed");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [status]);
  return (
    <div className="flex flex-col">
      {hideConfirmation ? (
        <button
          onClick={() => setHideConfirmation(false)}
          className="w-full py-1 bg-[#e05f5f] hover:bg-[#e6eeee] font-bold uppercase transform duration-500 ease-in-out"
        >
          Trade
        </button>
      ) : (
        <div className="w-full flex flex-col items-center bg-[#e05f5f] text-2xl transform duration-500 ease-in-out">
          <h1 className="text-white">Are you relly making this trade?</h1>
          <div className="flex justify-center gap-2">
            {loading ? (
              <h1>Loading</h1>
            ) : (
              <>
                {message.length ? (
                  <h1>{message}</h1>
                ) : (
                  <>
                    <button
                      disabled={loading}
                      onClick={handleTrade}
                      className="px-2 bg-[#1e2027] hover:bg-[#e6eeee] text-[#e6eeee] hover:text-[#1e2027] rounded transform duration-500 ease-in-out"
                    >
                      YES
                    </button>
                    |{" "}
                    <button
                      onClick={() => setHideConfirmation(true)}
                      className="px-2 bg-[#1e2027] hover:bg-[#e6eeee] text-[#e6eeee] hover:text-[#1e2027] rounded transform duration-500 ease-in-out"
                    >
                      NO
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTradeButton;
