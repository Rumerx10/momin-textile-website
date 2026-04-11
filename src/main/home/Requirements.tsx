"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { motion } from "framer-motion";

const Requirements = () => {
  const sliderImgs = [
    "/assets/Home/BrandIntro/Slider/Frame 614.png",
    "/assets/Home/BrandIntro/Slider/Frame 615.png",
    "/assets/Home/BrandIntro/Slider/Frame 616.png",
    "/assets/Home/BrandIntro/Slider/Frame 617.png",
  ];
  return (
    <div className="flex items-center justify-center py-20 px-5 lg:px-0">
      <div className="flex flex-col items-center gap-10 lg:gap-20 w-full">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-center lg:justify-between w-full">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col w-full lg:w-4/12 lg:pl-40 px-5 lg:px-0"
          >
            <h1 className="text-textBlack text-3xl xl:text-5xl font-bold xl:leading-14">
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
          </motion.div>

          <div className="relative flex items-center justify-end w-full lg:w-8/12 h-full">
            <div className="relative flex w-full justify-end">
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-8/12 min-h-[400px] flex"
              >
                <Image
                  src="/assets/Home/BrandIntro/Rectangle318.png"
                  alt="about img"
                  height={665}
                  width={513}
                  className="h-full w-full object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-end"
              >
                <div className="flex w-full gap-4 xl:gap-16 h-[70%]">
                  <div className="flex w-1/2">
                    <Swiper
                      modules={[Autoplay, Pagination]}
                      loop={true}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
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

                  <div className="flex flex-col justify-center w-1/2">
                    <h1 className="text-white text-xl xl:text-5xl font-bold">
                      Sourced Locally <br /> Fabric & Trim
                      <div className="h-1 w-32 lg:w-36 bg-red my-2 xl:my-8" />
                    </h1>
                    <p className="text-textGray text-xs lg:text-base pr-5 lg:pr-24">
                      Kems Group, established in 2007, is a leading knit and
                      woven garments manufacturer based in Dhaka, Bangladesh. We
                      combine modern technology with skilled professionals to
                      produce world-class fashion for top global clients. Our
                      three 100% export-oriented facilities.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requirements;
