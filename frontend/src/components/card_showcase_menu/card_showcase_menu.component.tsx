import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { selectCard } from "@/redux/cards/cards";

const CardShowcaseMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="h-10 flex justify-center gap-2 text-xs font-bold">
      <button
        onClick={() => dispatch(selectCard("bronze"))}
        className="px-2 flex justify-center items-center text-white bg-amber-950 hover:bg-amber-800 rounded transform duration-500 ease-in-out"
      >
        Bronze
      </button>
      <button
        onClick={() => dispatch(selectCard("silver"))}
        className="px-2 flex justify-center items-center text-white hover:text-slate-800 bg-slate-400 hover:bg-slate-200 rounded transform duration-500 ease-in-out"
      >
        Silver
      </button>
      <button
        onClick={() => dispatch(selectCard("golden"))}
        className="px-2 flex justify-center items-center text-white hover:text-amber-800 bg-amber-500 hover:bg-amber-300 rounded transform duration-500 ease-in-out"
      >
        Golden
      </button>
      <button
        onClick={() => dispatch(selectCard("black_diamond"))}
        className="px-2 flex justify-center items-center text-white bg-black hover:bg-slate-700 border rounded transform duration-500 ease-in-out"
      >
        Diamond
      </button>
    </div>
  );
};

export default CardShowcaseMenu;
