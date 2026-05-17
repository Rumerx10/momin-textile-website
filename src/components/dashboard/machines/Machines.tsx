"use client";
import toast from "react-hot-toast";
import { useMemo, useState } from "react";
import AddMachineForm from "./AddMachineForm";
import { Eye, Edit, Trash2 } from "lucide-react";
import DeleteModal from "@/components/DeleteModal";
import MachineDetailsModal from "./MachineDetailsModal";
import DashboardDataTable from "../../DashboardDataTable";
import { createColumnHelper } from "@tanstack/react-table";
import { useFetchData, useDeleteData } from "@/hooks/useApi";
import DashboardBodyContent from "@/components/DashboardBodyContent";

const Machines = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Build API endpoint
  const buildEndpoint = () => {
    let endpoint = `/machines?page=${currentPage}&limit=${itemsPerPage}&sortOrder=${sortOrder}&isActive=true`;
    if (searchTerm) {
      endpoint += `&search=${encodeURIComponent(searchTerm)}`;
    }
    return endpoint;
  };

  // Fetch machines data
  const {
    data: apiData,
    isLoading,
    refetch,
  } = useFetchData(
    [
      "machines",
      String(currentPage),
      String(itemsPerPage),
      searchTerm,
      sortOrder,
    ],
    buildEndpoint(),
    { enabled: true, refetchOnMount: true },
  );

  // Delete mutation
  const { mutate: deleteMachine, isPending: isDeleting } = useDeleteData(
    ["machines"],
    "/machines",
  );

  // Transform API response to table format
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

  const columnHelper = createColumnHelper<any>();

  const handleView = (row: any) => {
    setSelectedMachine(row);
    setViewModalOpen(true);
  };

  const handleEdit = (row: any) => {
    setSelectedMachine(row);
    setEditModalOpen(true);
    setOpenAddModal(true);
  };

  const handleDelete = (row: any) => {
    setSelectedMachine(row);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedMachine) return;

    deleteMachine(String(selectedMachine.id), {
      onSuccess: () => {
        toast.success("Machine deleted successfully!");
        setDeleteModalOpen(false);
        setSelectedMachine(null);
        refetch();
      },
      onError: (error: any) => {
        console.error("Delete failed:", error);
        toast.error(
          error?.response?.data?.message || "Failed to delete machine",
        );
      },
    });
  };

  const handleFormSuccess = () => {
    setOpenAddModal(false);
    setEditModalOpen(false);
    setSelectedMachine(null);
    refetch();
  };

  const handleFormCancel = () => {
    setOpenAddModal(false);
    setEditModalOpen(false);
    setSelectedMachine(null);
  };

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
      columnHelper.accessor("name", {
        header: "Machine Name",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("brandName", {
        header: "Brand",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("quantity", {
        header: "Quantity",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("origin", {
        header: "Origin",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("unitType", {
        header: "Category Unit",
        cell: (info) => {
          const unitType: string = info.getValue();
          const labels: Record<string, string> = {
            SPINNING: "Spinning Unit",
            WOVEN: "Woven Dyeing & Finishing",
            FABRIC: "Fabric Manufacturing",
          };
          return labels[unitType] || unitType;
        },
      }),
      columnHelper.accessor("productionCapacity", {
        header: "Production Capacity",
        cell: (info) => info.getValue(),
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

  // For Edit mode, we need to fetch the full machine data including images
  const { data: editData } = useFetchData(
    ["machine", selectedMachine?.id],
    editModalOpen && selectedMachine?.id
      ? `/machines/${selectedMachine.id}`
      : "",
    { enabled: editModalOpen && !!selectedMachine?.id },
  );

  return (
    <div>
      <DashboardBodyContent
        title="All Machines"
        addBtnText="Add New Machine"
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
      >
        {openAddModal ? (
          <AddMachineForm
            editData={editModalOpen ? editData?.data || selectedMachine : null}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <DashboardDataTable
            apiResponse={tableData}
            columns={columns}
            title="List of All Machines"
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
      <MachineDetailsModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedMachine(null);
        }}
        machineId={selectedMachine?.id}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedMachine(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Machine?"
        message="Are you sure you want to delete"
        itemName={selectedMachine?.name}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default Machines;
