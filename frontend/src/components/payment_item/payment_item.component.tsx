import { Transaction } from "@/utils/interfaces";
import { processTransaction } from "@/utils/transactionUtils";

const PaymentItem = ({ transaction }: { transaction: Transaction }) => {
  const { ownerCard, cardType, user } = processTransaction(transaction);
  return (
    <div className="w-[38rem] border-b border-[#e6eeee] flex">
      <img
        src={`http://localhost:8000/${ownerCard.base_image}`}
        alt="card"
        className="w-40 rounded"
      />
      <div className="w-full flex justify-between">
        {/* Info */}
        <div className="self-center p-4 w-full flex flex-col text-2xl">
          <h2>{ownerCard.name}</h2>
          <div className="mt-2 flex gap-2 text-base">
            <h3>
              <span className="text-gray-400">Tier:</span> {ownerCard.tier}
            </h3>
            |
            <h3>
              <span className="text-gray-400">Type:</span> {cardType!.title}
            </h3>
          </div>
          <h2 className="mt-2 text-xl">
            <span className="text-gray-400">Owner:</span> {user.username}
          </h2>
        </div>
        <div className="h-full border"></div>
        {/* Price */}
        <h1 className="self-center w-full py-2 bg-[#e6eeee] text-[#1e2027] text-4xl text-center">
          $ {transaction.price}
        </h1>
      </div>
    </div>
  );
};

export default PaymentItem;
