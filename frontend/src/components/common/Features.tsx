import Card from "./Card";

const Features = () => {
  const infos = [
    {
      icon: "./src/assets/icons/explore.svg",
      name: "Explore",
      color: "bg-primary",
    },
    {
      icon: "./src/assets/icons/listen.svg",
      name: "Listen",
      color: "bg-secondary",
    },

    {
      icon: "./src/assets/icons/learn.svg",
      name: "Learn",
      color: "bg-success",
    },
    { icon: "./src/assets/icons/grow.svg", name: "Grow", color: "bg-info" },
  ];
  return (
    <div className="py-16 flex flex-col sm:flex-row items-center sm:items-stretch justify-center  flex-wrap gap-11 w-full  md:w-full">
      {infos.map((info) => (
        <Card
          className="flex flex-col items-center justify-between gap-3 "
          color={info.color}
        >
          <div className="overflow-hidden w-40 flex justify-center items-center">
            <img src={info.icon} alt={info.name} className="w-ufll " />
          </div>

          <p className="text-2xl font-bold">{info.name}</p>
        </Card>
      ))}
    </div>
  );
};

export default Features;
