// components/ImageGallery.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Link from "next/link";
import ModalImageGallery from "./ModalImageGallery";
import { useFetchData } from "@/hooks/useApi";

interface MediaItem {
  id: number;
  mediaType: string;
  unitType: string;
  caption: string;
  subheading: string;
  image: string;
  url: string | null;
  createdAt: string;
  updatedAt: string;
}

const ImageGallery = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState<MediaItem[]>([]);

  // Fetch image data
  const { data: apiData, isLoading, error } = useFetchData(
    ["media", "IMAGE"],
    "/media?sortOrder=asc&isActive=true&mediaType=IMAGE",
    { enabled: true, refetchOnMount: true }
  );

  useEffect(() => {
    if (apiData?.data && Array.isArray(apiData.data)) {
      setImages(apiData.data);
    }
  }, [apiData]);

  // Transform images for modal (convert to expected format)
  const modalImages = {
    metadata: {
      total: images.length,
      itemPerPage: images.length,
      totalPage: 1,
      currentPage: 1,
    },
    data: images.map((item) => ({
      img: item.image,
      title: item.caption,
      desc: item.subheading,
    })),
  };

  if (isLoading) {
    return (
      <div className="bg-bgGray">
        <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
          <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
            <div className="space-y-4 text-center">
              <div className="h-10 bg-gray-200 rounded-lg w-48 mx-auto animate-pulse"></div>
              <div className="flex justify-center">
                <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative h-96 w-full rounded-lg bg-gray-200 animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-bgGray">
        <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
          <div className="text-center text-red-500">
            Failed to load images. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgGray">
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
          <div className="space-y-4 text-center">
            <h4 className="font-bold text-3xl lg:text-4xl">Image Gallery</h4>
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
              {images?.map((item, idx) => (
                <SwiperSlide
                  key={item.id}
                  className="flex items-center justify-center"
                >
                  <div
                    onClick={() => {
                      setIsModalOpen(true);
                      setActiveIndex(idx);
                    }}
                    className="relative cursor-pointer overflow-hidden h-96 w-full max-w-sm rounded-lg group"
                  >
                    <Image
                      src={item.image}
                      alt={item.caption || `Gallery image ${idx + 1}`}
                      height={385}
                      width={369}
                      className="w-full h-full object-cover rounded-lg bg-gray-50 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 px-4
                      duration-300 flex flex-col items-center justify-center space-y-1
                      bg-pBlue/80 text-white text-center"
                    >
                      <h6 className="font-bold text-lg">{item.caption}</h6>
                      <p className="text-sm">{item.subheading}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons - Hidden on mobile, visible on desktop */}
            {images.length > 4 && (
              <>
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
              </>
            )}
          </div>

          <Link href="/media-gallery">
            <button
              className="border border-[#959FB1] rounded-sm px-12.5 py-2.5
              hover:bg-tBlue hover:text-white cursor-pointer duration-300 text-tBlue font-medium text-center"
            >
              Explore All Images
            </button>
          </Link>
        </div>
      </div>
      
      {isModalOpen && (
        <ModalImageGallery
          images={modalImages}
          setIsModalOpen={setIsModalOpen}
          initialIndex={activeIndex}
        />
      )}
    </div>
  );
};

export default ImageGallery;