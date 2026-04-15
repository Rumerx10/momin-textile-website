"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <div id="services" className="flex items-center justify-center py-20 px-5">
      <div className="container flex flex-col items-center gap-10 lg:gap-20 w-full">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-center lg:justify-between w-full">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col w-full lg:w-6/12"
          >
            <h1 className="text-textBlack text-3xl lg:text-5xl font-bold">
              Services
              <div className="h-1 w-36 bg-red my-7" />
            </h1>
            <p className="text-textGray">
              Kems Group established in 2007, is a leading knit and woven
              garments manufacturer based in Dhaka, Bangladesh. We combine
              modern technology with skilled professionals to produce
              world-class fashion for top global clients. Our three 100%
              export-oriented facilities.
            </p>
            <div>
              <Link href="/productions">
                <button className="bg-red hover:bg-red-800 px-16 py-3 rounded-sm text-white font-bold mt-16 cursor-pointer">
                  See More
                </button>
              </Link>
            </div>
          </motion.div>

          <div className="relative flex justify-end w-full lg:w-6/12 h-full">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-8/12"
            >
              <Image
                src="/assets/Home/ServiceSection/Rectangle 311.png"
                alt="about img"
                height={665}
                width={513}
                className="roundex-sm h-full w-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute shadow-2xl top-10 lg:top-22 bottom-10 lg:bottom-22 left-0"
            >
              <Image
                src="/assets/Home/ServiceSection/Rectangle 312.png"
                alt="about img"
                height={488}
                width={450}
                className=" rounded-sm w-full h-full object-cover "
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
