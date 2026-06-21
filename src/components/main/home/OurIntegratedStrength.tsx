"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import { useFetchData } from "@/hooks/useApi";

interface Unit {
  id: number;
  unitType: string;
  heading: string;
  details: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const OurIntegratedStrength = () => {
  const { data, isLoading, error } = useFetchData(["units"], "units");

  const getShortDescription = (details: string): string => {
    const plainText = details.replace(/<[^>]*>/g, "");
    const firstSentence = plainText.split(".")[0] || plainText;
    return firstSentence.length > 100
      ? firstSentence.substring(0, 100) + "..."
      : firstSentence;
  };

  const getUnitUrl = (unitType: string): string => {
    const urls: Record<string, string> = {
      SPINNING: "/our-units/spinning-unit",
      WOVEN: "/our-units/woven-dyeing-finishing",
      FABRIC: "/our-units/fabric-manufacturing",
    };
    return urls[unitType] || `/our-units/${unitType.toLowerCase()}`;
  };

  const SkeletonCard = () => (
    <div className="flex flex-col rounded-md shadow w-full max-w-150 bg-white animate-pulse h-full">
      <div className="h-63 w-full bg-gray-200 rounded-t-md shrink-0" />
      <div className="rounded-b-md bg-pBlue w-full p-6 flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          <div className="h-6 bg-gray-300 rounded w-3/4" />
          <div className="h-0.5 w-full bg-gray-300" />
          <div className="h-4 bg-gray-300 rounded w-1/2" />
          <div className="h-4 bg-gray-300 rounded w-2/3" />
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="text-center text-red-600">
          <p>
            Error loading units:{" "}
            {(error as Error)?.message || "An error occurred"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-pBlue text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const units = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
        <div className="space-y-4 text-center">
          <h4 className="font-bold text-3xl lg:text-4xl">
            Our Integrated Strength, Seamless Production Units
          </h4>
          <div className="flex justify-center">
            <p className="text-pGray max-w-210">
              Control comes from having every stage of production under one
              roof. Our vertically integrated <br /> structure textile
              manufacturing
            </p>
          </div>
        </div>

        {/* Desktop/Tablet View */}
        <div className="grid grid-cols-2 lg:grid-cols-3 scale-0 h-0 lg:h-auto lg:scale-100 flex-wrap gap-5 w-full">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <SkeletonCard key={`skeleton-${index}`} />
              ))
            : units.map((unit: Unit) => (
                <Link
                  href={getUnitUrl(unit.unitType)}
                  key={unit.id}
                  className="hover:scale-102 cursor-pointer h-full"
                >
                  <motion.div
                    initial={{ scale: 0.2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col rounded-md shadow w-full max-w-150 hover:bg-cardGray duration-300 bg-white h-full"
                  >
                    <div className="h-63 w-full shrink-0">
                      <Image
                        src={unit.image}
                        height={272}
                        width={500}
                        alt={unit.heading}
                        className="h-full w-full rounded-t-md object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="rounded-b-md bg-pBlue text-white w-full p-6 flex-1 flex flex-col">
                      <h6 className="mb-3 line-clamp-2">{unit.heading}</h6>
                      <div className="mb-2 h-0.5 w-full bg-[#9CA3AF] shrink-0" />
                      <p className="text-sm text-[#B8BFCA] line-clamp-3 flex-1">
                        {getShortDescription(unit.details)}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
        </div>
      </div>

      {/* Mobile View - Swiper */}
      <div className="w-full lg:hidden">
        <Swiper
          spaceBetween={20}
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ dynamicBullets: true, clickable: true }}
        >
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <SwiperSlide key={`mobile-skeleton-${index}`}>
                  <SkeletonCard />
                </SwiperSlide>
              ))
            : units.map((unit: Unit) => (
                <SwiperSlide key={unit.id}>
                  <Link
                    href={getUnitUrl(unit.unitType)}
                    className="block h-full"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col rounded-md shadow w-full hover:bg-cardGray duration-300 bg-white h-full"
                    >
                      <div className="h-63 w-full shrink-0">
                        <Image
                          src={unit.image}
                          height={272}
                          width={500}
                          alt={unit.heading}
                          className="h-full w-full rounded-t-md object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="rounded-b-md bg-pBlue text-white w-full p-6 flex-1 flex flex-col">
                        <h6 className="mb-3 line-clamp-2">{unit.heading}</h6>
                        <div className="mb-2 h-0.5 w-full bg-[#9CA3AF] shrink-0" />
                        <p className="text-sm text-[#B8BFCA] line-clamp-3 flex-1">
                          {getShortDescription(unit.details)}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OurIntegratedStrength;
