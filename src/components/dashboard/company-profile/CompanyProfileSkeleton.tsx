// components/company-profile/CompanyProfileSkeleton.jsx
"use client";

const CompanyProfileSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
      <div className="flex justify-end mb-6">
        <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column Skeleton */}
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="w-5 h-5 bg-gray-200 rounded shrink-0"></div>
              <div className="flex-1">
                <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>
                <div className="h-5 w-full bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column Skeleton */}
        <div className="space-y-6">
          <div className="flex gap-3">
            <div className="w-5 h-5 bg-gray-200 rounded shrink-0"></div>
            <div className="flex-1">
              <div className="h-3 w-32 bg-gray-200 rounded mb-2"></div>
              <div className="h-5 w-40 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileSkeleton;