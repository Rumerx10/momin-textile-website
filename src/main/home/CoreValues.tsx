"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { CoreValuesData } from "@/docs/data";

const CoreValues = () => {
  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-5 lg:gap-16 items-center justify-center">
        <div className="space-y-4 text-center">
          <h1 className="font-bold text-3xl lg:text-4xl">Core Values</h1>
          <div className="flex justify-center">
            <p className=" text-pGray max-w-210">
              At Momin Textile Mills Ltd, our values drive every decision we
              make. We stand for <br /> uncompromising quality, sustainable
              innovation, and long-term partnerships.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center w-full">
          {CoreValuesData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.2, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="p-5 flex gap-4 justify-center rounded-md w-full max-w-107 hover:bg-cardGray duration-300 bg-white"
            >
              <div className="h-13 w-13">
                <Image
                  src={item.img}
                  height={52}
                  width={52}
                  alt="related image"
                  className="h-full w-full rounded-t-md object-contain"
                />
              </div>
              <div className="w-full">
                <h3 className="mb-2 text-tBlue font-bold text-xl">
                  {item.title}
                </h3>
                <p className="text-sm text-pGray">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreValues;
