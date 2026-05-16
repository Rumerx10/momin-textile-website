// app/dashboard/our-services/page.jsx
"use client";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Edit, Eye, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDeleteData, useFetchData } from "@/hooks/useApi";
import DeleteModal from "@/components/DeleteModal";
import DashboardBodyContent from "@/components/DashboardBodyContent";
import AddServiceForm from "./AddServiceForm";
import ViewDetailModal from "@/components/ViewDetailModal";
import DashboardDataTable from "@/components/DashboardDataTable";

interface ServiceItem {
  id: number;
  serviceType: string;
  heading: string;
  subheading: string;
  details: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

const serviceTypes = [
  { value: "GENERAL", label: "General Service" },
  { value: "ETP", label: "Effluent Treatment Plant (ETP)" },
  { value: "LABORATORY", label: "Our Laboratory" },
];

const OurServices = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null,
  );
  const [selectedServiceType, setSelectedServiceType] = useState("GENERAL");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const buildEndpoint = () => {
    let endpoint = `/services?page=${currentPage}&limit=${itemsPerPage}&sortOrder=${sortOrder}&isActive=true&serviceType=${selectedServiceType}`;
    if (searchTerm) {
      endpoint += `&search=${encodeURIComponent(searchTerm)}`;
    }
    return endpoint;
  };

  const queryKey = useMemo(() => {
    return [
      "services",
      selectedServiceType,
      String(currentPage),
      String(itemsPerPage),
      searchTerm,
      sortOrder,
    ];
  }, [selectedServiceType, currentPage, itemsPerPage, searchTerm, sortOrder]);

  const {
    data: apiData,
    isLoading,
    refetch,
  } = useFetchData(queryKey, buildEndpoint(), {
    enabled: true,
    refetchOnMount: true,
    staleTime: 0,
  });

  const { mutate: deleteService, isPending: isDeleting } = useDeleteData(
    ["services"],
    `/services`,
  );

  const { data: editData } = useFetchData(
    ["services", String(selectedService?.id)],
    isEditMode && selectedService?.id ? `/services/${selectedService.id}` : "",
    { enabled: isEditMode && !!selectedService?.id },
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

  const columnHelper = createColumnHelper<ServiceItem>();

  const handleView = (row: ServiceItem) => {
    setSelectedService(row);
    setIsViewModalOpen(true);
  };

  const handleEdit = (row: ServiceItem) => {
    setSelectedService(row);
    setIsEditMode(true);
    setOpenAddModal(true);
  };

  const handleDelete = (row: ServiceItem) => {
    setSelectedService(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedService) return;

    deleteService(String(selectedService.id), {
      onSuccess: () => {
        toast.success("Service deleted successfully!");
        setIsDeleteModalOpen(false);
        setSelectedService(null);
        refetch();
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Failed to delete service",
        );
      },
    });
  };

  const handleAddNew = () => {
    setSelectedService(null);
    setIsEditMode(false);
    setOpenAddModal(true);
  };

  const handleFormSuccess = () => {
    setOpenAddModal(false);
    setIsEditMode(false);
    setSelectedService(null);
    refetch();
  };

  const handleFormCancel = () => {
    setOpenAddModal(false);
    setIsEditMode(false);
    setSelectedService(null);
  };

  const serviceTypeLabels: Record<string, string> = {
    GENERAL: "General Service",
    ETP: "Effluent Treatment Plant",
    LABORATORY: "Our Laboratory",
  };

  const viewFields = [
    { key: "heading", label: "Heading", type: "text" as const },
    { key: "subheading", label: "Subheading", type: "text" as const },
    { key: "details", label: "Details", type: "html" as const },
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
        title="Our Services"
        addBtnText={`Add New ${serviceTypes.find((t) => t.value === selectedServiceType)?.label}`}
        openAddModal={openAddModal}
        setOpenAddModal={handleAddNew}
      >
        {/* Service Type Toggle */}
        <div className="mb-6 flex gap-3 items-center justify-center">
          {serviceTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => {
                setSelectedServiceType(type.value);
                setOpenAddModal(false);
                setIsEditMode(false);
                setSelectedService(null);
              }}
              className={`duration-300 font-medium rounded-sm py-2 px-8 ${
                selectedServiceType === type.value
                  ? "bg-pBlue text-white"
                  : "bg-gray-200 text-pBlue hover:bg-pBlue/80 hover:text-white"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {openAddModal ? (
          <AddServiceForm
            editData={isEditMode ? editData?.data || selectedService : null}
            serviceType={selectedServiceType}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <DashboardDataTable
            apiResponse={tableData}
            columns={columns}
            title={`List of ${serviceTypes.find((t) => t.value === selectedServiceType)?.label}s`}
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
          setSelectedService(null);
        }}
        title="Service Details"
        data={selectedService || {}}
        fields={viewFields}
        imageKey="image"
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedService(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Service?"
        message="Are you sure you want to delete this service"
        itemName={selectedService?.heading}
        isLoading={isDeleting}
      />
    </>
  );
};

export default OurServices;
