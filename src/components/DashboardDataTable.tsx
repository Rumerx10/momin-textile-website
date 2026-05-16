"use client";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import Pagination from "./Pagination";
import { usePathname } from "next/navigation";
import TableSkeleton from "./TableSkeleton";

interface DashboardDataTableProps<T> {
  apiResponse: {
    metadata: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
      hasPagination: boolean;
    };
    data: T[];
  };
  columns: ColumnDef<T, any>[];
  title?: string;
  showPagination?: boolean;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  itemsPerPage?: number;
  setItemsPerPage?: (itemsPerPage: number) => void;
  onSearch?: (searchTerm: string) => void;
  isLoading?: boolean;
}

const DashboardDataTable = <T,>({
  apiResponse,
  columns,
  title = "All Data",
  showPagination = true,
  currentPage: externalCurrentPage,
  setCurrentPage: externalSetCurrentPage,
  itemsPerPage: externalItemsPerPage,
  setItemsPerPage: externalSetItemsPerPage,
  onSearch,
  isLoading = false,
}: DashboardDataTableProps<T>) => {
  const pathname = usePathname();
  const { metadata, data } = apiResponse;

  // Use internal state if external not provided, otherwise use external
  const [internalCurrentPage, setInternalCurrentPage] = useState(metadata.currentPage);
  const [internalItemsPerPage, setInternalItemsPerPage] = useState(metadata.itemsPerPage);
  const [globalFilter, setGlobalFilter] = useState("");

  const currentPage = externalCurrentPage !== undefined ? externalCurrentPage : internalCurrentPage;
  const setCurrentPage = externalSetCurrentPage || setInternalCurrentPage;
  const itemsPerPage = externalItemsPerPage !== undefined ? externalItemsPerPage : internalItemsPerPage;
  const setItemsPerPage = externalSetItemsPerPage || setInternalItemsPerPage;
  
  const totalPages = metadata.totalPages;

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    if (externalSetItemsPerPage) {
      externalSetItemsPerPage(newItemsPerPage);
    }
  };

  // Handle search
  const handleSearch = (value: string) => {
    setGlobalFilter(value);
    setCurrentPage(1);
    if (onSearch) {
      onSearch(value);
    }
  };

  // Memoize filtered data
  const filteredData = useMemo(() => {
    if (onSearch) return data;
    if (!globalFilter) return data;

    return data.filter((row: any) => {
      return Object.values(row).some((value) =>
        String(value).toLowerCase().includes(globalFilter.toLowerCase())
      );
    });
  }, [data, globalFilter, onSearch]);

  // Memoize display data (paginated)
  const displayData = useMemo(() => {
    if (onSearch) return filteredData;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage, onSearch]);

  // Memoize total pages for client-side
  const clientTotalPages = useMemo(() => {
    return Math.ceil(filteredData.length / itemsPerPage);
  }, [filteredData, itemsPerPage]);

  const displayTotalPages = onSearch ? totalPages : clientTotalPages;

  const table = useReactTable({
    data: displayData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="flex flex-col p-4 rounded-lg gap-6 md:gap-8 border shadow bg-white">
      <div className="space-y-4">
        {/* Header with Search and See All Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <h4 className="font-semibold text-pBlue text-xl">{title}</h4>
            <div>
              <div className="h-10 flex items-center justify-center gap-5">
                <div className="relative flex h-full">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={globalFilter}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-pBlue"
                  />
                </div>
                {pathname === "/dashboard" && (
                  <Link
                    href="/dashboard/quotation-request"
                    className="flex items-center justify-center bg-pBlue px-7 rounded-sm h-full text-white font-medium hover:bg-pBlue/90 transition-colors"
                  >
                    See All Request
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && <TableSkeleton />}

        {/* Data Table */}
        {!isLoading && (
          <>
            <div className="overflow-x-auto scrollbar-modern">
              <table className="w-full">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="bg-bgGray text-bdrGray2">
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="whitespace-nowrap text-pBlue px-4 py-3 text-left font-medium"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="border-slate-300 px-4 py-4 text-pGray"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              {table.getRowModel().rows.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No result found.
                </div>
              )}
            </div>

            {/* Pagination */}
            {showPagination && (
              <Pagination
                currentPage={currentPage}
                totalPages={displayTotalPages}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={handleItemsPerPageChange}
                onPageChange={handlePageChange}
                showPaginationControl={true}
                className="mt-4"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardDataTable;