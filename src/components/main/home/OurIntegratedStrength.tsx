"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";

const data = [
  {
    img: "/ois1.png",
    title: "Spinning Unit",
    desc: "75,000 Ring Spindles",
    url: "/our-units/spinning-unit",
  },
  {
    img: "/ois2.png",
    title: "Woven Dyeing & Finishing",
    desc: "80,000 Meters Per Day",
    url: "/our-units/woven-dyeing-finishing",
  },
  {
    img: "/ois3.png",
    title: "Fabric Manufacturing",
    desc: "80,000 Meters Per Day",
    url: "/our-units/facbirc-manufacturing",
  },
];

const OurIntegratedStrength = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
        <div className="space-y-4 text-center">
          <h4 className="font-bold text-3xl lg:text-4xl">
            Our Integrated Strength, Seamless Production Units
          </h4>
          <div className="flex justify-center">
            <p className=" text-pGray max-w-210">
              Control comes from having every stage of production under one
              roof. Our vertically integrated <br /> structure textile
              manufacturing
            </p>
          </div>
        </div>
        {/* Desktop/Tablet View */}
        <div className="grid grid-cols-2 lg:grid-cols-3 scale-0 h-0 lg:h-auto lg:scale-100 flex-wrap gap-5 w-full">
          {data.map((item, index) => (
            <Link
              href={item.url}
              key={index}
              className=" hover:scale-102 cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0.2, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center rounded-md shadow w-full max-w-150 hover:bg-cardGray duration-300 bg-white"
              >
                <div className="h-63 w-full">
                  <Image
                    src={item.img}
                    height={272}
                    width={500}
                    alt="related image"
                    className="h-full w-full rounded-t-md object-cover"
                  />
                </div>
                <div className="rounded-b-md bg-pBlue text-white w-full p-6">
                  <h6 className="mb-3">{item.title}</h6>
                  <div className="mb-2 h-0.5 w-full bg-[#9CA3AF]" />
                  <p className="text-sm text-[#B8BFCA]">{item.desc}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
      {/* Mobile View - Swiper */}
      <div className="w-full lg:hidden">
        <Swiper
          spaceBetween={20}
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          // loop
          className=""
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center rounded-md 
                  shadow w-full hover:bg-cardGray duration-300 bg-white"
              >
                <div className="h-63 w-full">
                  <Image
                    src={item.img}
                    height={272}
                    width={500}
                    alt="related image"
                    className="h-full w-full rounded-t-md object-cover"
                  />
                </div>
                <div className="rounded-b-md bg-pBlue text-white w-full p-6">
                  <h6 className="mb-3">{item.title}</h6>
                  <div className="mb-2 h-0.5 w-full bg-[#9CA3AF]" />
                  <p className="text-sm text-[#B8BFCA]">{item.desc}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OurIntegratedStrength;
