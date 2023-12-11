import HomeShowcase from "@/components/home_showcase/home_showcase.component";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center
     p-24"
    >
      <div className="w-full flex md:flex-col-reverse xl:flex-row gap-2 justify-center md:text-center xl:text-left">
        <div className="xl:w-1/3 self-center text-[#fcfcfa]">
          <div className="flex flex-col">
            <div className="md:self-center xl:self-start w-24 px-1 my-1 flex flex-col justify-start">
              <span className="px-1 text-[#fcfcfa] font-semibold">
                001 / 100
              </span>
              <div className=" h-1 bg-[#fcfcfa]"></div>
            </div>
            <h1 className="my-2 text-6xl text-[#7bc6a2] font-semibold">
              CelestialMagnet Cards
            </h1>
            <h1 className="px-1 text-2xl ">
              Unleash the Power of Cosmic Trades!
            </h1>
          </div>

          <h2 className="my-2 px-1 text-sm text-gray-300 ">
            Explore, Trade, and Collect Rare Cards in the Celestial Universe
          </h2>
          <button className="my-4 px-1 text-[#7bc6a2] hover:text-[#fcfcfa] transform duration-500 ease-in-out">
            Discover More
          </button>
        </div>
        {/* <div className="self-center">
          <img
            src="https://dummyimage.com/600x600"
            alt="something"
            className="md:w-2/3 xl:w-full md:mx-auto rounded-full p-2 border border-[#7bc6a2]"
          />
        </div> */}
        <HomeShowcase />
      </div>
    </main>
  );
}
