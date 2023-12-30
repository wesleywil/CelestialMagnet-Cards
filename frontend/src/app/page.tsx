import { Bebas_Neue, Barlow_Condensed } from "next/font/google";

// Components
import HomeShowcase from "@/components/home_showcase/home_showcase.component";
import Link from "next/link";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center
     p-24"
    >
      <div className="w-full flex md:flex-col-reverse xl:flex-row gap-2 justify-center md:text-center xl:text-left">
        <div className="xl:w-1/3 self-center text-[#e6eeee]">
          <div className="flex flex-col">
            <div className="md:self-center xl:self-start w-20 px-1 my-1 flex flex-col justify-center">
              <span className="px-1 text-center text-[#e6eeee] font-semibold">
                001 / 100
              </span>
              <div className=" h-1 bg-[#e6eeee]"></div>
            </div>
            <h1
              className={`${bebasNeue.className} my-2 text-6xl text-[#e05f5f] font-semibold`}
            >
              CelestialMagnet Cards
            </h1>
            <h1 className="px-1 text-2xl ">
              Unleash the Power of Cosmic Trades!
            </h1>
          </div>

          <h2 className="my-2 px-1 text-sm text-gray-300 ">
            Explore, Trade, and Collect Rare Cards in the Celestial Universe
          </h2>
          <Link
            href="/cards"
            className="my-4 px-1 text-[#e05f5f] hover:text-[#e6eeee] transform duration-500 ease-in-out"
          >
            Discover More
          </Link>
        </div>
        <HomeShowcase />
      </div>
    </main>
  );
}
