"use client";
import { ReactNode, useState } from "react";
import { HeroContext } from "./HeroContext";

const HeroProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState("");
  const value = { title, setTitle };
  return <HeroContext.Provider value={value}>{children}</HeroContext.Provider>;
};

export default HeroProvider;
