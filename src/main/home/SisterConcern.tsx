"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { SisterConcerns } from "@/docs/data";

const SisterConcern = () => {
  return (
    <div className="bg-bgGray">
      <div className="container px-4 mx-auto py-16">
        <div className="flex flex-col gap-5 lg:gap-16 items-center justify-center">
          <div className="flex flex-col items-center gap-0 lg:gap-20 w-full">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <div className="flex w-full items-center gap-3">
                <motion.h1
                  initial={{ y: -100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-textBlack w-full text-3xl sm:text-4xl md:text-5xl font-bold"
                >
                  Sister Concern of Momin Group
                </motion.h1>
              </div>
              <motion.p
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-pGray text-base sm:text-lg text-center w-full lg:max-w-190"
              >
                Expanding Strength Through Diversified Excellence Through this
                integrated network, to deliver world-class products across local
                and international markets.
              </motion.p>
            </div>
          </div>

          <div className="lg:max-h-121 h-full flex flex-col lg:flex-row! gap-22 justify-between items-center">
            <div className="flex flex-col w-full">
              <h3 className="font-semibold text-justify lg:text-start text-xl lg:text-2xl! text-tBlue ">
                Momin Group operates multiple sister concerns that collectively
                strengthen its position in Bangladesh&apos;s textile and apparel
                industry. Each unit from spinning to finishing works together
                with a shared goal of innovation, quality, and growth.
              </h3>
              <div className="mt-10 lg:hidden max-h-121 h-full w-full">
                <Image
                  src="/sister-concern.png"
                  height={483}
                  width={614}
                  alt="sister-concern image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-10 lg:mt-16!">
                <div className="grid grid-cols-1  md:grid-cols-2! gap-x-15 gap-y-4">
                  {SisterConcerns.map((sis, idx) => (
                    <div
                      key={idx}
                      className="border-b-2 border-[#D1D5DB] max-w-98 w-full group cursor-pointer
                    flex items-center"
                    >
                      <div
                        className="h-0 w-0 mr-2 duration-300 
                      group-hover:h-0.5 group-hover:w-10 bg-pViolet mb-4"
                      />
                      <p className="group-hover:text-pViolet  mb-4 font-medium text-pGray">
                        {sis}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden lg:flex max-w-154 max-h-121 h-full w-full">
              <Image
                src="/sister-concern.png"
                height={483}
                width={614}
                alt="sister-concern image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SisterConcern;
