// components/modals/ViewDetailModal.jsx
"use client";
import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdBusiness,
  MdDownload,
  MdPictureAsPdf,
} from "react-icons/md";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";

interface ViewDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: {
    [key: string]: any;
  };
  fields: {
    key: string;
    label: string;
    type?: "text" | "array" | "phone" | "email" | "location" | "pdf" | "html";
    icon?: React.ReactNode;
    format?: (value: any) => React.ReactNode;
  }[];
  imageKey?: string;
}

const ViewDetailModal = ({
  isOpen,
  onClose,
  title,
  data,
  fields,
  imageKey,
}: ViewDetailModalProps) => {
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

  const renderValue = (value: any, type?: string, format?: (value: any) => React.ReactNode) => {
    // If custom format function is provided
    if (format) {
      return format(value);
    }

    // Handle HTML type (dangerouslySetInnerHTML)
    if (type === "html" && value) {
      return (
        <div 
          className="prose prose-sm max-w-none text-pBlue leading-relaxed"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      );
    }

    // Handle PDF type
    if (type === "pdf" && value) {
      const fileName = value.split("/").pop() || "Document";
      
      return (
        <Link
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-pBlue hover:text-pBlue/80 transition-colors group"
        >
          <MdPictureAsPdf size={20} className="text-red-500" />
          <span className="underline group-hover:no-underline">{fileName}</span>
          <MdDownload size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      );
    }

    // Handle array type
    if (type === "array" && Array.isArray(value)) {
      return value.join(", ");
    }

    // Handle regular values
    if (typeof value === "string" && !value) return "-";
    return value || "-";
  };

  const getIcon = (type?: string) => {
    switch (type) {
      case "email":
        return <MdEmail className="text-pBlue text-xl shrink-0" />;
      case "phone":
        return <MdPhone className="text-pBlue text-xl shrink-0" />;
      case "location":
        return <MdLocationOn className="text-pBlue text-xl shrink-0" />;
      case "pdf":
        return <MdPictureAsPdf className="text-red-500 text-xl shrink-0" />;
      default:
        return (
          <HiOutlineBuildingOffice className="text-pBlue text-xl shrink-0" />
        );
    }
  };

  // Separate message/description field from other fields
  const descriptionField = fields.find(field => field.key === "description");
  const otherFields = fields.filter(field => field.key !== "description");

  // Get image URL
  const imageUrl = imageKey ? data[imageKey] : null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-1000 overflow-y-auto"
      onClick={onClose}
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-modern"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-5 md:p-6 flex justify-between items-center">
            <h5 className="font-bold text-pBlue text-xl md:text-2xl">
              {title}
            </h5>
            <button
              onClick={onClose}
              className="h-10 w-10 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors duration-300"
            >
              <RxCross2 size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 md:p-6">
            {/* Image Section - at the top */}
            {imageUrl && (
              <div className="mb-6 flex justify-center">
                <div className="relative w-full max-w-md max-h-60 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                  <Image
                    src={imageUrl}
                    alt={title}
                    width={480}
                    height={240}
                    className="w-full h-full object-cover"
                    style={{ maxHeight: "240px" }}
                  />
                </div>
              </div>
            )}

            {/* Regular fields in 2-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {otherFields.map((field, idx) => {
                const value = data[field.key];
                const icon = field.icon || getIcon(field.type);
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl"
                  >
                    {icon}
                    <div className="flex-1">
                      <p className="text-pGray text-xs uppercase tracking-wide">
                        {field.label}
                      </p>
                      <div className="text-pBlue font-medium break-all">
                        {renderValue(value, field.type, field.format)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Description field - full width at the end with HTML support */}
            {descriptionField && (
              <div className="mt-5">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-pGray text-xs uppercase tracking-wide mb-2">
                    {descriptionField.label}
                  </p>
                  <div className="text-pBlue font-medium leading-relaxed">
                    {renderValue(data[descriptionField.key], "html", descriptionField.format)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailModal;