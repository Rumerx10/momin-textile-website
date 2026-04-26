"use client";
import { useRef, useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { 
  FaPlay, 
  FaPause, 
  FaVolumeUp, 
  FaVolumeMute,
  FaExpand,
  FaCompress 
} from "react-icons/fa";

interface VideoItem {
  id: string | number;
  videoUrl: string;
  title: string;
  desc: string;
  coverImg: string;
}

const ModalVideoPlayer = ({
  video,
  setIsModalOpen,
}: {
  video: VideoItem;
  setIsModalOpen: (value: boolean) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const isYouTube = video.videoUrl.includes("youtube.com") || video.videoUrl.includes("youtu.be");

  useEffect(() => {
    if (videoRef.current && !isYouTube) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [video, isYouTube]);

  // Format time from seconds to MM:SS or HH:MM:SS
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleFullscreen = () => {
    const container = document.getElementById("video-container");
    if (!container) return;
    
    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (videoRef.current) {
          videoRef.current.pause();
        }
        setIsModalOpen(false);
      }
    };
    
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setIsModalOpen]);

  const progressPercentage = (currentTime / duration) * 100 || 0;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-1000
      overflow-hidden h-screen flex items-center justify-center"
      onClick={() => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
        setIsModalOpen(false);
      }}
    >
      <div
        id="video-container"
        className="h-auto lg:h-auto relative container mx-auto px-4 
        flex items-center justify-center w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full bg-black rounded-lg">
          {/* Video Player */}
          <div className="relative w-full bg-black">
            {isYouTube ? (
              <div className="aspect-video w-full">
                <iframe
                  src={video.videoUrl}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <video
                ref={videoRef}
                className="w-full aspect-video"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={handlePlayPause}
              >
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          {/* Video Info & Controls */}
          {!isYouTube && (
            <div className="p-4 md:p-6 space-y-4">
              {/* Title */}
              <h3 className="font-bold text-white text-lg md:text-xl">
                {video.title}
              </h3>

              {/* Progress Bar */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
                    [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-pBlue 
                    [&::-webkit-slider-thumb]:rounded-full"
                  style={{
                    background: `linear-gradient(to right, #2563EB ${progressPercentage}%, #4B5563 ${progressPercentage}%)`
                  }}
                />
                
                {/* Time Display */}
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center gap-4">
                {/* Play/Pause Button */}
                <button
                  onClick={handlePlayPause}
                  className="h-10 w-10 rounded-full bg-gray-700 hover:bg-pBlue 
                    flex items-center justify-center transition-colors duration-300"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <FaPause className="text-white text-sm" />
                  ) : (
                    <FaPlay className="text-white text-sm ml-0.5" />
                  )}
                </button>

                {/* Volume Control */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleMuteToggle}
                    className="h-8 w-8 rounded-full bg-gray-700 hover:bg-pBlue 
                      flex items-center justify-center transition-colors duration-300"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <FaVolumeMute className="text-white text-sm" />
                    ) : (
                      <FaVolumeUp className="text-white text-sm" />
                    )}
                  </button>
                  
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
                      [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-pBlue 
                      [&::-webkit-slider-thumb]:rounded-full"
                  />
                </div>

                {/* Fullscreen Button */}
                <button
                  onClick={handleFullscreen}
                  className="h-8 w-8 rounded-full bg-gray-700 hover:bg-pBlue 
                    flex items-center justify-center transition-colors duration-300 ml-auto"
                  aria-label="Fullscreen"
                >
                  {isFullscreen ? (
                    <FaCompress className="text-white text-sm" />
                  ) : (
                    <FaExpand className="text-white text-sm" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* For YouTube videos */}
          {isYouTube && (
            <div className="p-4 md:p-6">
              <h3 className="font-bold text-white text-lg md:text-xl">
                {video.title}
              </h3>
              <p className="text-gray-300 text-sm md:text-base mt-2 line-clamp-2">
                {video.desc}
              </p>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.pause();
              }
              setIsModalOpen(false);
            }}
            className="absolute z-10 -top-5 -right-5 h-10 w-10 rounded-full bg-white/10 
              hover:bg-red-500 flex items-center justify-center transition-colors duration-300"
            aria-label="Close video player"
          >
            <RxCross2 size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalVideoPlayer;