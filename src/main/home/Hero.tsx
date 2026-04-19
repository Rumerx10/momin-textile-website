"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Hero slides data
const heroSlides = [
  { img: "/hero/hero1.jpg" },
  { img: "/hero/hero2.jpg" },
  { img: "/hero/hero3.jpg" },
  { img: "/hero/hero4.jpg" },
];

// Statistics data for the info cards
const statisticsData = [
  {
    id: 1,
    icon: "38+",
    title: "Years of Experience",
    subtitle: "Since 1986",
  },
  {
    id: 2,
    icon: "/globalMarketers.png",
    title: "Global Export Marketers",
    subtitle: "Supplying Worldwide",
  },
  {
    id: 3,
    icon: "/advanceMachinery.png",
    title: "European Technology",
    subtitle: "European Technology",
  },
  {
    id: 4,
    icon: "/vertical.png",
    title: "Vertical",
    subtitle: "Integrated Production",
  },
];

const Hero = () => {
  return (
    <section className="relative">
      {/* Hero Slider Section */}
      <div className="relative w-full h-full lg:max-h-screen mb-60 md:mb-24 lg:mb-20">
        {/* Background Slider */}
        <div className="w-full h-full">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop
            className="custom-swiper-pagination"
          >
            {heroSlides.map((slide, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="h-125 lg:h-212.5 w-full"
                >
                  <Image
                    src={slide.img}
                    alt={`Hero slide ${index + 1}`}
                    height={850}
                    width={1920}
                    className="w-full h-full object-cover"
                    priority={index === 0}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 bg-hero-overlay z-10 flex items-center justify-center text-white">
          <div className="container px-4 mx-auto flex flex-col justify-center">
            {/* Main Heading */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <h1 className="text-2xl md:text-4xl lg:text-7xl font-bold leading-tight">
                World-Class Textile <br /> Manufacturing Since 1986
              </h1>
            </motion.div>

            {/* Description and CTA Buttons */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
              viewport={{ once: true }}
            >
              <p className="text-lg">
                A vertically integrated textile mill delivering premium-quality
                fabrics to global brands
              </p>

              <div className="flex flex-col md:flex-row! gap-4 lg:gap-10 mt-7 lg:mt-12 w-full sm:w-auto">
                <Link
                  href="/our-products"
                  className="text-center border border-white bg-pBlue hover:bg-[#2d6bbb] font-bold text-white rounded w-full sm:w-52 px-5 py-3 transition duration-300"
                >
                  Our Products
                </Link>
                <Link
                  href="/contact-us"
                  className="text-center border border-white bg-white text-pBlue hover:text-white hover:bg-[#2d6bbb] font-bold rounded w-full sm:w-52 px-5 py-3 transition duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Statistics Cards - Overlapping the hero section */}
        <div className="absolute left-0 right-0 px-4 z-20 -bottom-60 md:-bottom-24 lg:-bottom-20">
          <div className="mx-auto max-w-425 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4! gap-5 p-6 lg:h-40 bg-pBlue rounded-lg">
            {statisticsData.map((stat, index) => (
              <div
                key={stat.id}
                className="flex items-center justify-center gap-10"
              >
                <div className="text-white flex gap-5 items-center">
                  {/* Stat Value or Icon */}
                  {index === 0 ? (
                    <div>
                      <p className="text-3xl lg:text-5xl font-bold">
                        {stat.icon}
                      </p>
                    </div>
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center object-cover">
                      <Image
                        src={stat.icon || "/placeholder.svg"}
                        alt={stat.title}
                        height={40}
                        width={40}
                        className="object-contain"
                      />
                    </div>
                  )}

                  {/* Stat Label and Subtitle */}
                  <div>
                    <p className="text-xl font-bold whitespace-nowrap">
                      {stat.title}
                    </p>
                    <p className="text-sm text-[#B8BFCA] whitespace-nowrap">
                      {stat.subtitle}
                    </p>
                  </div>
                </div>

                {/* Vertical Divider (Desktop only) */}
                {index !== statisticsData.length - 1 && (
                  <div className="hidden lg:flex w-0.5 h-20 rounded-full opacity-20 bg-white" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
