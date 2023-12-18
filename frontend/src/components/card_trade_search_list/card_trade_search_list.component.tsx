import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import type { AppDispatch, RootState } from "@/redux/store";
import { selectCardById } from "@/redux/cards/cards";

const CardTradeSearchList = () => {
  const cards = useSelector((state: RootState) => state.cards.filteredByName);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="w-72 h-[22.5rem] mt-2 flex flex-col items-center text-center text-[#e6eeee] border">
      <h1 className="w-full mb-2 text-xl border-b">Cards</h1>

      {cards.length ? (
        <div className="w-72 flex flex-col gap-2 text-sm">
          {cards.map((item) => (
            <div
              key={item.id!}
              className="w-full flex justify-between  bg-[#1e2027] border"
            >
              <h1 className="py-1 px-2">
                {item.name} - {item.tier}
              </h1>
              <button
                onClick={() => dispatch(selectCardById(item.id!))}
                className="px-2 text-[#1e2027] bg-[#e6eeee] hover:bg-[#e05f5f] transform duration-500 ease-in-out"
              >
                <FaPlus />
              </button>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CardTradeSearchList;
