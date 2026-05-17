// components/RelatedProducts.jsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFetchData } from "@/hooks/useApi";
import GalleryCarousel from "@/components/GalleryCarousel";

interface RelatedProduct {
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

const RelatedProducts = ({ currentProductId }: { currentProductId?: number }) => {
  const [products, setProducts] = useState<RelatedProduct[]>([]);

  // Fetch all products
  const { data: apiData, isLoading, error } = useFetchData(
    ["products", "related"],
    "/products?page=1&limit=10&sortOrder=asc&isActive=true",
    { enabled: true, refetchOnMount: true }
  );

  useEffect(() => {
    if (apiData?.data && Array.isArray(apiData.data)) {
      // Filter out current product if provided, otherwise show all
      let filteredProducts = apiData.data;
      if (currentProductId) {
        filteredProducts = apiData.data.filter(
          (item: RelatedProduct) => item.id !== currentProductId
        );
      }
      // Limit to 8 products for carousel
      setProducts(filteredProducts.slice(0, 8));
    }
  }, [apiData, currentProductId]);

  // Product Card Component
  const ProductCard = ({ product }: { product: RelatedProduct }) => (
    <Link href={`/our-products/${product.id}`} className="block">
      <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={product.image}
            alt={product.heading}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h5 className="font-bold text-pBlue text-center line-clamp-1">
            {product.heading}
          </h5>
          <p className="text-pGray text-sm text-center line-clamp-2 mt-1">
            {product.subheading}
          </p>
        </div>
      </div>
    </Link>
  );

  // Skeleton Card
  const SkeletonCard = () => (
    <div className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[...Array(4)].map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || products.length === 0) {
    return null;
  }

  return (
    <div className="container px-4 mx-auto py-8 md:py-12 lg:py-16">
      <div className="flex flex-col gap-8 lg:gap-12 items-center justify-center">
        <div className="space-y-4 text-center">
          <h4 className="font-bold text-3xl lg:text-4xl">Related Products</h4>
          <div className="flex justify-center">
            <p className="text-pGray max-w-210">
              We are working Solid Reactive Dyed, Solid Pigment Dyed, All Over
              Print, Also any kind of Fabrics as <br /> per Buyer Requirement
            </p>
          </div>
        </div>

        {products.length > 0 && (
          <GalleryCarousel data={products}>
            {(product, idx) => <ProductCard key={product.id} product={product} />}
          </GalleryCarousel>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;