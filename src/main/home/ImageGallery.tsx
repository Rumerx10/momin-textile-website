"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { CoreValuesData } from "@/docs/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const ImageGallery = () => {
  return (
    <div className="bg-bgGray">
      <div className="container px-4 mx-auto py-16">
        <div className="flex flex-col gap-5 lg:gap-16 items-center justify-center">
          <div className="space-y-4 text-center">
            <h1 className="font-bold text-3xl lg:text-4xl">Image Gallery</h1>
            <div className="flex justify-center">
              <p className=" text-pGray max-w-210">
                Our modern production floor combines technology and
                craftsmanship to <br /> deliver fabrics that meet international
                quality standards.
              </p>
            </div>
          </div>

          <div className="relative flex gap-5 max-h-96 border-2 border-red-500">
            {[
              "/gallery1.png",
              "/gallery2.png",
              "/gallery3.png",
              "/gallery4.png",
            ].map((img, idx) => (
              <div key={idx} className="max-h-96 max-w-92">
                <Image
                  src={img}
                  alt="image"
                  height={385}
                  width={369}
                  className="w-full h-full object-fill"
                />
              </div>
            ))}

            <div className="absolute h-11 w-11 bg-white flex items-center justify-center rounded-md -left-5.5 top-1/2 -translate-y-1/2 ">
              <FaArrowLeft />
            </div>
            <div className="absolute h-11 w-11 bg-white flex items-center justify-center rounded-md -right-5.5 top-1/2 -translate-y-1/2 ">
              <FaArrowRight />
            </div>
          </div>

          <div
            className="border border-[#959FB1] rounded-sm px-12.5 py-2.5
                hover:bg-tBlue hover:text-white cursor-pointer duration-300 text-tBlue font-medium text-center"
          >
            Explore All Images{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
