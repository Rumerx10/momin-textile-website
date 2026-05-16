"use client";

import { NavLinks } from "@/docs/data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavElements = () => {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 flex items-center justify-between h-full w-full ">
      <div className="cursor-pointer">
        <Link href="/">
          <Image src="/logo.png" alt="logo" height={32} width={32} />
        </Link>
      </div>
      <div className="hidden lg:flex gap-8">
        {NavLinks.map((link, index) => (
          <div key={index} className="">
            <Link
              href={link.link}
              className="px-3 relative text-sm text-textBlack group"
            >
              {link.label}
              <div
                className={`absolute -bottom-1 opacity-70 bg-barBlue h-3 w-0 ${
                  (pathname === link.link ||
                    pathname.startsWith(link.link + "/") ||
                    (pathname === "/" && link.link === "/")) &&
                  "w-full"
                } group-hover:w-full duration-300`}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavElements;
