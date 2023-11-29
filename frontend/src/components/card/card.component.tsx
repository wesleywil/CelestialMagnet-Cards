import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { switchCardShowcase } from "@/redux/utils/utils";
import { selectGroupCards } from "@/redux/cards/cards";
import { Card, User } from "@/utils/interfaces";

const Card = ({ card }: { card: Card }) => {
  let owner: User | undefined = {} as User;

  const dispatch = useDispatch<AppDispatch>();

  const handleCardShowcase = () => {
    dispatch(selectGroupCards(card.name));
    dispatch(switchCardShowcase());
  };

  if (typeof card.owner !== "number") {
    owner = card.owner;
  }
  return (
    <div onClick={handleCardShowcase}>
      <h2 className="mr-10 text-base text-center uppercase">{card.name}</h2>
      <div className="relative w-52 h-64 mt-2 hover:mt-0  overflow-hidden transform duration-700 ease-in-out card_shadow">
        {/* Frame Image */}
        <div
          style={{
            backgroundImage: `url(${card.frame_image})`,
            backgroundSize: "cover",
          }}
          className="w-full h-full absolute top-0 left-0 z-10"
        ></div>
        {/* Base Image */}
        <div
          style={{
            backgroundImage: `url(${card.base_image})`,
            backgroundSize: "cover",
          }}
          className="w-full h-full absolute top-0 left-0 z-0"
        ></div>
      </div>

      <h3 className="text-xs text-[#7bc6a2]">
        {card.owner ? `Owned by: ${owner?.username}` : "No ownership"}
      </h3>
    </div>
  );
};

export default Card;
