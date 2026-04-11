"use client";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Link from "next/link";

const data = [
  { img: "/hero/hero1.jpg" },
  { img: "/hero/hero2.jpg" },
  { img: "/hero/hero3.jpg" },
  { img: "/hero/hero4.jpg" },
];

const Hero = () => {
  return (
    <div>
      <div className="relative w-full overflow-hidden lg:max-h-screen">
        {/* <div className="relative w-full overflow-hidden lg:max-h-[90vh]"> */}
        <div className="w-full">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop
            className="custom-swiper-pagination"
          >
            {data.map((item, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="h-125 lg:h-212.5 w-full flex "
                >
                  <Image
                    src={item.img}
                    alt={`slide-${index + 1}`}
                    height={850}
                    width={1920}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="bg-hero-overlay absolute inset-0 z-20 flex items-center justify-center text-white px-5">
          <div className="container px-4 mx-auto flex flex-col justify-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl md:text-4xl lg:text-7xl font-bold leading-tight">
                World-Class Textile <br /> Manufacturing Since 1986
              </h1>
            </motion.div>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <p className=" text-lg">
                A vertically integrated textile mill delivering premium-quality
                fabrics to global brands
              </p>
              <div className="flex flex-col lg:flex-row items-center lg:justify-start justify-center gap-4 lg:gap-10 mt-7 lg:mt-12 w-full sm:w-auto">
                <Link
                  href="/our-products"
                  className="text-center border border-white bg-primaryBlue hover:bg-[#2d6bbb] font-bold text-white rounded w-full sm:w-52 px-5 py-3 duration-300"
                >
                  Our Products
                </Link>
                <Link
                  href="/contact-us"
                  className="text-center border border-white bg-white text-[#192f55] hover:text-white hover:bg-[#2d6bbb] font-bold rounded w-full sm:w-52 px-5 py-3 duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
