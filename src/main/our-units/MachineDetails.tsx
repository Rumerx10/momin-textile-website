"use client";
import MachineDetailsCarousel from "@/src/components/MachineDetailsCarousel";
import PriceQuotation from "@/src/components/PriceQuotation";
import { HeroContext } from "@/src/context/HeroContext";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";

const MachineDetails = () => {
  const { setTitle } = useContext(HeroContext);
  const pathname = usePathname().split("/").pop() || "";
  useEffect(() => {
    setTitle(pathname.replace(/-/g, " ").toUpperCase());
  }, [setTitle, pathname]);
  return (
    <div className="py-8 md:py-12 lg:py-16">
      <div className="container px-4 mx-auto flex flex-col lg:flex-row gap-16 justify-between">
        <div className="w-full lg:w-[35%]">
          <MachineDetailsCarousel
            images={[
              "/mac2.png",
              "/mac5.png",
              "/mac6.png",
              "/mac5.png",
              "/mac6.png",
            ]}
          />
        </div>
        <div className="w-full lg:w-[65%] space-y-6">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-tBlue">
              Scouring & Bleaching Machine
            </h2>
            <div className="text-pGray mt-2 flex flex-wrap gap-x-5 lg:gap-8 items-center">
              <div>
                Brand Name:{" "}
                <span className="text-tBlue font-medium">TAIZHOU</span>
              </div>
              <div className="w-1 h-4 bg-red rounded-full" />
              <div>
                Total Quantity:{" "}
                <span className="text-tBlue font-medium">10 Set</span>{" "}
              </div>
              <div className="w-1 h-4 bg-red rounded-full" />
              <div>
                Origin: <span className="text-tBlue font-medium">China</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-tBlue">Overview</h3>
            <p className="text-pGray text-justify">
              Printers in the 1500s scrambled the words from Cicero&apos;s
              &quot;De Finibus Bonorum et Malorum&quot; after mixing the words
              in each sentence. The familiar "lorem ipsum dolor sit amet" text
              emerged when 16th-century printers adapted Cicero&apos;s original
              work, beginning with the phrase &quot;dolor sit amet
              consectetur.&quot; They abbreviated "dolorem" (meaning "pain") to
              "lorem," which carries no meaning in Latin.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-tBlue">Description</h3>
            <p className="text-pGray text-justify">
              Printers in the 1500s scrambled the words from Cicero's "De
              Finibus Bonorum et Malorum" after mixing the words in each
              sentence. The familiar "lorem ipsum dolor sit amet" text emerged
              when 16th-century printers adapted Cicero's original work,
              beginning with the phrase "dolor sit amet consectetur." They
              abbreviated "dolorem" (meaning "pain") to "lorem," which carries
              no meaning in Latin.Printers in the 1500s scrambled the words from
              Cicero's "De Finibus Bonorum et Malorum'' after mixing the words
              in each sentence. The familiar "lorem ipsum dolor sit amet" text
              emerged when 16th-century printers adapted Cicero's original work,
              beginning with the phrase "dolor sit amet consectetur." They
              abbreviated "dolorem" (meaning "pain") to "lorem," which carries
              no meaning in Latin.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-tBlue">
              Production Capacity
            </h3>
            <div className="flex items-end gap-2">
              <p className="text-pBlue font-bold text-3xl lg:text-4xl">
                80,000
              </p>{" "}
              <span className="text-base text-pGray font-semibold">
                MTR/DAY
              </span>
            </div>
          </div>
          <PriceQuotation />
        </div>
      </div>
    </div>
  );
};

export default MachineDetails;
