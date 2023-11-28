import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { filterByCardType, resetFilter } from "@/redux/cards/cards";

const CardTypeFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="xl:w-11/12 mt-12 flex gap-2">
      <button
        onClick={() => dispatch(resetFilter())}
        className="px-2 py-1 font-bold text-[#fcfcfa] hover:text-[#7bc6a2] border border-[#fcfcfa] hover:border-[#7bc6a2] rounded transform duration-500 ease-in-out"
      >
        All
      </button>
      <button
        onClick={() => dispatch(filterByCardType("Fire"))}
        className="px-2 py-1 font-bold text-black bg-red-200 hover:bg-red-500 rounded transform duration-500 ease-in-out"
      >
        Fire
      </button>
      <button
        onClick={() => dispatch(filterByCardType("Air"))}
        className="px-2 py-1 font-bold text-black bg-green-200 hover:bg-green-500 rounded transform duration-500 ease-in-out"
      >
        Air
      </button>
      <button
        onClick={() => dispatch(filterByCardType("Earth"))}
        className="px-2 py-1 font-bold text-black bg-amber-200 hover:bg-amber-500 rounded transform duration-500 ease-in-out"
      >
        Earth
      </button>
      <button
        onClick={() => dispatch(filterByCardType("Water"))}
        className="px-2 py-1 font-bold text-black bg-cyan-200 hover:bg-cyan-500 rounded transform duration-500 ease-in-out"
      >
        Water
      </button>
    </div>
  );
};

export default CardTypeFilter;
