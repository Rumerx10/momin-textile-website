"use client";
import { HeroContext } from "@/src/context/HeroContext";
import OurUnits from "@/src/components/main/our-units/OurUnits";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";

const page = () => {
  const pathname = usePathname().split("/").pop();
  const { setTitle } = useContext(HeroContext);
  useEffect(() => {
    if (pathname === "spinning-unit") {
      setTitle("Spinning Unit");
    } else if (pathname === "woven-dyeing-finishing") {
      setTitle("Woven Dyeing & Finishing");
    } else if (pathname === "fabric-manufacturing") {
      setTitle("Fabric Manufacturing");
    }
  }, [pathname, setTitle]);
  return <OurUnits />;
};

export default page;
