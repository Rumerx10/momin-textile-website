"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Autoplay, Pagination } from "swiper/modules";

const AboutUs = () => {
  // Gallery images data
  const galleryImages = ["/abt2.png", "/abt3.png", "/abt4.png"];

  return (
    <div className="relative bg-bgGray">
      <div className="container px-4 mx-auto py-16">
        <div className="container flex flex-col items-center gap-10 lg:gap-20 w-full">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-center lg:justify-between w-full">
            {/* Left Side - Images */}
            <div className="relative flex w-full lg:w-6/12 h-full">
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

              <div className="absolute h-50 bottom-0 left-36 right-0">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  className="border-2 shadow-xl border-white h-50 w-full"
                >
                  {galleryImages.map((img, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={img}
                        alt={`${img}`}
                        width={375}
                        height={200}
                        className="w-full h-full object-fill"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
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

              <div>
                <Link href="/about-us">
                  <button
                    className="flex items-center justify-center 
                    duration-300 gap-2 hover:gap-5 py-3 rounded-sm text-pViolet
                    font-medium mt-16 cursor-pointer"
                  >
                    <p>Read More Details</p>
                    <FaArrowRightLong />
                  </button>
                </Link>
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
