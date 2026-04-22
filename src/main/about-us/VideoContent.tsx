"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import ModalImageGallery from "@/src/components/ModalImageGallery";
import GalleryCarousel from "@/src/components/GalleryCarousel";
import { ImagesData } from "@/docs/data";
import { FaRegCirclePlay } from "react-icons/fa6";

const VideoContent = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-5 lg:gap-16">
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
          <GalleryCarousel data={ImagesData}>
            {(item, idx) => (
              <div key={idx} className="border rounded-lg overflow-hidden">
                <div className="relative max-h-54 w-full flex">
                  <Image
                    src={item.img}
                    height={215}
                    width={369}
                    alt="member image"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 cursor-pointer bg-black/50 flex items-end">
                    <div className="text-white px-6 py-4 space-y-1 flex flex-col">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="line-clamp-1">{item.desc}</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      <FaRegCirclePlay size={84} />
                    </div>
                  </div>
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

export default VideoContent;
