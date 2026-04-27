"use client";

import { useContext, useEffect } from "react";
import { HeroContext } from "@/src/context/HeroContext";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

type PolicySection = {
  title: string;
  content: string;
};

type PolicyPageProps = {
  title: string;
  sections: PolicySection[];
  corePoints: string[];
};

const Policy = ({ title, sections, corePoints }: PolicyPageProps) => {
  const { setTitle } = useContext(HeroContext);

  useEffect(() => {
    setTitle(title);
  }, [setTitle, title]);

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Main Title */}
        <h1 className="text-center font-bold text-pBlue text-3xl md:text-4xl lg:text-5xl mb-8 md:mb-12 lg:mb-16">
          {title}
        </h1>

        {/* Sections */}
        <div className="space-y-8 md:space-y-10 lg:space-y-12">
          {sections.map((section, idx) => (
            <section key={idx} className="space-y-3 md:space-y-4">
              <h2 className="font-semibold text-pBlue text-xl">
                {section.title}
              </h2>
              <p className="text-pGray text-justify">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        {/* Core Points Section */}
        <div className="mt-10 md:mt-12 lg:mt-16 pt-6 md:pt-8 border-t border-gray-200">
          <h3 className="font-semibold text-pBlue text-xl md:text-2xl mb-4 md:mb-6">
            Core Points
          </h3>
          <div className="space-y-3 md:space-y-4">
            {corePoints.map((point, idx) => (
              <div key={idx} className="flex gap-3 md:gap-4 items-start">
                <div className="h-6 w-6 rounded-sm text-white flex items-center justify-center bg-pBlue flex-shrink-0 mt-0.5">
                  <MdOutlineKeyboardArrowRight size={18} />
                </div>
                <p className="text-pGray text-sm md:text-base">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
