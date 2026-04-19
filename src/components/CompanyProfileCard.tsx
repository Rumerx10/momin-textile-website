import React from "react";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { PiFilePdfDuotone } from "react-icons/pi";
import { TbDownload } from "react-icons/tb";

const CompanyProfileCard = () => {
  return (
    <div className="p-4 space-y-6 border border-bdrGray rounded-lg ">
      <div>
        <p className="text-pGray text-sm mb-1.5">Company Profile</p>
        <h3 className="font-semibold text-xl text-tBlue">
          Discover Our Legacy of Quality and Innovation
        </h3>
      </div>
      <p className="text-pGray">
        Get an in-depth look at who we are, what we do, and how we deliver
        excellence across every stage of textile manufacturing. Our company
        profile brochure.
      </p>
      <div className="text-pGray flex items-center gap-2">
        <MdOutlineCalendarMonth size={24} />
        <p className="font-medium">16 Dec 2025</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <button className="text-white font-medium bg-pBlue py-2.5 w-full flex items-center justify-center gap-2 border rounded-sm">
          <TbDownload size={24} />
          <p>Download Profile</p>
        </button>
        <button className="text-pBlue font-medium py-2.5 w-full flex items-center justify-center gap-2 border rounded-sm">
          <PiFilePdfDuotone size={24} />
          <p>Download Profile</p>
        </button>
      </div>
    </div>
  );
};

export default CompanyProfileCard;
