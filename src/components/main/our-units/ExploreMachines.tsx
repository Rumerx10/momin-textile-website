// components/main/our-units/ExploreMachines.jsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BodyContent from "@/components/BodyContent";
import GalleryCarousel from "@/components/GalleryCarousel";
import MachineCard from "@/components/cards/MachineCard";
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

const ExploreMachines = () => {
  const pathname = usePathname();
  const [machines, setMachines] = useState<MachineItem[]>([]);

  // Get unit type from pathname
  const getUnitType = () => {
    if (pathname.includes("spinning-unit")) return "SPINNING";
    if (pathname.includes("woven-dyeing-finishing")) return "WOVEN";
    if (pathname.includes("fabric-manufacturing")) return "FABRIC";
    return "SPINNING";
  };

  const unitType = getUnitType();

  // Fetch machines for this unit type (limit to 8 for carousel)
  const { data: apiData, isLoading } = useFetchData(
    ["machines", unitType, "carousel"],
    `/machines?sortOrder=asc&isActive=true&unitType=${unitType}&limit=8`,
    { enabled: true, refetchOnMount: true }
  );

  useEffect(() => {
    if (apiData?.data && Array.isArray(apiData.data)) {
      setMachines(apiData.data.slice(0, 8));
    }
  }, [apiData]);

  // Skeleton Card
  const SkeletonCard = () => (
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
      <BodyContent
        title="Explore Machines & Capacity"
        subTitle="At Momin Textile Mills Ltd, we operate with a robust lineup of modern, high-performance textile machinery designed to ensure precision, efficiency."
      >
        <div className="relative w-full flex flex-col gap-8 lg:gap-12 items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
            {[...Array(4)].map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        </div>
      </BodyContent>
    );
  }

  return (
    <BodyContent
      title="Explore Machines & Capacity"
      subTitle="At Momin Textile Mills Ltd, we operate with a robust lineup of modern, high-performance textile machinery designed to ensure precision, efficiency."
    >
      <div className="relative w-full flex flex-col gap-8 lg:gap-12 items-center justify-center">
        {machines.length > 0 && (
          <GalleryCarousel data={machines}>
            {(item, idx) => (
              <MachineCard
                key={idx}
                img={item.images?.[0] || "/placeholder.png"}
                brand={item.brandName}
                machineName={item.name}
                origin={item.origin}
                totalQuantity={item.quantity}
                productionCapacity={item.productionCapacity}
              />
            )}
          </GalleryCarousel>
        )}
        
        <Link href={`${pathname}/explore-all-machines`}>
          <div
            className="border border-[#959FB1] rounded-sm px-12.5 py-2.5
            hover:bg-tBlue hover:text-white cursor-pointer duration-300 text-tBlue font-medium text-center"
          >
            Explore All Machines
          </div>
        </Link>
      </div>
    </BodyContent>
  );
};

export default ExploreMachines;