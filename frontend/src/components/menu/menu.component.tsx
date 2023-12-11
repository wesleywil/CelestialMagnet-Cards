"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

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
        className="w-1/2 mx-auto flex flex-col items-center gap-2 bg-[#262c35] rounded overflow-hidden shadow-sm transform duration-700 ease-in-out"
      >
        <Link href="/">
          <img
            src="http://localhost:8000/images/card_bases/Tidal_Leviathan.jpg"
            alt="logo"
            className="rounded-full w-24 h-24 mt-8 p-2 border border-[#fcfcfa] hover:border-[#7bc6a2] transform duration-500 ease-in-out"
          />
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
          <Link
            href="/"
            className="mt-4 px-2 py-1 text-xl text-[#fcfcfa] hover:text-[#7bc6a2] bg-[#7bc6a2] hover:bg-[#fcfcfa] rounded transform duration-500 ease-in"
          >
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
