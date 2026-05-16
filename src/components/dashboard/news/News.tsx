// app/dashboard/news-events/page.jsx
"use client";
import { createColumnHelper } from "@tanstack/react-table";

import { useMemo, useState } from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import DashboardBodyContent from "@/components/DashboardBodyContent";
import AddNewsForm from "./AddNewsForm";
import DeleteModal from "@/components/DeleteModal";
import ViewDetailModal from "@/components/ViewDetailModal";
import { useFetchData, useDeleteData } from "@/hooks/useApi";
import toast from "react-hot-toast";
import DashboardDataTable from "@/components/DashboardDataTable";

interface NewsItem {
  id: number;
  heading: string;
  shortParagraph: string;
  details: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const News = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const buildEndpoint = () => {
    let endpoint = `/news-events?page=${currentPage}&limit=${itemsPerPage}&sortOrder=${sortOrder}&isActive=true`;
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
      "news-events",
      String(currentPage),
      String(itemsPerPage),
      searchTerm,
      sortOrder,
    ],
    buildEndpoint(),
    { enabled: true, refetchOnMount: true },
  );

  const { mutate: deleteNews, isPending: isDeleting } = useDeleteData(
    ["news-events"],
    "/news-events",
  );

  const { data: editData } = useFetchData(
    ["news-events", selectedNews?.id],
    isEditMode && selectedNews?.id ? `/news-events/${selectedNews.id}` : "",
    { enabled: isEditMode && !!selectedNews?.id },
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

  const columnHelper = createColumnHelper<NewsItem>();

  const handleView = (row: NewsItem) => {
    setSelectedNews(row);
    setViewModalOpen(true);
  };

  const handleEdit = (row: NewsItem) => {
    setSelectedNews(row);
    setIsEditMode(true);
    setOpenAddModal(true);
  };

  const handleDelete = (row: NewsItem) => {
    setSelectedNews(row);
    setDeleteModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedNews(null);
    setIsEditMode(false);
    setOpenAddModal(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedNews) return;

    deleteNews(String(selectedNews.id), {
      onSuccess: () => {
        toast.success("News deleted successfully!");
        setDeleteModalOpen(false);
        setSelectedNews(null);
        refetch();
      },
      onError: (error: any) => {
        console.error("Delete failed:", error);
        toast.error(error?.response?.data?.message || "Failed to delete news");
      },
    });
  };

  const handleFormSuccess = () => {
    setOpenAddModal(false);
    setIsEditMode(false);
    setSelectedNews(null);
    refetch();
  };

  const handleFormCancel = () => {
    setOpenAddModal(false);
    setIsEditMode(false);
    setSelectedNews(null);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Define view fields for the news item
  const viewFields = [
    { key: "heading", label: "Heading" },
    { key: "shortParagraph", label: "Short Paragraph" },
    { key: "details", label: "Details", type: "text" as const },
    { key: "createdAt", label: "Created Date" },
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
      columnHelper.accessor("createdAt", {
        header: "Date",
        cell: (info) => (
          <span className="whitespace-nowrap">
            {formatDate(info.getValue())}
          </span>
        ),
      }),
      columnHelper.accessor("heading", {
        header: "Heading",
        cell: (info) => (
          <span className="font-medium text-pBlue">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("shortParagraph", {
        header: "Short Paragraph",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("details", {
        header: "Description",
        cell: (info) => (
          <div
            className="line-clamp-2 max-w-xs"
            dangerouslySetInnerHTML={{ __html: info.getValue() || "-" }}
          />
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
    [currentPage, itemsPerPage],
  );

  return (
    <>
      <DashboardBodyContent
        title="News & Events"
        addBtnText="Add News"
        openAddModal={openAddModal}
        setOpenAddModal={handleAddNew}
      >
        {openAddModal ? (
          <AddNewsForm
            editData={isEditMode ? editData?.data || selectedNews : null}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <DashboardDataTable
            apiResponse={tableData}
            columns={columns}
            title="All News & Events"
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
          setSelectedNews(null);
        }}
        title="News & Event Details"
        data={selectedNews || {}}
        fields={viewFields}
        imageKey="image"
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedNews(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete News?"
        message="Are you sure you want to delete this news"
        itemName={selectedNews?.heading}
        isLoading={isDeleting}
      />
    </>
  );
};

export default News;
