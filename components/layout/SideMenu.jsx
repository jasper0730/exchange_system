"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { Loader } from "@/components/ui";
import { menuItems } from "@/lib/menuItems";
import { useUIStore, useAuthStore } from "@/store";
import Swal from "sweetalert2";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export default function SideMenu() {
  const router = useRouter();
  const { sideMenuCollapsed, toggleSideMenuCollapsed } = useUIStore();
  const { routes } = useAuthStore();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const filteredMenuItems = menuItems.filter(item => routes[item.href] && routes[item.href] !== "disabled");

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "確定要登出嗎？",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "登出",
      cancelButtonText: "取消",
    });

    if (result.isConfirmed) {
      try {
        setIsLoading(true);
        const response = await fetch("/api/logout", { method: "POST" });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "登出 API 錯誤");
        }

        Swal.fire({
          icon: "success",
          title: "登出成功",
          timer: 1500,
          showConfirmButton: false,
        });
        router.replace("/login");
      } catch (error) {
        console.error(error || "登出錯誤");
        router.replace("/login");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) return <Loader fullScreen />;
  return (
    <aside className={`fixed top-0 left-0 h-dvh bg-gray-900 text-white flex flex-col pt-10 shadow-lg transition-all duration-300 
        ${sideMenuCollapsed ? "w-[80px]" : "w-[300px]"}`}>
      <button
        type="button"
        className="absolute bg-gray-900  rounded-full right-0 top-[5px] translate-x-1/2 cursor-pointer flex justify-center items-center w-8 h-8 group"
        onClick={toggleSideMenuCollapsed}
      >
        {sideMenuCollapsed ? (
          <HiChevronDoubleRight
            className="transform transition-transform duration-300 group-hover:translate-x-0.5"
            size={16}
          />) : (
          <HiChevronDoubleLeft
            className="transform transition-transform duration-300 group-hover:-translate-x-0.5"
            size={16}
          />)
        }

      </button>
      <div className="flex flex-col  h-full">
        <div className="h-10">
          <Link
            href="/"
            className={`h-10 rounded-full bg-white text-xl font-bold text-gray-900  flex items-center justify-center 
        ${sideMenuCollapsed ? "mx-auto w-10" : "w-20 mx-6"}`}>
            {sideMenuCollapsed ? "L" : "LOGO"}
          </Link>
        </div>
        <div className="flex flex-col justify-between overflow-y-auto overflow-x-hidden h-[calc(100dvh-84px)] mt-6">
          <OverlayScrollbarsComponent
            options={{
              scrollbars: {
                theme: "os-theme-light",
                clickScroll: true,
              },
            }}
            defer
          >
            <nav className="flex flex-col gap-2 mb-10 px-3">
              {filteredMenuItems.map((item) => (
                <Link
                  key={item.label}
                  title={item.label}
                  href={`/${item.href}`}
                  className={`rounded-md py-3 text-base font-medium transition-colors duration-200 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none 
                      ${pathname === `/${item.href}` ? "bg-gray-700" : ""}
                      ${sideMenuCollapsed ? "text-center" : "px-6"}
                      `}
                >
                  <span className={`inline-flex items-center ${sideMenuCollapsed ? "" : "gap-2"}`}>
                    <span className="text-lg">{item.icon}</span>
                    <span
                      className={`transition duration-[0,0] truncate ${sideMenuCollapsed ? "opacity-0" : "opacity-100 delay-150"}`}
                    >
                      {!sideMenuCollapsed && item.label}
                    </span>
                  </span>
                </Link>
              ))}
            </nav>
            <div className="px-3 pb-3">
              <button
                type="button"
                title="登出"
                className={`text-left w-full rounded-md py-3 text-base font-medium transition-colors duration-200 hover:bg-gray-700 cursor-pointer flex items-center
                  ${sideMenuCollapsed ? "justify-center" : "px-6"}`}
                onClick={handleLogout}
              >
                <span className={`inline-flex items-center ${sideMenuCollapsed ? "" : "gap-2"}`}>
                  {sideMenuCollapsed ? (
                    <span className="text-lg"><FiLogOut /></span>
                  ) : (
                    <>
                      <span className="text-lg"><FiLogOut /></span>
                      <span
                        className={`transition duration-[0,0] truncate ${sideMenuCollapsed ? "opacity-0" : "opacity-100 delay-150"}`}
                      >
                        {!sideMenuCollapsed && "登出"}
                      </span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </OverlayScrollbarsComponent>
        </div>
      </div >
    </aside >
  );
}
