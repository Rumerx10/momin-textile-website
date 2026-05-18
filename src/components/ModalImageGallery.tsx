// components/ModalImageGallery.jsx
"use client";
import { useRef } from "react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

interface ImageItem {
  id?: number;
  img: string;
  title: string;
  desc: string;
}

interface ModalImageGalleryProps {
  images: ImageItem[] | { data: ImageItem[]; metadata?: any };
  setIsModalOpen: (value: boolean) => void;
  initialIndex: number;
}

const ModalImageGallery = ({
  images,
  setIsModalOpen,
  initialIndex,
}: ModalImageGalleryProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  // Extract array from images prop (handles both array and object with data property)
  const getImagesArray = (): ImageItem[] => {
    if (Array.isArray(images)) {
      return images;
    }
    if (images && typeof images === 'object' && 'data' in images && Array.isArray(images.data)) {
      return images.data;
    }
    return [];
  };

  const imagesArray = getImagesArray();

  if (!imagesArray || imagesArray.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-1000
      overflow-hidden h-screen flex items-center justify-center"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="h-[90%] lg:h-[80%] relative container mx-auto px-4 
        flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          initialSlide={initialIndex}
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{
            type: "fraction",
            clickable: true,
          }}
          className="w-full h-full"
        >
          {imagesArray.map((item: ImageItem, idx: number) => (
            <SwiperSlide
              key={item.id || idx}
              className="flex items-center justify-center"
            >
              <div className="relative h-full w-full">
                <Image
                  src={item.img}
                  alt={item.title || `Gallery image ${idx + 1}`}
                  height={900}
                  width={1920}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 duration-300 flex flex-col justify-end text-white">
                  <div className="m-6 p-5 w-[80%] lg:w-1/2 backdrop-blur-lg bg-black/70 rounded-lg">
                    <h6 className="font-bold text-md md:text-lg">
                      {item.title}
                    </h6>
                    <p className="text-xs md:text-base">{item.desc}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Close Button */}
        <button
          onClick={() => {
            setIsModalOpen(false);
          }}
          className="absolute z-10 rounded-full scale-80 lg:scale-100 lg:rounded-sm h-11 w-11 -top-6 lg:-top-5 
          right-0 lg:-right-1.5 bg-white hover:bg-red-200 flex items-center justify-center
          duration-300"
          aria-label="Close modal"
        >
          <RxCross2 size={24} className="text-gray-800" />
        </button>

        {/* Navigation Buttons */}
        {imagesArray.length > 1 && (
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
              className="absolute right-0 -mr-20 z-10 text-pGray h-11 w-11 bg-white items-center justify-center rounded-sm hover:bg-gray-100 transition-colors md:-mr-16 sm:-mr-12 hidden md:flex"
              aria-label="Next slide"
            >
              <RiArrowRightSLine size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalImageGallery;