// app/dashboard/career-posts/page.jsx
"use client";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import DashboardBodyContent from "@/components/DashboardBodyContent";
import AddCareerForm from "./AddCareerForm";
import DeleteModal from "@/components/DeleteModal";
import ViewDetailModal from "@/components/ViewDetailModal";
import { useFetchData, useDeleteData } from "@/hooks/useApi";
import toast from "react-hot-toast";
import DashboardDataTable from "@/components/DashboardDataTable";
import { MdPictureAsPdf } from "react-icons/md";

interface CareerItem {
  id: number;
  jobTitle: string;
  jobType: string;
  jobShift: string;
  experience: number;
  deadline: string;
  approximateJoining: string;
  pdf?: string;
  createdAt?: string;
  updatedAt?: string;
}

const Career = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<any>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const buildEndpoint = () => {
    let endpoint = `/careers?page=${currentPage}&limit=${itemsPerPage}&sortOrder=${sortOrder}&isActive=true`;
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
      "careers",
      String(currentPage),
      String(itemsPerPage),
      searchTerm,
      sortOrder,
    ],
    buildEndpoint(),
    { enabled: true, refetchOnMount: true },
  );

  const { mutate: deleteCareer, isPending: isDeleting } = useDeleteData(
    ["careers"],
    "/careers",
  );

  const { data: editData } = useFetchData(
    ["careers", selectedCareer?.id],
    isEditMode && selectedCareer?.id ? `/careers/${selectedCareer.id}` : "",
    { enabled: isEditMode && !!selectedCareer?.id },
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

  const columnHelper = createColumnHelper<CareerItem>();

  const handleView = (row: CareerItem) => {
    setSelectedCareer(row);
    setViewModalOpen(true);
  };

  const handleEdit = (row: CareerItem) => {
    setSelectedCareer(row);
    setIsEditMode(true);
    setOpenAddModal(true);
  };

  const handleDelete = (row: CareerItem) => {
    setSelectedCareer(row);
    setDeleteModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedCareer(null);
    setIsEditMode(false);
    setOpenAddModal(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedCareer) return;

    deleteCareer(String(selectedCareer.id), {
      onSuccess: () => {
        toast.success("Career post deleted successfully!");
        setDeleteModalOpen(false);
        setSelectedCareer(null);
        refetch();
      },
      onError: (error: any) => {
        console.error("Delete failed:", error);
        toast.error(
          error?.response?.data?.message || "Failed to delete career post",
        );
      },
    });
  };

  const handleFormSuccess = () => {
    setOpenAddModal(false);
    setIsEditMode(false);
    setSelectedCareer(null);
    refetch();
  };

  const handleFormCancel = () => {
    setOpenAddModal(false);
    setIsEditMode(false);
    setSelectedCareer(null);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US");
  };

  const formatExperience = (experience: number) => {
    if (experience === 0) return "Fresher";
    return `${experience} ${experience === 1 ? "Year" : "Years"}`;
  };

  const formatJobType = (jobType: string) => {
    const labels: Record<string, string> = {
      FULL_TIME: "Full Time",
      PART_TIME: "Part Time",
      CONTRACTUAL: "Contractual",
      FREELANCE: "Freelance",
      INTERNSHIP: "Internship",
    };
    return labels[jobType] || jobType;
  };

  const formatJobShift = (jobShift: string) => {
    const labels: Record<string, string> = {
      DAY: "Day Shift",
      NIGHT: "Night Shift",
      ROTATING: "Rotating Shift",
    };
    return labels[jobShift] || jobShift;
  };

  // app/dashboard/career-posts/page.jsx - Update viewFields
  const viewFields = [
    { key: "jobTitle", label: "Job Title" },
    { key: "jobType", label: "Job Type", format: formatJobType },
    { key: "jobShift", label: "Job Shift", format: formatJobShift },
    { key: "experience", label: "Experience", format: formatExperience },
    { key: "deadline", label: "Deadline", format: formatDate },
    {
      key: "approximateJoining",
      label: "Approximate Joining",
      format: formatDate,
    },
    {
      key: "pdf",
      label: "Circular PDF",
      type: "pdf" as const, // Add this type
      format: (value: string) => {
        if (!value) return "-";
        const fileName = value.split("/").pop();
        return (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-pBlue hover:text-pBlue/80 transition-colors"
          >
            <MdPictureAsPdf size={20} className="text-red-500" />
            {fileName}
          </a>
        );
      },
    },
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
      columnHelper.accessor("jobTitle", {
        header: "Job Title",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("jobType", {
        header: "Job Type",
        cell: (info) => {
          const jobType = info.getValue();
          let color = "text-gray-600";
          if (jobType === "FULL_TIME") color = "text-green-600";
          if (jobType === "FREELANCE") color = "text-purple-600";
          if (jobType === "CONTRACTUAL") color = "text-orange-600";
          if (jobType === "PART_TIME") color = "text-cyan-600";
          if (jobType === "INTERNSHIP") color = "text-amber-600";
          return <span className={color}>{formatJobType(jobType)}</span>;
        },
      }),
      columnHelper.accessor("jobShift", {
        header: "Job Shift",
        cell: (info) => formatJobShift(info.getValue()),
      }),
      columnHelper.accessor("experience", {
        header: "Experience",
        cell: (info) => formatExperience(info.getValue()),
      }),
      columnHelper.accessor("deadline", {
        header: "Deadline",
        cell: (info) => formatDate(info.getValue()),
      }),
      columnHelper.accessor("approximateJoining", {
        header: "Joining",
        cell: (info) => formatDate(info.getValue()),
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
        title="List of Career Post"
        addBtnText="Add New Post"
        openAddModal={openAddModal}
        setOpenAddModal={handleAddNew}
      >
        {openAddModal ? (
          <AddCareerForm
            editData={isEditMode ? editData?.data || selectedCareer : null}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <DashboardDataTable
            apiResponse={tableData}
            columns={columns}
            title="List of all Career Posts"
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

      <ViewDetailModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedCareer(null);
        }}
        title="Career Post Details"
        data={selectedCareer || {}}
        fields={viewFields}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedCareer(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Career Post?"
        message="Are you sure you want to delete this career post"
        itemName={selectedCareer?.jobTitle}
        isLoading={isDeleting}
      />
    </>
  );
};

export default Career;
