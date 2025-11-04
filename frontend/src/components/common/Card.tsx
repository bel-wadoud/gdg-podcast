const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="relative inline-block ">
      <div
        className={`px-5 py-2.5 bg-primary relative bottom-1.5 right-1.5  duration-300  hover:bottom-0 hover:right-0 border-2 border-black rounded-md  ${className}  `}
      >
        {children}
      </div>
      <div className="absolute bottom-0 right-0  bg-black w-full h-full -z-2 rounded-md  "></div>
    </div>
  );
};

export default Card;
