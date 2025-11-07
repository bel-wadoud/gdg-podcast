import Card from "./Card";

const Features = () => {
  const infos = [
    { icon: "./src/assets/icons/explore.svg", name: "Explore"  },
    { icon: "./src/assets/icons/listen.svg", name: "Listen" },
    { icon: "./src/assets/icons/learn.svg", name: "Learn" },
    { icon: "./src/assets/icons/grow.svg", name: "Grow" },
  ];
  return (
    <div className="py-16 flex items-stretch justify-center gap-7">
      {infos.map((info) => (
        <Card className="flex flex-col items-center justify-between gap-3">
          <div className="overflow-hidden w-40 flex justify-center items-center">
            <img src={info.icon} alt={info.name} className="w-ufll" />
          </div>

          <p className="text-2xl font-bold">{info.name}</p>
        </Card>
      ))}
    </div>
  );
};

export default Features;
