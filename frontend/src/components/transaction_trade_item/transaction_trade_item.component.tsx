import { Card, Transaction, User } from "@/utils/interfaces";
import { processTransaction } from "@/utils/transactionUtils";
import { usePathname } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

// Components
import RemoveListing from "../remove_listing/remove_listing.component";

const TransactionTradeItem = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const pathName = usePathname();

  const { ownerCard, desiredCard, user } = processTransaction(transaction);

  const owner_card_frame = `http://localhost:8000${ownerCard.frame_image}`;
  const owner_card_img = `http://localhost:8000${ownerCard.base_image}`;

  const desired_card_frame = `http://localhost:8000${desiredCard!.frame_image}`;
  const desired_card_img = `http://localhost:8000${desiredCard!.base_image}`;
  return (
    <div
      style={
        pathName === "/mytransactions"
          ? { height: "28rem" }
          : { height: "30rem" }
      }
      className="w-[28rem] flex flex-col justify-between gap-4 text-[#1e2027]"
    >
      <h1 className="w-fit mx-auto px-2 text-3xl font-bold bg-[#e6eeee] uppercase rounded-full">
        {transaction.transaction_type}
      </h1>
      <div className="w-full h-[27rem] flex flex-col justify-between border rounded">
        {pathName === "/mytransactions" ? (
          <RemoveListing
            user={user}
            transaction_id={transaction.id!}
            message="Remove card from the trading listing?"
          />
        ) : (
          <h2 className="w-full text-2xl bg-[#e6eeee] text-center uppercase font-semibold ">
            {user.username}
          </h2>
        )}
        <div className="p-2 mb-10 flex gap-2 justify-center text-[#e6eeee]">
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
          <div className="self-center text-3xl text-[#e05f5f] font-bold">
            <FaArrowRight />
          </div>
          {/* Desired Card */}
          <div className="flex flex-col gap-2">
            <h1 className="text-center">{desiredCard!.name}</h1>
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
        {pathName === "/mytransactions" ? (
          ""
        ) : (
          <button className="w-full py-1 bg-[#e05f5f] hover:bg-[#e6eeee] font-bold uppercase transform duration-500 ease-in-out">
            Action
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionTradeItem;
