import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "../ui/button";

const GeneralCard = () => {
  return (
    <Card className="p-0 w-1/4">
      <CardHeader className="p-0">
        <img src="./src/assets/images/podcast1.png" alt="" className="w-full" />
      </CardHeader>
      <CardContent className="flex flex-col items-start justify-start pb-6">
        <h3 className="text-xl font-bold mb-3.5">podcast number 1</h3>
        <p className="text-black/70 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipisic
        </p>

        <Button className="px-6 py-4">Details</Button>
      </CardContent>
    </Card>
  );
};

export default GeneralCard;
