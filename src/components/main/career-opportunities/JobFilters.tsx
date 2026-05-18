// components/JobFilters.jsx
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
  jobTypes?: string[];
  experienceLevels?: string[];
}

const JobFilters = ({ 
  filters, 
  onFilterChange,
  jobTypes = [],
  experienceLevels = []
}: JobFiltersProps) => {
  const departmentOptions = [
    { value: "all", label: "All Departments" },
    { value: "FULL_TIME", label: "Full Time" },
    { value: "PART_TIME", label: "Part Time" },
    { value: "CONTRACTUAL", label: "Contractual" },
    { value: "FREELANCE", label: "Freelance" },
    { value: "INTERNSHIP", label: "Internship" },
  ];

  const jobTypeOptions = [
    { value: "all", label: "All Job Types" },
    ...jobTypes.filter(jt => jt !== "all").map(type => ({
      value: type,
      label: type.replace(/_/g, " "),
    })),
  ];

  const experienceOptions = [
    { value: "all", label: "All Experience" },
    ...experienceLevels.filter(exp => exp !== "all").map(exp => ({
      value: exp,
      label: exp,
    })),
  ];

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-3 items-center justify-center">
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
        options={experienceOptions}
        icon={<Clock size={18} />}
      />
    </div>
  );
};

export default JobFilters;