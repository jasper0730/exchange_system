"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { Loader } from "@/components/ui";
import { menuItems } from "@/lib/menuItems";
import { useAuthStore } from "@/store/authStore";
import Swal from "sweetalert2";


export default function SideMenu() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { routes } = useAuthStore();
  const pathname = usePathname();
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
          timer: 1000,
          showConfirmButton: false,
        }).then(() => {
          router.replace("/login");
        });
      } catch (error) {
        console.log(error)
        console.error(error || "登出錯誤");
        router.replace("/login");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) return <Loader fullScreen />;
  return (
    <aside className="fixed top-0 left-0 h-dvh w-[300px] bg-gray-900 text-white flex flex-col py-10 shadow-lg overflow-y-auto overflow-x-hidden justify-between">
      <div className="flex flex-col px-3 mb-10">
        <div className="text-xl font-bold text-white select-none px-6">
          Logo
        </div>
        <nav className="flex flex-col gap-2 mt-10">
          {filteredMenuItems.map((item) => (
            <Link
              key={item.label}
              href={`/${item.href}`}
              className={`rounded-md px-6 py-3 text-base font-medium transition-colors duration-200 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none ${pathname === `/${item.href}` ? "bg-gray-700" : ""
                }`}
            >
              <span className="inline-flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="w-full px-3">
        <button
          type="button"
          className="text-left w-full rounded-md px-6 py-3 text-base font-medium transition-colors duration-200 hover:bg-gray-700 cursor-pointer flex items-center"
          onClick={handleLogout}
        >
          <FiLogOut className="inline mr-2 align-text-bottom" />
          <span>登出</span>
        </button>
      </div>
    </aside>
  );
}
