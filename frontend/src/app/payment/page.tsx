"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type { AppDispatch, RootState } from "@/redux/store";

// Components
import PaymentItem from "@/components/payment_item/payment_item.component";
import { sellCardTransaction } from "@/redux/transactions/transactions";
import Link from "next/link";

export default function Payment() {
  const transaction = useSelector(
    (state: RootState) => state.transactions.transaction
  );
  const dispatch = useDispatch<AppDispatch>();

  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (event: React.FormEvent<HTMLButtonElement>) => {
    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      return;
    }

    const { error, token } = await stripe.createToken(cardNumberElement);

    if (error) {
      console.log("Error => ", error);
    } else {
      console.log("Token => ", token);
      const data = {
        transaction_id: transaction.id!,
        token: token.id,
      };
      dispatch(sellCardTransaction(data));
    }
  };

  const cardStyle = {
    style: {
      base: {
        fontSize: "24px",
      },
    },
  };
  return (
    <main
      className="p-2 py-24 md:p-24 flex min-h-screen flex-col items-center 
        text-[#e6eeee] z-0"
    >
      <h1 className="text-5xl font-bold">Payment Page</h1>
      {Object.keys(transaction).length ? (
        <div className="w-fit flex flex-col mt-4 p-2 border rounded">
          <PaymentItem transaction={transaction} />
          <div className="mt-4 p-2 flex flex-col border rounded">
            <h1>Credit Card Payment</h1>
            <div className="w-full mt-2 flex gap-2 text-xl">
              <CardNumberElement
                options={cardStyle}
                className="basis-1/2 py-1 px-2 bg-[#e6eeee] font-semibold border border-black rounded"
              />
              <CardExpiryElement
                options={cardStyle}
                className="basis-1/4 py-1 px-2 bg-[#e6eeee] font-semibold border border-black rounded"
              />
              <CardCvcElement
                options={cardStyle}
                className="basis-1/5 py-1 px-2 bg-[#e6eeee] font-semibold border border-black rounded"
              />
            </div>
            {/* <CardElement id="card-element" options={cardStyle} /> */}
            <div className="mt-2 text-xl text-[#e6eeee] flex flex-col md:flex-row md:flex-wrap md:gap-4 md:justify-center items-center">
              <h1 className="w-full text-center mb-2 md:mb-0 border-b">
                Test Card Info
              </h1>
              <h1>4242 4242 4242 4242</h1>
              <h1>12/34</h1>
              <h1>123</h1>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={!stripe}
            className="w-full mt-2 px-2 py-2 text-3xl font-bold hover:text-[#1e2027] bg-[#e05f5f] disabled:bg-gray-400 hover:bg-[#e6eeee] rounded transform duration-500 ease-in-out"
          >
            Pay
          </button>
        </div>
      ) : (
        <div className="xl:w-1/2 md:w-3/4 h-96 mt-12 p-4 flex flex-col items-center justify-center border rounded">
          <h1 className="my-8 text-4xl font-bold">NO ITEMS SELECTED</h1>
          <Link
            href="/transactions"
            className="px-2 py-1 bg-[#e6eeee] hover:bg-[#e05f5f] text-[#1e2027] hover:text-[#e6eeee] text-3xl rounded transform duration-500 ease-in-out"
          >
            Transactions
          </Link>
        </div>
      )}
    </main>
  );
}
