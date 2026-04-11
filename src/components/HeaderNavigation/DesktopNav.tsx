"use client";

import { NavLinks } from "@/docs/data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";

const DesktopNav = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav
      className="z-40 backdrop-blur-2xl fixed hidden lg:flex items-center justify-center left-0
     top-0 right-0 text-white bg-navbar h-16"
    >
      <div className="max-w-400 px-4 mx-auto gap-12 flex items-center justify-between h-full w-full">
        <div className="cursor-pointer">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="logo" height={32} width={32} />
              <h1 className="text-3xl italic font-bold whitespace-nowrap ">
                Momin Textile Mills LTD
              </h1>
            </div>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-4 h-full">
          {NavLinks.map((link, index) => {
            const isActive =
              pathname === link.link ||
              pathname.startsWith(`${link.link}/`) ||
              (pathname === "/" && link.link === "/");
            // ----- Dropdown for Sister Concerns -----
            if (link?.links && link.links.length > 1) {
              return (
                <div key={index} className="relative group h-full">
                  <div
                    className={`${isActive && "bg-red "} px-3 font-medium text-white
                   h-full cursor-pointer flex justify-center items-center whitespace-nowrap gap-2`}
                  >
                    {link.label}
                    <div className="group-hover:rotate-180 duration-300">
                      <IoIosArrowDown size={16} />
                    </div>
                  </div>

                  {/* Hover dropdown */}
                  <div className="absolute left-1/2 -translate-x-1/2 mt-1 bg-white  text-primaryGray rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200">
                    <div className="flex flex-col gap-1 min-w-55 p-1">
                      {link.links?.map((sublink, i) => (
                        <Link
                          key={i}
                          href={sublink.link}
                          className={`w-full font-medium hover:text-white px-4 py-2 whitespace-nowrap text-sm rounded-md
                            ${
                              pathname === sublink.link
                                ? "bg-white/40"
                                : "hover:bg-red"
                            }`}
                        >
                          {sublink.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div
                key={index}
                className={`relative cursor-pointer hover:bg-red duration-300 transition-all 
                  ${isActive && "bg-red"}  h-full flex 
                items-center justify-center`}
              >
                <Link
                  href={link.link}
                  className="px-3 font-medium text-white group whitespace-nowrap"
                >
                  {link.label}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;
