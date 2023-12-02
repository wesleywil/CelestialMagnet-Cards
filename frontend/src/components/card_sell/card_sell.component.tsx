const CardSell = () => {
  return (
    <div className="w-11/12 md:w-[60vw] h-[70vh] mt-8 p-2 flex flex-col gap-2 border rounded">
      <h1 className="text-3xl font-bold text-[#fcfcfa] text-center border-b">
        SELL
      </h1>
      <div className="flex gap-2 justify-center">
        <div>
          <img src="http://dummyimage.com/300x400" alt="" />
        </div>
        <form className="w-[300px] h-[400px] p-4 flex flex-col justify-between text-3xl text-[#fcfcfa]">
          <div className="flex flex-col gap-2">
            <span className="w-full px-2 py-1 bg-[#fcfcfa] text-[#262c35] text-center rounded">
              Card Name
            </span>
            <span className="w-full px-2 py-1 bg-[#fcfcfa] text-[#262c35] text-center rounded">
              Tier
            </span>
            <input
              type="text"
              placeholder="Selling Price"
              className="w-full px-2 py-1 text-center bg-transparent outline-0 border-0 border-b-2 border-[#fcfcfa] focus:border-[#7bc6a2]"
            />
          </div>

          <div className="flex justify-center gap-2 text-xl">
            <button className="w-1/2 px-2 py-1 font-bold hover:text-[#262c35] bg-[#7bc6a2] hover:bg-[#fcfcfa] rounded transform duration-500 ease-in-out">
              Sell
            </button>
            <button className="w-1/2 px-2 py-1 font-bold hover:text-[#262c35] bg-[#7bc6a2] hover:bg-[#fcfcfa] rounded transform duration-500 ease-in-out">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardSell;
