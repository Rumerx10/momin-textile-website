"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Certifications1,
  Certifications2,
  QualityNSustainabilityData,
} from "@/docs/data";

const QualityNSustainability = () => {
  return (
    <div className="relative min-h-150 md:min-h-175 lg:h-auto overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/quality-sustainability.png"
          alt="Quality and sustainability background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/85" />
      </div>

      {/* Content Overlay */}
      <div className="relative container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <div className="flex flex-col gap-8 md:gap-12 lg:gap-16 items-center justify-center">
          {/* Header Section */}
          <div className="space-y-4 text-center text-white">
            <h1 className="font-bold text-3xl lg:text-4xl">
              Quality and Sustainability
            </h1>
            <div className="flex justify-center">
              <p className="max-w-210">
                Global-standard quality at every step from raw material
                selection to finished fabric <br /> inspection. Our eco-friendly
                dyeing, ETP , and waste management systems
              </p>
            </div>
          </div>

          {/* Content Grid */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-22! justify-between w-full">
            {/* Left Side - Quality & Sustainability Items */}
            <div className="space-y-6 md:space-y-8 lg:space-y-11 w-full lg:w-1/2">
              {QualityNSustainabilityData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex gap-4 justify-center w-full transition duration-300"
                >
                  {/* Icon */}
                  <div className="shrink-0 w-12 h-12 md:w-13 md:h-13 text-tBlue">
                    <Image
                      src={item.img}
                      height={52}
                      width={52}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="w-full">
                    <h3 className="mb-2 text-white font-bold text-lg md:text-xl">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/90 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Side - Certifications Section */}
            <div className="flex flex-col text-white w-full lg:w-1/2">
              <div className="font-bold text-xl md:text-2xl mb-4 md:mb-6">
                Certifications
              </div>

              <div className="space-y-5">
                {/* First Row - Square Certifications */}
                <div className="flex flex-wrap justify-center lg:justify-between gap-5">
                  {Certifications1.map((certificate, idx) => (
                    <div
                      key={idx}
                      className="shrink-0 border border-white rounded-lg p-3 md:p-5
                      flex items-center justify-center"
                    >
                      <Image
                        src={certificate}
                        alt="certification"
                        height={48}
                        width={48}
                        className="h-12 w-12 object-contain"
                      />
                    </div>
                  ))}
                </div>

                {/* Second Row - Rectangular Certifications */}
                <div className="flex gap-5">
                  {Certifications2.map((certificate, idx) => (
                    <div
                      key={idx}
                      className="border border-white rounded-lg p-3 md:p-5 flex items-center justify-center w-full"
                    >
                      <Image
                        src={certificate}
                        alt="certification"
                        height={45}
                        width={90}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityNSustainability;
