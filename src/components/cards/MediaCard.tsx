// components/cards/MediaCard.jsx
"use client";
import Image from "next/image";
import { Eye, Edit, Trash2 } from "lucide-react";
import { FaCirclePlay } from "react-icons/fa6";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";

interface MediaCardProps {
  id: number;
  image: string;
  caption: string;
  subheading: string;
  unitType: string;
  mediaType: string;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const MediaCard = ({
  image,
  caption,
  subheading,
  unitType,
  mediaType,
  onView,
  onEdit,
  onDelete,
}: MediaCardProps) => {
  const unitTypeLabels: Record<string, string> = {
    SPINNING: "Spinning Unit",
    WOVEN: "Woven Dyeing & Finishing",
    FABRIC: "Fabric Manufacturing",
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      onClick={onView}
      className="cursor-pointer group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {image ? (
          <>
            <Image
              src={image}
              alt={caption || "Media thumbnail"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Video Play Button Overlay for Video Type */}
            {mediaType === "VIDEO" && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full text-white flex items-center justify-center">
                  <FaCirclePlay size={48} />
                </div>
              </div>
            )}
            <div className="absolute bottom-4 left-4 inline-block px-2 py-1 bg-[#E8EAEE] text-pBlue text-xs rounded-full">
              {unitTypeLabels[unitType] || unitType}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-center">
              <MdOutlinePhotoSizeSelectActual size={48} className="mx-auto" />
              <p className="text-gray-400 text-sm">No Image</p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h6 className="font-bold text-pBlue text-lg mb-1 line-clamp-1">
          {caption || "Untitled"}
        </h6>
        <p className="text-pGray text-sm mb-2 line-clamp-2">
          {subheading || "No description"}
        </p>
      </div>

      {/* Action Buttons - Visible on Hover */}
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={handleEditClick}
          className="p-1.5 bg-white rounded-full shadow-md hover:bg-green-50 transition-colors"
          title="Edit"
        >
          <Edit size={16} className="text-green-600" />
        </button>
        <button
          onClick={handleDeleteClick}
          className="p-1.5 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
          title="Delete"
        >
          <Trash2 size={16} className="text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default MediaCard;
