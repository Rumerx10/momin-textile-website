"use client";
import Image from "next/image";
import { ReactNode, useContext } from "react";
import HeroProvider from "@/context/HeroProvider";
import { HeroContext } from "@/context/HeroContext";

const LayoutContent = ({ children }: { children: ReactNode }) => {
  const { title } = useContext(HeroContext);

  return (
    <>
      <div className="relative h-64">
        <Image
          src="/bg1.png"
          alt="background image"
          height={256}
          width={1920}
          className="h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75 h-full">
          <div className="container px-4 mx-auto text-white h-full flex items-center">
            <h4 className="font-bold text-3xl lg:text-4xl max-w-160">
              {title || "Default Title"}
            </h4>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </>
  );
};

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mt-16">
      <HeroProvider>
        <LayoutContent>{children}</LayoutContent>
      </HeroProvider>
    </div>
  );
};

export default layout;
