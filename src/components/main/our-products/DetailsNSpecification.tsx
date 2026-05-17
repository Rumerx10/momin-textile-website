// components/DetailsNSpecification.jsx
"use client";
import { useState } from "react";

interface DetailsNSpecificationProps {
  details: string;
  specification: string;
}

const DetailsNSpecification = ({ details, specification }: DetailsNSpecificationProps) => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="py-8 md:py-12 lg:py-16">
      <div className="container px-4 mx-auto space-y-6">
        <div className="flex border-b-2 border-bdrGray">
          <button
            onClick={() => setActiveTab("details")}
            className={`shrink-0 px-8 py-4 transition-all duration-300 ${
              activeTab === "details"
                ? "bg-pBlue font-bold text-white"
                : "text-pGray font-medium bg-white hover:bg-gray-50"
            } cursor-pointer`}
          >
            Details About Product
          </button>
          <button
            onClick={() => setActiveTab("specifications")}
            className={`shrink-0 px-8 py-4 transition-all duration-300 ${
              activeTab === "specifications"
                ? "bg-pBlue font-bold text-white"
                : "text-pGray font-medium bg-white hover:bg-gray-50"
            } cursor-pointer`}
          >
            Specifications
          </button>
        </div>
        
        <div className="space-y-3">
          <h6 className="font-bold text-3xl lg:text-4xl text-pBlue">
            {activeTab === "details" ? "Details About Product" : "Specifications"}
          </h6>
          <div className="text-pGray text-justify leading-relaxed">
            {activeTab === "details" ? (
              <div dangerouslySetInnerHTML={{ __html: details || "No details available." }} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: specification || "No specifications available." }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsNSpecification;