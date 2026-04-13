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

const statsData = [
  {
    id: 1,
    icon: null,
    alt: "38+",
    label: "Years of Experience",
    subLabel: "Since 1986",
  },
  {
    id: 2,
    icon: "/globalMarketers.png",
    alt: "Global Marketers",
    label: "Global Export Marketers",
    subLabel: "Supplying Worldwide",
  },
  {
    id: 3,
    icon: "/advanceMachinery.png",
    alt: "Advance Machinery",
    label: "Global Export Marketers",
    subLabel: "Supplying Worldwide",
  },
  {
    id: 4,
    icon: "/vertical.png",
    alt: "Vertical Integration",
    label: "Global Export Marketers",
    subLabel: "Supplying Worldwide",
  },
];

const Hero = () => {
  return (
    <div>
      <div className="relative w-full h-full lg:max-h-screen">
        <div className="w-full h-full">
          <div>
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
          <div className="absolute inset-0 bg-hero-overlay z-10 flex items-center justify-center text-white">
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
                  A vertically integrated textile mill delivering
                  premium-quality fabrics to global brands
                </p>
                <div className="flex flex-col md:flex-row! gap-4 lg:gap-10 mt-7 lg:mt-12 w-full sm:w-auto">
                  <Link
                    href="/our-products"
                    className="text-center border border-white bg-pBlue hover:bg-[#2d6bbb] font-bold text-white rounded w-full sm:w-52 px-5 py-3 duration-300"
                  >
                    Our Products
                  </Link>
                  <Link
                    href="/contact-us"
                    className="text-center border border-white bg-white text-pBlue hover:text-white hover:bg-[#2d6bbb] font-bold rounded w-full sm:w-52 px-5 py-3 duration-300"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div
          className="absolute z-20 left-1/2 -translate-x-1/2
            -bottom-60 md:-bottom-24 lg:-bottom-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4! gap-5 p-6
            lg:h-40 bg-pBlue max-w-425 w-[95%] lg:w-full rounded-lg"
        >
          {statsData.map((stat, idx) => (
            <div key={idx} className="flex items-center justify-center gap-10">
              <div className="text-white flex gap-5 items-center">
                {idx === 0 ? (
                  <div>
                    <p className="text-3xl lg:text-5xl font-bold">{stat.alt}</p>
                  </div>
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center object-cover">
                    <Image
                      src={stat.icon || "/placeholder.svg"}
                      alt={stat.alt}
                      height={40}
                      width={40}
                    />
                  </div>
                )}
                <div>
                  <p className="text-xl font-bold">{stat.label}</p>
                  <p className="text-sm text-[#B8BFCA]">{stat.subLabel}</p>
                </div>
              </div>
              {idx !== statsData.length - 1 && (
                <div className="hidden lg:flex w-1 h-20 rounded-full opacity-20 bg-white" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
