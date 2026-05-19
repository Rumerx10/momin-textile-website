// app/dashboard/members/page.jsx
"use client";
import { createColumnHelper } from "@tanstack/react-table";

import { useMemo, useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import DashboardBodyContent from "@/components/DashboardBodyContent";
import AddMemberForm from "./AddMemberForm";
import DeleteModal from "@/components/DeleteModal";
import ViewDetailModal from "@/components/ViewDetailModal";
import { useFetchData, useDeleteData } from "@/hooks/useApi";
import toast from "react-hot-toast";
import Image from "next/image";
import DashboardDataTable from "@/components/DashboardDataTable";

interface MemberItem {
  id: number;
  name: string;
  designation: string;
  description: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

const Members = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberItem | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const buildEndpoint = () => {
    let endpoint = `/members?page=${currentPage}&limit=${itemsPerPage}&sortOrder=${sortOrder}&isActive=true`;
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
      "members",
      String(currentPage),
      String(itemsPerPage),
      searchTerm,
      sortOrder,
    ],
    buildEndpoint(),
    { enabled: true, refetchOnMount: true },
  );

  const { mutate: deleteMember, isPending: isDeleting } = useDeleteData(
    ["members"],
    "/members",
  );

  const { data: editData } = useFetchData(
    ["members", `${selectedMember?.id}`],
    isEditMode && selectedMember?.id ? `/members/${selectedMember.id}` : "",
    { enabled: isEditMode && !!selectedMember?.id },
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

  const columnHelper = createColumnHelper<MemberItem>();

  const handleView = (row: MemberItem) => {
    setSelectedMember(row);
    setIsViewModalOpen(true);
  };

  const handleEdit = (row: MemberItem) => {
    setSelectedMember(row);
    setIsEditMode(true);
    setOpenAddModal(true);
  };

  const handleDelete = (row: MemberItem) => {
    setSelectedMember(row);
    setIsDeleteModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedMember(null);
    setIsEditMode(false);
    setOpenAddModal(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedMember) return;

    deleteMember(String(selectedMember.id), {
      onSuccess: () => {
        toast.success("Member deleted successfully!");
        setIsDeleteModalOpen(false);
        setSelectedMember(null);
        refetch();
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to delete member",
        );
      },
    });
  };

  const handleFormSuccess = () => {
    setOpenAddModal(false);
    setIsEditMode(false);
    setSelectedMember(null);
    refetch();
  };

  const handleFormCancel = () => {
    setOpenAddModal(false);
    setIsEditMode(false);
    setSelectedMember(null);
  };

  const viewFields = [
    { key: "name", label: "Name" },
    { key: "designation", label: "Designation" },
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
      columnHelper.display({
        id: "image",
        header: "Image",
        cell: ({ row }) => (
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
            {row.original.image ? (
              <Image
                src={row.original.image}
                alt={row.original.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-pGray">
                No img
              </div>
            )}
          </div>
        ),
      }),
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("designation", {
        header: "Designation",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("description", {
        header: "Description",
        cell: (info) => (
          <div className="max-w-xs truncate line-clamp-2">
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
        title="Team Members"
        addBtnText="Add New Member"
        openAddModal={openAddModal}
        setOpenAddModal={handleAddNew}
      >
        {openAddModal ? (
          <AddMemberForm
            editData={isEditMode ? editData?.data || selectedMember : null}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <DashboardDataTable
            apiResponse={tableData}
            columns={columns}
            title="List of All Members"
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
          setSelectedMember(null);
        }}
        title="Member Details"
        data={selectedMember || {}}
        fields={viewFields}
        imageKey="image"
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedMember(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Member?"
        message="Are you sure you want to delete this member"
        itemName={selectedMember?.name}
        isLoading={isDeleting}
      />
    </>
  );
};

export default Members;
