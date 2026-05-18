// app/our-concerns/page.jsx
"use client";

import { useContext, useEffect, useState } from "react";
import { HeroContext } from "@/context/HeroContext";
import OurConcernCard from "@/components/cards/OurConcernCard";
import { useFetchData } from "@/hooks/useApi";

interface ConcernItem {
  id: number;
  cardHeading: string;
  shortParagraph: string;
  businessMotto: string;
  description: string;
  details: string;
  logo: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

const OurConcerns = () => {
  const { setTitle } = useContext(HeroContext);
  const [concerns, setConcerns] = useState<ConcernItem[]>([]);

  // Fetch concerns data
  const { data: apiData, isLoading, error } = useFetchData(
    ["concerns"],
    "/concerns?page=1&limit=10&sortOrder=asc&isActive=true",
    { enabled: true, refetchOnMount: true }
  );

  useEffect(() => {
    if (apiData?.data && Array.isArray(apiData.data)) {
      setConcerns(apiData.data);
    }
    setTitle("Our Concerns");
  }, [apiData, setTitle]);

  // Skeleton Card
  const SkeletonCard = () => (
    <div className="group bg-white border border-gray-100 rounded-lg p-6 md:p-8 animate-pulse">
      <div className="flex flex-col gap-5">
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        <div className="h-7 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-28"></div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="flex flex-col gap-8 lg:gap-12">
          <div className="space-y-4 text-center">
            <div className="h-10 bg-gray-200 rounded-lg w-80 mx-auto animate-pulse"></div>
            <div className="flex justify-center">
              <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[...Array(4)].map((_, idx) => (
              <SkeletonCard key={idx} />
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
          Failed to load concerns. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12">
        <div className="space-y-4 text-center">
          <h4 className="font-bold text-pBlue text-2xl md:text-3xl lg:text-4xl">
            Sister Concern of Momin Group
          </h4>
          <p className="text-pGray text-sm md:text-base max-w-3xl mx-auto">
            MOMIN GROUP, a large contribution in manufacturing and economic
            development of Bangladesh.
            <br />
            MOMIN GROUP is a privately owned company.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {concerns.map((concern) => (
            <OurConcernCard
              key={concern.id}
              title={concern.cardHeading}
              desc={concern.shortParagraph}
              imageSrc={concern.logo}
              concernId={concern.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurConcerns;