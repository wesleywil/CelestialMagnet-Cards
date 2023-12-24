import { ReactNode } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OP5M6JNB4HPvhaQK31EUoJwJ8ZGylM4pvAdFr1gCK9OsEvSF0J7TelE50asATRT6uXlP1B73ZW0rUBkvDD5GQGt00cBY49k5d"
);

export default function LoadStripe({ children }: { children: ReactNode }) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}
