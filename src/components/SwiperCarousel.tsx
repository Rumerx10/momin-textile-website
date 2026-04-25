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

const Images = ["/p1.png", "/p2.png", "/p3.png", "/p4.png", "/p5.png"];

const SwiperCarousel = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="relative flex flex-col gap-10 w-full h-100 bg-white overflow-hidden">
      <Swiper
        modules={[Autoplay, Keyboard, Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        // loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        keyboard={{ enabled: true }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        onBeforeInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        className="relative w-full h-full px-20 overflow-visible"
      >
        {Images.map((img, index) => (
          <SwiperSlide key={index} className="no-bottom-padding">
            <Image
              width={1280}
              height={760}
              src={img}
              alt="slide"
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ Custom Navigation Buttons */}
      <div className="absolute hidden lg:flex gap-6 items-center justify-center right-6 bottom-6 w-28 h-11 z-50">
        <div
          ref={prevRef}
          className="cursor-pointer h-11 w-11 flex items-center justify-center border-2 rounded-full hover:bg-white/20 transition-all duration-200"
        >
          <SlArrowLeft color="white" />
        </div>

        <div
          ref={nextRef}
          className="cursor-pointer h-11 w-11 flex items-center justify-center border-2 rounded-full hover:bg-white/20 transition-all duration-200"
        >
          <SlArrowRight color="white" />
        </div>
      </div>

      {/* Pagination */}
      <div className="block lg:hidden absolute  left-1/2 transform -translate-x-1/2">
        <div className="swiper-pagination"></div>
      </div>
    </div>
  );
};

export default SwiperCarousel;
