// app/dashboard/clients/page.jsx
"use client";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import DashboardBodyContent from "@/components/DashboardBodyContent";
import AddClientForm from "./AddClientForm";
import DeleteModal from "@/components/DeleteModal";
import ViewDetailModal from "@/components/ViewDetailModal";
import { useFetchData, useDeleteData } from "@/hooks/useApi";
import toast from "react-hot-toast";
import Image from "next/image";
import DashboardDataTable from "@/components/DashboardDataTable";

interface ClientItem {
  id: number;
  name: string;
  description: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

const Clients = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const buildEndpoint = () => {
    let endpoint = `/clients?page=${currentPage}&limit=${itemsPerPage}&sortOrder=${sortOrder}&isActive=true`;
    if (searchTerm) {
      endpoint += `&search=${encodeURIComponent(searchTerm)}`;
    }
    return endpoint;
  };

  const { data: apiData, isLoading, refetch } = useFetchData(
    ["clients", String(currentPage), String(itemsPerPage), searchTerm, sortOrder],
    buildEndpoint(),
    { enabled: true, refetchOnMount: true }
  );

  const { mutate: deleteClient, isPending: isDeleting } = useDeleteData(
    ["clients"],
    "/clients"
  );

  const { data: editData } = useFetchData(
    ["clients", selectedClient?.id],
    isEditMode && selectedClient?.id ? `/clients/${selectedClient.id}` : "",
    { enabled: isEditMode && !!selectedClient?.id }
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

  const columnHelper = createColumnHelper<ClientItem>();

  const handleView = (row: ClientItem) => {
    setSelectedClient(row);
    setViewModalOpen(true);
  };

  const handleEdit = (row: ClientItem) => {
    setSelectedClient(row);
    setIsEditMode(true);
    setOpenAddModal(true);
  };

  const handleDelete = (row: ClientItem) => {
    setSelectedClient(row);
    setDeleteModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedClient(null);
    setIsEditMode(false);
    setOpenAddModal(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedClient) return;

    deleteClient(String(selectedClient.id), {
      onSuccess: () => {
        toast.success("Client deleted successfully!");
        setDeleteModalOpen(false);
        setSelectedClient(null);
        refetch();
      },
      onError: (error: any) => {
        console.error("Delete failed:", error);
        toast.error(error?.response?.data?.message || "Failed to delete client");
      },
    });
  };

  const handleFormSuccess = () => {
    setOpenAddModal(false);
    setIsEditMode(false);
    setSelectedClient(null);
    refetch();
  };

  const handleFormCancel = () => {
    setOpenAddModal(false);
    setIsEditMode(false);
    setSelectedClient(null);
  };

  const viewFields = [
    { key: "name", label: "Brand Name" },
    { key: "description", label: "Description" },
  ];

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "sl",
        header: "SL No",
        cell: ({ row }) => String(row.index + 1 + (currentPage - 1) * itemsPerPage).padStart(2, "0"),
      }),
      columnHelper.display({
        id: "logo",
        header: "Logo",
        cell: ({ row }) => (
          <div className="relative w-10 h-10 bg-gray-100 rounded-lg overflow-hidden">
            {row.original.image ? (
              <Image
                src={row.original.image}
                alt={row.original.name}
                width={40}
                height={40}
                className="object-contain p-1"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-pGray">
                No logo
              </div>
            )}
          </div>
        ),
      }),
      columnHelper.accessor("name", {
        header: "Brand Name",
        cell: (info) => (
          <span className="font-medium text-pBlue">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("description", {
        header: "Description",
        cell: (info) => (
          <span className="line-clamp-2 max-w-md">{info.getValue()}</span>
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
    [currentPage, itemsPerPage]
  );

  return (
    <>
      <DashboardBodyContent
        title="Our Clients"
        addBtnText="Add New Client"
        openAddModal={openAddModal}
        setOpenAddModal={handleAddNew}
      >
        {openAddModal ? (
          <AddClientForm
            editData={isEditMode ? editData?.data || selectedClient : null}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <DashboardDataTable
            apiResponse={tableData}
            columns={columns}
            title="List of All Clients"
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
          setSelectedClient(null);
        }}
        title="Client Details"
        data={selectedClient || {}}
        fields={viewFields}
        imageKey="image"
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedClient(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Client?"
        message="Are you sure you want to delete this client"
        itemName={selectedClient?.name}
        isLoading={isDeleting}
      />
    </>
  );
};

export default Clients;