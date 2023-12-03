import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

// Components
import CardShowcaseImage from "../card_showcase_image/card_showcase_image.component";

const CardSell = () => {
  const card = useSelector((state: RootState) => state.usercards.card);
  return (
    <div className="w-11/12 md:w-[60vw] h-[70vh] mt-8 p-2 flex flex-col gap-2 border rounded">
      <h1 className="text-3xl font-bold text-[#fcfcfa] text-center border-b">
        SELL
      </h1>
      <div className="flex gap-2 justify-center">
        <CardShowcaseImage
          card_frame={card.frame_image!}
          card_img={card.base_image}
        />
        <form className="w-[300px] h-80 p-4 flex flex-col justify-between text-3xl text-[#fcfcfa]">
          <div className="flex flex-col gap-2">
            <span className="w-full px-2 py-1 bg-[#fcfcfa] text-[#262c35] text-center rounded">
              {card.name}
            </span>
            <span className="w-full px-2 py-1 bg-[#fcfcfa] text-[#262c35] text-center rounded">
              {card.tier}
            </span>
            <input
              type="text"
              placeholder="Selling Price"
              className="w-full px-2 py-1 text-center bg-transparent outline-0 border-0 border-b-2 border-[#fcfcfa] focus:border-[#7bc6a2]"
            />
          </div>

          <div className="flex justify-center gap-2 text-xl">
            <button className="w-1/2 px-2 py-1 font-bold hover:text-[#262c35] bg-[#7bc6a2] hover:bg-[#fcfcfa] rounded transform duration-500 ease-in-out">
              Sell
            </button>
            <button className="w-1/2 px-2 py-1 font-bold hover:text-[#262c35] bg-[#7bc6a2] hover:bg-[#fcfcfa] rounded transform duration-500 ease-in-out">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardSell;
