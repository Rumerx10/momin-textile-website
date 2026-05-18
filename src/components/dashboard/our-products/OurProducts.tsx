// app/dashboard/our-products/page.jsx
"use client";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Edit, Eye, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDeleteData, useFetchData } from "@/hooks/useApi";
import DeleteModal from "@/components/DeleteModal";
import DashboardBodyContent from "@/components/DashboardBodyContent";
import AddProductForm from "./AddProductForm";
import ViewDetailModal from "@/components/ViewDetailModal";
import DashboardDataTable from "@/components/DashboardDataTable";

interface ProductItem {
  id: number;
  heading: string;
  subheading: string;
  description: string;
  details: string;
  specification: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

const OurProducts = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const buildEndpoint = () => {
    let endpoint = `/products?page=${currentPage}&limit=${itemsPerPage}&sortOrder=${sortOrder}&isActive=true`;
    if (searchTerm) {
      endpoint += `&search=${encodeURIComponent(searchTerm)}`;
    }
    return endpoint;
  };

  const queryKey = useMemo(() => {
    return [
      "products",
      String(currentPage),
      String(itemsPerPage),
      searchTerm,
      sortOrder,
    ];
  }, [currentPage, itemsPerPage, searchTerm, sortOrder]);

  const { data: apiData, isLoading, refetch } = useFetchData(
    queryKey,
    buildEndpoint(),
    { enabled: true, refetchOnMount: true, staleTime: 0 }
  );

  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteData(
    ["products"],
    "/products"
  );

  const { data: editData } = useFetchData(
    ["products", String(selectedProduct?.id)],
    isEditMode && selectedProduct?.id ? `/products/${selectedProduct.id}` : "",
    { enabled: isEditMode && !!selectedProduct?.id }
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

  const columnHelper = createColumnHelper<ProductItem>();

  const handleView = (row: ProductItem) => {
    setSelectedProduct(row);
    setIsViewModalOpen(true);
  };

  const handleEdit = (row: ProductItem) => {
    setSelectedProduct(row);
    setIsEditMode(true);
    setOpenAddModal(true);
  };

  const handleDelete = (row: ProductItem) => {
    setSelectedProduct(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedProduct) return;

    deleteProduct(String(selectedProduct.id), {
      onSuccess: () => {
        toast.success("Product deleted successfully!");
        setIsDeleteModalOpen(false);
        setSelectedProduct(null);
        refetch();
      },
      onError: (error: any) => {
        console.error("Delete failed:", error);
        toast.error(error?.response?.data?.message || "Failed to delete product");
      },
    });
  };

  const handleAddNew = () => {
    setSelectedProduct(null);
    setIsEditMode(false);
    setOpenAddModal(true);
  };

  const handleFormSuccess = () => {
    setOpenAddModal(false);
    setIsEditMode(false);
    setSelectedProduct(null);
    refetch();
  };

  const handleFormCancel = () => {
    setOpenAddModal(false);
    setIsEditMode(false);
    setSelectedProduct(null);
  };

  const viewFields = [
    { key: "heading", label: "Heading", type: "text" as const },
    { key: "subheading", label: "Subheading", type: "text" as const },
    { key: "description", label: "Description", type: "text" as const },
    { key: "details", label: "Details About Product", type: "html" as const },
    { key: "specification", label: "Specifications", type: "html" as const },
  ];

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "sl",
        header: "SL",
        cell: ({ row }) =>
          String(row.index + 1 + (currentPage - 1) * itemsPerPage).padStart(2, "0"),
      }),
      columnHelper.accessor("heading", {
        header: "Heading",
        cell: (info) => (
          <div className="max-w-xs truncate line-clamp-1">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor("subheading", {
        header: "Subheading",
        cell: (info) => (
          <div className="max-w-xs truncate line-clamp-1">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor("details", {
        header: "Details",
        cell: (info) => (
          <div className="max-w-xs truncate line-clamp-1">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor("description", {
        header: "Description",
        cell: (info) => (
          <div className="max-w-xs truncate line-clamp-1">{info.getValue()}</div>
        ),
      }),
      columnHelper.accessor("specification", {
        header: "Specification",
        cell: (info) => (
          <div className="max-w-xs truncate line-clamp-1">{info.getValue()}</div>
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
    [currentPage, itemsPerPage]
  );

  return (
    <>
      <DashboardBodyContent
        title="Our Products"
        addBtnText="Add New Product"
        openAddModal={openAddModal}
        setOpenAddModal={handleAddNew}
      >
        {openAddModal ? (
          <AddProductForm
            editData={isEditMode ? editData?.data || selectedProduct : null}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <DashboardDataTable
            apiResponse={tableData}
            columns={columns}
            title="List of All Products"
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
          setSelectedProduct(null);
        }}
        title="Product Details"
        data={selectedProduct || {}}
        fields={viewFields}
        imageKey="image"
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Product?"
        message="Are you sure you want to delete this product"
        itemName={selectedProduct?.heading}
        isLoading={isDeleting}
      />
    </>
  );
};

export default OurProducts;