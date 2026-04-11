"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const AboutUs = () => {
  return (
    <div className="flex items-center justify-center py-20 px-5">
      <div className="flex flex-col items-center gap-10 lg:gap-20 w-full max-w-[1536px]">
        {/* Header */}
        <div className="flex flex-col gap-4 text-center">
          <div className="flex flex-col items-center">
            <motion.h1
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-textBlack text-4xl md:text-5xl font-bold"
            >
              About Us
            </motion.h1>
            <div className="h-1 w-36 bg-red my-7" />
          </div>
          <motion.p
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-textGray text-lg"
          >
            Kems Group established in 2007, is a leading knit and woven garments{" "}
            <br />
            manufacturer based in Dhaka, Bangladesh. We combine modern
            technology
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-center lg:justify-between w-full">
          <div className="relative w-full lg:w-6/12 h-full">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-8/12"
            >
              <Image
                src="/assets/Home/AboutSection/Rectangle 324.png"
                alt="about img"
                height={665}
                width={513}
                className="roundex-sm h-full w-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute shadow-2xl top-10 lg:top-22 bottom-10 lg:bottom-22 right-0"
            >
              <Image
                src="/assets/Home/AboutSection/Rectangle 325.png"
                alt="about img"
                height={488}
                width={450}
                className=" rounded-sm w-full h-full object-cover "
              />
            </motion.div>
          </div>
          <div className="flex flex-col w-full lg:w-6/12">
            <motion.h1
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-textBlack text-3xl lg:text-5xl font-bold"
            >
              Building <br /> Excellence Since 2007
              <div className="h-1 w-36 bg-red my-7" />
            </motion.h1>
            <motion.p
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-textGray"
            >
              Kems Group established in 2007, is a leading knit and woven
              garments manufacturer based in Dhaka, Bangladesh. We combine
              modern technology with skilled professionals to produce
              world-class fashion for top global clients. Our three 100%
              export-oriented facilities—KEMS FASHION LTD, KASHFI KNIT WARES
              LTD, and ALI GARMENTS LTD, SHAFI KNIT LTD—serve as a one-stop
              source for high-quality apparel, supplying markets worldwide.
            </motion.p>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/about">
                <button className="bg-red hover:bg-red-800 px-16 py-3 rounded-sm text-white font-bold mt-16 cursor-pointer">
                  See More
                </button></Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
