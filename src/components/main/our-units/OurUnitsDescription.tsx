// components/main/our-units/OurUnitsDescription.jsx
"use client";
import { useState, useEffect } from "react";
import BodyContent from "@/components/BodyContent";
import CompanyProfileCard from "@/components/CompanyProfileCard";
import QuickLinks from "@/components/QuickLinks";
import Image from "next/image";
import { useFetchData } from "@/hooks/useApi";

interface UnitData {
  id: number;
  unitType: string;
  heading: string;
  details: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const OurUnitsDescription = ({ unitType }: { unitType: string }) => {
  const [unit, setUnit] = useState<UnitData | null>(null);

  // Fetch unit data by unitType
  const { data: apiData, isLoading, error } = useFetchData(
    ["unit", unitType],
    `/units/${unitType}`,
    { enabled: true, refetchOnMount: true }
  );

  useEffect(() => {
    if (apiData?.data) {
      setUnit(apiData.data);
    }
  }, [apiData]);

  // Unit type labels for title
  const unitLabels: Record<string, string> = {
    SPINNING: "Advanced Spinning Unit",
    WOVEN: "Advanced Woven Dyeing & Finishing",
    FABRIC: "Advanced Fabric Manufacturing",
  };

  // Unit type descriptions
  const unitDescriptions: Record<string, string> = {
    SPINNING:
      "Our spinning unit transforms carefully selected fibers into superior-quality yarns — the essential base for all our woven fabrics.",
    WOVEN:
      "Our woven dyeing and finishing unit delivers vibrant, long-lasting colors with precision and eco-friendly processes.",
    FABRIC:
      "Our fabric manufacturing unit combines advanced technology with skilled craftsmanship to produce premium textiles.",
  };

  if (isLoading) {
    return (
      <div className=" container px-4 mx-auto py-8 md:py-12 lg:py-16 flex flex-col gap-8 lg:gap-12 items-center justify-center">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
        </div>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-[65%] space-y-10">
            <div className="w-full h-96 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="space-y-10 w-full lg:w-[35%]">
            <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !unit) {
    return (
      <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
        <BodyContent
          title={unitLabels[unitType] || "Our Unit"}
          subTitle={unitDescriptions[unitType] || ""}
        >
          <div className="text-center text-red-500 py-12">
            Failed to load unit details. Please try again later.
          </div>
        </BodyContent>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
      <BodyContent
        title={unit.heading || unitLabels[unitType]}
        subTitle={unitDescriptions[unitType]}
      >
        <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-[65%] space-y-5">
              {/* Unit Image */}
              <div className="flex max-h-100 rounded-lg overflow-hidden">
                {unit.image ? (
                  <Image
                    src={unit.image}
                    alt={unit.heading}
                    height={400}
                    width={1920}
                    className="object-cover w-full"
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                    <span className="text-pGray">No image available</span>
                  </div>
                )}
              </div>

              {/* Unit Details */}
              <div className="space-y-4">
                <div 
                  className="text-pGray leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: unit.details }}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-10 w-full lg:w-[35%]">
              <CompanyProfileCard />
              <QuickLinks />
            </div>
          </div>
        </div>
      </BodyContent>
    </div>
  );
};

export default OurUnitsDescription;