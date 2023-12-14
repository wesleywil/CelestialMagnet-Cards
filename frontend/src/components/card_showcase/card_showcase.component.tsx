import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { switchCardShowcase } from "@/redux/utils/utils";
import { resetGroupCards } from "@/redux/cards/cards";

const CardShowcase = ({ children }: { children?: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.id === "close_panel") {
      dispatch(switchCardShowcase());
      dispatch(resetGroupCards());
    }
  };
  return (
    <div
      className="absolute min-h-screen min-w-full flex flex-col items-center backdrop-blur-sm	 z-30"
      id="close_panel"
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default CardShowcase;
