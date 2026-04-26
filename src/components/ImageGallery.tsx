"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import ModalImageGallery from "@/src/components/ModalImageGallery";
import { GalleryImagesData } from "@/docs/data";

const ImageGallery = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <div className="bg-bgGray">
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="flex flex-col gap-5 lg:gap-16 items-center justify-center">
          <div className="space-y-4 text-center">
            <h1 className="font-bold text-3xl lg:text-4xl">Image Gallery</h1>
            <div className="flex justify-center">
              <p className="text-pGray max-w-210">
                Our modern production floor combines technology and
                craftsmanship to <br /> deliver fabrics that meet international
                quality standards.
              </p>
            </div>
          </div>

          <div className="relative w-full flex items-center justify-center">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Autoplay, Navigation, Pagination]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              className="w-full"
            >
              {GalleryImagesData.data.map((item: any, idx: any) => (
                <SwiperSlide
                  key={idx}
                  className="flex items-center justify-center"
                >
                  <div
                    onClick={() => {
                      setIsModalOpen(true);
                      setActiveIndex(idx);
                    }}
                    className="relative cursor-pointer overflow-hidden h-96 w-full max-w-sm rounded-lg"
                  >
                    <Image
                      src={item.img}
                      alt={`Gallery image ${idx + 1}`}
                      height={385}
                      width={369}
                      className="w-full h-full object-cover rounded-lg bg-gray-50"
                    />
                    <div
                      className="absolute inset-0 opacity-0 hover:opacity-100 px-4
                      duration-300 flex flex-col items-center justify-center space-y-1
                      bg-pBlue/80 text-white text-center"
                    >
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons - Hidden on mobile, visible on desktop */}
            <button
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.slidePrev();
                }
              }}
              className="absolute left-0 -ml-20 z-10 text-pGray h-11 w-11 bg-white items-center justify-center rounded-sm hover:bg-gray-100 transition-colors md:-ml-16 sm:-ml-12 hidden md:flex"
              aria-label="Previous slide"
            >
              <RiArrowLeftSLine size={24} />
            </button>

            <button
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.slideNext();
                }
              }}
              className="absolute right-0 -mr-20 z-10 text-pGray h-11 w-11 bg-white items-center justify-center rounded-md hover:bg-gray-100 transition-colors md:-mr-16 sm:-mr-12 hidden md:flex"
              aria-label="Next slide"
            >
              <RiArrowRightSLine size={24} />
            </button>
          </div>

          <div
            className="border border-[#959FB1] rounded-sm px-12.5 py-2.5
            hover:bg-tBlue hover:text-white cursor-pointer duration-300 text-tBlue font-medium text-center"
          >
            Explore All Images{" "}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ModalImageGallery
          images={GalleryImagesData}
          setIsModalOpen={setIsModalOpen}
          initialIndex={activeIndex}
        />
      )}
    </div>
  );
};

export default ImageGallery;
