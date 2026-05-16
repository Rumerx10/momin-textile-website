// app/dashboard/foreign-branches/page.jsx
"use client";
import { createColumnHelper } from "@tanstack/react-table";
import DashboardDataTable from "../../DashboardDataTable";
import { useMemo, useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import DashboardBodyContent from "@/components/DashboardBodyContent";
import AddBranchForm from "./AddBranchForm";
import ViewDetailModal from "@/components/ViewDetailModal";
import { useFetchData, useDeleteData } from "@/hooks/useApi";
import toast from "react-hot-toast";
import DeleteModal from "@/components/DeleteModal";
import { MdBusiness } from "react-icons/md";

interface BranchItem {
  id: number;
  officeName: string;
  location: string;
  phones: string[];
  telephones: string[];
  faxes: string[];
  emails: string[];
  officeType: string;
}

const ForeignBranches = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<any>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const buildEndpoint = () => {
    let endpoint = `/contact-addresses?page=${currentPage}&limit=${itemsPerPage}&sortOrder=${sortOrder}&isActive=true&officeType=INTERNATIONAL`;
    if (searchTerm) {
      endpoint += `&search=${encodeURIComponent(searchTerm)}`;
    }
    return endpoint;
  };

  const {
    data: apiData,
    isLoading,
    refetch,
  } = useFetchData(
    [
      "contact-addresses",
      String(currentPage),
      String(itemsPerPage),
      searchTerm,
      sortOrder,
    ],
    buildEndpoint(),
    { enabled: true, refetchOnMount: true },
  );

  const { mutate: deleteBranch, isPending: isDeleting } = useDeleteData(
    ["contact-addresses"],
    "/contact-addresses",
  );

  const { data: editData } = useFetchData(
    ["contact-addresses", selectedBranch?.id],
    isEditMode && selectedBranch?.id
      ? `/contact-addresses/${selectedBranch.id}`
      : "",
    { enabled: isEditMode && !!selectedBranch?.id },
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

  const columnHelper = createColumnHelper<BranchItem>();

  const handleView = (row: BranchItem) => {
    setSelectedBranch(row);
    setViewModalOpen(true);
  };

  const handleEdit = (row: BranchItem) => {
    setSelectedBranch(row);
    setIsEditMode(true);
    setOpenAddModal(true);
  };

  const handleDelete = (row: BranchItem) => {
    setSelectedBranch(row);
    setDeleteModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedBranch(null);
    setIsEditMode(false);
    setOpenAddModal(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedBranch) return;

    deleteBranch(String(selectedBranch.id), {
      onSuccess: () => {
        toast.success("Branch deleted successfully!");
        setDeleteModalOpen(false);
        setSelectedBranch(null);
        refetch();
      },
      onError: (error: any) => {
        console.error("Delete failed:", error);
        toast.error(
          error?.response?.data?.message || "Failed to delete branch",
        );
      },
    });
  };

  const handleFormSuccess = () => {
    setOpenAddModal(false);
    setIsEditMode(false);
    setSelectedBranch(null);
    refetch();
  };

  const handleFormCancel = () => {
    setOpenAddModal(false);
    setIsEditMode(false);
    setSelectedBranch(null);
  };

  // Define view fields for the branch
  const viewFields = [
    {
      key: "officeName",
      label: "Office/Factory Name",
      icon: <MdBusiness className="text-pBlue text-xl shrink-0" />,
    },
    { key: "location", label: "Location", type: "location" as const },
    { key: "emails", label: "Email Address", type: "array" as const },
    { key: "phones", label: "Phone Number", type: "array" as const },
    { key: "telephones", label: "Telephone No", type: "array" as const },
    { key: "faxes", label: "Fax No", type: "array" as const },
    { key: "officeType", label: "Office Type" },
  ];

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "sl",
        header: "SL No",
        cell: ({ row }) =>
          String(row.index + 1 + (currentPage - 1) * itemsPerPage).padStart(
            2,
            "0",
          ),
      }),
      columnHelper.accessor("officeName", {
        header: "Office/Factory Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("location", {
        header: "Location",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("phones", {
        header: "Phone No",
        cell: (info) => info.getValue()?.join(", ") || "-",
      }),
      columnHelper.accessor("telephones", {
        header: "Tel. No",
        cell: (info) => info.getValue()?.join(", ") || "-",
      }),
      columnHelper.accessor("faxes", {
        header: "Fax No.",
        cell: (info) => info.getValue()?.join(", ") || "-",
      }),
      columnHelper.accessor("emails", {
        header: "Email Address",
        cell: (info) => info.getValue()?.join(", ") || "-",
      }),
      columnHelper.display({
        id: "action",
        header: "Action",
        cell: ({ row }) => (
          <div className="flex gap-2 items-center">
            <button
              onClick={() => handleView(row.original)}
              className="text-pGray hover:text-blue-600 transition-colors"
              title="View Details"
            >
              <Eye size={18} />
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
              className="text-pGray hover:text-red-600 transition-colors"
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
        title="Foreign Branches"
        addBtnText="Add New Branch"
        openAddModal={openAddModal}
        setOpenAddModal={handleAddNew}
      >
        {openAddModal ? (
          <AddBranchForm
            editData={isEditMode ? editData?.data || selectedBranch : null}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <DashboardDataTable
            apiResponse={tableData}
            columns={columns}
            title="List of All Foreign Branches"
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
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedBranch(null);
        }}
        title="Branch Details"
        data={selectedBranch || {}}
        fields={viewFields}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedBranch(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Branch?"
        message="Are you sure you want to delete this branch"
        itemName={selectedBranch?.officeName}
        isLoading={isDeleting}
      />
    </>
  );
};

export default ForeignBranches;
