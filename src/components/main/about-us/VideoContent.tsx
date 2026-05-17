"use client";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import GalleryCarousel from "@/components/GalleryCarousel";
import VideoCard from "@/components/cards/VideoCard";
import { useFetchData } from "@/hooks/useApi";
import ModalVideoPlayer from "../media-gallery/ModalVideoPlayer";

interface VideoItem {
  id: number;
  mediaType: string;
  unitType: string;
  caption: string;
  subheading: string;
  image: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

const VideoContent = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch video data
  const {
    data: apiData,
    isLoading,
    error,
  } = useFetchData(
    ["media", "VIDEO"],
    "/media?sortOrder=asc&isActive=true&mediaType=VIDEO",
    { enabled: true, refetchOnMount: true },
  );

  useEffect(() => {
    if (apiData?.data && Array.isArray(apiData.data)) {
      setVideos(apiData.data);
    }
  }, [apiData]);

  const handleVideoClick = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="flex flex-col gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
            <div className="flex">
              <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="border rounded-lg overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="text-center text-red-500">
          Failed to load videos. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="flex flex-col gap-8 lg:gap-12">
          <div className="space-y-4">
            <h4 className="font-bold text-3xl lg:text-4xl">Video contents</h4>
            <div className="flex">
              <p className="text-pGray max-w-210">
                Showcasing our high-speed automated looms ensuring flawless
                fabric texture and consistency.
              </p>
            </div>
          </div>
          <div className="relative flex flex-col gap-8 lg:gap-12 items-center w-full justify-center">
            <GalleryCarousel data={videos}>
              {(video) => (
                <div onClick={() => handleVideoClick(video)}>
                  <VideoCard
                    key={video.id}
                    img={video.image}
                    title={video.caption}
                    desc={video.subheading}
                    videoUrl={video.url}
                  />
                </div>
              )}
            </GalleryCarousel>
            <Link href="/media-gallery">
              <button
                className="border border-[#959FB1] rounded-sm px-12.5 py-2.5
            hover:bg-tBlue hover:text-white cursor-pointer duration-300 text-tBlue font-medium text-center"
              >
                Explore All Videos{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <ModalVideoPlayer
          video={{
            id: selectedVideo.id,
            videoUrl: selectedVideo.url,
            title: selectedVideo.caption,
            desc: selectedVideo.subheading,
            coverImg: selectedVideo.image,
          }}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default VideoContent;
