import { useDispatch } from "react-redux";
import { FaArrowsAltH } from "react-icons/fa";
import type { AppDispatch } from "@/redux/store";
import { switchCardSellTrade } from "@/redux/utils/utils";
import { selectCardById } from "@/redux/user_cards/user_cards";

const CardShowcaseTradeBtn = ({ cardId }: { cardId: number }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSellTrade = () => {
    dispatch(switchCardSellTrade());
    dispatch(selectCardById(cardId));
  };
  return (
    <div>
      <button
        onClick={handleSellTrade}
        className="w-full p-2 flex gap-2 justify-center items-center font-bold text-[#e6eeee] bg-[#1e2027] hover:bg-[#e05f5f] border border-[#e05f5f] hover:border-[#1e2027] rounded transform duration-500 ease-in-out"
      >
        Sell <FaArrowsAltH /> Trade
      </button>
    </div>
  );
};

export default CardShowcaseTradeBtn;
