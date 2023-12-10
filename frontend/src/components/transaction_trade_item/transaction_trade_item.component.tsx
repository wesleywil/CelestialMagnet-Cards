import { Card, Transaction, User } from "@/utils/interfaces";
import { FaArrowRight } from "react-icons/fa";

const TransactionTradeItem = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  let ownerCard: Card = {} as Card;
  let desiredCard: Card = {} as Card;
  let user: User = {} as User;

  if (typeof transaction.owner_card !== "number") {
    ownerCard = transaction.owner_card;
  }
  if (typeof transaction.desired_card !== "number") {
    desiredCard = transaction.desired_card!;
  }
  if (typeof transaction.user !== "number") {
    user = transaction.user!;
  }

  const owner_card_frame = `http://localhost:8000${ownerCard.frame_image}`;
  const owner_card_img = `http://localhost:8000${ownerCard.base_image}`;

  const desired_card_frame = `http://localhost:8000${desiredCard.frame_image}`;
  const desired_card_img = `http://localhost:8000${desiredCard.base_image}`;
  return (
    <div className="w-[28rem] h-[27rem] flex flex-col justify-between gap-4 text-[#262c35]">
      <h1 className="w-fit mx-auto px-2 text-3xl font-bold bg-[#fcfcfa] uppercase rounded-full">
        {transaction.transaction_type}
      </h1>
      <div className="w-full h-[27rem] flex flex-col justify-between border rounded">
        <h2 className="w-full text-2xl bg-[#fcfcfa] text-center uppercase font-semibold ">
          {user.username}
        </h2>
        <div className="p-2 flex gap-2 justify-center text-[#fcfcfa]">
          {/* Owner Card */}
          <div className="flex flex-col gap-2">
            <h1 className="text-center">{ownerCard.name}</h1>
            <div className="relative w-[12rem] h-[15rem] overflow-hidden border">
              {/* Frame */}
              <div
                style={{
                  backgroundImage: `url(${owner_card_frame})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-full h-full absolute top-0 left-0 z-10"
              ></div>
              {/* Base Image */}
              <div
                style={{
                  backgroundImage: `url(${owner_card_img})`,
                  backgroundSize: "cover",
                }}
                className="w-full h-full absolute top-0 left-0 z-0"
              ></div>
            </div>
          </div>
          <div className="self-center text-3xl text-[#7bc6a2] font-bold">
            <FaArrowRight />
          </div>
          {/* Desired Card */}
          <div className="flex flex-col gap-2">
            <h1 className="text-center">{desiredCard.name}</h1>
            <div className="relative w-[12rem] h-[15rem] overflow-hidden border">
              {/* Frame */}
              <div
                style={{
                  backgroundImage: `url(${desired_card_frame})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-full h-full absolute top-0 left-0 z-10"
              ></div>
              {/* Base Image */}
              <div
                style={{
                  backgroundImage: `url(${desired_card_img})`,
                  backgroundSize: "cover",
                }}
                className="w-full h-full absolute top-0 left-0 z-0"
              ></div>
            </div>
          </div>
        </div>
        <button className="w-full py-1 bg-[#7bc6a2] hover:bg-[#fcfcfa] font-bold uppercase transform duration-500 ease-in-out">
          Action
        </button>
      </div>
    </div>
  );
};

export default TransactionTradeItem;
