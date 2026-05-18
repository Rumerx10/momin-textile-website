"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/cards/ProductCard";
import Pagination from "@/components/Pagination";
import { useFetchData } from "@/hooks/useApi";

interface ProductItem {
  id: number;
  heading: string;
  subheading: string;
  description: string;
  details: string;
  specification: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const AboutOurProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  // const [totalItems, setTotalItems] = useState(0);

  // Build endpoint with pagination
  const buildEndpoint = () => {
    return `/products?page=${currentPage}&limit=${itemsPerPage}&sortOrder=asc&isActive=true`;
  };

  // Fetch products data
  const { data: apiData, isLoading, error } = useFetchData(
    ["products", String(currentPage), String(itemsPerPage)],
    buildEndpoint(),
    { enabled: true, refetchOnMount: true }
  );

  useEffect(() => {
    if (apiData?.data && Array.isArray(apiData.data)) {
      setProducts(apiData.data);
      setTotalPages(apiData.meta?.totalPages || 1);
      // setTotalItems(apiData.meta?.totalItems || 0);
    }
  }, [apiData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Product Card Skeleton
  const ProductCardSkeleton = () => (
    <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
          <div className="space-y-4 text-center">
            <div className="h-10 bg-gray-200 rounded-lg w-48 mx-auto animate-pulse"></div>
            <div className="flex justify-center">
              <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
            {[...Array(8)].map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
        <div className="text-center text-red-500">
          Failed to load products. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
        <div className="space-y-4 text-center">
          <h4 className="font-bold text-3xl lg:text-4xl">Our Products</h4>
          <div className="flex justify-center">
            <p className="text-pGray max-w-210">
              Our product range covers premium woven shell fabrics, pocketing
              materials, and custom-dyed <br /> textiles designed for global
              apparel manufacturers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
          {products.map((item) => (
            <Link href={`/our-products/${item.id}`} key={item.id}>
              <ProductCard
                img={item.image}
                title={item.heading}
                desc={item.description}
              />
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="w-full">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={handleItemsPerPageChange}
              onPageChange={handlePageChange}
              showPaginationControl={true}
              className="mt-4"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutOurProducts;