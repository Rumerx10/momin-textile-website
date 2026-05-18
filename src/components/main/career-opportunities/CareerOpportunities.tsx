// app/career/page.jsx
"use client";

import { useContext, useEffect, useState } from "react";
import { HeroContext } from "@/context/HeroContext";
import Pagination from "@/components/Pagination";

import { useFetchData } from "@/hooks/useApi";
import JobFilters from "./JobFilters";
import JobCard from "./JobCard";
import JobDetailsModal from "./JobDetailsModal";

interface JobItem {
  id: number;
  jobTitle: string;
  jobType: string;
  jobShift: string;
  experience: number;
  deadline: string;
  approximateJoining: string;
  pdf: string;
  createdAt: string;
  updatedAt: string;
}

const CareerOpportunities = () => {
  const { setTitle } = useContext(HeroContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allJobs, setAllJobs] = useState<JobItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [filters, setFilters] = useState({
    department: "all",
    jobType: "all",
    experience: "all",
  });

  // Build endpoint with pagination
  const buildEndpoint = () => {
    return `/careers?page=${currentPage}&limit=${itemsPerPage}&sortOrder=desc&isActive=true`;
  };

  // Fetch careers data
  const {
    data: apiData,
    isLoading,
    error,
  } = useFetchData(
    ["careers", String(currentPage), String(itemsPerPage)],
    buildEndpoint(),
    { enabled: true, refetchOnMount: true },
  );

  useEffect(() => {
    if (apiData?.data && Array.isArray(apiData.data)) {
      setAllJobs(apiData.data);
      setTotalPages(apiData.meta?.totalPages || 1);
    }
  }, [apiData]);

  useEffect(() => {
    setTitle("Career Opportunities");
  }, [setTitle]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Extract unique filter options from API data
  const getUniqueJobTypes = () => {
    const types = allJobs.map((job) => job.jobType);
    return ["all", ...new Set(types)];
  };

  const getUniqueExperienceLevels = () => {
    const levels = allJobs.map((job) => {
      if (job.experience === 0) return "Fresher";
      return `${job.experience} ${job.experience === 1 ? "Year" : "Years"}`;
    });
    return ["all", ...new Set(levels)];
  };

  // Apply filters
  const getFilteredJobs = () => {
    let filtered = [...allJobs];

    if (filters.department !== "all") {
      filtered = filtered.filter((job) => job.jobType === filters.department);
    }

    if (filters.jobType !== "all") {
      filtered = filtered.filter((job) => job.jobType === filters.jobType);
    }

    if (filters.experience !== "all") {
      filtered = filtered.filter((job) => {
        const expLabel =
          job.experience === 0
            ? "Fresher"
            : `${job.experience} ${job.experience === 1 ? "Year" : "Years"}`;
        return expLabel === filters.experience;
      });
    }

    return filtered;
  };

  const filteredJobs = getFilteredJobs();
  const displayTotalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleJobClick = (job: JobItem) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get experience label
  const getExperienceLabel = (experience: number) => {
    if (experience === 0) return "Fresher";
    return `${experience} ${experience === 1 ? "Year" : "Years"}`;
  };

  // Get job type label
  const getJobTypeLabel = (jobType: string) => {
    return jobType.replace(/_/g, " ");
  };

  // Transform job data for modal
  const getModalJobData = (job: JobItem) => {
    const experienceLabel = getExperienceLabel(job.experience);
    const jobTypeLabel = getJobTypeLabel(job.jobType);

    return {
      id: job.id,
      title: job.jobTitle,
      desc: `Join our team as ${job.jobTitle}. This is a ${jobTypeLabel} position with ${experienceLabel} experience required. We are looking for dedicated professionals to contribute to our growing organization.`,
      experience: experienceLabel,
      joiningDate: formatDate(job.approximateJoining),
      validity: formatDate(job.deadline),
      department: jobTypeLabel,
      jobType: jobTypeLabel,
      location: "Dhaka, Bangladesh",
      salary: "Negotiable",
      responsibilities: [
        "Manage and oversee daily operations",
        "Ensure quality standards are met",
        "Coordinate with cross-functional teams",
        "Report to senior management",
        "Maintain proper documentation",
        "Implement process improvements",
      ],
      requirements: [
        `Bachelor's degree in relevant field`,
        `${experienceLabel} of experience in similar role`,
        "Strong communication and interpersonal skills",
        "Problem-solving and analytical abilities",
        "Proficiency in relevant software/tools",
        "Ability to work in a team environment",
      ],
      benefits: [
        "Competitive salary package",
        "Performance-based bonuses",
        "Medical and life insurance",
        "Provident fund",
        "Career growth opportunities",
        "Training and development programs",
      ],
    };
  };

  // Skeleton Card
  const SkeletonCard = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-5 md:p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
      <div className="flex gap-3 pt-3">
        <div className="h-6 bg-gray-200 rounded w-24"></div>
        <div className="h-6 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="flex flex-col gap-8 lg:gap-12">
          <div className="space-y-4 text-center">
            <div className="h-10 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
            <div className="flex justify-center">
              <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="text-center text-red-500">
          Failed to load career opportunities. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12">
        {/* Header Section */}
        <div className="space-y-4 text-center">
          <h4 className="font-bold text-pBlue text-3xl lg:text-4xl">
            Career Opportunities
          </h4>
          <div className="flex justify-center">
            <p className="text-pGray max-w-2xl text-sm md:text-base">
              Join our team of passionate professionals and be part of
              Bangladesh's leading textile manufacturing group.
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <JobFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          jobTypes={getUniqueJobTypes()}
          experienceLevels={getUniqueExperienceLevels()}
        />

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
                id={job.id}
                title={job.jobTitle}
                desc={`${getJobTypeLabel(job.jobType)} position • ${getExperienceLabel(job.experience)} • Join our dynamic team`}
                experience={getExperienceLabel(job.experience)}
                joiningDate={formatDate(job.approximateJoining)}
                validity={formatDate(job.deadline)}
                department={getJobTypeLabel(job.jobType)}
                jobType={getJobTypeLabel(job.jobType)}
                location="Dhaka, Bangladesh"
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
          {displayTotalPages > 1 && (
            <div className="mt-10 md:mt-12 lg:mt-16">
              <Pagination
                currentPage={currentPage}
                totalPages={displayTotalPages}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={handleItemsPerPageChange}
                onPageChange={handlePageChange}
                showPaginationControl={true}
              />
            </div>
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      {isModalOpen && selectedJob && (
        <JobDetailsModal
          job={getModalJobData(selectedJob)}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default CareerOpportunities;
