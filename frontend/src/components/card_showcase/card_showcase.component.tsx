import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { switchCardShowcase } from "@/redux/utils/utils";
import { resetGroupCards } from "@/redux/cards/cards";

// Components
import CardShowcaseInfo from "../card_showcase_info/card_showcase_info.component";
import CardShowcaseImage from "../card_showcase_image/card_showcase_image.component";

const CardShowcase = ({ children }: { children?: React.ReactNode }) => {
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
          {/* Card Showcase Menu */}
          {children}
        </div>
        {/* Card Showcase Info */}
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
