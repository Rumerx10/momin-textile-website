// app/career/page.jsx or app/career-opportunities/page.jsx
"use client";

import { useContext, useEffect, useState } from "react";
import { HeroContext } from "@/src/context/HeroContext";
import Pagination from "@/src/components/Pagination";
import { CareerData } from "@/docs/data";
import JobCard from "./JobCard";
import JobDetailsModal from "./JobDetailsModal";
import JobFilters from "./JobFilters";

const CareerOpportunities = () => {
  const { setTitle } = useContext(HeroContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fixed: Changed salaryRange to experience to match JobFilters
  const [filters, setFilters] = useState({
    department: "all",
    jobType: "all",
    experience: "all",  // Changed from salaryRange to experience
  });

  const { data: jobsData, metadata } = CareerData;
  const itemsPerPage = metadata.itemPerPage;

  // Extract unique filter options from actual data
  const departments = [
    "all",
    ...new Set(jobsData.map((job) => job.department)),
  ];
  const jobTypes = ["all", ...new Set(jobsData.map((job) => job.jobType))];
  const experienceLevels = ["all", ...new Set(jobsData.map((job) => job.experience))];

  // Apply filters
  const getFilteredJobs = () => {
    let filtered = [...jobsData];

    if (filters.department !== "all") {
      filtered = filtered.filter(
        (job) => job.department === filters.department,
      );
    }

    if (filters.jobType !== "all") {
      filtered = filtered.filter((job) => job.jobType === filters.jobType);
    }

    if (filters.experience !== "all") {
      filtered = filtered.filter(
        (job) => job.experience === filters.experience,
      );
    }

    return filtered;
  };

  const filteredJobs = getFilteredJobs();
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  // Calculate pagination for filtered jobs
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  useEffect(() => {
    setTitle("Career Opportunities");
  }, [setTitle]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleJobClick = (job: any) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12">
        {/* Header Section */}
        <div className="space-y-4 text-center">
          <h1 className="font-bold text-pBlue text-3xl lg:text-4xl">
            Career Opportunities
          </h1>
          <div className="flex justify-center">
            <p className="text-pGray max-w-2xl text-sm md:text-base">
              Join our team of passionate professionals and be part of
              Bangladesh's leading textile manufacturing group.
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <JobFilters filters={filters} onFilterChange={handleFilterChange} />

        {/* Results Count */}
        <div className="text-center">
          <p className="text-pGray text-sm">
            Showing {currentJobs.length} of {filteredJobs.length} positions
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {currentJobs.map((job) => (
              <JobCard
                key={job.id}
                {...job}
                onClick={() => handleJobClick(job)}
              />
            ))}
          </div>

          {/* Empty State */}
          {currentJobs.length === 0 && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-pGray text-lg mb-2">No jobs found</p>
                <p className="text-pGray text-sm">Try adjusting your filters</p>
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 md:mt-12 lg:mt-16">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      {isModalOpen && selectedJob && (
        <JobDetailsModal job={selectedJob} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default CareerOpportunities;