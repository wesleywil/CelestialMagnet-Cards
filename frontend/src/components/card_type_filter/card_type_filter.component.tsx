import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { filterByCardType, resetFilter } from "@/redux/cards/cards";

const CardTypeFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="xl:w-11/12 mt-12 mb-1 py-1 flex gap-2 text-xl">
      <button
        onClick={() => dispatch(resetFilter())}
        className="w-12 px-2 py-1 font-bold text-[#e6eeee] hover:text-[#1e2027] hover:bg-[#e6eeee] border border-[#e6eeee] hover:border-[#1e2027] rounded transform duration-500 ease-in-out"
      >
        All
      </button>
      <button
        onClick={() => dispatch(filterByCardType("Fire"))}
        style={{
          backgroundImage: "url(/fire_crystal.jpg)",
          backgroundSize: "cover",
        }}
        className="w-12 flex items-center font-bold bg-red-200 hover:bg-red-500  rounded "
      >
        <span className="w-full bg-[#1e2027]/60 hover:bg-[#1e2027] backdrop-blur-sm transform duration-500 ease-in-out">
          Fire
        </span>
      </button>
      <button
        onClick={() => dispatch(filterByCardType("Air"))}
        style={{
          backgroundImage: "url(/air_crystal.jpg)",
          backgroundSize: "cover",
        }}
        className="w-12 flex items-center font-bold bg-green-200 hover:bg-green-500  rounded"
      >
        <span className="w-full bg-[#1e2027]/60 hover:bg-[#1e2027] backdrop-blur-sm transform duration-500 ease-in-out">
          Air
        </span>
      </button>
      <button
        onClick={() => dispatch(filterByCardType("Earth"))}
        style={{
          backgroundImage: "url(/earth_crystal.jpg)",
          backgroundSize: "cover",
        }}
        className="w-12 flex items-center font-bold bg-amber-200 hover:bg-amber-500  rounded"
      >
        <span className="w-full bg-[#1e2027]/60 hover:bg-[#1e2027]  backdrop-blur-sm transform duration-500 ease-in-out">
          Earth
        </span>
      </button>
      <button
        onClick={() => dispatch(filterByCardType("Water"))}
        style={{
          backgroundImage: "url(/water_crystal.jpg)",
          backgroundSize: "cover",
        }}
        className="w-12 flex items-center font-bold bg-cyan-200 hover:bg-cyan-500  rounded"
      >
        <span className="w-full bg-[#1e2027]/60 hover:bg-[#1e2027] backdrop-blur-sm transform duration-500 ease-in-out">
          Water
        </span>
      </button>
    </div>
  );
};

export default CardTypeFilter;
