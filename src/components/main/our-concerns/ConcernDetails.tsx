// app/our-concerns/[concernId]/page.jsx
"use client";

import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { HeroContext } from "@/context/HeroContext";
import SwiperCarousel from "@/components/SwiperCarousel";
import { useFetchData } from "@/hooks/useApi";

interface ConcernData {
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

const ConcernDetails = () => {
  const { setTitle } = useContext(HeroContext);
  const { concernName } = useParams();
  const [concern, setConcern] = useState<ConcernData | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Fetch concern data by ID
  const { data: apiData, isLoading, error } = useFetchData(
    ["concern", `${concernName}`],
    `/concerns/${concernName}`,
    { enabled: true, refetchOnMount: true }
  );

  useEffect(() => {
    if (apiData?.data) {
      setConcern(apiData.data);
      setTitle(apiData.data.cardHeading);
    }
  }, [apiData, setTitle]);

  // Create slides from images
  const slides = concern?.images?.map((img) => ({
    image: img,
    title: concern.cardHeading,
    description: concern.shortParagraph,
  })) || [];

  if (isLoading) {
    return (
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-stretch lg:max-h-110">
          <div className="w-full lg:w-1/2 relative bg-gray-100 min-h-96 animate-pulse">
            <div className="w-full h-full bg-gray-200 rounded-lg"></div>
          </div>
          <div className="w-full lg:w-1/2 bg-gray-200 p-8 animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
            <div className="w-full h-0.5 bg-gray-300 my-5"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !concern) {
    return (
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="text-center text-red-500">
          Failed to load concern details. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      {/* Carousel Section */}
      <div className="flex flex-col lg:flex-row items-stretch lg:max-h-110">
        {/* Carousel Container */}
        <div className="w-full lg:w-1/2 relative bg-gray-100 min-h-96">
          <SwiperCarousel slides={slides} />
        </div>

        {/* Info Panel */}
        <div className="w-full lg:w-1/2 h-full bg-slate-900 text-white p-8 flex flex-col justify-center min-h-100">
          <h6 className="text-2xl font-semibold mb-4">
            {concern.cardHeading}
          </h6>
          <p className="text-gray-300">
            {concern.shortParagraph}
          </p>
          <div className="w-full h-0.5 bg-white/20 my-5"></div>
          <div>
            <h6 className="font-semibold mb-2">Business Motto</h6>
            <p className="text-gray-300">
              {concern.businessMotto}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-8 md:mt-12 lg:mt-16">
        <h5 className="text-pBlue text-3xl lg:text-4xl font-bold mb-8">
          {concern.description}
        </h5>

        <div className="space-y-6 text-pGray text-justify">
          <div dangerouslySetInnerHTML={{ __html: concern.details }} />
        </div>
      </div>
    </div>
  );
};

export default ConcernDetails;