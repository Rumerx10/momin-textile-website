// app/media-gallery/Videos.jsx
"use client";
import VideoCard from "@/components/cards/VideoCard";
import { useState, useEffect, useContext } from "react";
import { HeroContext } from "@/context/HeroContext";

import Pagination from "@/components/Pagination";
import ModalVideoPlayer from "./ModalVideoPlayer";

interface VideoItem {
  id: string | number;
  videoUrl: string;
  title: string;
  desc: string;
  coverImg: string;
  category: string;
}

interface VideosProps {
  videos?: {
    metadata: {
      total: number;
      itemPerPage: number;
      totalPage: number;
      currentPage: number;
    };
    data: VideoItem[];
  };
  currentFilter?: string;
}

const Videos = ({ videos: propVideos, currentFilter }: VideosProps) => {
  const { setTitle } = useContext(HeroContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const videoData = propVideos || {
    metadata: { total: 0, itemPerPage: 6, totalPage: 0, currentPage: 1 },
    data: [],
  };
  
  const { data: videosData, metadata } = videoData;
  const itemsPerPage = metadata.itemPerPage || 6;
  const totalPages = Math.ceil(videosData.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVideos = videosData.slice(startIndex, endIndex);

  useEffect(() => {
    if (setTitle) setTitle("Video Gallery");
  }, [setTitle]);

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

  const handleVideoClick = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
        {currentVideos.map((video: VideoItem) => (
          <div 
            key={video.id} 
            onClick={() => handleVideoClick(video)}
            className="cursor-pointer"
          >
            <VideoCard
              img={video.coverImg}
              title={video.title}
              desc={video.desc}
              videoUrl={video.videoUrl}
            />
          </div>
        ))}
      </div>

      {currentVideos.length === 0 && (
        <div className="flex items-center justify-center h-64">
          <p className="text-pGray text-lg">No videos found in this category.</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 md:mt-10 lg:mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {isModalOpen && selectedVideo && (
        <ModalVideoPlayer
          video={selectedVideo}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default Videos;