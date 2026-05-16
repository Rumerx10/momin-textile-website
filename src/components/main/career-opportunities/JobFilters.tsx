"use client";

import { Building2, Briefcase, Clock } from "lucide-react";
import FilterDropdown from "./FilterDropdown";

interface JobFiltersProps {
  filters: {
    department: string;
    jobType: string;
    experience: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
}

const JobFilters = ({ filters, onFilterChange }: JobFiltersProps) => {
  const departmentOptions = [
    { value: "all", label: "All Departments" },
    { value: "Production", label: "Production" },
    { value: "Quality", label: "Quality" },
    { value: "Maintenance", label: "Maintenance" },
    { value: "HR", label: "HR" },
    { value: "Supply Chain", label: "Supply Chain" },
    { value: "Merchandising", label: "Merchandising" },
    { value: "Dyeing", label: "Dyeing" },
    { value: "Environment", label: "Environment" },
    { value: "IT", label: "IT" },
    { value: "Store", label: "Store" },
  ];

  const jobTypeOptions = [
    { value: "all", label: "All Job Types" },
    { value: "Full Time", label: "Full Time" },
    { value: "Part Time", label: "Part Time" },
    { value: "Contract", label: "Contract" },
    { value: "Freelance", label: "Freelance" },
  ];

  // Fixed: Convert string array to object array with value and label
  const experienceLevels = [
    { value: "all", label: "All Experience" },
    { value: "0-2 years", label: "0-2 years" },
    { value: "1-2 years", label: "1-2 years" },
    { value: "2-4 years", label: "2-4 years" },
    { value: "3-5 years", label: "3-5 years" },
    { value: "4-6 years", label: "4-6 years" },
    { value: "5-7 years", label: "5-7 years" },
    { value: "8-10 years", label: "8-10 years" },
  ];

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-3 items-center justify-center ">
      <FilterDropdown
        value={filters.department}
        onValueChange={(value: string) => onFilterChange("department", value)}
        placeholder="Department"
        options={departmentOptions}
        icon={<Building2 size={18} />}
      />

      <FilterDropdown
        value={filters.jobType}
        onValueChange={(value: string) => onFilterChange("jobType", value)}
        placeholder="Job Type"
        options={jobTypeOptions}
        icon={<Briefcase size={18} />}
      />

      <FilterDropdown
        value={filters.experience}
        onValueChange={(value: string) => onFilterChange("experience", value)}
        placeholder="Experience Level"
        options={experienceLevels}
        icon={<Clock size={18} />}
      />
    </div>
  );
};

export default JobFilters;
