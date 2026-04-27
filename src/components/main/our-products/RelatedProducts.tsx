"use client";

import { OurProductsData } from "@/docs/data";
import { useContext, useEffect } from "react";
import { HeroContext } from "../../../context/HeroContext";
import Image from "next/image";
import Link from "next/link";
import MeetOurMemberCard from "@/src/components/cards/MeetOurMemberCard";
import GalleryCarousel from "@/src/components/GalleryCarousel";

const RelatedProducts = () => {
  const { setTitle } = useContext(HeroContext);

  useEffect(() => {
    setTitle("About Our Products");
  }, [setTitle]);

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
        <div className="space-y-4 text-center">
          <h1 className="font-bold text-3xl lg:text-4xl">Related Products</h1>
          <div className="flex justify-center">
            <p className=" text-pGray max-w-210">
              We are working Solid Reactive Dyed, Solid Pigment Dyed, All Over
              Print, Also any kind of Fabrics as <br /> per Buyer Requirement
            </p>
          </div>
        </div>
        <GalleryCarousel data={OurProductsData}>
          {(item, idx) => <MeetOurMemberCard key={idx} {...item} />}
        </GalleryCarousel>
      </div>
    </div>
  );
};

export default RelatedProducts;
