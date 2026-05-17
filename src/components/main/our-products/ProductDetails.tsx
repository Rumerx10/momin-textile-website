// app/our-products/[id]/page.jsx (or ProductDetails component)
"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { HeroContext } from "@/context/HeroContext";
import { useFetchData } from "@/hooks/useApi";
import PriceQuotation from "@/components/PriceQuotation";
import DetailsNSpecification from "./DetailsNSpecification";
import RelatedProducts from "./RelatedProducts";

interface ProductData {
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

const ProductDetails = () => {
  const { setTitle } = useContext(HeroContext);
  const { id } = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);

  // Fetch product data by ID
  const {
    data: apiData,
    isLoading,
    error,
  } = useFetchData(["product", `${id}`], `/products/${id}`, {
    enabled: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (apiData?.data) {
      setProduct(apiData.data);
      setTitle(apiData.data.heading);
    }
  }, [apiData, setTitle]);

  if (isLoading) {
    return (
      <div className="py-8 md:py-12 lg:py-16">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 justify-between">
            <div className="w-full lg:w-[35%]">
              <div className="w-full h-130 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
            <div className="w-full lg:w-[65%] space-y-6">
              <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                </div>
              </div>
              <div className="h-12 bg-gray-200 rounded w-40 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="py-8 md:py-12 lg:py-16">
        <div className="container h-20 rounded-lg lg:h-100 bg-gray-50 flex items-center justify-center px-4 mx-auto text-center text-red-500">
          Failed to load product details. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="py-8 md:py-12 lg:py-16">
        <div className="container px-4 mx-auto flex flex-col lg:flex-row gap-16 justify-between">
          {/* Product Image */}
          <div className="w-full lg:w-[35%]">
            <div className="relative w-full h-130 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={product.image}
                alt={product.heading}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-[65%] space-y-6">
            <div>
              <h5 className="text-3xl lg:text-4xl font-bold text-tBlue">
                {product.heading}
              </h5>
              <div className="text-pGray mt-2">{product.subheading}</div>
            </div>

            <div className="space-y-2">
              <h6 className="font-semibold text-lg text-tBlue">Description</h6>
              <p className="text-pGray text-justify leading-relaxed">
                {product.description}
              </p>
            </div>

            <PriceQuotation />
          </div>
        </div>
      </div>

      {/* Details & Specifications Tabs */}
      <DetailsNSpecification
        details={product.details}
        specification={product.specification}
      />

      {/* Related Products */}
      <RelatedProducts currentProductId={product.id} />
    </div>
  );
};

export default ProductDetails;
