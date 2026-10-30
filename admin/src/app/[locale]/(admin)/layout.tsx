"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const router = useRouter();
  const [isAuthorized, setAuhorized] = useState(false)


  useEffect(() => {
    const token = localStorage.getItem("admin_token")

    if (!token) {
      router.push("/auth/signin");
      return
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (Date.now() >= payload.exp * 1000) {
        localStorage.removeItem("admin_token");
        router.push("/auth/signin");
      }
    }
    catch (e) {
      console.log(e)
      
    }
    setAuhorized(true)

  }, [router])


  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500 text-sm">Memeriksa sesi...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
      </div>
    </div>
  );
}
