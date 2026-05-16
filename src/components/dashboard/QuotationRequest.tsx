"use client";
import { createColumnHelper } from "@tanstack/react-table";
import DashboardDataTable from "../DashboardDataTable";
import { useMemo, useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import BreadcrumbComponent from "../BreadcrumbComponent";
import toast from "react-hot-toast";
import QuotationDetailsModal from "../QuotationDetailsModal";
import { useDeleteData, useFetchData } from "@/hooks/useApi";
import DeleteModal from "../DeleteModal";

interface QuotationItem {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  companyName: string;
  designation: string;
  message: string;
  documents: string[];
  createdAt?: string;
  updatedAt?: string;
}

const QuotationRequest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedQuotation, setSelectedQuotation] =
    useState<QuotationItem | null>(null);

  const buildEndpoint = () => {
    let endpoint = `/quotations?page=${currentPage}&limit=${itemsPerPage}&sortOrder=${sortOrder}&isActive=true`;
    if (searchTerm) {
      endpoint += `&search=${encodeURIComponent(searchTerm)}`;
    }
    return endpoint;
  };

  const queryKey = useMemo(() => {
    return [
      "quotations",
      String(currentPage),
      String(itemsPerPage),
      searchTerm,
      sortOrder,
    ];
  }, [currentPage, itemsPerPage, searchTerm, sortOrder]);

  const {
    data: apiData,
    isLoading,
    refetch,
  } = useFetchData(queryKey, buildEndpoint(), {
    enabled: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  const { mutate: deleteQuotation, isPending: isDeleting } = useDeleteData(
    ["quotations"],
    "/quotations",
  );

  console.log("Quotation Get Data ::: ", apiData);

  // Convert API response to match DashboardDataTable expected format
  const tableData = useMemo(() => {
    if (!apiData?.data) {
      return {
        metadata: {
          totalItems: 0,
          itemCount: 0,
          itemsPerPage: itemsPerPage,
          totalPages: 1,
          currentPage: 1,
          hasPagination: false,
        },
        data: [],
      };
    }

    return {
      metadata: {
        totalItems: apiData.meta?.totalItems || 0,
        itemCount: apiData.meta?.itemCount || 0,
        itemsPerPage: apiData.meta?.itemsPerPage || itemsPerPage,
        totalPages: apiData.meta?.totalPages || 1,
        currentPage: apiData.meta?.currentPage || currentPage,
        hasPagination: apiData.meta?.hasPagination || false,
      },
      data: apiData.data,
    };
  }, [apiData, itemsPerPage, currentPage]);

  const columnHelper = createColumnHelper<QuotationItem>();

  const handleView = (row: QuotationItem) => {
    setSelectedQuotation(row);
    setIsViewModalOpen(true);
  };

  const handleDelete = (row: QuotationItem) => {
    setSelectedQuotation(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedQuotation) return;

    deleteQuotation(String(selectedQuotation.id), {
      onSuccess: () => {
        toast.success("Quotation deleted successfully!");
        setIsDeleteModalOpen(false);
        setSelectedQuotation(null);
        refetch();
      },
      onError: (error: any) => {
        console.error("Delete failed:", error);
        toast.error(
          error?.response?.data?.message || "Failed to delete quotation",
        );
      },
    });
  };

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "sl",
        header: "SL",
        cell: ({ row }) =>
          String(row.index + 1 + (currentPage - 1) * itemsPerPage).padStart(
            2,
            "0",
          ),
      }),

      columnHelper.accessor("firstName", {
        header: "First Name",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("phone", {
        header: "Phone Number",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("companyName", {
        header: "Company Name",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("message", {
        header: "Message",
        cell: (info) => (
          <div
            className="max-w-xs truncate line-clamp-1"
            dangerouslySetInnerHTML={{ __html: info.getValue() }}
          />
        ),
      }),

      columnHelper.display({
        id: "action",
        header: "Action",
        cell: ({ row }) => (
          <div className="flex gap-3 items-center">
            <button
              onClick={() => handleView(row.original)}
              className="text-pGray hover:text-pBlue transition-colors"
              title="View Details"
            >
              <Eye size={20} />
            </button>
            <button
              onClick={() => handleDelete(row.original)}
              className="text-pGray hover:text-red-500 transition-colors"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ),
      }),
    ],
    [currentPage, itemsPerPage],
  );

  return (
    <div className="space-y-6">
      <div>
        <h5 className="text-2xl font-semibold text-pBlue">Quotation Request</h5>
        <BreadcrumbComponent />
      </div>

      <DashboardDataTable
        apiResponse={tableData}
        columns={columns}
        title="All Quotation Requests"
        showPagination={true}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        onSearch={setSearchTerm}
        isLoading={isLoading}
      />

      {/* View Details Modal */}
      {selectedQuotation && (
        <QuotationDetailsModal
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedQuotation(null);
          }}
          data={{
            firstName: selectedQuotation.firstName,
            lastName: selectedQuotation.lastName,
            phoneNumber: selectedQuotation.phone,
            email: selectedQuotation.email,
            companyName: selectedQuotation.companyName,
            designation: selectedQuotation.designation,
            message: selectedQuotation.message,
            attachments:
              selectedQuotation.documents?.map((doc) => ({
                name: doc.split("/").pop() || "Document",
                url: doc,
              })) || [],
          }}
        />
      )}

      {/* Delete Confirmation Modal using updated DeleteModal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedQuotation(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Quotation?"
        message="Are you sure you want to delete this quotation"
        itemName={`${selectedQuotation?.firstName} ${selectedQuotation?.lastName}`}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default QuotationRequest;
