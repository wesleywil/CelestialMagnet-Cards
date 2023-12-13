"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { FaBars, FaHome } from "react-icons/fa";
import type { AppDispatch, RootState } from "@/redux/store";
import { signOut } from "@/redux/user/user";

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userStatus = useSelector((state: RootState) => state.user.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {}, [userStatus]);

  return (
    <div className="absolute w-full flex flex-col justify-center z-50">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="self-center my-2 text-[#7bc6a2] hover:text-[#fcfcfa] text-3xl transform duration-500 ease-in-out"
      >
        <FaBars />
      </button>
      <div
        style={
          showMenu
            ? { height: "27rem", border: "1px solid #7bc6a2" }
            : { height: "0" }
        }
        className="xl:w-1/4 md:w-1/3 mx-auto flex flex-col items-center gap-2 bg-[#262c35] rounded overflow-hidden shadow-sm transform duration-700 ease-in-out"
      >
        <Link
          href="/"
          className="mt-8 p-2 relative flex items-center justify-center border border-[#fcfcfa] hover:border-[#7bc6a2] rounded-full shadow-xl transform duration-500 ease-in-out"
        >
          <h1 className="text-5xl text-[#fcfcfa] hover:text-[#7bc6a2] transform duration-500 ease-in-out">
            <FaHome />
          </h1>
        </Link>
        <div className="w-full flex flex-col items-center gap-2 font-bold text-[#7bc6a2]  text-2xl">
          <Link
            href="/cards"
            className="px-2 py-1 hover:text-[#fcfcfa] transform duration-500 ease-in"
          >
            Cards
          </Link>
          <Link
            href="/transactions"
            className="px-2 py-1 text-2xl hover:text-[#fcfcfa] transform duration-500 ease-in"
          >
            Transactions
          </Link>
        </div>
        {userStatus === "user info failed to be retrieved" ? (
          <div className="w-full h-full border mt-4 pt-2 flex justify-center items-center gap-2 font-bold text-[#7bc6a2] text-2xl border-t border-[#fcfcfa]">
            <Link
              href="/"
              className="mt-4 px-2 py-1 text-xl text-[#fcfcfa] hover:text-[#262c35] bg-[#7bc6a2] hover:bg-[#fcfcfa] rounded transform duration-500 ease-in"
            >
              Sign In
            </Link>
            <Link
              href="/"
              className="mt-4 px-2 py-1 text-xl text-[#fcfcfa] hover:text-[#262c35] bg-[#7bc6a2] hover:bg-[#fcfcfa] rounded transform duration-500 ease-in"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="w-full mt-4 pt-2 flex flex-col items-center gap-2 font-bold text-[#7bc6a2] text-2xl border-t border-[#fcfcfa]">
            <Link
              href="/mycards"
              className="px-2 py-1 hover:text-[#fcfcfa] transform duration-500 ease-in"
            >
              My Cards
            </Link>
            <Link
              href="/mytransactions"
              className="px-2 py-1 text-2xl hover:text-[#fcfcfa] transform duration-500 ease-in"
            >
              My Transactions
            </Link>
            <button
              onClick={() => dispatch(signOut())}
              className="mt-4 px-2 py-1 text-xl text-[#fcfcfa] hover:text-[#7bc6a2] bg-[#7bc6a2] hover:bg-[#262c35] rounded transform duration-500 ease-in"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
