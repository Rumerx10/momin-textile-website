"use client";

import { useContext, useEffect } from "react";
import { HeroContext } from "../../context/HeroContext";
import AboutOurProducts from "./AboutOurProducts";
const OurProducts = () => {
  const { setTitle } = useContext(HeroContext);
  useEffect(() => {
    setTitle("About Our Products");
  }, [setTitle]);
  return <AboutOurProducts />;
};

export default OurProducts;
