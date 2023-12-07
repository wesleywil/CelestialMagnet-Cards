import { Card, Transaction, User } from "@/utils/interfaces";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
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
  return (
    <div className="flex flex-col gap-2">
      <h1>{user.username}</h1>
      <div className="flex gap-2 justify-center">
        <h2>{ownerCard.name}</h2>
        <h2>{desiredCard.name}</h2>
      </div>
    </div>
  );
};

export default TransactionItem;
