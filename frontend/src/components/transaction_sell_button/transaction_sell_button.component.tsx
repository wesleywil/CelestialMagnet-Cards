import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { selectTransactionById } from "@/redux/transactions/transactions";

const TransactionSellButton = ({ id }: { id: number }) => {
  const router = useRouter();
  const pathName = usePathname();
  const userStatus = useSelector((state:RootState)=> state.user.status);
  const dispatch = useDispatch<AppDispatch>();

  const handlePaymentOptions = async () => {
    dispatch(selectTransactionById(id));
    router.push("/payment");
  };



  return (
    <>
      {pathName === "/mytransactions" || userStatus === "user info failed to be retrieved"? (
        <div className="w-full mb-2 h-8"></div>
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
