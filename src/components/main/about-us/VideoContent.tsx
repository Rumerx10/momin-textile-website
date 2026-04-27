"use client";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import GalleryCarousel from "@/src/components/GalleryCarousel";
import { MembersData } from "@/docs/data";
import VideoCard from "@/src/components/cards/VideoCard";

const VideoContent = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12">
        <div className="space-y-4">
          <h1 className="font-bold text-3xl lg:text-4xl">
            Video content heading will be here
          </h1>
          <div className="flex">
            <p className="text-pGray max-w-210">
              Showcasing our high-speed automated looms ensuring flawless fabric
              texture and consistency.
            </p>
          </div>
        </div>
        <div className="relative w-full flex items-center justify-center">
          <GalleryCarousel data={MembersData}>
            {(item, idx) => <VideoCard key={idx} {...item} />}
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

export default VideoContent;
