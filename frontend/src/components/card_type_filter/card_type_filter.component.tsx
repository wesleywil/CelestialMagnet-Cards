import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { filterByCardType, resetFilter } from "@/redux/cards/cards";
import CardTypeButton from "../card_type_button/card_type_button.component";

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
      <CardTypeButton
        typeName="Fire"
        backgroundImage="/fire_crystal.jpg"
        action={() => dispatch(filterByCardType("Fire"))}
      />
      <CardTypeButton
        typeName="Air"
        backgroundImage="/air_crystal.jpg"
        action={() => dispatch(filterByCardType("Air"))}
      />
      <CardTypeButton
        typeName="Earth"
        backgroundImage="/earth_crystal.jpg"
        action={() => dispatch(filterByCardType("Earth"))}
      />
      <CardTypeButton
        typeName="Water"
        backgroundImage="/water_crystal.jpg"
        action={() => dispatch(filterByCardType("Water"))}
      />
    </div>
  );
};

export default CardTypeFilter;
