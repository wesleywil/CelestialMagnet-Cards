import { useDispatch } from "react-redux";
import { FaArrowsAltH } from "react-icons/fa";
import type { AppDispatch } from "@/redux/store";
import { switchCardSellTrade } from "@/redux/utils/utils";

const CardShowcaseTradeBtn = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <button
        onClick={() => dispatch(switchCardSellTrade())}
        className="w-full p-2 flex gap-2 justify-center items-center font-bold text-[#262c35] bg-[#fcfcfa] hover:bg-[#7bc6a2] rounded transform duration-500 ease-in-out"
      >
        Sell <FaArrowsAltH /> Trade
      </button>
    </div>
  );
};

export default CardShowcaseTradeBtn;
