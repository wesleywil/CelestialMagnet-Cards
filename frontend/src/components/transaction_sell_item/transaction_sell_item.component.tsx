import { usePathname } from "next/navigation";
import { Card, Transaction, User } from "@/utils/interfaces";

// Components
import RemoveListing from "../remove_listing/remove_listing.component";

const TransactionSellItem = ({ transaction }: { transaction: Transaction }) => {
  const pathName = usePathname();

  let ownerCard: Card = {} as Card;

  let user: User = {} as User;

  if (typeof transaction.owner_card !== "number") {
    ownerCard = transaction.owner_card;
  }
  if (typeof transaction.user !== "number") {
    user = transaction.user!;
  }

  const owner_card_frame = `http://localhost:8000${ownerCard.frame_image}`;
  const owner_card_img = `http://localhost:8000${ownerCard.base_image}`;
  return (
    <div className="w-[28rem] h-[27rem] flex flex-col justify-between gap-4 text-[#1e2027] ">
      <h1 className="w-fit mx-auto px-2 text-3xl font-bold bg-[#e05f5f] uppercase rounded-full">
        {transaction.transaction_type}
      </h1>
      <div className="w-full h-[27rem] flex flex-col justify-between border rounded">
        {pathName === "/mytransactions" ? (
          <RemoveListing
            user={user}
            message="Remove card from the selling listing?"
          />
        ) : (
          <h2 className="w-full text-2xl bg-[#e6eeee] text-center uppercase font-semibold ">
            {user.username}
          </h2>
        )}

        <div className="mt-2 py-2 flex justify-center text-[#e6eeee] text-xl ">
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
        </div>
        <button className="w-full py-1 bg-[#e05f5f] hover:bg-[#e6eeee] font-bold uppercase transform duration-500 ease-in-out">
          Action
        </button>
      </div>
    </div>
  );
};

export default TransactionSellItem;
