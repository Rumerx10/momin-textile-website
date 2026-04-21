"use client";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import GalleryCarousel from "@/src/components/GalleryCarousel";
import MachineCard from "@/src/components/cards/MachineCard";
import { MachineryData } from "@/docs/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ExploreMachines = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const pathname = usePathname();
  // alert(pathname)
  return (
    <div className="container px-4 mx-auto py-16">
      <div className="flex flex-col gap-5 lg:gap-16 items-center justify-center">
        <div className="space-y-4 text-center">
          <h1 className="font-bold text-3xl lg:text-4xl">
            Explore Machines & Capacity
          </h1>
          <div className="flex justify-center">
            <p className="text-pGray max-w-210">
              At Momin Textile Mills Ltd, we operate with a robust lineup of
              modern, high-performance textile machinery designed to ensure
              precision, efficiency.
            </p>
          </div>
        </div>

        <div className="relative w-full flex flex-col gap-5 lg:gap-16 items-center justify-center">
          <GalleryCarousel data={MachineryData}>
            {(item, idx) => <MachineCard key={idx} {...item} />}
          </GalleryCarousel>
          <Link href={`${pathname}/explore-all-machines`}>
            <div
              className="border border-[#959FB1] rounded-sm px-12.5 py-2.5
            hover:bg-tBlue hover:text-white cursor-pointer duration-300 text-tBlue font-medium text-center"
            >
              Explore All Machines
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExploreMachines;
