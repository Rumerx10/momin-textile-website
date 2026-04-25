"use client";

import { Check } from "lucide-react";
import { BsCheckCircle } from "react-icons/bs";

type Item = {
  title: string;
  subtitle?: string;
};

type ExcellenceSectionProps = {
  heading: string;
  description: string;
  columns: Item[][];
};

const ExcellenceSection: React.FC<ExcellenceSectionProps> = ({
  heading,
  description,
  columns,
}) => {
  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
        {/* Heading */}
        <div className="space-y-4 text-center">
          <h2 className="font-bold text-pBlue text-2xl md:text-3xl lg:text-4xl max-w-2xl mx-auto">
            {heading}
          </h2>
          
          {/* Description */}
          <div className="flex justify-center">
            <p className="text-pGray max-w-2xl text-sm md:text-base">
              {description}
            </p>
          </div>
        </div>

        {/* Columns */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 text-left">
            {columns.map((col, colIndex) => (
              <div key={colIndex} className="space-y-4 md:space-y-5">
                {col.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <BsCheckCircle  className="w-5 h-5 text-pBlue mt-1 shrink-0" />
                    <div>
                      <p className="font-medium text-pBlue text-sm md:text-base">
                        {item.title}
                        {item.subtitle && (
                          <span className="text-pGray/60 ml-1">
                            ({item.subtitle})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcellenceSection;