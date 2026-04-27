"use client";
import { CorePoints } from "@/docs/data";
import CompanyProfileCard from "@/src/components/CompanyProfileCard";
import QuickLinks from "@/src/components/QuickLinks";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ExcellenceSection from "./ExcellenceSection";
import ImageGallery from "@/src/components/ImageGallery";
import { useContext, useEffect } from "react";
import { HeroContext } from "@/src/context/HeroContext";

const commonData = [
  { title: "PH", subtitle: "Potential of Hydrogen" },
  { title: "C/F Water", subtitle: "Cooling / Feed Water" },
  { title: "Tear Strength", subtitle: "Elmendorf Tear Test" },
  { title: "Tear Strength", subtitle: "Elmendorf Tear Test" },
  { title: "Tear Strength", subtitle: "Elmendorf Tear Test" },
  { title: "Tear Strength", subtitle: "Elmendorf Tear Test" },
  { title: "Tear Strength", subtitle: "Elmendorf Tear Test" },
];
const columns = [commonData, commonData, commonData];
const ETP = () => {
  const { setTitle } = useContext(HeroContext);
  useEffect(() => {
    setTitle("Effluent Treatment Plant (ETP)");
  }, [setTitle]);
  return (
    <div>
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
          <div className="space-y-4 text-center">
            <h1 className="font-bold text-3xl lg:text-4xl">
              Our Laboratory Services
            </h1>
            <div className="flex justify-center">
              <p className=" text-pGray max-w-210">
                Our in-house laboratory is equipped with advanced testing
                instruments to <br /> ensure every fabric standards of
                durability, color & accuracy
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="w-full lg:w-[65%] space-y-10">
                <div className="flex max-h-100 rounded-lg overflow-hidden">
                  <Image
                    src="/lab.png"
                    alt="lab image"
                    height={400}
                    width={1920}
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4 text-justify">
                  <h1 className="font-bold text-tBlue text-3xl lg:text-4xl">
                    Details about Our Laboratory
                  </h1>
                  <p className="text-pGray">
                    Momin Textile Mills Limited is committed to environmental
                    sustainability and ensuring that our production processes
                    align with global eco-friendly practices. Our
                    state-of-the-art Effluent Treatment Plant (ETP) has a
                    capacity of 70m³ per hour. designed to effectively purify
                    wastewater generated from our dyeing operations. By treating
                    and purifying the water, we ensure that our impact on the
                    environment is minimized, allowing for the safe discharge or
                    reuse of treated water in compliance with environmental
                    regulations. The ETP not only helps us meet stringent
                    environmental standards but also reinforces our commitment
                    to sustainability. This proactive approach to wastewater
                    management ensures that we preserve natural resources while
                    maintaining operational efficiency. By integrating advanced
                    technologies, Momin Textile Mills continuously strives to
                    reduce its ecological footprint, promoting cleaner and more
                    sustainable textile production practices. <br /> Through our
                    ETP, we demonstrate leadership in environmental
                    responsibility. ensuring that we maintain a balance between
                    industrial progress and the protection of the environment.
                    This reflects our dedication to ethical practices and
                    sustainable development in the textile industry.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-pBlue text-xl">
                    Core Points
                  </h3>
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
              <div className="space-y-10 w-full lg:w-[35%]">
                <CompanyProfileCard />
                <QuickLinks />
              </div>
            </div>
          </div>
        </div>
        <ExcellenceSection
          heading="Lab Excellence"
          description="Momin Textile Mills Ltd provides complete fabric manufacturing services — from spinning and weaving to dyeing and finishing"
          columns={columns}
        />
      </div>
      <ImageGallery />
    </div>
  );
};

export default ETP;
