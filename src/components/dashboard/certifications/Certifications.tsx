// app/dashboard/certifications/page.jsx
"use client";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Edit, Eye, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDeleteData, useFetchData } from "@/hooks/useApi";
import DeleteModal from "@/components/DeleteModal";
import DashboardBodyContent from "@/components/DashboardBodyContent";
import AddCertificationForm from "./AddCertificationForm";
import ViewDetailModal from "@/components/ViewDetailModal";
import DashboardDataTable from "@/components/DashboardDataTable";

interface CertificationItem {
  id: number;
  heading: string;
  subheading: string;
  description: string;
  logo: string;
  createdAt?: string;
  updatedAt?: string;
}

const Certifications = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCertification, setSelectedCertification] =
    useState<CertificationItem | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const buildEndpoint = () => {
    let endpoint = `/certifications?page=${currentPage}&limit=${itemsPerPage}&sortOrder=${sortOrder}&isActive=true`;
    if (searchTerm) {
      endpoint += `&search=${encodeURIComponent(searchTerm)}`;
    }
    return endpoint;
  };

  const queryKey = useMemo(() => {
    return [
      "certifications",
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

  const { mutate: deleteCertification, isPending: isDeleting } = useDeleteData(
    ["certifications"],
    "/certifications",
  );

  const { data: editData } = useFetchData(
    ["certifications", String(selectedCertification?.id)],
    isEditMode && selectedCertification?.id
      ? `/certifications/${selectedCertification.id}`
      : "",
    { enabled: isEditMode && !!selectedCertification?.id },
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

  const columnHelper = createColumnHelper<CertificationItem>();

  const handleView = (row: CertificationItem) => {
    setSelectedCertification(row);
    setIsViewModalOpen(true);
  };

  const handleEdit = (row: CertificationItem) => {
    setSelectedCertification(row);
    setIsEditMode(true);
    setOpenAddModal(true);
  };

  const handleDelete = (row: CertificationItem) => {
    setSelectedCertification(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedCertification) return;

    deleteCertification(String(selectedCertification.id), {
      onSuccess: () => {
        toast.success("Certification deleted successfully!");
        setIsDeleteModalOpen(false);
        setSelectedCertification(null);
        refetch();
      },
      onError: (error: any) => {
        console.error("Delete failed:", error);
        toast.error(
          error?.response?.data?.message || "Failed to delete certification",
        );
      },
    });
  };

  const handleAddNew = () => {
    setSelectedCertification(null);
    setIsEditMode(false);
    setOpenAddModal(true);
  };

  const handleFormSuccess = () => {
    setOpenAddModal(false);
    setIsEditMode(false);
    setSelectedCertification(null);
    refetch();
  };

  const handleFormCancel = () => {
    setOpenAddModal(false);
    setIsEditMode(false);
    setSelectedCertification(null);
  };

  const viewFields = [
    { key: "heading", label: "Heading" },
    { key: "subheading", label: "Subheading" },
    { key: "description", label: "Description" },
  ];

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
      columnHelper.accessor("heading", {
        header: "Heading",
        cell: (info) => (
          <div className="max-w-xs truncate line-clamp-1">
            {info.getValue()}
          </div>
        ),
      }),
      columnHelper.accessor("subheading", {
        header: "Subheading",
        cell: (info) => (
          <div className="max-w-xs truncate line-clamp-1">
            {info.getValue()}
          </div>
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
    [currentPage, itemsPerPage],
  );

  return (
    <>
      <DashboardBodyContent
        title="Certifications"
        addBtnText="Add New Certification"
        openAddModal={openAddModal}
        setOpenAddModal={handleAddNew}
      >
        {openAddModal ? (
          <AddCertificationForm
            editData={
              isEditMode ? editData?.data || selectedCertification : null
            }
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <DashboardDataTable
            apiResponse={tableData}
            columns={columns}
            title="List of All Certifications"
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
          setSelectedCertification(null);
        }}
        title="Certification Details"
        data={selectedCertification || {}}
        fields={viewFields}
        imageKey="logo"
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCertification(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Certification?"
        message="Are you sure you want to delete this certification"
        itemName={selectedCertification?.heading}
        isLoading={isDeleting}
      />
    </>
  );
};

export default Certifications;
