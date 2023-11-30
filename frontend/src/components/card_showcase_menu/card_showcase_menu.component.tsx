import { useDispatch } from "react-redux";
import { FaGem } from "react-icons/fa";
import type { AppDispatch } from "@/redux/store";
import { selectCard } from "@/redux/cards/cards";

const CardShowcaseMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="h-12 my-2 flex justify-center gap-2 text-3xl">
      <button
        onClick={() => dispatch(selectCard("bronze"))}
        className="p-2 flex justify-center items-center bg-amber-950 hover:bg-amber-800 rounded-full transform duration-500 ease-in-out"
      >
        <FaGem />
      </button>
      <button
        onClick={() => dispatch(selectCard("silver"))}
        className="p-2 flex justify-center items-center bg-slate-400 hover:bg-slate-200 rounded-full transform duration-500 ease-in-out"
      >
        <FaGem />
      </button>
      <button
        onClick={() => dispatch(selectCard("golden"))}
        className="p-2 flex justify-center items-center bg-amber-500 hover:bg-amber-300 rounded-full transform duration-500 ease-in-out"
      >
        <FaGem />
      </button>
      <button
        onClick={() => dispatch(selectCard("black_diamond"))}
        className="p-2 flex justify-center items-center bg-black hover:bg-slate-700 border rounded-full transform duration-500 ease-in-out"
      >
        <FaGem />
      </button>
    </div>
  );
};

export default CardShowcaseMenu;
