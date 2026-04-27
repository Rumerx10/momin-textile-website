import { MachineryData } from "@/docs/data";
import MachineCard from "@/src/components/cards/MachineCard";

const ExploreAllMachines = () => {
  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
        <div className="space-y-4 text-center">
          <h1 className="font-bold text-3xl lg:text-4xl">
            Explore Machines & Capacity
          </h1>
          <div className="flex justify-center">
            <p className=" text-pGray max-w-210">
              Our production units are equipped with modern, high-capacity
              textile machinery <br /> capable of meeting diverse manufacturing
              demands.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {MachineryData.map((mac, idx) => (
            <MachineCard key={idx} {...mac} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreAllMachines;
