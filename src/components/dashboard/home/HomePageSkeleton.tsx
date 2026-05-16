// components/home/HomePageSkeleton.jsx
"use client";

const HomePageSkeleton = () => {
  return (
    <div className="bg-white rounded-lg p-6 animate-pulse">
      {/* Edit Button Skeleton */}
      <div className="flex justify-end mb-6">
        <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Carousel Images Skeleton */}
      <div className="mb-6">
        <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
        <div className="flex flex-wrap gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-32 lg:w-60 h-32 lg:h-60 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>

      {/* Heading Text Skeleton */}
      <div className="mb-6">
        <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
        <div className="h-12 w-full bg-gray-200 rounded"></div>
      </div>

      {/* Subheading Text Skeleton */}
      <div className="mb-6">
        <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
        <div className="h-24 w-full bg-gray-200 rounded"></div>
      </div>

      {/* CTA Buttons Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
          <div className="h-10 w-full bg-gray-200 rounded mb-3"></div>
          <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
          <div className="h-10 w-full bg-gray-200 rounded"></div>
        </div>
        <div>
          <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
          <div className="h-10 w-full bg-gray-200 rounded mb-3"></div>
          <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
          <div className="h-10 w-full bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePageSkeleton;