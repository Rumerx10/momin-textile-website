"use client";
import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/docs/data";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Turn as Hamburger } from "hamburger-react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const MobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Auto-expand dropdown that has an active sublink
  useEffect(() => {
    let activeDropdownLabel: string | null = null;
    NavLinks.forEach((link) => {
      if (link?.links && link.links.length > 0) {
        const isAnySublinkActive = link.links.some(
          (sublink) => pathname === sublink.link,
        );
        if (isAnySublinkActive) {
          activeDropdownLabel = link.label;
        }
      }
    });
    setOpenDropdown(activeDropdownLabel);
  }, [pathname]);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  // Helper function to check if any sublink is active
  const isAnySublinkActive = (links: { label: string; link: string }[]) => {
    return links?.some((sublink) => pathname === sublink.link) || false;
  };

  return (
    <nav className="relative lg:hidden">
      <div className="z-40 fixed lg:hidden left-0 top-0 right-0 flex items-center justify-between px-2 bg-bgBlue h-16">
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
        <Hamburger size={32} toggled={isOpen} toggle={setOpen} color="white" />
      </div>

      <div
        className={`fixed top-16! inset-0 z-50 duration-150 ${
          isOpen ? "backdrop-blur-md" : "bg-transparent pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`fixed z-50 h-screen overflow-scroll  ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } duration-500 bg-bgBlue top-16 right-0 bottom-0 p-5 w-[80%]`}
      >
        <div className="flex flex-col gap-3 pb-40">
          {NavLinks.map((link, index) => {
            // Check if this is a dropdown (has links property)
            if (link?.links && link.links.length > 0) {
              const isParentActive = isAnySublinkActive(link.links);
              const isDropdownOpen = openDropdown === link.label;

              return (
                <div key={index}>
                  <div
                    onClick={() => toggleDropdown(link.label)}
                    className={`flex justify-between items-center py-2 text-white
                       cursor-pointer hover:bg-white/10 rounded-full
                        transition duration-150 ${
                          isParentActive && !isDropdownOpen
                            ? "backdrop-blur-xl bg-white/30"
                            : ""
                        }`}
                  >
                    <div className="font-semibold px-3">{link.label}</div>
                    <span className="flex duration-300 cursor-pointer hover:bg-black/20 items-center justify-center p-1 mr-3 rounded-full">
                      {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </span>
                  </div>

                  {/* Dropdown links */}
                  <div
                    className={`border-l mt-1 border-white ml-4 px-2 flex flex-col gap-1 overflow-hidden transition-all duration-300 ${
                      isDropdownOpen ? "max-h-125" : "max-h-0"
                    }`}
                  >
                    {link.links.map((sublink, i) => (
                      <Link
                        key={i}
                        href={sublink.link}
                        onClick={() => {
                          setOpen(false);
                          setOpenDropdown(null);
                        }}
                        className={`relative px-6 py-2 font-medium text-white text-sm transition duration-150 rounded-md ${
                          pathname === sublink.link
                            ? "bg-white/30"
                            : "hover:bg-white/10"
                        }`}
                      >
                        <div
                          className={`${
                            pathname === sublink.link &&
                            "absolute -left-3 -top-1.5 rounded-l-full border-b-2 border-white h-6 w-3"
                          }`}
                        />
                        {sublink.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            // Regular top-level links (no dropdown)
            const isActive = pathname === link.link;

            return (
              <div
                key={index}
                className={`py-2 cursor-pointer text-white hover:bg-white/10 rounded-full hover:rounded-full transition duration-150 ${
                  isActive ? "backdrop-blur-xl bg-white/30 " : ""
                }`}
                onClick={() => setOpen(false)}
              >
                <Link href={link.link} className="font-semibold px-3 block">
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
