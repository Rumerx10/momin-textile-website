"use client";

import { OurProductsData } from "@/docs/data";

import Link from "next/link";
import ProductCard from "@/src/components/cards/ProductCard";

const AboutOurProducts = () => {


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
            <Link href={`/our-products/${item.title}`} key={idx}>
              <ProductCard {...item} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};


export default AboutOurProducts;
