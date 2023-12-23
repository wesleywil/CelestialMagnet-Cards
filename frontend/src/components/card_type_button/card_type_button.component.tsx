type CardTypeButtonProps = {
  typeName: string;
  backgroundImage: string;
  action: React.MouseEventHandler;
};

const CardTypeButton = ({
  typeName,
  backgroundImage,
  action,
}: CardTypeButtonProps) => {
  return (
    <button
      onClick={action}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
      className="w-12 flex items-center font-bold bg-[#1e2027]  rounded "
    >
      <span className="w-full bg-[#1e2027]/60 hover:bg-[#1e2027] backdrop-blur-sm transform duration-500 ease-in-out">
        {typeName}
      </span>
    </button>
  );
};

export default CardTypeButton;
