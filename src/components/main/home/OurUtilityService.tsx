"use client";
import Image from "next/image";
import { OurUtilityServiceData } from "@/docs/data";

const OurUtilityService = () => {
  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12">
        <div className="space-y-4">
          <h1 className="font-bold text-3xl lg:text-4xl">
            Our Utility Services Ensure Smooth Operations
          </h1>
          <div className="flex">
            <p className="text-pGray max-w-210">
              Our Utility Services Ensure Smooth Operations, We believe true
              excellence is achieved when innovation and <br /> sustainability
              work hand in hand.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4! md:px-5 shadow-lg border border-bdrGray rounded-xl">
          {OurUtilityServiceData.map((item, index) => (
            <div
              className={`p-5 ${index !== OurUtilityServiceData.length - 1 && "lg:border-r border-bdrGray"}`}
            >
              <div className="py-5">
                <div className="w-10 h-10 mb-10">
                  <Image
                    src={item.img}
                    alt="power"
                    height={40}
                    width={40}
                    className="object-cover h-full w-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-tBlue text-xl">{item.title}</h3>
                  <p className="text-pGray">{item.subTitle}</p>
                </div>
                <div className="text-tBlue mt-6">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurUtilityService;
