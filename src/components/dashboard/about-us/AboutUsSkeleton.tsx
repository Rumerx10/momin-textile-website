// components/about/AboutUsSkeleton.jsx
"use client";

const AboutUsSkeleton = () => {
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

      {/* Heading Skeleton */}
      <div className="mb-6">
        <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
        <div className="h-12 w-full bg-gray-200 rounded"></div>
      </div>

      {/* About Description Skeleton */}
      <div className="mb-6">
        <div className="h-6 w-40 bg-gray-200 rounded mb-3"></div>
        <div className="h-32 w-full bg-gray-200 rounded"></div>
      </div>

      {/* Excellence Images Skeleton */}
      <div className="mb-6">
        <div className="h-6 w-40 bg-gray-200 rounded mb-3"></div>
        <div className="flex flex-wrap gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-32 lg:w-48 h-32 lg:h-48 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>

      {/* Excellence Heading Skeleton */}
      <div className="mb-6">
        <div className="h-6 w-40 bg-gray-200 rounded mb-3"></div>
        <div className="h-12 w-full bg-gray-200 rounded"></div>
      </div>

      {/* Excellence Subheading Skeleton */}
      <div className="mb-6">
        <div className="h-6 w-48 bg-gray-200 rounded mb-3"></div>
        <div className="h-12 w-full bg-gray-200 rounded"></div>
      </div>

      {/* Points Skeleton */}
      <div>
        <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-2 mb-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-full bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsSkeleton;