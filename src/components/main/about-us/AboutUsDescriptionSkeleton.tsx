
import CompanyProfileCardSkeleton from '@/components/cards/CompanyProfileCardSkeleton';
import QuickLinksSkeleton from '@/components/QuickLinksSkeleton';
const AboutUsDescriptionSkeleton = () => {
  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
        <div className="w-full flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-[65%] space-y-10">
            {/* Heading Skeleton */}
            <div className="h-10 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
            
            <div className="space-y-10">
              {/* First paragraph Skeleton */}
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
              </div>
              
              {/* Highlight Box Skeleton */}
              <div className="bg-[#E8EAEE] rounded-lg space-y-4 p-4">
                <div className="h-7 bg-gray-200 rounded w-64 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-11/12 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-10/12 animate-pulse"></div>
                </div>
              </div>
              
              {/* Second paragraph Skeleton */}
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar Skeleton */}
          <div className="space-y-10 w-full lg:w-[35%]">
            <CompanyProfileCardSkeleton />
            <QuickLinksSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsDescriptionSkeleton;