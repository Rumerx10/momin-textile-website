"use client";

import { OurProductsData } from "@/docs/data";
import { useContext, useEffect } from "react";
import { HeroContext } from "../context/HeroContext";
import Image from "next/image";

const OurProducts = () => {
  const { setTitle } = useContext(HeroContext);

  useEffect(() => {
    setTitle("About Our Products");
  }, [setTitle]);

  return (
    <div className="container px-4 mx-auto py-16">
      <div className="flex flex-col gap-5 lg:gap-16 items-center justify-center">
        <div className="space-y-4 text-center">
          <h1 className="font-bold text-3xl lg:text-4xl">Our Products</h1>
          <div className="flex justify-center">
            <p className=" text-pGray max-w-210">
              Our product range covers premium woven shell fabrics, pocketing
              materials, and custom-dyed <br /> textiles designed for global
              apparel manufacturers
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {OurProductsData.map((item, idx) => (
            <div className="rounded-lg overflow-hidden">
              <div className="flex h-54">
                <Image
                  src={item.img}
                  alt={item.title}
                  height={216}
                  width={369}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="py-3 space-y-2">
                <p className="text-sm text-pGray">{item.category}</p>
                <h3 className="font-bold text-tBlue text-xl">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurProducts;
