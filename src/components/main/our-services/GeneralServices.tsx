// app/our-services/page.jsx or your services page
"use client";

import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { OurServicesData } from "@/docs/data";
import { HeroContext } from "@/src/context/HeroContext";
import ServiceCard from "@/src/components/cards/ServiceCard";
import Pagination from "@/src/components/Pagination";

const GeneralServices = ({
  title,
  heroTitle,
  subTitle,
}: {
  title: string;
  heroTitle?: string;
  subTitle?: string;
}) => {
  const { setTitle } = useContext(HeroContext);
  const [currentPage, setCurrentPage] = useState(1);

  // Extract data and metadata from OurServicesData
  const { data: servicesData, metadata } = OurServicesData;
  const itemsPerPage = metadata.itemPerPage;
  // const totalItems = metadata.total;
  const totalPages = metadata.totalPage;

  // Calculate pagination for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = servicesData.slice(startIndex, endIndex);

  useEffect(() => {
    {
      heroTitle ? setTitle(heroTitle) : setTitle(title);
    }
  }, [setTitle, heroTitle]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-16 items-center justify-center">
        <div className="space-y-4 text-center">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">
            {title}
          </h1>
          <div className="flex justify-center">
            <p className="text-pGray max-w-210 text-sm md:text-base px-4">
              {subTitle && subTitle}
            </p>
          </div>
        </div>

        <div className="w-full">
          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
            {currentItems.map((item, idx) => (
              <Link
                href={`/our-services/${encodeURIComponent(item.title)}`}
                key={item.id || idx}
              >
                <ServiceCard {...item} />
              </Link>
            ))}
          </div>

          {/* Pagination Section */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralServices;
