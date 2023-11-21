const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center text-[#7bc6a2]">
      <div className="w-32 h-40 bg-[#7bc6a2] rounded animate_loading"></div>
      <h1 className="text-2xl animate-pulse">Loading</h1>
    </div>
  );
};

export default Loading;
