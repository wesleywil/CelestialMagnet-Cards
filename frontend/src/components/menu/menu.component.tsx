import Link from "next/link";
import { FaBars } from "react-icons/fa";

const Menu = () => {
  return (
    <div className="drawer z-40">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="p-2 drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className="text-4xl text-[#7bc6a2] drawer-button"
        >
          <FaBars />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu px-4 py-8 w-80 min-h-full flex flex-col items-center bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <Link href="/">
            <img
              src="http://dummyimage.com/100x100"
              alt="logo"
              className="rounded-full w-24 h-24 p-2 border border-[#fcfcfa] hover:border-[#7bc6a2] transform duration-500 ease-in-out"
            />
          </Link>
          <Link
            href="/cards"
            className="mt-8 text-xl text-[#fcfcfa] hover:text-[#7bc6a2] font-semibold transform duration-500 ease-in-out"
          >
            Cards
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
