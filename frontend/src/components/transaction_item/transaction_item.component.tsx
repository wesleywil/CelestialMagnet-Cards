import { Transaction, TransactionType } from "@/utils/interfaces";
import TransactionSellItem from "../transaction_sell_item/transaction_sell_item.component";
import TransactionTradeItem from "../transaction_trade_item/transaction_trade_item.component";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  if (transaction.transaction_type === TransactionType.Sell) {
    return <TransactionSellItem transaction={transaction} />;
  } else {
    return <TransactionTradeItem transaction={transaction} />;
  }
};

export default TransactionItem;
