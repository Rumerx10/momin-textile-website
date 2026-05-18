// app/certifications/page.jsx
"use client";

import { useContext, useEffect, useState } from "react";
import { HeroContext } from "@/context/HeroContext";
import Pagination from "@/components/Pagination";
import CertificateCard from "../cards/CertificateCard";
import BodyContent from "../BodyContent";
import { useFetchData } from "@/hooks/useApi";

interface CertificationItem {
  id: number;
  heading: string;
  subheading: string;
  description: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}

const Certifications = () => {
  const { setTitle } = useContext(HeroContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [certifications, setCertifications] = useState<CertificationItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Build endpoint with pagination
  const buildEndpoint = () => {
    return `/certifications?page=${currentPage}&limit=${itemsPerPage}&sortOrder=asc&isActive=true`;
  };

  // Fetch certifications data
  const { data: apiData, isLoading, error } = useFetchData(
    ["certifications", String(currentPage), String(itemsPerPage)],
    buildEndpoint(),
    { enabled: true, refetchOnMount: true }
  );

  useEffect(() => {
    if (apiData?.data && Array.isArray(apiData.data)) {
      setCertifications(apiData.data);
      setTotalPages(apiData.meta?.totalPages || 1);
      setTotalItems(apiData.meta?.totalItems || 0);
    }
  }, [apiData]);

  useEffect(() => {
    setTitle("Certifications");
  }, [setTitle]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Skeleton Card Component
  const SkeletonCard = () => (
    <div className="flex flex-col items-center lg:items-start md:flex-row gap-5 animate-pulse">
      <div className="p-6 shrink-0 h-32.5 w-32.5 border-2 rounded-lg bg-gray-200"></div>
      <div className="md:w-2/3 lg:w-full space-y-3">
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-48"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <BodyContent
        title="Certifications"
        subTitle="At Momin Textile Mills Ltd, we maintain the highest levels of quality, safety, and sustainability through internationally recognized certifications."
      >
        <div className="w-full">
          <div className="space-y-8 md:space-y-10 lg:space-y-12">
            {[...Array(itemsPerPage)].map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        </div>
      </BodyContent>
    );
  }

  if (error) {
    return (
      <BodyContent
        title="Certifications"
        subTitle="At Momin Textile Mills Ltd, we maintain the highest levels of quality, safety, and sustainability through internationally recognized certifications."
      >
        <div className="text-center text-red-500 py-12">
          Failed to load certifications. Please try again later.
        </div>
      </BodyContent>
    );
  }

  return (
    <BodyContent
      title="Certifications"
      subTitle="At Momin Textile Mills Ltd, we maintain the highest levels of quality, safety, and sustainability through internationally recognized certifications."
    >
      <div className="w-full">
        <div className="space-y-8 md:space-y-10 lg:space-y-12">
          {certifications.map((cert, idx) => (
            <div
              key={cert.id}
              className={`${
                idx !== certifications.length - 1
                  ? "border-b border-gray-200 pb-8 md:pb-10 lg:pb-12"
                  : ""
              }`}
            >
              <CertificateCard
                img={cert.logo}
                title={cert.heading}      // heading -> title
                subTitle={cert.subheading} // subheading -> subTitle
                desc={cert.description}
              />
            </div>
          ))}
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="mt-10 md:mt-12 lg:mt-16">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              onPageChange={handlePageChange}
              showPaginationControl={true}
            />
          </div>
        )}
      </div>
    </BodyContent>
  );
};

export default Certifications;