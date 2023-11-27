import { useDispatch, useSelector } from "react-redux";
import { FaGem } from "react-icons/fa";
import type { AppDispatch, RootState } from "@/redux/store";
import { switchCardShowcase } from "@/redux/utils/utils";
import { resetGroupCards, selectCard } from "@/redux/cards/cards";

// Components
import CardShowcaseInfo from "../card_showcase_info/card_showcase_info.component";
import CardShowcaseImage from "../card_showcase_image/card_showcase_image.component";

const CardShowcase = () => {
  const groupCards = useSelector((state: RootState) => state.cards.group_cards);
  const card = useSelector((state: RootState) => state.cards.card);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.id === "close_panel") {
      dispatch(switchCardShowcase());
      dispatch(resetGroupCards());
    }
  };
  return (
    <div
      className="absolute min-h-screen min-w-full flex flex-col items-center bg-[#262c35]/70 z-30"
      id="close_panel"
      onClick={handleClick}
    >
      <div className="md:w-[70vw] xl:w-[40vw] h-[60vh] mt-36 p-4 flex xl:justify-center bg-black/80 rounded">
        {/* Card Image and Tier Switch Buttons */}
        <div className="self-center ">
          {Object.keys(card).length === 0 ? (
            <CardShowcaseImage
              card_img={groupCards[0].base_image}
              card_frame={groupCards[0].frame_image!}
            />
          ) : (
            <CardShowcaseImage
              card_img={card.base_image}
              card_frame={card.frame_image!}
            />
          )}
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
        </div>
        {/* Card Info */}
        {Object.keys(card).length === 0 ? (
          <CardShowcaseInfo card={groupCards[0]} />
        ) : (
          <CardShowcaseInfo card={card} />
        )}
      </div>
    </div>
  );
};

export default CardShowcase;
