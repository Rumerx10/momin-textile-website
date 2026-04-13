"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// import BusinessReportSvg from "@/svg/FeaturesSvg/BusinessReportSvg";
// import ObjectiveSvg from "@/svg/FeaturesSvg/ObjectiveSvg";
// import PieChartSvg from "@/svg/FeaturesSvg/PieChartSvg";

const Features = () => {
  const data = [
    {
      // img: <BusinessReportSvg />,
      img: "/placeholder.svg",
      title: "Monthly Capacity",
      desc: "KEMS Group delivers high-performance solutions with a robust monthly capacity, ensuring efficiency and reliability. Our expertise spans multiple industries.",
    },
    {
      // img: <PieChartSvg />,
      img: "/placeholder.svg",
      title: "Item Quality",
      desc: "KEMS Group prioritizes top-tier item quality, ensuring excellence in every product we deliver. Rigorous quality control measures guarantee durability, performance.",
    },
    {
      // img: <ObjectiveSvg />,
      img: "/placeholder.svg",
      title: "Our Objectives",
      desc: "KEMS Group strives to deliver innovative and high-quality solutions tailored to our clients' needs. Our goal is to ensure efficiency, reliability, and sustainability.",
    },
  ];

  return (
    <div className="flex items-center justify-center py-20 px-5">
      <div className="flex flex-col items-center gap-0 lg:gap-20 w-full max-w-7xl">
        <div className="flex flex-col gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <motion.h1
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-textBlack text-4xl md:text-5xl font-bold"
            >
              Features
            </motion.h1>
            <div className="h-2 bg-Red w-20" />
          </div>
          <motion.p
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-textGray text-lg"
          >
            KEMS Group stands out with cutting-edge technology, superior
            quality, and customer- <br className="hidden md:block" /> centric
            solutions. Our expertise ensures seamless project execution.
          </motion.p>
        </div>

        {/* Desktop/Tablet View */}
        <div className="flex scale-0 h-0 lg:h-auto lg:scale-100 flex-wrap gap-10 xl:gap-16 items-center justify-center xl:justify-between w-full">
          {data.map((item, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.2, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center gap-16 p-5 rounded-md shadow w-full max-w-84 hover:bg-cardGray duration-300 bg-white"
            >
              <div>{item.img}</div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col items-center gap-5">
                  <h1 className="text-textBlack text-2xl font-bold">
                    {item.title}
                  </h1>
                  <div className="h-2 bg-Red w-20" />
                </div>
                <p className="text-textGray text-lg text-center">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View - Swiper */}
        <div className="w-full lg:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ dynamicBullets: true, clickable: true }}
            loop
            className="custom-swiper-pagination"
          >
            {data.map((item, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center gap-8 p-6 rounded-xl shadow bg-white mx-4 my-10"
                >
                  <div>{item.img}</div>
                  <div className="flex flex-col items-center gap-4">
                    <h2 className="text-textBlack text-2xl font-bold">
                      {item.title}
                    </h2>
                    <div className="h-1 bg-Red w-16" />
                    <p className="text-textGray text-center text-base">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Features;
