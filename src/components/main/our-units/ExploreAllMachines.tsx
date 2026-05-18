// components/main/our-units/ExploreAllMachines.jsx
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import MachineCard from "@/components/cards/MachineCard";
import Pagination from "@/components/Pagination";
import { useFetchData } from "@/hooks/useApi";

interface MachineItem {
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

const ExploreAllMachines = () => {
  const { unitType } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [machines, setMachines] = useState<MachineItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Get unit type label for display
  const getUnitTypeValue = () => {
    const types: Record<string, string> = {
      "spinning-unit": "SPINNING",
      "woven-dyeing-finishing": "WOVEN",
      "fabric-manufacturing": "FABRIC",
    };
    return types[unitType as string] || "SPINNING";
  };

  const unitTypeValue = getUnitTypeValue();

  // Unit type display labels
  const unitTypeLabels: Record<string, string> = {
    SPINNING: "Spinning Unit",
    WOVEN: "Woven Dyeing & Finishing",
    FABRIC: "Fabric Manufacturing",
  };

  // Build endpoint with pagination and unitType filter
  const buildEndpoint = () => {
    return `/machines?page=${currentPage}&limit=${itemsPerPage}&sortOrder=asc&isActive=true&unitType=${unitTypeValue}`;
  };

  // Fetch machines data
  const { data: apiData, isLoading, error } = useFetchData(
    ["machines", unitTypeValue, String(currentPage), String(itemsPerPage)],
    buildEndpoint(),
    { enabled: true, refetchOnMount: true }
  );

  useEffect(() => {
    if (apiData?.data && Array.isArray(apiData.data)) {
      setMachines(apiData.data);
      setTotalPages(apiData.meta?.totalPages || 1);
      setTotalItems(apiData.meta?.totalItems || 0);
    }
  }, [apiData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Skeleton Card
  const MachineCardSkeleton = () => (
    <div className="border rounded-lg overflow-hidden animate-pulse">
      <div className="relative h-54 w-full bg-gray-200"></div>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-6 bg-gray-200 rounded w-40"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
          <div className="space-y-4 text-center">
            <div className="h-10 bg-gray-200 rounded-lg w-64 mx-auto animate-pulse"></div>
            <div className="flex justify-center">
              <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
            {[...Array(12)].map((_, idx) => (
              <MachineCardSkeleton key={idx} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="text-center text-red-500">
          Failed to load machines. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
        <div className="space-y-4 text-center">
          <h4 className="font-bold text-3xl lg:text-4xl">
            Explore Machines & Capacity
          </h4>
          <div className="flex justify-center">
            <p className="text-pGray max-w-210">
              Our production units are equipped with modern, high-capacity
              textile machinery <br /> capable of meeting diverse manufacturing
              demands.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
          {machines.map((machine) => (
            <MachineCard
              key={machine.id}
              img={machine.images?.[0] || "/placeholder.png"}
              brand={machine.brandName}
              machineName={machine.name}
              origin={machine.origin}
              totalQuantity={machine.quantity}
              productionCapacity={machine.productionCapacity}
            />
          ))}
        </div>

        {machines.length === 0 && (
          <div className="text-center py-12">
            <p className="text-pGray">No machines found for {unitTypeLabels[unitTypeValue]}.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="w-full">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={handleItemsPerPageChange}
              onPageChange={handlePageChange}
              showPaginationControl={true}
              className="mt-4"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreAllMachines;