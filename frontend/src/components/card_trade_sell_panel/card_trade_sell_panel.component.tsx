import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { switchCardSellTrade } from "@/redux/utils/utils";
import { retrieveUser } from "@/redux/user/user";

// Components
import CardSell from "../card_sell/card_sell.component";
import CardTrade from "../card_trade/card_trade.component";

const CardTradeSellPanel = () => {
  const [trade, setTrade] = useState<boolean>(false);
  const userstatus = useSelector((state: RootState) => state.user.status);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.id === "close_panel") {
      dispatch(switchCardSellTrade());
    }
  };
  useEffect(() => {
    if (userstatus === "idle") {
      dispatch(retrieveUser());
    }
  }, []);
  return (
    <div
      id="close_panel"
      onClick={handleClick}
      className="absolute min-h-screen min-w-full flex flex-col items-center justify-center bg-[#262c35]/90 z-40"
    >
      <div className="p-2 flex gap-2 self-center justify-center text-3xl font-bold text-[#262c35] bg-[#7bc6a2]/80 rounded">
        <h1>Sell</h1>
        <input
          onChange={(e) => setTrade(e.target.checked)}
          type="checkbox"
          checked={trade}
          className="self-center toggle toggle-error"
        />
        <h1>Trade</h1>
      </div>
      {/* <CardSell /> */}
      {trade ? <CardTrade /> : <CardSell />}
    </div>
  );
};

export default CardTradeSellPanel;
