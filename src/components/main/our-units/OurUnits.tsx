// components/main/our-units/OurUnits.jsx
"use client";
import { usePathname } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";
import ExploreMachines from "./ExploreMachines";
import OurUnitsDescription from "./OurUnitsDescription";

const OurUnits = () => {
  const pathname = usePathname().split("/").pop() || "";

  // Map pathname to unitType
  const getUnitType = () => {
    if (pathname === "spinning-unit") return "SPINNING";
    if (pathname === "woven-dyeing-finishing") return "WOVEN";
    if (pathname === "fabric-manufacturing") return "FABRIC";
    return "SPINNING";
  };

  const unitType = getUnitType();

  return (
    <div>
      <OurUnitsDescription unitType={unitType} />
      <ExploreMachines />
      <ImageGallery />
    </div>
  );
};

export default OurUnits;