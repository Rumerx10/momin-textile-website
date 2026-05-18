// app/machines/[unitName]/[machineName]/page.jsx
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import MachineDetailsCarousel from "@/components/MachineDetailsCarousel";
import PriceQuotation from "@/components/PriceQuotation";
import { HeroContext } from "@/context/HeroContext";
import { useContext } from "react";
import { useFetchData } from "@/hooks/useApi";

interface MachineData {
  id: number;
  name: string;
  brandName: string;
  origin: string;
  quantity: string;
  productionCapacity: string;
  unitType: string;
  details: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

// Helper function to decode URL encoded machine name
const decodeMachineName = (encodedName: string) => {
  return decodeURIComponent(encodedName).replace(/-/g, " ");
};

const MachineDetails = () => {
  const { setTitle } = useContext(HeroContext);
  const { unitName, machineName } = useParams();
  const [machine, setMachine] = useState<MachineData | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  // Decode the machine name from URL
  const decodedMachineName = machineName ? decodeMachineName(machineName as string) : "";

  // First, fetch all machines to find the one matching the name
  const { data: allMachinesData, isLoading: isLoadingMachines } = useFetchData(
    ["machines", "all"],
    "/machines?sortOrder=asc&isActive=true&limit=100",
    { enabled: true, refetchOnMount: true }
  );

  useEffect(() => {
    if (allMachinesData?.data && Array.isArray(allMachinesData.data)) {
      // Find machine by name (case insensitive)
      const foundMachine = allMachinesData.data.find(
        (m: MachineData) => m.name.toLowerCase() === decodedMachineName.toLowerCase()
      );
      
      if (foundMachine) {
        setMachine(foundMachine);
        setTitle(foundMachine.name);
      }
      setIsFetching(false);
    }
  }, [allMachinesData, decodedMachineName, setTitle]);

  // Unit type display labels
  const unitTypeLabels: Record<string, string> = {
    SPINNING: "Spinning Unit",
    WOVEN: "Woven Dyeing & Finishing",
    FABRIC: "Fabric Manufacturing",
  };

  if (isLoadingMachines || isFetching) {
    return (
      <div className="py-8 md:py-12 lg:py-16">
        <div className="container px-4 mx-auto flex flex-col lg:flex-row gap-16 justify-between">
          <div className="w-full lg:w-[35%]">
            <div className="w-full h-96 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="w-full lg:w-[65%] space-y-6">
            <div className="space-y-3">
              <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              </div>
            </div>
            <div>
              <div className="h-6 bg-gray-200 rounded w-40 animate-pulse mb-2"></div>
              <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded w-40 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!machine) {
    return (
      <div className="py-8 md:py-12 lg:py-16">
        <div className="container px-4 mx-auto text-center text-red-500">
          Machine not found. Please try again later.
        </div>
      </div>
    );
  }

  // Extract numeric value from production capacity for display
  const extractCapacityValue = (capacity: string) => {
    const match = capacity?.match(/\d+(?:,\d+)?/);
    return match ? match[0] : capacity?.split(" ")[0] || "0";
  };

  const extractCapacityUnit = (capacity: string) => {
    const parts = capacity?.split(" ") || [];
    return parts.slice(1).join(" ") || "MTR/DAY";
  };

  const capacityValue = extractCapacityValue(machine.productionCapacity);
  const capacityUnit = extractCapacityUnit(machine.productionCapacity);

  return (
    <div className="py-8 md:py-12 lg:py-16">
      <div className="container px-4 mx-auto flex flex-col lg:flex-row gap-16 justify-between">
        {/* Machine Images Carousel */}
        <div className="w-full lg:w-[35%]">
          <MachineDetailsCarousel images={machine.images || []} />
        </div>

        {/* Machine Details */}
        <div className="w-full lg:w-[65%] space-y-6">
          <div>
            <h5 className="text-3xl lg:text-4xl font-bold text-tBlue">
              {machine.name}
            </h5>
            <div className="text-pGray mt-2 flex flex-wrap gap-x-5 lg:gap-8 items-center">
              <div>
                Brand Name:{" "}
                <span className="text-tBlue font-medium">{machine.brandName}</span>
              </div>
              <div className="w-1 h-4 bg-red-500 rounded-full" />
              <div>
                Total Quantity:{" "}
                <span className="text-tBlue font-medium">{machine.quantity}</span>
              </div>
              <div className="w-1 h-4 bg-red-500 rounded-full" />
              <div>
                Origin: <span className="text-tBlue font-medium">{machine.origin}</span>
              </div>
            </div>
          </div>

          {/* Unit Type Badge */}
          <div>
            <span className="inline-block px-3 py-1 bg-pBlue/10 text-pBlue text-sm rounded-full">
              {unitTypeLabels[machine.unitType] || machine.unitType}
            </span>
          </div>

          {/* Overview / Details */}
          <div className="space-y-2">
            <h6 className="font-semibold text-lg text-tBlue">Overview</h6>
            <div 
              className="text-pGray text-justify leading-relaxed"
              dangerouslySetInnerHTML={{ __html: machine.details || "No overview available." }}
            />
          </div>

          {/* Production Capacity */}
          <div>
            <h6 className="font-semibold text-lg text-tBlue">Production Capacity</h6>
            <div className="flex items-end gap-2">
              <p className="text-pBlue font-bold text-3xl lg:text-4xl">
                {capacityValue}
              </p>
              <span className="text-base text-pGray font-semibold">
                {capacityUnit}
              </span>
            </div>
          </div>

          {/* Price Quotation Button */}
          <PriceQuotation />
        </div>
      </div>
    </div>
  );
};

export default MachineDetails;