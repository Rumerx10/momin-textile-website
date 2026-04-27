// src/components/cards/JobCard.jsx
"use client";

import { MdOutlineLocationOn, MdAccessTime, MdWork, MdDateRange } from "react-icons/md";

interface JobCardProps {
  id: number;
  title: string;
  desc: string;
  experience: string;
  joiningDate: string;
  validity: string;
  department: string;
  jobType: string;
  location: string;
  onClick: () => void;
}

const JobCard = ({
  title,
  desc,
  experience,
  joiningDate,
  validity,
  department,
  jobType,
  location,
  onClick
}: JobCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-5 md:p-6 cursor-pointer
        hover:shadow-lg hover:border-pBlue transition-all duration-300 group"
    >
      {/* Title */}
      <h3 className="font-bold text-pBlue text-lg md:text-xl mb-2 group-hover:text-pBlue/80">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-pGray text-sm md:text-base mb-4 line-clamp-2">
        {desc}
      </p>
      
      {/* Job Details Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2">
          <MdWork className="text-pBlue text-sm" />
          <span className="text-pGray text-xs md:text-sm">{department}</span>
        </div>
        <div className="flex items-center gap-2">
          <MdAccessTime className="text-pBlue text-sm" />
          <span className="text-pGray text-xs md:text-sm">{jobType}</span>
        </div>
        <div className="flex items-center gap-2">
          <MdOutlineLocationOn className="text-pBlue text-sm" />
          <span className="text-pGray text-xs md:text-sm">{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <MdDateRange className="text-pBlue text-sm" />
          <span className="text-pGray text-xs md:text-sm">Exp: {validity}</span>
        </div>
      </div>
      
      {/* Experience & Joining */}
      <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-100">
        <span className="text-xs text-pBlue bg-pBlue/10 px-2 py-1 rounded">
          Experience: {experience}
        </span>
        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
          Joining: {joiningDate}
        </span>
      </div>
    </div>
  );
};

export default JobCard;