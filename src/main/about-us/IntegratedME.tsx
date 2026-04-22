import { FaSquareCheck } from "react-icons/fa6";
import LCarousel from "@/src/components/LCarousel";

const ImeData = [
  "Spinning: We begin with selecting the highest-grade raw fibers to ensure uniformity and strength in every yarn produced.",
  "Dyeing: Our advanced dyeing units allow for both batch and continuous dyeing processes, delivering color consistency and long-lasting vibrancy.",
  "Sustainability and Responsibility: In a world where sustainability is no longer optional, Momin Textile Mills Ltd has embedded eco-friendly practices into its core operations.",
  "Global Presence and Export Strength over the years, Momin Textile Mills Ltd has expanded its global footprint by exporting to multiple countries across Asia, Europe, and the Middle East.",
  "Global Presence and Export Strength over the years, Momin Textile Mills Ltd has expanded its global footprint by exporting to multiple countries across Asia, Europe, and the Middle East.",
];

const IntegratedME = () => {
  return (
    <div className="py-8 md:py-12 lg:py-16 bg-bgGray">
      <div className="container px-4 mx-auto flex flex-col lg:flex-row! gap-20 items-center justify-center">
        <div className="w-full lg:w-[35%]">
          <LCarousel />
        </div>
        <div className="w-full lg:w-[75%]">
          <h2 className="font-bold text-3xl lg:text-4xl text-tBlue">
            Integrated Manufacturing Excellence
          </h2>
          <p className="text-pGray text-justify mt-4">
            Our production facility is the heartbeat of our success. Designed to
            meet international compliance and efficiency standards, the factory
            is equipped with modern spinning, dyeing, and finishing machines
            sourced from renowned global suppliers. The manufacturing process is
            a seamless flow of expertise and technology, where precision meets
            performance.
          </p>
          <div className="mt-10 space-y-5">
            {ImeData.map((item, idx) => (
              <div key={idx} className="flex gap-2.5 items-center text-pBlue">
                <div className="shrink-0">
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
