"use client";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import GalleryCarousel from "@/src/components/GalleryCarousel";
import { MembersData } from "@/docs/data";
import MeetOurMemberCard from "@/src/components/cards/MeetOurMemberCard";

const MeetOurMembers = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
        <div className="space-y-4 text-center">
          <h1 className="font-bold text-3xl lg:text-4xl">Meet our members</h1>
          <div className="flex justify-center">
            <p className="text-pGray max-w-210">
              MOMIN GROUP, a large contribution in manufacturing and economic
              development of Bangladesh. <br /> MOMIN GROUP is a privately
            </p>
          </div>
        </div>

        <GalleryCarousel data={MembersData}>
          {(item, idx) => <MeetOurMemberCard key={idx} {...item} />}
        </GalleryCarousel>
      </div>
    </div>
  );
};

export default MeetOurMembers;
