import { FaFire, FaGem } from "react-icons/fa";

const CardShowcase = () => {
  return (
    <div className="absolute min-h-screen min-w-full flex flex-col items-center bg-[#262c35]/70 z-30">
      <div className="md:w-[70vw] xl:w-[40vw] h-[60vh] mt-36 p-4 flex xl:justify-center bg-black/80 rounded">
        {/* Card Image and Tier Switch Buttons */}
        <div className="self-center ">
          <div className="w-72 h-96 bg-red-400 rounded"></div>
          <div className="h-12 my-2 flex justify-center gap-2 text-3xl">
            <button className="p-2 flex justify-center items-center bg-amber-950 hover:bg-amber-800 rounded-full transform duration-500 ease-in-out">
              <FaGem />
            </button>
            <button className="p-2 flex justify-center items-center bg-slate-400 hover:bg-slate-200 rounded-full transform duration-500 ease-in-out">
              <FaGem />
            </button>
            <button className="p-2 flex justify-center items-center bg-amber-500 hover:bg-amber-300 rounded-full transform duration-500 ease-in-out">
              <FaGem />
            </button>
            <button className="p-2 flex justify-center items-center bg-black hover:bg-slate-700 border rounded-full transform duration-500 ease-in-out">
              <FaGem />
            </button>
          </div>
        </div>
        {/* Card Info */}
        <div className="self-center text-center">
          <div className="w-[22rem] h-96 p-2 text-[#fcfcfa]">
            <h1 className="text-2xl">Card Name</h1>
            <div className="px-4 flex gap-2 text-xs">
              <div className="self-center mb-1 text-red-500 text-xl rounded-full">
                <FaFire />
              </div>
              <span className="self-center text-red-500">Fire Type</span>
            </div>
            <p className="my-2 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              earum minima consequuntur. Voluptatem hic voluptatibus
              necessitatibus, odit dolorem illo laudantium reiciendis
              dignissimos, iste similique omnis, libero eveniet facilis optio
              saepe!
            </p>
            <div className="mt-8">
              <h1>Status</h1>
              <h1>UNAVAILABLE</h1>
            </div>
            <div className="mt-4">
              <h1>Owned by</h1>
              <h1 className="text-2xl uppercase font-semibold">User Name</h1>
            </div>
          </div>
          <div className="h-12 my-2 flex justify-center gap-2"></div>
        </div>
      </div>
    </div>
  );
};

export default CardShowcase;
