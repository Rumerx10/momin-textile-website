"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const LCarousel = () => {
  const galleryImages = ["/abt2.png", "/abt3.png", "/abt4.png"];

  return (
    <div className="relative flex w-full h-full overflow-hidden">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative w-[75%] h-150"
      >
        <Image
          src="/abt1.png"
          alt="about img"
          height={665}
          width={513}
          className="bg-gray-100 h-full w-full object-cover"
        />
        <div className="absolute w-4 top-9 bottom-54 -right-9 bg-[#91268E]"></div>
      </motion.div>

      <div className="absolute h-50 bottom-0 left-16 lg:left-36 right-0">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={true}
          // autoplay={{
          //   delay: 3000,
          //   disableOnInteraction: false,
          // }}
          className="border-2 shadow-xl border-white h-50 w-full"
        >
          {galleryImages.map((img, index) => (
            <SwiperSlide key={index} className="no-bottom-padding">
              <Image
                src={img}
                alt={`${img}`}
                width={375}
                height={200}
                className="w-full h-full object-fill "
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default LCarousel;
