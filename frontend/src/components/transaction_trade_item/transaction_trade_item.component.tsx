import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import { Transaction } from "@/utils/interfaces";
import { processTransaction } from "@/utils/transactionUtils";
import type { AppDispatch, RootState } from "@/redux/store";
import { tradeCardTransaction } from "@/redux/transactions/transactions";

// Components
import RemoveListing from "../remove_listing/remove_listing.component";
import CardShowcaseImage from "../card_showcase_image/card_showcase_image.component";
import TransactionTradeButton from "../transaction_trade_button/transaction_trade_button.component";

const TransactionTradeItem = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const pathName = usePathname();
  const userStatus = useSelector((state:RootState)=> state.user.status);
  const dispatch = useDispatch<AppDispatch>();

  const { ownerCard, desiredCard, user } = processTransaction(transaction);

  const url = "http://localhost:8000";

  const owner_card_frame = `${url}${ownerCard.frame_image}`;
  const owner_card_img = `${url}${ownerCard.base_image}`;

  const desired_card_frame = `${url}${desiredCard!.frame_image}`;
  const desired_card_img = `${url}${desiredCard!.base_image}`;

  const handleTrade = () => {
    dispatch(tradeCardTransaction(transaction.id!));
  };
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
            <CardShowcaseImage
              cardImg={owner_card_img}
              cardFrame={owner_card_frame}
              containerWidth="w-[12rem]"
              containerHeight="h-[15rem]"
              backgroundSize="cover"
              baseHeight="h-full"
            />
          </div>
          <div className="self-center text-3xl text-[#e05f5f] font-bold">
            <FaArrowRight />
          </div>
          {/* Desired Card */}
          <div className="flex flex-col gap-2">
            <h1 className="text-center">{desiredCard!.name}</h1>
            <CardShowcaseImage
              cardImg={desired_card_img}
              cardFrame={desired_card_frame}
              containerWidth="w-[12rem]"
              containerHeight="h-[15rem]"
              backgroundSize="cover"
              baseHeight="h-full"
            />
          </div>
        </div>
        {pathName === "/mytransactions" || userStatus === "user info failed to be retrieved" ? (
          <div className="h-8"></div>
        ) : (
          <TransactionTradeButton transaction={transaction}/>
        )}
      </div>
    </div>
  );
};

export default TransactionTradeItem;
