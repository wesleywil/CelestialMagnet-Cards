import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { User } from "@/utils/interfaces";

const RemoveListing = ({ user, message }: { user: User; message: string }) => {
  const [hideMessage, setHideMessage] = useState(true);
  return (
    <div className="flex flex-col bg-[#fcfcfa]">
      <div className="w-full flex justify-between text-center uppercase font-semibold border-b-2 border-[#7bc6a2]">
        <h2 className="px-2 text-2xl">{user.username}</h2>
        <button
          onClick={() => setHideMessage(!hideMessage)}
          className="px-2 py-1 text-xl hover:text-[#7bc6a2]"
        >
          <FaTrashAlt />
        </button>
      </div>
      {/* Delete Message */}
      <div
        style={hideMessage ? { height: "0rem" } : { height: "4rem" }}
        className="flex flex-col overflow-hidden transform duration-500 ease-in-out"
      >
        <h1 className="px-2 text-center text-xl">{message}</h1>
        <div className=" flex gap-2 justify-center">
          <button className="px-1 font-semibold hover:text-[#fcfcfa] bg-[#7bc6a2] hover:bg-[#262c35] rounded transform duration-500 ease-in-out">
            Yes
          </button>{" "}
          |{" "}
          <button className="px-1 font-semibold hover:text-[#fcfcfa] bg-[#7bc6a2] hover:bg-[#262c35] rounded transform duration-500 ease-in-out">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveListing;
