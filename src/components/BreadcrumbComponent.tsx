"use client";

import { CapFirstLetterMulti } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const BreadcrumbComponent = () => {
  const pathName = usePathname();
  const segments = pathName
    .split("/")
    .filter(Boolean)
    .map((seg) => decodeURIComponent(seg));

  const breadcrumbItems = segments.map((segment, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    if (idx === 0 && segment.toLowerCase() === "home") {
      return {
        href: "/",
        label: "Home",
      };
    }
    return {
      href,
      label: CapFirstLetterMulti(segment),
    };
  });

  const hiddenRoutes = ["/academics/departments-programs/"];

  // Check if current path includes any of the hidden routes
  const shouldHide = hiddenRoutes.some((route) => pathName.includes(route));

  return (
    <div
      className={`${
        shouldHide ? "hidden" : "flex"
      } items-center w-full text-2xl font-semibold`}
    >
      <div className="w-full overflow-x-auto scrollbar-none">
        <Breadcrumb>
          <BreadcrumbList className="flex-nowrap min-w-max">
            {breadcrumbItems.map((item, idx) => (
              <BreadcrumbItem key={item.href} className="whitespace-nowrap">
                {idx === breadcrumbItems.length - 1 ? (
                  <BreadcrumbPage className="text-[#1561BC] font-medium">
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink
                      className="text-[#9CA3AF] font-normal"
                      href={item.href}
                    >
                      {item.label}
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default BreadcrumbComponent;
