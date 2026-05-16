"use client"
import { officialInfo, personalInfo } from "@/docs/data";
import { Edit2 } from "lucide-react";
import { useState } from "react";

const Profile = () => {
    const [activeEdit, setActiveEdit] = useState<string | null>(null)
  
  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto overflow-y-auto">
      {/* Hero Section with Profile */}
      <div className="mb-8">
        <div className="relative">
          {/* linear Background */}
          <div className="h-32 sm:h-48 bg-linear-to-r from-purple-900 via-purple-700 to-pink-500 rounded-lg overflow-hidden"></div>

          {/* Profile Image Overlap */}
          <div className="absolute -bottom-12 sm:-bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-full border-4 border-white bg-linear-to-r from-blue-500 to-purple-600 shadow-lg flex items-center justify-center shrink-0">
              <span className="text-white text-2xl sm:text-5xl font-bold">
                SA
              </span>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-16 sm:mt-24 text-center mb-8">
          <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            Shakil Ahmed
          </h4>
          <p className="text-sm sm:text-base text-gray-600">
            UX Designer (Creative Matter)
          </p>
        </div>
      </div>

      {/* Info Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Official Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h5 className="text-lg font-bold text-gray-900">
              Official Information
            </h5>
            <button
              onClick={() =>
                setActiveEdit(activeEdit === "official" ? null : "official")
              }
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {officialInfo.map((item, index) => (
              <div key={index} className="flex gap-3">
                <div className="text-purple-600 shrink-0 mt-1">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 uppercase mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm font-medium text-gray-900 wrap-break">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Personal Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h5 className="text-lg font-bold text-gray-900">
              All Personal Information
            </h5>
            <button
              onClick={() =>
                setActiveEdit(activeEdit === "personal" ? null : "personal")
              }
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {personalInfo.map((item, index) => (
              <div key={index} className="flex gap-3">
                <div className="text-purple-600 shrink-0 mt-1">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 uppercase mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm font-medium text-gray-900 wrap-break">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
