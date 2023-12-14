import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import type { AppDispatch, RootState } from "@/redux/store";
import { resetCard } from "@/redux/cards/cards";

// Components
import CardShowcaseImage from "../card_showcase_image/card_showcase_image.component";
import CardTradeSearchList from "../card_trade_search_list/card_trade_search_list.component";

const CardTradeRequest = () => {
  const card_selected = useSelector(
    (state: RootState) => state.cards.selectedCard
  );
  const dispatch = useDispatch<AppDispatch>();
  if (Object.keys(card_selected).length !== 0) {
    return (
      <>
        <div className="w-full py-1 px-1 flex justify-end text-base">
          <button
            onClick={() => dispatch(resetCard())}
            className="p-1 hover:text-[#1e2027] bg-[#e6eeee] hover:bg-[#e05f5f] rounded-full transform duration-500 ease-in-out"
          >
            <FaTimes />
          </button>
        </div>
        <CardShowcaseImage
          card_frame={card_selected.frame_image!}
          card_img={card_selected.base_image}
        />
        <h2 className="text-2xl font-bold text-center">
          {card_selected.name} - {card_selected.tier}
        </h2>
      </>
    );
  } else {
    return <CardTradeSearchList />;
  }
};

export default CardTradeRequest;
