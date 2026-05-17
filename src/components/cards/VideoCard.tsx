// components/cards/VideoCard.jsx
"use client";
import Image from "next/image";
import { FaRegCirclePlay } from "react-icons/fa6";
import { useState } from "react";
import ModalVideoPlayer from "../main/media-gallery/ModalVideoPlayer";

interface VideoCardProps {
  img: string;
  title: string;
  desc: string;
  videoUrl?: string;
}

const VideoCard = ({ img, title, desc, videoUrl }: VideoCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Convert YouTube watch URL to embed URL if needed
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const handlePlayClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div 
        className="border rounded-lg overflow-hidden cursor-pointer group"
        onClick={handlePlayClick}
      >
        <div className="relative h-54 w-full">
          <Image
            src={img}
            height={215}
            width={369}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/40 flex items-end">
            <div className="text-white px-6 py-4 space-y-1 flex flex-col z-10">
              <h6 className="font-bold text-lg line-clamp-1">{title}</h6>
              <p className="line-clamp-1 text-sm">{desc}</p>
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <FaRegCirclePlay 
                size={64} 
                className="opacity-80 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-110 transform"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;