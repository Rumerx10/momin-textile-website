// src/components/common/Pagination.jsx
"use client";

import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
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
    <div className="flex items-center justify-center gap-2 mt-8 md:mt-12">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 md:px-4 md:py-2 text-sm md:text-base rounded-md transition-all duration-200 ${
          currentPage === 1
            ? "text-pGray cursor-not-allowed opacity-50"
            : "text-pBlue hover:scale-105"
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
                ? "bg-pBlue text-white font-bold"
                : page === "..."
                  ? "text-pGray cursor-default"
                  : "text-pGray hover:bg-pBlue hover:text-white"
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
            : "text-pBlue hover:scale-105"
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
  );
};

export default Pagination;
