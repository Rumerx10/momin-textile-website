"use client";
import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { HeroContext } from "@/src/context/HeroContext";
import ModalImageGallery from "@/src/components/ModalImageGallery";
import PaginationComponent from "@/src/components/Pagination";

interface ImageItem {
  id: number;
  img: string;
  title: string;
  desc: string;
  category?: string;
}

interface ImagesProps {
  images?: {
    metadata: {
      total: number;
      itemPerPage: number;
      totalPage: number;
      currentPage: number;
    };
    data: ImageItem[];
  };
  currentFilter?: string;
}

const Images = ({ images: propImages, currentFilter }: ImagesProps) => {
  const { setTitle } = useContext(HeroContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Use prop images if provided, otherwise use empty structure
  const imageData = propImages || {
    metadata: {
      total: 0,
      itemPerPage: 8,
      totalPage: 0,
      currentPage: 1,
    },
    data: [],
  };
  
  const { data: imagesData, metadata } = imageData;
  const itemsPerPage = metadata.itemPerPage;
  
  // Calculate total pages based on filtered data
  const totalPages = Math.ceil(imagesData.length / itemsPerPage);
  
  // Calculate pagination for filtered images
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentImages = imagesData.slice(startIndex, endIndex);

  useEffect(() => {
    if (setTitle) {
      setTitle("Image Gallery");
    }
  }, [setTitle]);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [currentFilter]);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        {currentImages.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => {
              setIsModalOpen(true);
              const originalIndex = imagesData.findIndex(
                (img) => img.id === item.id
              );
              setActiveIndex(originalIndex);
            }}
            className="relative cursor-pointer overflow-hidden h-72 md:h-80 w-full rounded-lg group"
          >
            <Image
              src={item.img}
              alt={item.title}
              height={385}
              width={369}
              className="w-full h-full object-cover rounded-lg bg-gray-50 transition-transform duration-300 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 px-4
              duration-300 flex flex-col items-center justify-center space-y-2
              bg-pBlue/85 text-white text-center"
            >
              <h3 className="font-bold text-base md:text-lg">{item.title}</h3>
              <p className="text-xs md:text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {currentImages.length === 0 && (
        <div className="flex items-center justify-center h-64">
          <p className="text-pGray text-lg">
            No images found in this category.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 md:mt-10 lg:mt-12">
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <ModalImageGallery
          images={imagesData}
          setIsModalOpen={setIsModalOpen}
          initialIndex={activeIndex}
        />
      )}
    </div>
  );
};

export default Images;