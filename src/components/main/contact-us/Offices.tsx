
"use client";

import { useState, useEffect } from "react";

import { useFetchData } from "@/hooks/useApi";
import OfficeCard from "@/components/cards/OfficeCard";

interface OfficeItem {
  id: number;
  officeName: string;
  location: string;
  officeType: string;
  emails: string[];
  phones: string[];
  telephones: string[];
  faxes: string[];
  createdAt: string;
  updatedAt: string;
}

const Offices = () => {
  const [offices, setOffices] = useState<OfficeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all offices (domestic and international)
  const { data: apiData, error } = useFetchData(
    ["contact-addresses", "all"],
    "/contact-addresses?page=1&limit=20&sortOrder=asc&isActive=true",
    { enabled: true, refetchOnMount: true }
  );

  useEffect(() => {
    if (apiData?.data && Array.isArray(apiData.data)) {
      setOffices(apiData.data);
      setIsLoading(false);
    }
  }, [apiData]);

  // Transform office data to match OfficeCard props
  const transformOfficeData = (office: OfficeItem) => {
    return {
      id: office.id,
      name: office.officeName,
      type: office.officeType === "DOMESTIC" ? "Domestic Office" : "International Branch",
      address: office.location,
      phones: office.phones,
      telephones: office.telephones,
      emails: office.emails,
      faxes: office.faxes,
      mapLink: `https://maps.google.com/?q=${encodeURIComponent(office.location)}`,
      isMainOffice: office.officeType === "DOMESTIC" && office.id === 1,
    };
  };

  // Skeleton Card
  const SkeletonCard = () => (
    <div className="border rounded-xl overflow-hidden shadow-md animate-pulse">
      <div className="p-6">
        <div className="p-4 bg-gray-200 rounded-lg h-16 w-16 mb-7"></div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
        <div className="flex gap-3 mb-4">
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
        <div className="flex gap-3 mb-3">
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="mt-20 container grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto py-8 md:py-12 lg:py-16">
        {[...Array(3)].map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 container mx-auto py-8 md:py-12 lg:py-16 text-center">
        <p className="text-red-500">Failed to load office information. Please try again later.</p>
      </div>
    );
  }

  // Take first 3 offices to display
  const displayOffices = offices.slice(0, 3);

  if (displayOffices.length === 0) {
    return (
      <div className="mt-20 container mx-auto py-8 md:py-12 lg:py-16 text-center">
        <p className="text-pGray">No office information available.</p>
      </div>
    );
  }

  return (
    <div className="mt-20 container grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto py-8 md:py-12 lg:py-16">
      {displayOffices.map((office) => (
        <OfficeCard
          key={office.id}
          {...transformOfficeData(office)}
        />
      ))}
    </div>
  );
};

export default Offices;