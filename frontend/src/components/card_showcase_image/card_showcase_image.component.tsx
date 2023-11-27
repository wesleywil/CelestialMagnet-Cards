type CardShowcaseImageProps = {
  card_img: string;
  card_frame: string;
};

const CardShowcaseImage = ({
  card_img,
  card_frame,
}: CardShowcaseImageProps) => {
  return (
    <div className="relative w-72 h-96 overflow-hidden">
      {/* Frame */}
      <div
        style={{
          backgroundImage: `url(${card_frame})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
        className="w-full h-full absolute top-0 left-0 z-10"
      ></div>
      {/* Base image */}
      <div
        style={{
          backgroundImage: `url(${card_img})`,
          backgroundSize: "cover",
        }}
        className="w-full h-[22rem] absolute top-0 left-0 z-0"
      ></div>
    </div>
  );
};

export default CardShowcaseImage;
