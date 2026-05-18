// app/our-clients/page.jsx
"use client";

import { useContext, useEffect, useState } from "react";
import { HeroContext } from "@/context/HeroContext";
import Pagination from "@/components/Pagination";
import Image from "next/image";
import { useFetchData } from "@/hooks/useApi";

interface ClientItem {
  id: number;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const OurClients = () => {
  const { setTitle } = useContext(HeroContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Build endpoint with pagination
  const buildEndpoint = () => {
    return `/clients?page=${currentPage}&limit=${itemsPerPage}&sortOrder=asc&isActive=true`;
  };

  // Fetch clients data
  const { data: apiData, isLoading, error } = useFetchData(
    ["clients", String(currentPage), String(itemsPerPage)],
    buildEndpoint(),
    { enabled: true, refetchOnMount: true }
  );

  useEffect(() => {
    if (apiData?.data && Array.isArray(apiData.data)) {
      setClients(apiData.data);
      setTotalPages(apiData.meta?.totalPages || 1);
      setTotalItems(apiData.meta?.totalItems || 0);
    }
  }, [apiData]);

  useEffect(() => {
    setTitle("Our Clients");
  }, [setTitle]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Skeleton Card
  const SkeletonCard = () => (
    <div className="flex items-center justify-center p-4 lg:p-0 lg:w-60 lg:h-42 border border-bdrGray rounded-lg animate-pulse">
      <div className="h-25 w-50 bg-gray-200 rounded"></div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="flex flex-col gap-8 lg:gap-12">
          {/* Header Section Skeleton */}
          <div className="space-y-4 text-center">
            <div className="h-10 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
            <div className="flex justify-center">
              <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
            </div>
          </div>

          {/* Clients Grid Skeleton */}
          <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {[...Array(12)].map((_, idx) => (
                <SkeletonCard key={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="text-center text-red-500">
          Failed to load clients. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12">
        {/* Header Section */}
        <div className="space-y-4 text-center">
          <h4 className="font-bold text-pBlue text-3xl md:text-4xl lg:text-5xl">
            Our Global Clients
          </h4>
          <div className="flex justify-center">
            <p className="text-pGray max-w-2xl text-sm md:text-base">
              We take pride in serving world-renowned brands across the globe.
              <br />
              Our commitment to quality has earned us the trust of industry
              leaders.
            </p>
          </div>
        </div>

        {/* Clients Grid */}
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-center p-4 lg:p-0 lg:w-60 lg:h-42 border border-bdrGray rounded-lg hover:shadow-md transition-shadow duration-300 group"
              >
                <Image
                  src={client.image}
                  alt={client.name}
                  width={200}
                  height={200}
                  className="h-25 w-50 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {clients.length === 0 && (
            <div className="flex items-center justify-center h-64">
              <p className="text-pGray text-lg">No clients found.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 md:mt-12 lg:mt-16">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={handleItemsPerPageChange}
                onPageChange={handlePageChange}
                showPaginationControl={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OurClients;