// app/foreign-branches/page.jsx
"use client";
import { useContext, useEffect, useState } from "react";

import { HeroContext } from "@/context/HeroContext";

import { useFetchData } from "@/hooks/useApi";
import BodyContent from "../BodyContent";
import OfficeCard from "../cards/OfficeCard";
import Pagination from "../Pagination";

interface BranchItem {
  id: number;
  officeName: string;
  location: string;
  officeType: string;
  emails: string[];
  phones: string[];
  telephones: string[];
  faxes: string[];
  createdAt: string;
  updatedAt: string;
}

const ForeignBranches = () => {
  const { setTitle } = useContext(HeroContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [branches, setBranches] = useState<BranchItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Build endpoint with pagination
  const buildEndpoint = () => {
    return `/contact-addresses?page=${currentPage}&limit=${itemsPerPage}&sortOrder=asc&isActive=true&officeType=INTERNATIONAL`;
  };

  // Fetch branches data
  const { data: apiData, isLoading, error } = useFetchData(
    ["contact-addresses", "INTERNATIONAL", String(currentPage), String(itemsPerPage)],
    buildEndpoint(),
    { enabled: true, refetchOnMount: true }
  );

  useEffect(() => {
    if (apiData?.data && Array.isArray(apiData.data)) {
      setBranches(apiData.data);
      setTotalPages(apiData.meta?.totalPages || 1);
      setTotalItems(apiData.meta?.totalItems || 0);
    }
  }, [apiData]);

  useEffect(() => {
    setTitle("Globally We Are Available");
  }, [setTitle]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Transform branch data to match OfficeCard props
  const transformBranchData = (branch: BranchItem) => {
    return {
      name: branch.officeName,
      type: branch.officeType,
      address: branch.location,
      phones: branch.phones,
      emails: branch.emails,
      telephones: branch.telephones,
      faxes: branch.faxes,
      mapLink: `https://maps.app.goo.gl/dH1jLemX4qtYaocQ8`,
      isMainOffice: false,
    };
  };

  // Skeleton Card
  const SkeletonCard = () => (
    <div className="border rounded-xl overflow-hidden shadow-md animate-pulse">
      <div className="p-6">
        <div className="p-4 bg-gray-200 rounded-lg h-16 w-16 mb-7"></div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
        <div className="flex gap-3 mb-4">
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
        <div className="flex gap-3 mb-3">
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <BodyContent
        title="Let's connect with us globally"
        subTitle="At Momin Textile Mills Ltd, we believe in creating strong global connections built on trust, transparency, and shared growth."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      </BodyContent>
    );
  }

  if (error) {
    return (
      <BodyContent
        title="Let's connect with us globally"
        subTitle="At Momin Textile Mills Ltd, we believe in creating strong global connections built on trust, transparency, and shared growth."
      >
        <div className="text-center text-red-500 py-12">
          Failed to load branch information. Please try again later.
        </div>
      </BodyContent>
    );
  }

  return (
    <BodyContent
      title="Let's connect with us globally"
      subTitle="At Momin Textile Mills Ltd, we believe in creating strong global connections built on trust, transparency, and shared growth."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {branches.map((branch) => (
          <OfficeCard
            key={branch.id}
            {...transformBranchData(branch)}
          />
        ))}
      </div>

      {/* Empty State */}
      {branches.length === 0 && (
        <div className="text-center py-12">
          <p className="text-pGray text-lg">No branch information available.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={handleItemsPerPageChange}
            onPageChange={handlePageChange}
            showPaginationControl={true}
          />
        </div>
      )}
    </BodyContent>
  );
};

export default ForeignBranches;