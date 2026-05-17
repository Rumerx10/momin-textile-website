// components/CompanyProfileCardSkeleton.jsx
import React from "react";

const CompanyProfileCardSkeleton = () => {
  return (
    <div className="p-4 space-y-6 border border-bdrGray rounded-lg animate-pulse">
      {/* Company Profile Label */}
      <div>
        <div className="h-4 bg-gray-200 rounded w-28 mb-1.5"></div>
        <div className="h-7 bg-gray-200 rounded w-full"></div>
      </div>
      
      {/* Description */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-11/12"></div>
        <div className="h-4 bg-gray-200 rounded w-10/12"></div>
      </div>
      
      {/* Date */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-28"></div>
      </div>
      
      {/* Buttons */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="h-11 bg-gray-200 rounded w-full"></div>
        <div className="h-11 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
};

export default CompanyProfileCardSkeleton;