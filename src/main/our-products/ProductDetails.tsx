"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import { HeroContext } from "@/src/context/HeroContext";
import PriceQuotation from "@/src/components/PriceQuotation";
import RelatedProducts from "./RelatedProducts";
import DetailsNSpecification from "./DetailsNSpecification";

const ProductDetails = () => {
  const { setTitle } = useContext(HeroContext);
  const pathname = usePathname().split("/").pop() || "";
  useEffect(() => {
    setTitle(pathname.replace(/-/g, " ").toUpperCase());
  }, [setTitle, pathname]);
  return (
    <div>
      <div className="py-16">
        <div className="container px-4 mx-auto flex flex-col lg:flex-row gap-16 justify-between">
          <div className="w-full lg:w-[35%]">
            <div className="flex w-full h-130 rounded-lg overflow-hidden">
              <Image
                src="/p9.png"
                alt="Product Image"
                width={500}
                height={520}
              />
            </div>
          </div>
          <div className="w-full lg:w-[65%] space-y-6">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-tBlue">
                100% Cotton Twill Fabrics
              </h2>
              <div className="text-pGray mt-2">Any Construction or GSM</div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-tBlue">Description</h3>
              <p className="text-pGray text-justify">
                Printers in the 1500s scrambled the words from Cicero's "De
                Finibus Bonorum et Malorum'' after mixing the words in each
                sentence. The familiar "lorem ipsum dolor sit amet" text emerged
                when 16th-century printers adapted Cicero's original work,
                beginning with the phrase "dolor sit amet consectetur. <br /> "
                They abbreviated "dolorem" (meaning "pain") to "lorem," which
                carries no meaning in Latin.Printers in the 1500s scrambled the
                words from Cicero's "De Printers in the 1500s scrambled the
                words from Cicero's "De Finibus Bonorum et Malorum'' after
                mixing the words in each sentence. The familiar "lorem ipsum
                dolor sit amet" text emerged when 16th-century printers adapted
                Cicero's original work, beginning with the phrase "dolor sit
                amet consectetur. <br /> " They abbreviated "dolorem" (meaning
                "pain") to "lorem," which carries no meaning in Latin.
              </p>
            </div>
            <PriceQuotation />
          </div>
        </div>
      </div>
      <DetailsNSpecification />
      <RelatedProducts />
    </div>
  );
};

export default ProductDetails;
