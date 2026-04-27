"use client";

import ImageGallery from "@/src/components/ImageGallery";
import ExploreMachines from "./ExploreMachines";
import OurUnitsDescription from "./OurUnitsDescription";

const OurUnits = () => {
  return (
    <div>
      <OurUnitsDescription />
      <ExploreMachines />
      <ImageGallery />
    </div>
  );
};

export default OurUnits;
