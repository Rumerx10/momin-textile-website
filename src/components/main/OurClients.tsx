// app/our-clients/page.jsx
"use client";

import { useContext, useEffect, useState } from "react";
import { HeroContext } from "@/src/context/HeroContext";

import Pagination from "@/src/components/Pagination";
import { OurClientsData } from "@/docs/data";
import Image from "next/image";

const OurClients = () => {
  const { setTitle } = useContext(HeroContext);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: clientsData, metadata } = OurClientsData;
  const itemsPerPage = metadata.itemPerPage;
  const totalPages = metadata.totalPage;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClients = clientsData.slice(startIndex, endIndex);

  useEffect(() => {
    setTitle("Our Clients");
  }, [setTitle]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12">
        {/* Header Section */}
        <div className="space-y-4 text-center">
          <h1 className="font-bold text-pBlue text-3xl md:text-4xl lg:text-5xl">
            Our Global Clients
          </h1>
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
            {currentClients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-center p-4 lg:p-0 lg:w-60 lg:h-42 border border-bdrGray rounded-lg"
              >
                <Image
                  src={client.img}
                  alt={client.name}
                  width={200}
                  height={200}
                  className="h-25 w-50 object-contain "
                />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 md:mt-12 lg:mt-16">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OurClients;
