// components/SwiperCarousel.jsx
"use client";

import { useRef } from "react";
import {
  Autoplay,
  Keyboard,
  Pagination,
  Navigation,
  Scrollbar,
  A11y,
} from "swiper/modules";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

interface Slide {
  image: string;
  title: string;
  description: string;
}

interface SwiperCarouselProps {
  slides: Slide[];
}

const SwiperCarousel = ({ slides }: SwiperCarouselProps) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  if (!slides || slides.length === 0) {
    return (
      <div className="relative flex flex-col gap-10 w-full h-100 bg-gray-100 overflow-hidden flex items-center justify-center">
        <p className="text-pGray">No images available</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-10 w-full h-100 bg-white overflow-hidden">
      <Swiper
        modules={[Autoplay, Keyboard, Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        keyboard={{ enabled: true }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          el: ".swiper-pagination",
        }}
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation) {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        className="relative w-full h-full px-20 overflow-visible"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="no-bottom-padding">
            <Image
              width={1280}
              height={760}
              src={slide.image}
              alt={slide.title || `Slide ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      {slides.length > 1 && (
        <div className="absolute hidden lg:flex gap-6 items-center justify-center right-6 bottom-6 w-28 h-11 z-50">
          <div
            ref={prevRef}
            className="cursor-pointer h-11 w-11 flex items-center justify-center border-2 border-white rounded-full hover:bg-white/20 transition-all duration-200"
          >
            <SlArrowLeft color="white" />
          </div>

          <div
            ref={nextRef}
            className="cursor-pointer h-11 w-11 flex items-center justify-center border-2 border-white rounded-full hover:bg-white/20 transition-all duration-200"
          >
            <SlArrowRight color="white" />
          </div>
        </div>
      )}

      {/* Pagination for mobile */}
      <div className="block lg:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40">
        <div className="swiper-pagination !relative"></div>
      </div>
    </div>
  );
};

export default SwiperCarousel;