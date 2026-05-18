// components/main/NewsEvents.jsx
"use client";

import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { HeroContext } from "@/context/HeroContext";
import ServiceCard from "@/components/cards/ServiceCard";
import Pagination from "@/components/Pagination";
import { useFetchData } from "@/hooks/useApi";

interface NewsItem {
  id: number;
  heading: string;
  shortParagraph: string;
  details: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const NewsEvents = () => {
  const { setTitle } = useContext(HeroContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Build endpoint with pagination
  const buildEndpoint = () => {
    return `/news-events?page=${currentPage}&limit=${itemsPerPage}&sortOrder=desc&isActive=true`;
  };

  // Fetch news & events data
  const { data: apiData, isLoading, error } = useFetchData(
    ["news-events", String(currentPage), String(itemsPerPage)],
    buildEndpoint(),
    { enabled: true, refetchOnMount: true }
  );

  useEffect(() => {
    if (apiData?.data && Array.isArray(apiData.data)) {
      setNews(apiData.data);
      setTotalPages(apiData.meta?.totalPages || 1);
      setTotalItems(apiData.meta?.totalItems || 0);
    }
  }, [apiData]);

  useEffect(() => {
    setTitle("News and Events");
  }, [setTitle]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Skeleton Card
  const SkeletonCard = () => (
    <div className="rounded-lg overflow-hidden border flex flex-col h-full animate-pulse">
      <div className="h-54 bg-gray-200"></div>
      <div className="p-6 flex flex-col grow space-y-3">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-10 bg-gray-200 rounded w-32 mt-4"></div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="flex flex-col gap-8 lg:gap-16 items-center justify-center">
          <div className="space-y-4 text-center">
            <div className="h-10 bg-gray-200 rounded-lg w-64 mx-auto animate-pulse"></div>
            <div className="flex justify-center">
              <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6 w-full">
            {[...Array(8)].map((_, idx) => (
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
          Failed to load news and events. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-16 items-center justify-center">
        <div className="space-y-4 text-center">
          <h4 className="font-bold text-2xl md:text-3xl lg:text-4xl">
            News and Events
          </h4>
          <div className="flex justify-center">
            <p className="text-pGray max-w-210 text-sm md:text-base px-4">
              At Momin Textile Mills Ltd, we believe in continuous growth, innovation, and collaboration. 
              Stay updated with our latest milestones and insights.
            </p>
          </div>
        </div>

        <div className="w-full">
          {/* News Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
            {news.map((item) => (
              <Link href={`/news-events/${item.id}`} key={item.id}>
                <div className="rounded-lg overflow-hidden border flex flex-col h-full group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  {/* Image */}
                  <div className="relative h-54 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.heading}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col grow">
                    {/* Date */}
                    <p className="text-pGray text-sm mb-2">
                      {formatDate(item.createdAt)}
                    </p>
                    
                    {/* Title */}
                    <h6 className="font-semibold text-tBlue text-xl mb-2 line-clamp-2">
                      {item.heading}
                    </h6>
                    
                    {/* Description */}
                    <p className="text-pGray text-sm mb-4 line-clamp-3 grow">
                      {item.shortParagraph}
                    </p>
                    
                    {/* Read More Button */}
                    <div className="mt-auto">
                      <span className="text-pBlue font-medium text-sm hover:underline inline-flex items-center gap-1">
                        Read More
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Section */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={handleItemsPerPageChange}
              onPageChange={handlePageChange}
              showPaginationControl={true}
              className="mt-4"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsEvents;