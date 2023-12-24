"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import LoadStripe from "./load_stripe";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <LoadStripe>{children}</LoadStripe>
    </Provider>
  );
}
