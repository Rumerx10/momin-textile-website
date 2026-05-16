"use client";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage?: number;
  setItemsPerPage?: (itemsPerPage: number) => void;
  onPageChange: (page: number) => void;
  className?: string;
  showPaginationControl?: boolean;
}

const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage = 10,
  setItemsPerPage,
  onPageChange,
  className = "mt-8 md:mt-12",
  showPaginationControl = false,
}: PaginationProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const itemsPerPageOptions = [10, 20, 50, 100];

  const handleItemsPerPageChange = (value: number) => {
    if (setItemsPerPage) {
      setItemsPerPage(value);
    }
    onPageChange(1); // Reset to first page when changing items per page
    setIsDropdownOpen(false);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div
      className={`flex flex-col sm:flex-row gap-4 items-center ${showPaginationControl ? "justify-between" : "justify-center"} `}
    >
      {/* Page Item Control - Hidden by default */}
      {showPaginationControl && (
        <div className="flex items-center gap-3">
          <p className="text-pGray text-sm">
            Showing page {currentPage} of {totalPages} pages
          </p>

          {/* Custom Items Per Page Dropdown */}
          <div className="relative group h-full">
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-3 py-1.5 pr-8 border border-gray-300 rounded-lg text-pGray text-sm 
                bg-white cursor-pointer flex items-center justify-between gap-2 whitespace-nowrap
                hover:border-pBlue transition-colors min-w-[100px]"
            >
              {itemsPerPage} / page
              <div
                className={`duration-300 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              >
                <IoIosArrowDown size={14} />
              </div>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute left-0 mt-1 bg-white text-pGray rounded-md shadow-lg z-10 min-w-[100px] border border-gray-200">
                <div className="flex flex-col gap-1 p-1">
                  {itemsPerPageOptions.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleItemsPerPageChange(option)}
                      className={`w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors
                        ${
                          itemsPerPage === option
                            ? "bg-pBlue text-white"
                            : "hover:bg-pBlue/10 hover:text-pBlue"
                        }`}
                    >
                      {option} / page
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pagination Buttons */}
      <div className={`flex items-center justify-center ${className}`}>
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-md transition-all duration-200 ${
            currentPage === 1
              ? "text-pGray cursor-not-allowed opacity-50"
              : "text-pBlue hover:bg-pBlue/10 hover:scale-105"
          }`}
        >
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 md:gap-2">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && onPageChange(page)}
              className={`min-w-8 md:min-w-10 h-8 md:h-10 px-2 md:px-3 text-sm md:text-base rounded-md transition-all duration-200 ${
                currentPage === page
                  ? "bg-pBlue text-white font-bold shadow-md"
                  : page === "..."
                    ? "text-pGray cursor-default"
                    : "text-pGray hover:bg-pBlue/10 hover:text-pBlue"
              }`}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-md transition-all duration-200 ${
            currentPage === totalPages
              ? "text-pGray cursor-not-allowed opacity-50"
              : "text-pBlue hover:bg-pBlue/10 hover:scale-105"
          }`}
        >
          <span className="flex items-center gap-1">
            Next
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
