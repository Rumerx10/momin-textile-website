// app/dashboard/media/MediaDetailsModal.jsx
"use client";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";

interface MediaDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    id: number;
    caption: string;
    subheading: string;
    unitType: string;
    mediaType: string;
    image: string;
    url?: string;
  };
}

const MediaDetailsModal = ({
  isOpen,
  onClose,
  data,
}: MediaDetailsModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const unitTypeLabels: Record<string, string> = {
    SPINNING: "Spinning Unit",
    WOVEN: "Woven Dyeing & Finishing",
    FABRIC: "Fabric Manufacturing",
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-1000 overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-modern"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-5 flex justify-between items-center">
            <h5 className="font-bold text-pBlue text-xl">Media Details</h5>
            <button
              onClick={onClose}
              className="h-10 w-10 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors"
            >
              <RxCross2 size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Image */}
            {data.image && (
              <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={data.image}
                  alt={data.caption}
                  fill
                  className="object-contain"
                />
              </div>
            )}

            {/* Video URL */}
            {data.mediaType === "VIDEO" && data.url && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-pGray text-xs mb-1">Video URL</p>
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pBlue hover:underline"
                >
                  {data.url}
                </a>
              </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-pGray text-xs">Caption</p>
                <p className="text-pBlue font-medium">{data.caption || "-"}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-pGray text-xs">Subheading</p>
                <p className="text-pBlue font-medium">
                  {data.subheading || "-"}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-pGray text-xs">Media Type</p>
                <p className="text-pBlue font-medium">
                  {data.mediaType === "IMAGE" ? "Image" : "Video"}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-pGray text-xs">Category Unit</p>
                <p className="text-pBlue font-medium">
                  {unitTypeLabels[data.unitType] || data.unitType}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetailsModal;
