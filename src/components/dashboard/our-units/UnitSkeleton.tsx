import React from "react";

const UnitSkeleton = () => {
  return (
    <div className="bg-white rounded-lg p-6 animate-pulse">
      {/* Edit Button Skeleton */}
      <div className="flex justify-end mb-6">
        <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Main Image Skeleton */}
      <div className="mb-6">
        <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
        <div className="w-60 h-60 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Heading Text Skeleton */}
      <div className="mb-6">
        <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
        <div className="h-10 w-full bg-gray-200 rounded"></div>
      </div>

      {/* Details Text Skeleton */}
      <div>
        <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
        <div className="h-32 w-full bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default UnitSkeleton;
