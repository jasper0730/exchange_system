"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { Loader } from "@/components/ui";
import { menuItems } from "@/lib/menuItems";

export default function SideMenu() {
  const pathname = usePathname();
  // const filteredMenuItems = menuItems.filter(item => routes.includes(item.href));
  const filteredMenuItems = menuItems

  function handleLogout() {
    console.log("登出");
  }

  // if (isLoading) return <Loader fullScreen />;
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
