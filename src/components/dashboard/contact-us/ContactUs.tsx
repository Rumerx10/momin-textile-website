// app/dashboard/domestic-branches/page.jsx
"use client";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Edit, Eye, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDeleteData, useFetchData } from "@/hooks/useApi";
import DeleteModal from "@/components/DeleteModal";
import DashboardBodyContent from "@/components/DashboardBodyContent";
import AddDomesticBranchForm from "./AddNewAddressForm";
import ViewDetailModal from "@/components/ViewDetailModal";
import DashboardDataTable from "@/components/DashboardDataTable";

interface BranchItem {
  id: number;
  officeName: string;
  location: string;
  officeType: string;
  emails: string[];
  phones: string[];
  telephones: string[];
  faxes: string[];
}

const ContactUs = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<BranchItem | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const buildEndpoint = () => {
    let endpoint = `/contact-addresses?page=${currentPage}&limit=${itemsPerPage}&sortOrder=${sortOrder}&isActive=true&officeType=DOMESTIC`;
    if (searchTerm) endpoint += `&search=${encodeURIComponent(searchTerm)}`;
    return endpoint;
  };

  const queryKey = useMemo(() => ["contact-addresses", String(currentPage), String(itemsPerPage), searchTerm, sortOrder], [currentPage, itemsPerPage, searchTerm, sortOrder]);

  const { data: apiData, isLoading, refetch } = useFetchData(queryKey, buildEndpoint(), { enabled: true, refetchOnMount: true, staleTime: 0 });
  const { mutate: deleteBranch, isPending: isDeleting } = useDeleteData(["contact-addresses"], "/contact-addresses");
  const { data: editData } = useFetchData(["contact-addresses", String(selectedBranch?.id)], isEditMode && selectedBranch?.id ? `/contact-addresses/${selectedBranch.id}` : "", { enabled: isEditMode && !!selectedBranch?.id });

  const tableData = useMemo(() => {
    if (!apiData?.data) return { metadata: { totalItems: 0, itemCount: 0, itemsPerPage, totalPages: 1, currentPage: 1, hasPagination: false }, data: [] };
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

  const handleView = (row: BranchItem) => { setSelectedBranch(row); setIsViewModalOpen(true); };
  const handleEdit = (row: BranchItem) => { setSelectedBranch(row); setIsEditMode(true); setOpenAddModal(true); };
  const handleDelete = (row: BranchItem) => { setSelectedBranch(row); setIsDeleteModalOpen(true); };
  const handleAddNew = () => { setSelectedBranch(null); setIsEditMode(false); setOpenAddModal(true); };
  const handleConfirmDelete = () => {
    if (!selectedBranch) return;
    deleteBranch(String(selectedBranch.id), {
      onSuccess: () => { toast.success("Branch deleted successfully!"); setIsDeleteModalOpen(false); setSelectedBranch(null); refetch(); },
      onError: (error: any) => toast.error(error?.response?.data?.message || "Failed to delete branch"),
    });
  };
  const handleFormSuccess = () => { setOpenAddModal(false); setIsEditMode(false); setSelectedBranch(null); refetch(); };
  const handleFormCancel = () => { setOpenAddModal(false); setIsEditMode(false); setSelectedBranch(null); };

  const viewFields = [
    { key: "officeName", label: "Office/Factory Name" },
    { key: "location", label: "Location Address" },
    { key: "emails", label: "Email Address", type: "array" as const },
    { key: "phones", label: "Phone Number", type: "array" as const },
    { key: "telephones", label: "Telephone No", type: "array" as const },
    { key: "faxes", label: "Fax Number", type: "array" as const },
  ];

  const columns = useMemo(() => [
    columnHelper.display({ id: "sl", header: "SL", cell: ({ row }) => String(row.index + 1 + (currentPage - 1) * itemsPerPage).padStart(2, "0") }),
    columnHelper.accessor("officeName", { header: "Office/Factory Name", cell: info => info.getValue() }),
    columnHelper.accessor("location", { header: "Location", cell: info => info.getValue() }),
    columnHelper.accessor("emails", { header: "Email", cell: info => info.getValue()?.join(", ") || "-" }),
    columnHelper.accessor("phones", { header: "Phone", cell: info => info.getValue()?.join(", ") || "-" }),
    columnHelper.display({ id: "action", header: "Action", cell: ({ row }) => (
      <div className="flex gap-3 items-center">
        <button onClick={() => handleView(row.original)} className="text-pGray hover:text-pBlue transition-colors" title="View Details"><Eye size={20} /></button>
        <button onClick={() => handleEdit(row.original)} className="text-pGray hover:text-green-600 transition-colors" title="Edit"><Edit size={18} /></button>
        <button onClick={() => handleDelete(row.original)} className="text-pGray hover:text-red-500 transition-colors" title="Delete"><Trash2 size={18} /></button>
      </div>
    ) }),
  ], [currentPage, itemsPerPage]);

  return (
    <>
      <DashboardBodyContent title="Add New Address & Contact" addBtnText="Add New Branch" openAddModal={openAddModal} setOpenAddModal={handleAddNew}>
        {openAddModal ? (
          <AddDomesticBranchForm editData={isEditMode ? editData?.data || selectedBranch : null} onSuccess={handleFormSuccess} onCancel={handleFormCancel} />
        ) : (
          <DashboardDataTable apiResponse={tableData} columns={columns} title="List of All Branches" showPagination={true}
            currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage}
            onSearch={setSearchTerm} isLoading={isLoading} />
        )}
      </DashboardBodyContent>

      <ViewDetailModal isOpen={isViewModalOpen} onClose={() => { setIsViewModalOpen(false); setSelectedBranch(null); }} title="Branch Details" data={selectedBranch || {}} fields={viewFields} />
      <DeleteModal isOpen={isDeleteModalOpen} onClose={() => { setIsDeleteModalOpen(false); setSelectedBranch(null); }} onConfirm={handleConfirmDelete} title="Delete Branch?" message="Are you sure you want to delete this branch" itemName={selectedBranch?.officeName} isLoading={isDeleting} />
    </>
  );
};

export default ContactUs;
