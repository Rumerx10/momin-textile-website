
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const Requirements = () => {
  const sliderImgs = [
    "/assets/Home/BrandIntro/Slider/Frame 614.png",
    "/assets/Home/BrandIntro/Slider/Frame 615.png",
    "/assets/Home/BrandIntro/Slider/Frame 616.png",
    "/assets/Home/BrandIntro/Slider/Frame 617.png",
  ];
  return (
    <div className="flex items-center justify-center py-20 px-5">
      <div className="flex flex-col items-center gap-10 lg:gap-20 w-full">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-center lg:justify-between w-full">
          <div className="flex flex-col w-full lg:w-4/12 lg:pl-40 px-5 lg:px-0">
            <h1 className="text-textBlack text-3xl lg:text-5xl font-bold leading-14">
              Flexibility for <br /> Customer <br /> Requirements
              <div className="h-1 w-36 bg-red my-7" />
            </h1>
            <p className="text-textGray">
              Kems Group, established in 2007, is a leading knit and woven
              garments manufacturer based in Dhaka, Bangladesh. We combine
              modern technology with skilled professionals to produce
              world-class fashion for top global clients. Our three 100%
              export-oriented facilities.
            </p>
          </div>

          <div className="relative flex items-center justify-end w-full lg:w-8/12 h-full">
            <div className="relative flex h-[400px] lg:h-full w-8/12">
              <Image
                src="/assets/Home/BrandIntro/Rectangle318.png"
                alt="about img"
                height={665}
                width={513}
                className="roundex-sm h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-end ">
                <div className="flex flex-col w-full lg:w-8/12 pl-20 lg:pl-0 pr-5 lg:pr-30 ">
                  <h1 className="text-white text-xl lg:text-5xl font-bold lg:leading-14">
                    Sourced Locally <br /> Fabric & Trim
                    <div className="h-1 w-36 bg-red my-2 lg:my-7" />
                  </h1>
                  <p className="text-xs lg:text-base text-textGray">
                    Kems Group established in 2007, is a leading knit and woven
                    garments manufacturer based in Dhaka, Bangladesh. We combine
                    modern technology with skilled professionals to produce
                    world-class fashion for top global clients. Our three 100%
                    export-oriented facilities.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute flex w-6/12 overflow-hidden shadow-2xl left-0 top-11 lg:top-22  bottom-11 lg:bottom-22 right-70">
              <Swiper
                modules={[Autoplay, Pagination]}
                loop={true}
                // autoplay={{
                //   delay: 3000,
                //   disableOnInteraction: false,
                // }}
              >
                {sliderImgs.map((img, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={img}
                      alt={`slide-${index}`}
                      width={630}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requirements;
