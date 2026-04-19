"use client";
import { useRef } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import GalleryCarousel from "@/src/components/GalleryCarousel";
import { ImagesData } from "@/docs/data";

const MeetOurMembers = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="container px-4 mx-auto py-16">
      <div className="flex flex-col gap-5 lg:gap-16 items-center justify-center">
        <div className="space-y-4 text-center">
          <h1 className="font-bold text-3xl lg:text-4xl">Meet our members</h1>
          <div className="flex justify-center">
            <p className="text-pGray max-w-210">
              MOMIN GROUP, a large contribution in manufacturing and economic
              development of Bangladesh. <br /> MOMIN GROUP is a privately
            </p>
          </div>
        </div>

        <div className="relative w-full flex items-center justify-center">
          <GalleryCarousel images={ImagesData}>
            {(item, idx) => (
              <div key={idx} className="border rounded-lg overflow-hidden">
                <div className="max-h-54 w-full flex">
                  <Image
                    src={item.img}
                    height={215}
                    width={369}
                    alt="member image"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-4 flex flex-col">
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    {item.desig && (
                      <p className="text-sm text-pGray">{item.desig}</p>
                    )}
                  </div>
                  <p className="text-justify grow">{item.desc}</p>
                </div>
              </div>
            )}
          </GalleryCarousel>

          {/* Navigation Buttons - Hidden on mobile, visible on desktop */}
          <button
            onClick={() => {
              if (swiperRef.current) {
                swiperRef.current.slidePrev();
              }
            }}
            className="absolute left-0 -ml-20 z-10 text-pGray h-11 w-11 bg-white items-center justify-center rounded-sm hover:bg-gray-100 transition-colors md:-ml-16 sm:-ml-12 hidden md:flex"
            aria-label="Previous slide"
          >
            <RiArrowLeftSLine size={24} />
          </button>

          <button
            onClick={() => {
              if (swiperRef.current) {
                swiperRef.current.slideNext();
              }
            }}
            className="absolute right-0 -mr-20 z-10 text-pGray h-11 w-11 bg-white items-center justify-center rounded-md hover:bg-gray-100 transition-colors md:-mr-16 sm:-mr-12 hidden md:flex"
            aria-label="Next slide"
          >
            <RiArrowRightSLine size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetOurMembers;
