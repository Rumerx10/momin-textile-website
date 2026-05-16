"use client";

const MediaCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
          {/* Image Skeleton */}
          <div className="relative h-48 bg-gray-200"></div>

          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            {/* Caption Skeleton */}
            <div className="h-5 bg-gray-200 rounded-lg w-3/4"></div>

            {/* Subheading Skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded-lg w-full"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-2/3"></div>
            </div>

            {/* Category Badge Skeleton */}
            <div className="h-6 bg-gray-200 rounded-full w-24"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaCardSkeleton;
