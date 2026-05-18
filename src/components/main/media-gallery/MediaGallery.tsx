// app/media-gallery/page.jsx
"use client";

import { HeroContext } from "@/context/HeroContext";
import { useContext, useEffect, useState } from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { SlPicture } from "react-icons/sl";
import Videos from "./Videos";
import Images from "./Images";
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

const MediaGallery = () => {
  const [mediaType, setMediaType] = useState("videos");
  const [filter, setFilter] = useState("all");
  const [filteredVideos, setFilteredVideos] = useState<any>({ metadata: {}, data: [] });
  const [filteredImages, setFilteredImages] = useState<any>({ metadata: {}, data: [] });

  const { setTitle } = useContext(HeroContext);
  
  // Fetch all media data
  const { data: apiData, isLoading } = useFetchData(
    ["media", "all"],
    "/media?sortOrder=asc&isActive=true",
    { enabled: true, refetchOnMount: true }
  );

  useEffect(() => {
    setTitle("Media Gallery");
  }, [setTitle]);

  // Unit Types for filtering (matching API unitType values)
  const UnitTypes = [
    { label: "Spinning Unit", value: "SPINNING" },
    { label: "Woven Dyeing & Finishing", value: "WOVEN" },
    { label: "Fabric Manufacturing", value: "FABRIC" },
  ];

  // Process and filter media data
  useEffect(() => {
    if (!apiData?.data) return;

    const allMedia = apiData.data as MediaItem[];
    
    // Filter videos
    const videos = allMedia.filter(item => item.mediaType === "VIDEO");
    const images = allMedia.filter(item => item.mediaType === "IMAGE");

    // Apply category filter to videos
    let filteredVideosData = videos;
    if (filter !== "all") {
      filteredVideosData = videos.filter(video => video.unitType === filter);
    }

    // Apply category filter to images
    let filteredImagesData = images;
    if (filter !== "all") {
      filteredImagesData = images.filter(image => image.unitType === filter);
    }

    // Transform to required format
    setFilteredVideos({
      metadata: {
        total: filteredVideosData.length,
        itemPerPage: 6,
        totalPage: Math.ceil(filteredVideosData.length / 6),
        currentPage: 1,
      },
      data: filteredVideosData.map(video => ({
        id: video.id,
        videoUrl: video.url || "",
        title: video.caption,
        desc: video.subheading,
        coverImg: video.image,
        category: video.unitType,
      })),
    });

    setFilteredImages({
      metadata: {
        total: filteredImagesData.length,
        itemPerPage: 8,
        totalPage: Math.ceil(filteredImagesData.length / 8),
        currentPage: 1,
      },
      data: filteredImagesData.map(image => ({
        id: image.id,
        img: image.image,
        title: image.caption,
        desc: image.subheading,
        category: image.unitType,
      })),
    });
  }, [apiData, filter]);

  // Reset filter when media type changes
  useEffect(() => {
    setFilter("all");
  }, [mediaType]);

  if (isLoading) {
    return (
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-12 animate-pulse">
          <div className="space-y-4 text-center">
            <div className="h-10 bg-gray-200 rounded w-96 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
          </div>
          <div className="flex justify-center gap-4">
            <div className="h-10 w-32 bg-gray-200 rounded"></div>
            <div className="h-10 w-32 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-6 md:gap-8 lg:gap-12">
        {/* Header Section */}
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
          <div className="space-y-4 text-center">
            <h4 className="font-bold text-pBlue text-2xl md:text-3xl lg:text-4xl">
              Explore Our Media Gallery
            </h4>
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
              <div className="flex flex-nowrap gap-2 md:gap-3 p-2 md:p-2.5 border rounded-sm shadow min-w-max sm:min-w-0">
                <button
                  onClick={() => setFilter("all")}
                  className={`w-full hover:shadow ${
                    filter === "all" 
                      ? "shadow border border-gray-300 bg-gray-50" 
                      : "border border-transparent"
                  } flex items-center justify-center h-9 md:h-10 px-3 md:px-4 py-1.5 md:py-2 font-medium text-pBlue rounded-sm transition-all duration-300 whitespace-nowrap`}
                >
                  All {mediaType === "videos" ? "Videos" : "Images"}
                </button>
                {UnitTypes.map((unit, idx) => (
                  <button
                    key={idx}
                    onClick={() => setFilter(unit.value)}
                    className={`w-full hover:shadow ${
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