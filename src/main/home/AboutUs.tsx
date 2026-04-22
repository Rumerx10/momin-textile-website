"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Autoplay, Pagination } from "swiper/modules";
import LCarousel from "@/src/components/LCarousel";
import ReadMoreBtn from "@/src/components/ReadMoreBtn";

const AboutUs = () => {
  // Gallery images data
  const galleryImages = ["/abt2.png", "/abt3.png", "/abt4.png"];

  return (
    <div className="relative bg-bgGray">
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="container flex flex-col items-center gap-10 lg:gap-20 w-full">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-center lg:justify-between w-full">
            {/* Left Side - Images */}
            <div className="w-full lg:w-6/12 h-full">
              <LCarousel />
            </div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col w-full lg:w-6/12"
            >
              <div>
                <p className="text-sm text-pGray mb-1">About Us</p>
                <h1 className="text-tBlue text-3xl lg:text-4xl font-bold">
                  Crafting Quality, Weaving Trust
                </h1>
                <div className="h-1 w-36 bg-pViolet my-7" />
              </div>

              <div className="flex flex-col gap-5">
                <p className="text-pGray text-justify">
                  Momin Textile Mills Ltd is a leading garments and textile
                  manufacturer in Bangladesh, dedicated to producing premium
                  woven fabrics for international apparel brands and B2B
                  clients. From spinning and dyeing to weaving and finishing,
                  every stage of our production reflects precision, innovation,
                  and a passion for excellence.
                </p>
                <p className="text-pGray text-justify">
                  Founded with a clear vision to elevate Bangladesh&apos;s
                  textile reputation worldwide, Momin Textile Mills Ltd has
                  grown into a trusted name recognized for quality, consistency,
                  and reliability. Our integrated production facilities enable
                  us to maintain strict quality control across all operations,
                  ensuring every fabric we produce meets global standards.
                </p>
              </div>

              <div className="mt-16">
                <ReadMoreBtn link="/about-us" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0">
        <Image
          src="/sewing.png"
          alt="sewing machine"
          width={600}
          height={413}
        />
      </div>
    </div>
  );
};

export default AboutUs;
