// components/about/MeetOurMembers.jsx
"use client";
import { useRef, useState, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import GalleryCarousel from "@/components/GalleryCarousel";
import MeetOurMemberCard from "@/components/cards/MeetOurMemberCard";
import { useFetchData } from "@/hooks/useApi";

interface MemberItem {
  id: number;
  name: string;
  designation: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const MeetOurMembers = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [members, setMembers] = useState<MemberItem[]>([]);

  // Fetch members data
  const { data: apiData, isLoading, error } = useFetchData(
    ["members"],
    "/members",
    { enabled: true, refetchOnMount: true }
  );

  useEffect(() => {
    if (apiData?.data && Array.isArray(apiData.data)) {
      setMembers(apiData.data);
    }
  }, [apiData]);

  if (isLoading) {
    return (
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
          <div className="space-y-4 text-center">
            <div className="h-10 bg-gray-200 rounded-lg w-64 mx-auto animate-pulse"></div>
            <div className="flex justify-center">
              <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-11/12"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="text-center text-red-500">
          Failed to load members. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
        <div className="space-y-4 text-center">
          <h4 className="font-bold text-3xl lg:text-4xl">Meet our members</h4>
          <div className="flex justify-center">
            <p className="text-pGray max-w-210">
              MOMIN GROUP, a large contribution in manufacturing and economic
              development of Bangladesh. <br /> MOMIN GROUP is a privately
            </p>
          </div>
        </div>

        <GalleryCarousel data={members}>
          {(item, idx) => (
            <MeetOurMemberCard 
              key={item.id} 
              img={item.image}
              title={item.name}
              desig={item.designation}
              desc={item.description}
            />
          )}
        </GalleryCarousel>
      </div>
    </div>
  );
};

export default MeetOurMembers;