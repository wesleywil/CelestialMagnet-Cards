import { Card, CardType, User } from "@/utils/interfaces";
import { FaFire } from "react-icons/fa";

const CardShowcaseInfo = ({ card }: { card: Card }) => {
  let cardtype: CardType = {} as CardType;
  let owner: User | undefined = {} as User;

  if (typeof card.card_type !== "number") {
    cardtype = card.card_type;
  }
  if (typeof card.owner !== "number") {
    owner = card.owner;
  }
  return (
    <div className="self-center text-center">
      <div className="w-[22rem] h-96 p-2 text-[#fcfcfa]">
        <h1 className="text-2xl">{card.name}</h1>
        <div className="px-4 flex gap-2 text-xs">
          <div className="self-center mb-1 text-red-500 text-xl rounded-full">
            {/* <FaFire /> */}
            <img
              src={`http://localhost:8000/${cardtype.type_image}`}
              alt="card_type"
              className="w-8 h-8 rounded-full"
            />
          </div>

          <span
            style={{ color: `${cardtype.color}` }}
            className="self-center text-xl font-semibold"
          >
            {cardtype.title}
          </span>
        </div>
        <p className="my-2 text-center">{card.description}</p>
        {card.owner ? (
          <div className="mt-8 p-2 border rounded">
            <h1>Owned by</h1>
            <h1 className="text-2xl uppercase font-semibold">
              {owner?.username}
            </h1>
            <span className="text-xs">{owner?.email}</span>
          </div>
        ) : (
          <div className="mt-8">
            <h1>Status</h1>
            <h1 className="text-2xl uppercase font-semibold">AVAILABLE</h1>
          </div>
        )}
      </div>
      <div className="h-12 my-2 flex justify-center gap-2"></div>
    </div>
  );
};

export default CardShowcaseInfo;
