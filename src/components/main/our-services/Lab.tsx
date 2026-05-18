// components/main/our-services/Lab.jsx
"use client";
import { useContext, useEffect, useState } from "react";
import { HeroContext } from "@/context/HeroContext";
import BodyContent from "@/components/BodyContent";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import PriceQuotation from "@/components/PriceQuotation";
import { useFetchData } from "@/hooks/useApi";

interface ServiceData {
  id: number;
  serviceType: string;
  heading: string;
  subheading: string;
  details: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const Lab = () => {
  const { setTitle } = useContext(HeroContext);
  const [service, setService] = useState<ServiceData | null>(null);

  // Fetch LABORATORY service data
  const { data: apiData, isLoading, error } = useFetchData(
    ["services", "LABORATORY"],
    "/services?page=1&limit=10&sortOrder=asc&isActive=true&serviceType=LABORATORY",
    { enabled: true, refetchOnMount: true }
  );

  useEffect(() => {
    if (apiData?.data && Array.isArray(apiData.data) && apiData.data.length > 0) {
      setService(apiData.data[0]);
      setTitle(apiData.data[0].heading);
    }
  }, [apiData, setTitle]);

  const extractCorePoints = (details: string) => {
    if (!details) return [];
    const liMatches = details.match(/<li>(.*?)<\/li>/g);
    if (liMatches) {
      return liMatches.map(li => li.replace(/<\/?li>/g, '').replace(/<[^>]*>/g, '').trim());
    }
    return [
      "State-of-the-art testing laboratory",
      "ISO certified quality control",
      "Advanced testing equipment",
      "Expert quality assurance team",
      "International standard compliance"
    ];
  };

  const corePoints = service ? extractCorePoints(service.details) : [];

  if (isLoading) {
    return (
      <BodyContent 
        title="Our Laboratory" 
        subTitle="State-of-the-art testing and quality control laboratory for textile excellence"
      >
        <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16 animate-pulse">
          <div className="w-full h-96 bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </BodyContent>
    );
  }

  if (error || !service) {
    return (
      <BodyContent 
        title="Our Laboratory" 
        subTitle="State-of-the-art testing and quality control laboratory for textile excellence"
      >
        <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
          <div className="text-center text-red-500">
            Failed to load service details. Please try again later.
          </div>
        </div>
      </BodyContent>
    );
  }

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12">
        <div className="space-y-4">
          <h4 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl text-pBlue">
            {service.heading}
          </h4>
        </div>

        <div className="w-full">
          <div className="relative w-full h-62 md:h-88 lg:h-165 rounded-lg overflow-hidden">
            <Image
              src={service.image}
              alt={service.heading}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="space-y-8 lg:space-y-10">
          <div className="space-y-4">
            <h5 className="font-bold text-xl md:text-2xl text-pBlue">
              {service.subheading || service.heading}
            </h5>
            <div 
              className="text-pGray text-justify text-sm md:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: service.details }}
            />
          </div>

          {corePoints.length > 0 && (
            <div className="space-y-4">
              <h5 className="font-bold text-xl md:text-2xl text-pBlue">Core Points</h5>
              {corePoints.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="h-6 w-6 rounded-sm text-white flex items-center justify-center bg-pBlue">
                    <MdOutlineKeyboardArrowRight size={24} />
                  </div>
                  <p className="text-pGray">{item}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end mt-8 pt-6 border-t border-bdrGray">
          <div className="w-full lg:w-1/2">
            <PriceQuotation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lab;