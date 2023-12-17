import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { User } from "@/utils/interfaces";
import type { AppDispatch, RootState } from "@/redux/store";
import {
  deleteTransaction,
  resetStatus,
} from "@/redux/transactions/transactions";

type RemoveListingProps = {
  user: User;
  transaction_id: number;
  message: string;
};

const RemoveListing = ({ ...removeProps }: RemoveListingProps) => {
  const [hideMessage, setHideMessage] = useState(true);
  const status = useSelector((state: RootState) => state.transactions.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status === "transaction deleted successfully") {
      dispatch(resetStatus());
    }
  }, [status]);
  return (
    <div className="flex flex-col bg-[#e6eeee]">
      <div className="w-full flex justify-between text-center uppercase font-semibold border-b-2 border-[#e05f5f]">
        <h2 className="px-2 text-2xl">{removeProps.user.username}</h2>
        <button
          onClick={() => setHideMessage(!hideMessage)}
          className="px-2 py-1 text-xl hover:text-[#e05f5f]"
        >
          <FaTrashAlt />
        </button>
      </div>
      {/* Delete Message */}
      <div
        style={hideMessage ? { height: "0rem" } : { height: "4rem" }}
        className="flex flex-col overflow-hidden transform duration-500 ease-in-out"
      >
        <h1 className="px-2 text-center text-xl">{removeProps.message}</h1>
        <div className=" flex gap-2 justify-center">
          <button
            onClick={() =>
              dispatch(deleteTransaction(removeProps.transaction_id))
            }
            className="px-1 font-semibold hover:text-[#e6eeee] bg-[#e05f5f] hover:bg-[#1e2027] rounded transform duration-500 ease-in-out"
          >
            Yes
          </button>{" "}
          |{" "}
          <button className="px-1 font-semibold hover:text-[#e6eeee] bg-[#e05f5f] hover:bg-[#1e2027] rounded transform duration-500 ease-in-out">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveListing;
