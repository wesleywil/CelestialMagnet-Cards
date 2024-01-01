"use client";

import { Bebas_Neue } from "next/font/google";

// Components
import HomeShowcase from "@/components/home_showcase/home_showcase.component";
import Link from "next/link";
import { motion } from "framer-motion";

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
            <motion.div
              animate={{
                translateY: [-20, 0],
                transition: { duration: 0.5, ease: "easeIn" },
              }}
              className="md:self-center xl:self-start w-20 px-1 my-1 flex flex-col justify-center"
            >
              <span className="px-1 text-center text-[#e6eeee] font-semibold">
                001 / 100
              </span>
              <div className=" h-1 bg-[#e6eeee]"></div>
            </motion.div>
            <motion.h1
              animate={{
                translateY: [-50, 0],
                transition: { duration: 0.5, ease: "easeIn" },
              }}
              className={`${bebasNeue.className} my-2 text-6xl text-[#e05f5f] font-semibold`}
            >
              CelestialMagnet Cards
            </motion.h1>
            <motion.h1
              animate={{
                translateY: [-50, 0],
                transition: { duration: 0.55, ease: "easeIn" },
              }}
              className="px-1 text-2xl "
            >
              Unleash the Power of Cosmic Trades!
            </motion.h1>
          </div>

          <motion.h2
            animate={{
              translateY: [-50, 0],
              transition: { duration: 0.6, ease: "easeIn" },
            }}
            className="my-2 px-1 text-sm text-gray-300 "
          >
            Explore, Trade, and Collect Rare Cards in the Celestial Universe
          </motion.h2>
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
