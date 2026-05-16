// app/dashboard/media/page.jsx
"use client";
import { useState } from "react";
import DashboardBodyContent from "@/components/DashboardBodyContent";
import AddMediaForm from "./AddMediaForm";
import DeleteModal from "@/components/DeleteModal";
import MediaDetailsModal from "./MediaDetailsModal";
import MediaCard from "@/components/cards/MediaCard";
import Pagination from "@/components/Pagination";
import FormDropdown from "@/components/FormDropdown";
import { useFetchData, useDeleteData } from "@/hooks/useApi";
import toast from "react-hot-toast";
import MediaCardSkeleton from "@/components/MediaCardSkeleton";

const unitTypeOptions = [
  { value: "", label: "All Categories" },
  { value: "SPINNING", label: "Spinning Unit" },
  { value: "WOVEN", label: "Woven Dyeing & Finishing" },
  { value: "FABRIC", label: "Fabric Manufacturing" },
];

const Media = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [mediaType, setMediaType] = useState("IMAGE");
  const [unitType, setUnitType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");

  const buildEndpoint = () => {
    let endpoint = `/media?page=${currentPage}&limit=${itemsPerPage}&sortOrder=desc&isActive=true&mediaType=${mediaType}`;
    if (unitType) endpoint += `&unitType=${unitType}`;
    if (searchTerm) endpoint += `&search=${encodeURIComponent(searchTerm)}`;
    return endpoint;
  };

  const {
    data: apiData,
    isLoading,
    refetch,
  } = useFetchData(
    [
      "media",
      mediaType,
      unitType,
      String(currentPage),
      String(itemsPerPage),
      searchTerm,
    ],
    buildEndpoint(),
    { enabled: true, refetchOnMount: true },
  );

  const { mutate: deleteMedia, isPending: isDeleting } = useDeleteData(
    ["media"],
    "/media",
  );

  const { data: editData } = useFetchData(
    ["media", selectedMedia?.id],
    isEditMode && selectedMedia?.id ? `/media/${selectedMedia.id}` : "",
    { enabled: isEditMode && !!selectedMedia?.id },
  );

  const mediaData = apiData?.data || [];
  const totalItems = apiData?.meta?.totalItems || 0;
  const totalPages = apiData?.meta?.totalPages || 1;

  const handleView = (item: any) => {
    setSelectedMedia(item);
    setViewModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setSelectedMedia(item);
    setIsEditMode(true);
    setOpenAddModal(true);
  };

  const handleDelete = (item: any) => {
    setSelectedMedia(item);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedMedia) return;
    deleteMedia(String(selectedMedia.id), {
      onSuccess: () => {
        toast.success("Media deleted successfully!");
        setDeleteModalOpen(false);
        setSelectedMedia(null);
        refetch();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Failed to delete media");
      },
    });
  };

  const handleAddNew = () => {
    setSelectedMedia(null);
    setIsEditMode(false);
    setOpenAddModal(true);
  };

  const handleFormSuccess = () => {
    setOpenAddModal(false);
    setIsEditMode(false);
    setSelectedMedia(null);
    refetch();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <DashboardBodyContent
        title="Media Gallery"
        addBtnText="Add New Media"
        openAddModal={openAddModal}
        setOpenAddModal={handleAddNew}
      >
        {/* Media Type Toggle */}
        <div className="mb-6 flex gap-3 items-center justify-center">
          <button
            onClick={() => setMediaType("IMAGE")}
            className={`duration-300 font-medium rounded-sm py-2 px-8 ${
              mediaType === "IMAGE"
                ? "bg-pBlue text-white"
                : "bg-gray-200 text-pBlue hover:bg-pBlue/80 hover:text-white"
            }`}
          >
            Images
          </button>
          <button
            onClick={() => setMediaType("VIDEO")}
            className={`duration-300 font-medium rounded-sm py-2 px-8 ${
              mediaType === "VIDEO"
                ? "bg-pBlue text-white"
                : "bg-gray-200 text-pBlue hover:bg-pBlue/80 hover:text-white"
            }`}
          >
            Videos
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-pBlue text-2xl font-semibold">
            All {mediaType === "IMAGE" ? "Images" : "Videos"}
          </h4>
          <div className="w-64">
            <FormDropdown
              label=""
              value={unitType}
              options={unitTypeOptions}
              placeholder="Filter by Category"
              onChange={setUnitType}
            />
          </div>
        </div>

        {/* Media Grid */}
        {isLoading ? (
          <MediaCardSkeleton />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mediaData.map((item: any) => (
                <MediaCard
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  caption={item.caption}
                  subheading={item.subheading}
                  unitType={item.unitType}
                  mediaType={item.mediaType}
                  onView={() => handleView(item)}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => handleDelete(item)}
                />
              ))}
            </div>

            {mediaData.length === 0 && (
              <div className="text-center py-12">
                <p className="text-pGray">No media found.</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  showPaginationControl={true}
                />
              </div>
            )}
          </>
        )}
      </DashboardBodyContent>

      {/* Add/Edit Modal */}
      {openAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-1000 overflow-y-auto scrollbar-none">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
              <AddMediaForm
                editData={isEditMode ? editData?.data || selectedMedia : null}
                onSuccess={handleFormSuccess}
                onCancel={() => setOpenAddModal(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      <MediaDetailsModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedMedia(null);
        }}
        data={selectedMedia || {}}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedMedia(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Media?"
        message="Are you sure you want to delete this media"
        itemName={selectedMedia?.caption || selectedMedia?.subheading}
        isLoading={isDeleting}
      />
    </>
  );
};

export default Media;
