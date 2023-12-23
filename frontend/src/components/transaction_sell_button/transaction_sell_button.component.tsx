import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { selectTransactionById } from "@/redux/transactions/transactions";

const TransactionSellButton = ({ id }: { id: number }) => {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const handlePaymentOptions = async () => {
    dispatch(selectTransactionById(id));
    router.push("/payment");
  };

  return (
    <>
      {pathName === "/mytransactions" ? (
        ""
      ) : (
        <button
          onClick={handlePaymentOptions}
          className="w-full py-1 bg-[#e05f5f] hover:bg-[#e6eeee] font-bold text-center uppercase transform duration-500 ease-in-out"
        >
          Buy
        </button>
      )}
    </>
  );
};

export default TransactionSellButton;
