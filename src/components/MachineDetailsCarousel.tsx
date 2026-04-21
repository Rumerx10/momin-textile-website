"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import { FreeMode, Thumbs } from "swiper/modules";
import Image from "next/image";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const MachineDetailsCarousel = ({ images = [] }: { images?: string[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full">
      {/* 🔶 MAIN SWIPER */}
      <Swiper
        loop={true}
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Thumbs]}
        onSwiper={setMainSwiper}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex); // ✅ FIX for loop
          thumbsSwiper?.slideTo(swiper.realIndex); // ✅ keep thumbs in view
        }}
        className="relative h-120 hidden lg:flex w-full overflow-hidden rounded-md border"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index} className="h-fullno-bottom-padding ">
            <div className="h-full w-full">
              <Image
                src={item || "/placeholder.svg"}
                alt={`image-${index}`}
                width={500}
                height={480}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}

        {/* 🔹 Navigation Buttons */}
        <button
          onClick={() => mainSwiper?.slidePrev()}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 hidden lg:flex items-center justify-center rounded-sm bg-white border shadow text-gray-600"
        >
          <RiArrowLeftSLine size={24} />
        </button>

        <button
          onClick={() => mainSwiper?.slideNext()}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 hidden lg:flex items-center justify-center rounded-sm bg-white border shadow text-gray-600"
        >
          <RiArrowRightSLine size={24} />
        </button>
      </Swiper>

      {/* 🔶 THUMBNAIL SWIPER */}
      <Swiper
        loop={true}
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView="auto"
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="mt-3 w-full"
      >
        {images.map((item, index) => (
          <SwiperSlide
            key={index}
            className={`no-bottom-padding w-22.5! h-17.5! shrink-0 cursor-pointer rounded overflow-hidden border transition ${
              activeIndex === index
                ? "border-blue-500 opacity-100"
                : "border-gray-200 opacity-50"
            }`}
          >
            <Image
              src={item || "/placeholder.svg"}
              alt={`thumb-${index}`}
              width={90}
              height={70}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MachineDetailsCarousel;
