"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Turn as Hamburger } from "hamburger-react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { NavLinks } from "@/docs/data";
import Image from "next/image";

const MobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);
  const [isSisterOpen, setSisterOpen] = useState(false);

  return (
    <nav className="relative lg:hidden">
      <div className="z-40 fixed lg:hidden left-0 top-0 right-0 flex items-center justify-between px-5 bg-bgBlue h-20">
        <div className="cursor-pointer">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="logo" height={32} width={32} />
              <h1 className="text-xl text-white lg:text-3xl italic font-bold whitespace-nowrap ">
                Momin Textile Mills LTD
              </h1>
            </div>
          </Link>
        </div>
        <Hamburger toggled={isOpen} toggle={setOpen} color="white" />
      </div>

      <div
        className={`fixed top-20 inset-0 z-50 duration-150 ${
          isOpen ? "backdrop-blur-md" : "bg-transparent pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`fixed z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } duration-500 bg-bgBlue top-20 right-0 bottom-0 p-5 w-[80%]`}
      >
        <div className="flex flex-col gap-3">
          {NavLinks.map((link, index) => {
            // Special dropdown for "SISTER CONCERNS"
            if (link.label === "SISTER CONCERNS") {
              return (
                <div key={index}>
                  <div
                    className={`flex justify-between items-center py-2 text-white cursor-pointer ${
                      pathname.includes("sister-concern") && !isSisterOpen
                        ? "backdrop-blur-xl bg-white/30 rounded-full"
                        : ""
                    }`}
                  >
                    <Link
                      href="/sister-concerns"
                      className="font-semibold px-3"
                    >
                      SISTER CONCERNS
                    </Link>
                    <span
                      onClick={() => setSisterOpen((prev) => !prev)}
                      className=" flex duration-300 cursor-pointer hover:bg-black/20 items-center justify-center border p-1 rounded-full mr-3"
                    >
                      {isSisterOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </span>
                  </div>

                  {/* Dropdown links */}
                  <div
                    className={`border-l ml-4 px-2 flex flex-col gap-1 overflow-hidden transition-all duration-300 ${
                      isSisterOpen ? "max-h-125" : "max-h-0"
                    }`}
                  >
                    {link.links?.map((sublink, i) => (
                      <Link
                        key={i}
                        href={sublink.link}
                        onClick={() => {
                          setOpen(false);
                          // setSisterOpen(false);
                        }}
                        className={`relative px-6 py-2 font-medium text-white text-sm ${
                          pathname === sublink.link
                            ? "bg-white/50 rounded-md"
                            : "hover:bg-white/30 rounded-md"
                        }`}
                      >
                        <div
                          className={`${pathname === sublink.link && "absolute -left-3 -top-1.5 rounded-l-full  border-b-2 border-white h-6 w-3"}`}
                        />
                        {sublink.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            // All other top-level links
            return (
              <div
                key={index}
                className={`py-2 cursor-pointer text-white hover:text-textBlue hover:underline ${
                  pathname === link.link
                    ? "backdrop-blur-xl bg-white/30 rounded-full"
                    : ""
                } duration-150`}
                onClick={() => setOpen(false)}
              >
                <Link href={link.link} className="font-semibold px-3">
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

export default MobileNav;
