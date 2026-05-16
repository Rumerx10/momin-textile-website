"use client";
import Link from "next/link";
import Image from "next/image";
import { apiPost } from "@/api/api";
import { BiPowerOff } from "react-icons/bi";
import { ReactNode, useState, useEffect, useRef } from "react";
import { SlArrowDown } from "react-icons/sl";
import { LuUserRound } from "react-icons/lu";
import ContentSection from "./ContentSection";
import { clearTokens } from "@/api/tokenManager";
import { Bell, Search, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import ProfileInfo from "@/components/cards/ProfileInfo";
import { contentMenuItems, sidebarConfig } from "@/docs/data";

const SidebarItem = ({
  icon: Icon,
  label,
  href,
}: {
  icon: any;
  label: string;
  href: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={() => {
        // Close mobile sidebar on link click (optional)
        const event = new Event("closeMobileSidebar");
        window.dispatchEvent(event);
      }}
      className={`font-medium flex items-center gap-2 px-3 py-2 rounded-lg transition ${
        isActive ? "bg-pBlue text-white" : "text-pBlue hover:bg-pBlue/15"
      }`}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span className="whitespace-nowrap">{label}</span>
    </Link>
  );
};

/* ------------------ Section ------------------ */

const Section = ({ title, items }: { title: string; items: any[] }) => (
  <div className="px-4 py-6 border-t border-gray-200 first:border-t-0">
    <h6 className="text-xs font-semibold text-[#9CA3AF] uppercase mb-3">
      {title}
    </h6>

    <ul className="space-y-2">
      {items.map((item, i) => (
        <SidebarItem key={i} {...item} />
      ))}
    </ul>
  </div>
);

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showContentMenu, setShowContentMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showMobileSidebar &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setShowMobileSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMobileSidebar]);

  // Close sidebar on window resize (if screen becomes larger)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && showMobileSidebar) {
        setShowMobileSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showMobileSidebar]);

  // Custom event listener for closing sidebar on link click
  useEffect(() => {
    const handleCloseSidebar = () => {
      setShowMobileSidebar(false);
    };

    window.addEventListener("closeMobileSidebar", handleCloseSidebar);
    return () => {
      window.removeEventListener("closeMobileSidebar", handleCloseSidebar);
    };
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showProfileDropdown && !target.closest(".profile-dropdown-container")) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (showMobileSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobileSidebar]);

  const handleLogout = async () => {
    try {
      await apiPost("/auth/logout", {});
      clearTokens();
      router.push("/dashboard/login");
    } catch (error) {
      // Still clear local tokens even if API fails
      clearTokens();
      router.push("/dashboard/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Overlay - Fixed to work properly */}
      {showMobileSidebar && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40 transition-opacity duration-300"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}

      {/* Sidebar Wrapper */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 lg:relative flex flex-col lg:flex-row transition-transform duration-300 z-50 ${
          showMobileSidebar
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* -------- Main Sidebar -------- */}
        <aside className="w-70 h-full bg-white border-r flex flex-col overflow-y-auto">
          {/* Logo */}
          <Link
            href="/dashboard"
            onClick={() => setShowMobileSidebar(false)}
            className="cursor-pointer h-20 flex gap-2 border-b items-center justify-center"
          >
            <div className="w-6 h-7 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="logo"
                height={28}
                width={24}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="font-times font-bold text-xl italic text-pBlue">
              Momin Textile Mills Ltd
            </span>
          </Link>

          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pBlue"
              />
            </div>
          </div>

          {/* Navigation (Dynamic) */}
          <nav className="flex-1 overflow-y-auto">
            {sidebarConfig.map((section, i) => (
              <Section key={i} title={section.title} items={section.items} />
            ))}

            {/* Content Section */}
            <ContentSection
              showContentMenu={showContentMenu}
              setShowContentMenu={setShowContentMenu}
            />
          </nav>
        </aside>

        {/* -------- Secondary Sidebar -------- */}
        <aside
          className={`hidden lg:flex flex-col bg-white border-r transition-all duration-300 ${
            showContentMenu ? "w-64" : "w-0 overflow-hidden"
          }`}
        >
          <div className="h-20 flex items-center p-4 border-b whitespace-nowrap" />
          <nav className="p-4 space-y-2 overflow-hidden">
            {contentMenuItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <SidebarItem
                  key={i}
                  icon={Icon}
                  label={item.label}
                  href={item.href}
                />
              );
            })}
          </nav>
        </aside>
      </div>

      {/* Header */}
      <div className="h-20 bg-white border-b fixed right-0 left-0 top-0 z-20 px-4 sm:px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => setShowMobileSidebar(true)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 ml-auto">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
            <Bell className="w-6 h-6 text-pBlue" />
            <span
              className="absolute text-white text-[10px] flex items-center 
                justify-center -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
            >
              2
            </span>
          </button>

          <div className="relative profile-dropdown-container">
            <div className="flex items-center">
              <Link
                className="ml-4"
                href="/dashboard/company-profile"
                onClick={() => setShowProfileDropdown(false)}
              >
                <ProfileInfo />
              </Link>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className={`flex items-center duration-300 transition-transform ${
                  showProfileDropdown ? "rotate-180" : "rotate-0"
                } border-2 border-transparent hover:border-gray-100 rounded-lg hover:bg-gray-100 cursor-pointer p-2`}
              >
                <SlArrowDown />
              </button>
            </div>

            {/* Dropdown Menu */}
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 rounded-md py-3 flex flex-col gap-2 bg-white w-56 border shadow-lg z-30">
                <Link
                  href="/dashboard/company-profile"
                  onClick={() => setShowProfileDropdown(false)}
                  className="px-2"
                >
                  <ProfileInfo />
                </Link>
                <hr />
                <div className="px-2 flex flex-col gap-1">
                  <Link
                    href="/dashboard/company-profile"
                    onClick={() => setShowProfileDropdown(false)}
                    className="text-pGray hover:text-pBlue duration-300 rounded-md p-2 hover:bg-gray-100"
                  >
                    <button className="flex gap-2 w-full">
                      <LuUserRound size={20} />
                      <p>Profile Information</p>
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      handleLogout();
                    }}
                    className="text-pGray hover:text-pBlue duration-300 rounded-md p-2 hover:bg-gray-100 w-full text-left"
                  >
                    <div className="flex gap-2">
                      <BiPowerOff size={20} />
                      <p>Logout</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mt-20 flex-1 flex flex-col min-h-screen">
        <div className="px-4 py-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;