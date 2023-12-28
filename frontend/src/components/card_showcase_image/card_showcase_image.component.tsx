type CardShowcaseImageProps = {
  cardImg: string;
  cardFrame: string;
  containerWidth: string;
  containerHeight: string;
  backgroundSize: string;
  baseWidth?: string;
  baseHeight: string;
};

const CardShowcaseImage = ({ ...props }: CardShowcaseImageProps) => {
  return (
    <div
      className={`relative ${props.containerWidth} ${props.containerHeight} overflow-hidden`}
    >
      {/* Frame */}
      <div
        style={{
          backgroundImage: `url(${props.cardFrame})`,
          backgroundSize: `${props.backgroundSize}`,
          backgroundRepeat: "no-repeat",
        }}
        className="w-full h-full absolute top-0 left-0 z-10"
      ></div>
      {/* Base image */}
      <div
        style={{
          backgroundImage: `url(${props.cardImg})`,
          backgroundSize: "cover",
        }}
        className={`w-full ${props.baseHeight} absolute top-0 left-0 z-0`}
      ></div>
    </div>
  );
};

export default CardShowcaseImage;
