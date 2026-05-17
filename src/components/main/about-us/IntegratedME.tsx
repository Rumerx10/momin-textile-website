// components/about/IntegratedME.jsx
"use client";
import { FaSquareCheck } from "react-icons/fa6";
import LCarousel from "@/components/LCarousel";

const IntegratedME = ({ aboutData }: { aboutData: any }) => {
  if (!aboutData) return null;

  const excellenceImage1 = aboutData.excellenceImage1 || "";
  const excellenceImages = aboutData.excellenceImages || [];
  const excellenceHeading = aboutData.excellenceHeading || "Integrated Manufacturing Excellence";
  const excellenceSubheading = aboutData.excellenceSubheading || "";
  const points = aboutData.points || [];

  return (
    <div className="py-8 md:py-12 lg:py-16 bg-bgGray">
      <div className="container px-4 mx-auto flex flex-col lg:flex-row gap-20 items-center justify-center">
        <div className="w-full lg:w-[35%]">
          <LCarousel img={excellenceImage1} imgs={excellenceImages} />
        </div>
        <div className="w-full lg:w-[75%]">
          <h5 className="font-bold text-3xl lg:text-4xl text-tBlue">
            {excellenceHeading}
          </h5>
          <p className="text-pGray text-justify mt-4">
            {excellenceSubheading}
          </p>
          <div className="mt-10 space-y-5">
            {points.map((item: string, idx: number) => (
              <div key={idx} className="flex gap-2.5 items-start text-pBlue">
                <div className="shrink-0 mt-0.5">
                  <FaSquareCheck size={30} />
                </div>
                <p className="text-pGray">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegratedME;