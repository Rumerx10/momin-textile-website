"use client";
import { ReactNode, useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const GalleryCarousel = ({
  children,
  images,
}: {
  children: (
    item: { img: string; title: string; desig?: string; desc: string },
    idx: number,
  ) => ReactNode;
  images: { img: string; title: string; desc: string }[];
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <div className="relative w-full flex items-center justify-center">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="w-full"
      >
        {images.map(
          (
            item: { img: string; title: string; desig?: string; desc: string },
            idx: number,
          ) => (
            <SwiperSlide key={idx} className="flex items-center justify-center">
              {children(item, idx)}
            </SwiperSlide>
          ),
        )}
      </Swiper>

      {/* Navigation Buttons - Hidden on mobile, visible on desktop */}
      <button
        onClick={() => {
          if (swiperRef.current) {
            swiperRef.current.slidePrev();
          }
        }}
        className="shadow-lg absolute left-0 -ml-20 z-10 text-pGray h-11 w-11 bg-white items-center justify-center rounded-sm hover:bg-gray-100 transition-colors md:-ml-16 sm:-ml-12 hidden md:flex"
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
        className="shadow-lg absolute right-0 -mr-20 z-10 text-pGray h-11 w-11 bg-white items-center justify-center rounded-md hover:bg-gray-100 transition-colors md:-mr-16 sm:-mr-12 hidden md:flex"
        aria-label="Next slide"
      >
        <RiArrowRightSLine size={24} />
      </button>
    </div>
  );
};

export default GalleryCarousel;
