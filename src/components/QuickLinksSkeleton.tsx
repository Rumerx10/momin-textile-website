// components/QuickLinksSkeleton.jsx

const QuickLinksSkeleton = () => {
  return (
    <div className="p-4 space-y-6 animate-pulse">
      {/* Header */}
      <div className="border-b border-bdrGray w-full">
        <div className="h-6 bg-gray-200 rounded w-28 mb-4"></div>
      </div>

      {/* Links */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="border-b border-bdrGray w-full">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-5 bg-gray-200 rounded w-32"></div>
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLinksSkeleton;
