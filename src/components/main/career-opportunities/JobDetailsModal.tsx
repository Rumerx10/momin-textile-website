// src/components/JobDetailsModal.jsx
"use client";

import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineLocationOn, MdAccessTime, MdWork, MdDateRange, MdAttachMoney } from "react-icons/md";
import { HiOutlineBuildingOffice } from "react-icons/hi2";

interface JobDetailsModalProps {
  job: {
    id: number;
    title: string;
    desc: string;
    experience: string;
    joiningDate: string;
    validity: string;
    department: string;
    jobType: string;
    location: string;
    salary: string;
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
  };
  setIsModalOpen: (value: boolean) => void;
}

const JobDetailsModal = ({ job, setIsModalOpen }: JobDetailsModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-1000"
      onClick={() => setIsModalOpen(false)}
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div
          className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-modern"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-bold text-pBlue text-xl md:text-2xl lg:text-3xl">
                  {job.title}
                </h2>
                <p className="text-pGray text-sm mt-1">{job.department} • {job.jobType}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-10 w-10 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-colors duration-300"
              >
                <RxCross2 size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6 space-y-6">
            {/* Job Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MdWork className="text-pBlue text-xl" />
                <div>
                  <p className="text-pGray text-xs">Department</p>
                  <p className="text-pBlue font-medium">{job.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MdAccessTime className="text-pBlue text-xl" />
                <div>
                  <p className="text-pGray text-xs">Job Type</p>
                  <p className="text-pBlue font-medium">{job.jobType}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MdOutlineLocationOn className="text-pBlue text-xl" />
                <div>
                  <p className="text-pGray text-xs">Location</p>
                  <p className="text-pBlue font-medium">{job.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MdDateRange className="text-pBlue text-xl" />
                <div>
                  <p className="text-pGray text-xs">Experience</p>
                  <p className="text-pBlue font-medium">{job.experience}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MdAttachMoney className="text-pBlue text-xl" />
                <div>
                  <p className="text-pGray text-xs">Salary</p>
                  <p className="text-pBlue font-medium">{job.salary}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <HiOutlineBuildingOffice className="text-pBlue text-xl" />
                <div>
                  <p className="text-pGray text-xs">Joining Date</p>
                  <p className="text-pBlue font-medium">{job.joiningDate}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-pBlue text-lg mb-2">Job Description</h3>
              <p className="text-pGray text-sm md:text-base leading-relaxed">
                {job.desc}
              </p>
            </div>

            {/* Responsibilities */}
            <div>
              <h3 className="font-semibold text-pBlue text-lg mb-3">Key Responsibilities</h3>
              <ul className="space-y-2">
                {job.responsibilities.map((item, idx) => (
                  <li key={idx} className="flex gap-2 text-pGray text-sm md:text-base">
                    <span className="text-pBlue">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="font-semibold text-pBlue text-lg mb-3">Requirements</h3>
              <ul className="space-y-2">
                {job.requirements.map((item, idx) => (
                  <li key={idx} className="flex gap-2 text-pGray text-sm md:text-base">
                    <span className="text-pBlue">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="font-semibold text-pBlue text-lg mb-3">Benefits</h3>
              <ul className="space-y-2">
                {job.benefits.map((item, idx) => (
                  <li key={idx} className="flex gap-2 text-pGray text-sm md:text-base">
                    <span className="text-green-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Validity Notice */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-yellow-800 text-sm">
                Application deadline: <span className="font-semibold">{job.validity}</span>
              </p>
            </div>

            {/* Apply Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  // Navigate to application form or open apply modal
                }}
                className="px-6 py-2.5 bg-pBlue text-white rounded-lg hover:bg-pBlue/90 transition-colors duration-300 font-medium"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;