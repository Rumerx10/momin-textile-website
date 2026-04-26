"use client";

import { HeroContext } from "@/src/context/HeroContext";
import { useContext, useEffect, useState } from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { SlPicture } from "react-icons/sl";
import Videos from "./Videos";
import Images from "./Images";
import { VideoGalleryData, GalleryImagesData } from "@/docs/data";

const MediaGallery = () => {
  const [mediaType, setMediaType] = useState("videos");
  const [filter, setFilter] = useState("all");
  const [filteredVideos, setFilteredVideos] = useState(VideoGalleryData);
  const [filteredImages, setFilteredImages] = useState(GalleryImagesData);

  const { setTitle } = useContext(HeroContext);
  
  useEffect(() => {
    setTitle("Media Gallery");
  }, [setTitle]);

  // Unit Types for filtering
  const UnitTypes = [
    { label: "Spinning Unit", value: "Spinning Unit" },
    { label: "Woven Dyeing & Finishing", value: "Woven Dyeing & Finishing" },
    { label: "Fabric Manufacturing", value: "Fabric Manufacturing" },
  ];

  // Filter videos based on selected category
  useEffect(() => {
    if (filter === "all") {
      setFilteredVideos(VideoGalleryData);
    } else {
      const filteredData = VideoGalleryData.data.filter(
        (video) => video.category === filter
      );
      setFilteredVideos({
        metadata: {
          ...VideoGalleryData.metadata,
          total: filteredData.length,
          totalPage: Math.ceil(filteredData.length / VideoGalleryData.metadata.itemPerPage),
          currentPage: 1,
        },
        data: filteredData,
      });
    }
  }, [filter]);

  // Filter images based on selected category
  useEffect(() => {
    if (filter === "all") {
      setFilteredImages(GalleryImagesData);
    } else {
      const filteredData = GalleryImagesData.data.filter(
        (image) => image.category === filter
      );
      setFilteredImages({
        metadata: {
          ...GalleryImagesData.metadata,
          total: filteredData.length,
          totalPage: Math.ceil(filteredData.length / GalleryImagesData.metadata.itemPerPage),
          currentPage: 1,
        },
        data: filteredData,
      });
    }
  }, [filter]);

  // Reset filter when media type changes
  useEffect(() => {
    setFilter("all");
  }, [mediaType]);

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-6 md:gap-8 lg:gap-12">
        {/* Header Section */}
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
          <div className="space-y-3 text-center">
            <h1 className="font-bold text-pBlue text-2xl md:text-3xl lg:text-4xl">
              Explore Our Media Gallery
            </h1>
            <p className="text-pGray text-sm md:text-base max-w-3xl mx-auto px-4">
              Step inside Momin Textile Mills Ltd through our exclusive video
              gallery. Watch how innovation, precision, and passion come
              together.
            </p>
          </div>
          
          <div className="space-y-6 md:space-y-8">
            {/* Media Type Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setMediaType("videos")}
                className={`${
                  mediaType === "videos" 
                    ? "bg-pBlue text-white" 
                    : "bg-white text-pBlue"
                } px-5 md:px-6 py-2 h-10 md:h-11 border border-pBlue rounded-sm flex gap-2 items-center justify-center transition-colors duration-300 w-full sm:w-auto`}
              >
                <HiOutlineVideoCamera size={18} className="md:w-5 md:h-5" />
                <p className="text-sm md:text-base whitespace-nowrap">Explore All Videos</p>
              </button>
              <button
                onClick={() => setMediaType("images")}
                className={`${
                  mediaType === "images" 
                    ? "bg-pBlue text-white" 
                    : "bg-white text-pBlue"
                } px-5 md:px-6 py-2 h-10 md:h-11 border border-pBlue rounded-sm flex gap-2 items-center justify-center transition-colors duration-300 w-full sm:w-auto`}
              >
                <SlPicture size={16} className="md:w-4 md:h-4" />
                <p className="text-sm md:text-base whitespace-nowrap">Explore All Images</p>
              </button>
            </div>

            {/* Category Filters - Responsive */}
            <div className="w-full overflow-x-auto">
              <div className="flex flex-nowrap sm:flex-wrap gap-2 md:gap-3 p-2 md:p-2.5 border rounded-sm shadow min-w-max sm:min-w-0">
                <button
                  onClick={() => setFilter("all")}
                  className={`hover:shadow ${
                    filter === "all" 
                      ? "shadow border border-gray-300 bg-gray-50" 
                      : "border border-transparent"
                  } flex items-center justify-center h-9 md:h-10 px-3 md:px-4 py-1.5 md:py-2 font-medium text-pBlue rounded-sm text-xs md:text-sm transition-all duration-300 whitespace-nowrap`}
                >
                  All {mediaType === "videos" ? "Videos" : "Images"}
                </button>
                {UnitTypes.map((unit, idx) => (
                  <button
                    key={idx}
                    onClick={() => setFilter(unit.value)}
                    className={`hover:shadow ${
                      filter === unit.value 
                        ? "shadow border border-gray-300 bg-gray-50" 
                        : "border border-transparent"
                    } flex items-center justify-center h-9 md:h-10 px-3 md:px-4 py-1.5 md:py-2 font-medium text-pBlue rounded-sm text-xs md:text-sm transition-all duration-300 whitespace-nowrap`}
                  >
                    {unit.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div>
              {mediaType === "videos" ? (
                <Videos videos={filteredVideos} currentFilter={filter} />
              ) : (
                <Images images={filteredImages} currentFilter={filter} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaGallery;