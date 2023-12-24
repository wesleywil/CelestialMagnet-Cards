import { Card, User, Transaction, CardType } from "./interfaces";

export function processTransaction(transaction: Transaction): {
  ownerCard: Card;
  user: User;
  cardType?: CardType;
  desiredCard?: Card;
} {
  let ownerCard: Card = {} as Card;
  let desiredCard: Card = {} as Card;
  let cardType: CardType = {} as CardType;
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

  if (typeof ownerCard.card_type !== "number") {
    cardType = ownerCard.card_type!;
  }

  return { ownerCard, user, desiredCard, cardType };
}
