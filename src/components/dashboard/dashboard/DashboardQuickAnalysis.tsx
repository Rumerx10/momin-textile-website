"use client";
import { useState } from "react";

import {
  HiOutlineOfficeBuilding,
  HiOutlineDocumentText,
  HiOutlineCube,
  HiOutlineChartBar,
} from "react-icons/hi";
import { MdKeyboardArrowDown } from "react-icons/md";

const DashboardQuickAnalysis = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 30 Days");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const stats = [
    {
      id: 1,
      title: "Total Machines",
      value: "793",
      lastUpdated: "Last updated Feb 2026",
      icon: HiOutlineChartBar,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      title: "Quotation Requests",
      value: "3,675",
      lastUpdated: "Last updated Feb 2026",
      icon: HiOutlineDocumentText,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      id: 3,
      title: "Total Products",
      value: "2,793",
      lastUpdated: "Last updated Feb 2026",
      icon: HiOutlineCube,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      id: 4,
      title: "Total Offices",
      value: "25",
      lastUpdated: "Last updated Feb 2026",
      icon: HiOutlineOfficeBuilding,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  const periods = [
    "Last 30 Days",
    "Last 60 Days",
    "Last 90 Days",
    "This Year",
    "Last Year",
  ];

  return (
    <div className="p-6 w-full border rounded-lg bg-white">
      <div className="flex flex-col gap-6 md:gap-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h4 className="font-semibold text-pBlue text-2xl">
            Dashboard Quick Analysis
          </h4>

          {/* Dropdown Filter */}
          <div className="relative">
            <button
              className="flex w-full min-w-40 items-center justify-between gap-2 px-4 py-2 border border-gray-300 
              rounded-lg bg-white text-pGray text-sm md:text-base hover:shadow hover:text-pBlue transition-all duration-300"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedPeriod}
              <MdKeyboardArrowDown
                size={18}
                className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                {periods.map((period) => (
                  <button
                    key={period}
                    onClick={() => {
                      setSelectedPeriod(period);
                      setIsDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-pGray text-sm hover:bg-gray-50 hover:text-pBlue transition-colors
                      ${selectedPeriod === period ? "bg-pBlue/5 text-pBlue" : ""}
                    `}
                  >
                    {period}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="group border bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                <div className="p-5 md:p-6">
                  {/* Icon and Value Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                    </div>
                    <span className="text-2xl md:text-3xl font-bold text-pGray">
                      {stat.value}
                    </span>
                  </div>

                  {/* Title */}
                  <h6 className="text-pGray font-semibold text-sm md:text-base">
                    {stat.title}
                  </h6>

                  {/* Last Updated */}
                  <p className="text-pGray/40 text-xs mt-2">
                    {stat.lastUpdated}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardQuickAnalysis;
