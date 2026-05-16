// app/dashboard/contact-quotations/page.jsx
"use client";
import { createColumnHelper } from "@tanstack/react-table";
import DashboardDataTable from "../DashboardDataTable";
import { useMemo, useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import BreadcrumbComponent from "../BreadcrumbComponent";
import { useFetchData, useDeleteData } from "@/hooks/useApi";
import toast from "react-hot-toast";
import DeleteModal from "@/components/DeleteModal";
import ViewDetailModal from "@/components/ViewDetailModal";

interface ContactSupportItem {
  id: number;
  name: string;
  email: string;
  contactNumber: string;
  message: string;
  createdAt?: string;
}

const Support = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContactSupportItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const buildEndpoint = () => {
    let endpoint = `/contact-support?page=${currentPage}&limit=${itemsPerPage}&sortOrder=${sortOrder}&isActive=true`;
    if (searchTerm) {
      endpoint += `&search=${encodeURIComponent(searchTerm)}`;
    }
    return endpoint;
  };

  const { data: apiData, isLoading, refetch } = useFetchData(
    ["contact-support", String(currentPage), String(itemsPerPage), searchTerm, sortOrder],
    buildEndpoint(),
    { enabled: true, refetchOnMount: true }
  );

  const { mutate: deleteItem, isPending: isDeleting } = useDeleteData(
    ["contact-support"],
    "/contact-support"
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

  const columnHelper = createColumnHelper<ContactSupportItem>();

  const handleView = (row: ContactSupportItem) => {
    setSelectedItem(row);
    setViewModalOpen(true);
  };

  const handleDelete = (row: ContactSupportItem) => {
    setSelectedItem(row);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedItem) return;

    deleteItem(String(selectedItem.id), {
      onSuccess: () => {
        toast.success("Message deleted successfully!");
        setDeleteModalOpen(false);
        setSelectedItem(null);
        refetch();
      },
      onError: (error: any) => {
        console.error("Delete failed:", error);
        toast.error(error?.response?.data?.message || "Failed to delete message");
      },
    });
  };

  // Define view fields for the contact support item
  const viewFields = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email", type: "email" as const },
    { key: "contactNumber", label: "Phone Number", type: "phone" as const },
    { key: "message", label: "Message" },
    { key: "createdAt", label: "Submitted On" },
  ];

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "sl",
        header: "SL No",
        cell: ({ row }) => String(row.index + 1 + (currentPage - 1) * itemsPerPage).padStart(2, "0"),
      }),
      columnHelper.accessor("name", {
        header: "Full Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("contactNumber", {
        header: "Phone Number",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("message", {
        header: "Message",
        cell: (info) => (
          <div className="max-w-xs truncate">{info.getValue()}</div>
        ),
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
    [currentPage, itemsPerPage]
  );

  return (
    <>
      <div className="space-y-6">
        <div>
          <h5 className="text-2xl font-semibold text-pBlue">Contact & Support</h5>
          <BreadcrumbComponent />
        </div>
        <DashboardDataTable
          apiResponse={tableData}
          columns={columns}
          title="All Contact Messages"
          showPagination={true}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          onSearch={setSearchTerm}
          isLoading={isLoading}
        />
      </div>

      {/* View Details Modal */}
      <ViewDetailModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedItem(null);
        }}
        title="Message Details"
        data={selectedItem || {}}
        fields={viewFields}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedItem(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Message?"
        message="Are you sure you want to delete this message"
        itemName={selectedItem?.name}
        isLoading={isDeleting}
      />
    </>
  );
};

export default Support;