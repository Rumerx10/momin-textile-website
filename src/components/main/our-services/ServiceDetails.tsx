"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { IoMdCall } from "react-icons/io";
import { HeroContext } from "@/src/context/HeroContext";
import PriceQuotation from "@/src/components/PriceQuotation";
import { CorePoints } from "@/docs/data";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const ServiceDetails = () => {
  const { setTitle } = useContext(HeroContext);

  useEffect(() => {
    setTitle("Custom Fabric Dyeing & Finishing Solutions");
  }, [setTitle]);

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12">
        {/* Title Section */}
        <div className="space-y-4">
          <h1 className=" text-center font-bold text-2xl md:text-3xl lg:text-4xl text-pBlue">
            Custom Fabric Dyeing & Finishing Solutions
          </h1>
        </div>
        {/* Hero Image Section */}
        <div className="w-full">
          <div className="relative w-full h-62 md:h-88 lg:h-165 rounded-lg overflow-hidden">
            <Image
              src="/p1.png"
              alt="Custom Fabric Dyeing & Finishing"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        {/* Content Sections */}
        <div className="space-y-8 lg:space-y-10">
          {/* Section 1 */}
          <div className="space-y-4">
            <h2 className="font-bold text-xl md:text-2xl text-pBlue">
              Custom Fabric Dyeing & Finishing Solutions
            </h2>
            <p className="text-pGray text-justify text-sm md:text-base leading-relaxed">
              At Monini Textile Mills Ltd, we specialize in custom dyeing and
              finishing services designed to meet the precise requirements of
              our local and international B2B clients. With our upgraded
              European dyeing machinery and advanced processes control systems,
              we ensure color consistency, durability, and freshness that align
              with international standards. Every fabric we dye passes through a
              controlled process that combines technical precision and artistic
              craftsmanship. From color development to final inspection, our
              dedicated dyeing specialists maintain strict quality checks to
              achieve perfect shade matching and uniform color penetration.
              Whether it's cotton, polyester, or blended fabrics, our facilities
              are equipped to handle a wide range of fiber types and dye classes
              with exceptional efficiency.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-4">
            <h2 className="font-bold text-xl md:text-2xl text-pBlue">
              Meeting Rising Global Demand for Quality and Capacity
            </h2>
            <p className="text-pGray text-justify text-sm md:text-base leading-relaxed">
              The global apparel market is rapidly evolving, with rising
              expectations for faster lead times, customized color solutions,
              and environmentally responsible production. To meet these growing
              demands, Monini Textile Mills Ltd recognized the importance of
              expanding its dyeing capacity while maintaining the highest level
              of color accuracy and product uniformity.
            </p>
            <p className="text-pGray text-justify text-sm md:text-base leading-relaxed mt-3">
              The newly upgraded dyeing unit features automated dyeing systems,
              advanced color calibration software, and real-time process
              monitoring—enabling the company to achieve exceptional precision
              in shade matching and color stability. This expansion allows
              Monini Textile to handle larger orders from its international
              clientele while ensuring consistent quality across every fabric
              roll. Moreover, the automation and efficiency gains help reduce
              energy usage and water consumption, contributing to the company's
              sustainability goals.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-4">
            <h2 className="font-bold text-xl md:text-2xl text-pBlue">
              Empowering Local Expertise with Global Technology
            </h2>
            <p className="text-pGray text-justify text-sm md:text-base leading-relaxed">
              The integration of European machinery has also opened new
              opportunities for skill development within the workforce.
              Engineers, technicians, and operators at Monini Textile Mills Ltd
              underwent specialized training programs conducted jointly by local
              and foreign experts to ensure optimal use of the new equipment.
            </p>
            <p className="text-pGray text-justify text-sm md:text-base leading-relaxed mt-3">
              This initiative bridges the gap between local craftsmanship and
              global technological standards. The management team believes that
              empowering employees with modern tools and technical knowledge not
              only boosts productivity but also enhances job satisfaction and
              long-term retention. This people-centric approach remains a
              cornerstone of Monini Textile's growth philosophy, ensuring that
              every team member plays a vital role in the company's ongoing
              success story.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-4">
            <h2 className="font-bold text-xl md:text-2xl text-pBlue">
              Strengthening Sustainability and Environmental Responsibility
            </h2>
            <p className="text-pGray text-justify text-sm md:text-base leading-relaxed">
              Sustainability remains one of the core pillars of Monini Textile's
              long-term strategy. The new dyeing machines are designed to
              minimize chemical waste, optimize water usage, and lower carbon
              emissions. This company has also upgraded its Effluent Treatment
              Plant (ETP) to ensure that all wastewater meets international
              environmental compliance standards before discharge.
            </p>
            <p className="text-pGray text-justify text-sm md:text-base leading-relaxed mt-3">
              By investing in cleaner and more efficient machinery, Monini
              Textile Mills Ltd demonstrates its proactive role in promoting
              eco-conscious manufacturing practices in Bangladesh's textile
              industry. The dyeing expansion aligns perfectly with the company's
              "Green Fabric Initiative," which focuses on producing
              environmentally friendly textiles for international markets. This
              step strengthens Monini Textiles' position as a responsible
              manufacturer that values both product quality and planetary
              health.
            </p>
          </div>

          {/* Core Points Section */}
          <div className="space-y-4">
            <h2 className="font-bold text-xl md:text-2xl text-pBlue">
              Core Points
            </h2>
            {CorePoints.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center">
                <div className="h-6 w-6 rounded-sm text-white flex items-center justify-center bg-pBlue">
                  <MdOutlineKeyboardArrowRight size={24} />
                </div>
                <p className="text-pGray">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Price Quotation Section */}
        <div className="flex justify-end mt-8 pt-6 border-t border-bdrGray">
          <div className="w-full lg:w-1/2">
            <PriceQuotation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
