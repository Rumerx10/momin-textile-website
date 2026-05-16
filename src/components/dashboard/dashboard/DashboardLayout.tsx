"use client";
import Link from "next/link";
import { BiPowerOff } from "react-icons/bi";
import { LuUserRound } from "react-icons/lu";
import { ReactNode, useState } from "react";
import ContentSection from "./ContentSection";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  MoreVertical,
  Search,
  Menu,
  X,
  User,
  ArrowLeft,
} from "lucide-react";
import { contentMenuItems, sidebarConfig } from "@/docs/data";
import Image from "next/image";
import ProfileInfo from "@/components/cards/ProfileInfo";
import { SlArrowDown, SlArrowRight } from "react-icons/sl";
import { apiPost } from "@/api/api";
import { clearTokens } from "@/api/tokenManager";

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
  const [showProfileDropdown, setShowProfileDorpdown] = useState(false);
  const router = useRouter();
  // More secure - invalidates token on server
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
      {/* Overlay */}
      {showMobileSidebar && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}
      {/* Sidebar Wrapper */}
      <div
        className={`fixed inset-y-0 left-0 lg:relative flex flex-col lg:flex-row transition-transform duration-300 z-50 ${
          showMobileSidebar
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* -------- Main Sidebar -------- */}
        <aside className="w-70 bg-white border-r flex flex-col overflow-y-auto">
          {/* Logo */}
          <Link href='/dashboard' className="cursor-pointer h-20 flex gap-2 border-b items-center justify-center">
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
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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

          {/* Profile */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between gap-3 rounded-lg group cursor-pointer">
              <Link
                href="/dashboard/profile"
                className="flex items-center py-1 gap-3 w-full rounded-sm hover:bg-pBlue/15"
              >
                <div className="w-10 h-10 overflow-hidden rounded-full flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    height={40}
                    width={40}
                    alt="profile image"
                    className="object-contain"
                  />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-pBlue">
                    Shakil Ahmed
                  </p>
                  <p className="text-xs text-pGray">m.sayefd@hotmail.com</p>
                </div>
              </Link>
              <MoreVertical className="w-4 h-4 transition" />
            </div>
          </div>
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

      {/* -------- Main Content -------- */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="h-20 bg-white border-b fixed right-0 left-0 top-0 z-20 px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setShowMobileSidebar((prev) => !prev)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {showMobileSidebar ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
              <Bell className="w-6 h-6 text-pBlue" />
              <span
                className="absolute text-white text-[10px] flex items-center 
                justify-center -top-1 -right-1 w-4 h-4 bg-red rounded-full"
              >
                2
              </span>
            </button>

            <div className="relative flex items-center">
              <div className="flex border-l-2">
                <Link className="ml-4" href="/dashboard/profile">
                  <ProfileInfo />
                </Link>
                <div
                  className={`absolute duration-300 ${showProfileDropdown ? "opacity-100 top-17" : "opacity-0 top-14 pointer-events-none"} rounded-md py-3 flex flex-col gap-2 bg-white w-full border`}
                >
                  <Link href="/dashboard/profile" className="px-2">
                    <ProfileInfo />
                  </Link>
                  <hr />
                  <div className="px-4 flex flex-col gap-1">
                    <Link
                      href="/dashboard/profile"
                      className="text-pGray hover:text-pBlue duration-300 rounded-md p-1 hover:bg-gray-100"
                    >
                      <button className="flex gap-2">
                        <LuUserRound size={24} />
                        <p>Profile Information</p>
                      </button>
                    </Link>
                    <div
                      // href="/"
                      onClick={handleLogout}
                      className="text-pGray hover:text-pBlue duration-300 rounded-md p-1 hover:bg-gray-100"
                    >
                      <button className="flex gap-2">
                        <BiPowerOff size={24} />
                        <p>Logout</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                onClick={() => setShowProfileDorpdown(!showProfileDropdown)}
                className={`flex items-center duration-300 ${showProfileDropdown ? "rotate-180" : "rotate-0"} border-2 border-transparent hover:border-gray-100 rounded-lg hover:bg-gray-100  cursor-pointer p-2`}
              >
                <SlArrowDown />
              </div>
            </div>
          </div>
        </header>
        <div className="flex-1 mt-20 px-4 py-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
