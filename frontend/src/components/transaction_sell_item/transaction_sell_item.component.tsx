import { usePathname } from "next/navigation";
import { Transaction } from "@/utils/interfaces";
import { processTransaction } from "@/utils/transactionUtils";

// Components
import RemoveListing from "../remove_listing/remove_listing.component";
import TransactionSellButton from "../transaction_sell_button/transaction_sell_button.component";
import CardShowcaseImage from "../card_showcase_image/card_showcase_image.component";

const TransactionSellItem = ({ transaction }: { transaction: Transaction }) => {
  const pathName = usePathname();

  const { ownerCard, user } = processTransaction(transaction);

  const url = "http://localhost:8000";
  const owner_card_frame = `${url}${ownerCard.frame_image}`;
  const owner_card_img = `${url}${ownerCard.base_image}`;
  return (
    <div
      style={
        pathName === "/mytransactions"
          ? { height: "28rem" }
          : { height: "30rem" }
      }
      className="w-[28rem]  flex flex-col justify-between gap-4 text-[#1e2027] overflow-hidden"
    >
      <h1 className="w-fit mx-auto px-2 text-3xl font-bold bg-[#e05f5f] uppercase rounded-full">
        {transaction.transaction_type}
      </h1>
      <div className="w-full h-[27rem] flex flex-col justify-between border rounded">
        {pathName === "/mytransactions" ? (
          <RemoveListing
            user={user}
            transaction_id={transaction.id!}
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
            <CardShowcaseImage
              cardImg={owner_card_img}
              cardFrame={owner_card_frame}
              containerWidth="w-[12rem]"
              containerHeight="h-[15rem]"
              backgroundSize="cover"
              baseHeight="h-full"
            />
            {/* Price */}
            <h1 className="text-center text-2xl text-[#e05f5f]">
              $ {transaction.price}
            </h1>
          </div>
        </div>
        <TransactionSellButton id={transaction.id!} />
      </div>
    </div>
  );
};

export default TransactionSellItem;
