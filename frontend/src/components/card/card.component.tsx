const Card = () => {
  return (
    <div>
      <h2 className="text-xl text-center uppercase">Card Name</h2>
      <div className="mt-2 hover:mt-0 w-52 h-64 bg-red-400 rounded transform duration-700 ease-out card_shadow"></div>

      <h3 className="text-xs text-[#7bc6a2]">Owned by: name</h3>
    </div>
  );
};

export default Card;
