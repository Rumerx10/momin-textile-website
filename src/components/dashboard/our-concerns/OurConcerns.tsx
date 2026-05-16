// app/dashboard/our-concerns/page.jsx
"use client";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Edit, Eye, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDeleteData, useFetchData } from "@/hooks/useApi";
import DeleteModal from "@/components/DeleteModal";
import DashboardBodyContent from "@/components/DashboardBodyContent";
import AddConcernForm from "./AddConcernForm";
import ViewDetailModal from "@/components/ViewDetailModal";
import DashboardDataTable from "@/components/DashboardDataTable";

interface ConcernItem {
  id: number;
  cardHeading: string;
  shortParagraph: string;
  businessMotto: string;
  description: string;
  details: string;
  logo: string;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}

const OurConcerns = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedConcern, setSelectedConcern] = useState<ConcernItem | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const buildEndpoint = () => {
    let endpoint = `/concerns?page=${currentPage}&limit=${itemsPerPage}&sortOrder=${sortOrder}&isActive=true`;
    if (searchTerm) {
      endpoint += `&search=${encodeURIComponent(searchTerm)}`;
    }
    return endpoint;
  };

  const queryKey = useMemo(() => {
    return [
      "concerns",
      String(currentPage),
      String(itemsPerPage),
      searchTerm,
      sortOrder,
    ];
  }, [currentPage, itemsPerPage, searchTerm, sortOrder]);

  const { data: apiData, isLoading, refetch } = useFetchData(
    queryKey,
    buildEndpoint(),
    { enabled: true, refetchOnMount: true, staleTime: 0 }
  );

  const { mutate: deleteConcern, isPending: isDeleting } = useDeleteData(
    ["concerns"],
    "/concerns"
  );

  const { data: editData } = useFetchData(
    ["concerns", String(selectedConcern?.id)],
    isEditMode && selectedConcern?.id ? `/concerns/${selectedConcern.id}` : "",
    { enabled: isEditMode && !!selectedConcern?.id }
  );

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

  const columnHelper = createColumnHelper<ConcernItem>();

  const handleView = (row: ConcernItem) => {
    setSelectedConcern(row);
    setIsViewModalOpen(true);
  };

  const handleEdit = (row: ConcernItem) => {
    setSelectedConcern(row);
    setIsEditMode(true);
    setOpenAddModal(true);
  };

  const handleDelete = (row: ConcernItem) => {
    setSelectedConcern(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedConcern) return;

    deleteConcern(String(selectedConcern.id), {
      onSuccess: () => {
        toast.success("Concern deleted successfully!");
        setIsDeleteModalOpen(false);
        setSelectedConcern(null);
        refetch();
      },
      onError: (error: any) => {
        console.error("Delete failed:", error);
        toast.error(error?.response?.data?.message || "Failed to delete concern");
      },
    });
  };

  const handleAddNew = () => {
    setSelectedConcern(null);
    setIsEditMode(false);
    setOpenAddModal(true);
  };

  const handleFormSuccess = () => {
    setOpenAddModal(false);
    setIsEditMode(false);
    setSelectedConcern(null);
    refetch();
  };

  const handleFormCancel = () => {
    setOpenAddModal(false);
    setIsEditMode(false);
    setSelectedConcern(null);
  };

  const viewFields = [
    { key: "cardHeading", label: "Card Heading" },
    { key: "shortParagraph", label: "Short Paragraph" },
    { key: "businessMotto", label: "Business Motto" },
    { key: "description", label: "Description" },
    { key: "details", label: "Details" },
  ];

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "sl",
        header: "SL",
        cell: ({ row }) =>
          String(row.index + 1 + (currentPage - 1) * itemsPerPage).padStart(2, "0"),
      }),
      columnHelper.accessor("cardHeading", {
        header: "Card Heading",
        cell: (info) => (
          <div className="max-w-xs truncate line-clamp-1">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor("shortParagraph", {
        header: "Short Paragraph",
        cell: (info) => (
          <div className="max-w-xs truncate line-clamp-1">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor("businessMotto", {
        header: "Business Motto",
        cell: (info) => (
          <div className="max-w-xs truncate line-clamp-1">{info.getValue()}</div>
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
              onClick={() => handleEdit(row.original)}
              className="text-pGray hover:text-green-600 transition-colors"
              title="Edit"
            >
              <Edit size={18} />
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
    [currentPage, itemsPerPage]
  );

  return (
    <>
      <DashboardBodyContent
        title="Our Concerns"
        addBtnText="Add New Concern"
        openAddModal={openAddModal}
        setOpenAddModal={handleAddNew}
      >
        {openAddModal ? (
          <AddConcernForm
            editData={isEditMode ? editData?.data || selectedConcern : null}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <DashboardDataTable
            apiResponse={tableData}
            columns={columns}
            title="List of All Concerns"
            showPagination={true}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            onSearch={setSearchTerm}
            isLoading={isLoading}
          />
        )}
      </DashboardBodyContent>

      {/* View Details Modal */}
      <ViewDetailModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedConcern(null);
        }}
        title="Concern Details"
        data={selectedConcern || {}}
        fields={viewFields}
        imageKey="logo"
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedConcern(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Concern?"
        message="Are you sure you want to delete this concern"
        itemName={selectedConcern?.cardHeading}
        isLoading={isDeleting}
      />
    </>
  );
};

export default OurConcerns;