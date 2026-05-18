// components/main/our-services/ServiceDetails.jsx
"use client";

import Image from "next/image";
import { useEffect, useContext, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { HeroContext } from "@/context/HeroContext";
import PriceQuotation from "@/components/PriceQuotation";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useFetchData } from "@/hooks/useApi";

interface ServiceData {
  id: number;
  serviceType?: string;
  heading: string;
  subheading?: string;
  shortParagraph?: string;
  details: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

// Helper function to decode URL encoded name
const decodeName = (encodedName: string) => {
  return decodeURIComponent(encodedName).replace(/-/g, " ");
};

// Format date
const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Extract core points from details (for services)
const extractCorePoints = (details: string) => {
  if (!details) return [];
  const liMatches = details.match(/<li>(.*?)<\/li>/g);
  if (liMatches && liMatches.length > 0) {
    return liMatches.map(li => li.replace(/<\/?li>/g, '').replace(/<[^>]*>/g, '').trim());
  }
  return [];
};

const ServiceDetails = () => {
  const { setTitle } = useContext(HeroContext);
  const { serviceName, newsId } = useParams();
  const pathname = usePathname();
  const [data, setData] = useState<ServiceData | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isNewsPage, setIsNewsPage] = useState(false);

  // Determine if it's news page or service page
  useEffect(() => {
    setIsNewsPage(pathname?.includes("/news-events") || false);
  }, [pathname]);

  // Get ID from params (either serviceName as string or newsId as number)
  const getEndpoint = () => {
    if (isNewsPage && newsId) {
      return `/news-events/${newsId}`;
    }
    if (serviceName) {
      return `/services?page=1&limit=50&sortOrder=asc&isActive=true`;
    }
    return "";
  };

  const endpoint = getEndpoint();
  const decodedName = serviceName ? decodeName(serviceName as string) : "";

  // Fetch data
  const { data: apiData, isLoading, error } = useFetchData(
    isNewsPage ? ["news", `${newsId}`] : ["services", "all"],
    endpoint,
    { enabled: true, refetchOnMount: true }
  );

  useEffect(() => {
    if (isNewsPage && apiData?.data) {
      // News page - single item by ID
      setData(apiData.data);
      setTitle(apiData.data.heading);
      setIsFetching(false);
    } else if (!isNewsPage && apiData?.data && Array.isArray(apiData.data)) {
      // Service page - find by heading
      const foundService = apiData.data.find(
        (s: ServiceData) => s.heading.toLowerCase() === decodedName.toLowerCase()
      );
      if (foundService) {
        setData(foundService);
        setTitle(foundService.heading);
      }
      setIsFetching(false);
    }
  }, [apiData, isNewsPage, decodedName, setTitle, newsId]);

  const corePoints = !isNewsPage ? extractCorePoints(data?.details || "") : [];

  if (isLoading || isFetching) {
    return (
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="flex flex-col gap-8 lg:gap-12 animate-pulse">
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
          <div className="w-full">
            <div className="w-full h-96 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="h-7 bg-gray-200 rounded w-64"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="text-center text-red-500">
          {isNewsPage ? "News" : "Service"} not found. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12">
        {/* Title Section */}
        <div className="space-y-4">
          <h4 className="text-center font-bold text-2xl md:text-3xl lg:text-4xl text-pBlue">
            {data.heading}
          </h4>
          {/* Show date for news */}
          {isNewsPage && data.createdAt && (
            <p className="text-center text-pGray text-sm">
              Published on {formatDate(data.createdAt)}
            </p>
          )}
        </div>

        {/* Hero Image Section */}
        <div className="w-full">
          <div className="relative w-full h-62 md:h-88 lg:h-165 rounded-lg overflow-hidden">
            <Image
              src={data.image}
              alt={data.heading}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 lg:space-y-10">
          <div className="space-y-4">
            {/* For services: show subheading, for news: show shortParagraph */}
            {(data.subheading || data.shortParagraph) && (
              <h5 className="font-bold text-xl md:text-2xl text-pBlue">
                {data.subheading || data.shortParagraph}
              </h5>
            )}
            <div 
              className="text-pGray text-justify text-sm md:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.details }}
            />
          </div>

          {/* Core Points Section - Only for services */}
          {!isNewsPage && corePoints.length > 0 && (
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

        {/* Price Quotation Section - Only for services */}
        {!isNewsPage && (
          <div className="flex justify-end mt-8 pt-6 border-t border-bdrGray">
            <div className="w-full lg:w-1/2">
              <PriceQuotation />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;