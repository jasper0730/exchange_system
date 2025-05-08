"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";

import { FiUserCheck, FiUsers, FiUser, FiFileText, FiMonitor, FiAlertTriangle, FiBarChart2, FiBell, FiClipboard, FiUploadCloud, FiMessageCircle } from "react-icons/fi";

const menuItems = [
  { label: "權限管理", href: "PermissionManagement", icon: <FiUserCheck /> },
  { label: "後台使用者管理", href: "AdminManagement", icon: <FiUsers /> },
  { label: "App 會員管理", href: "AppManagement", icon: <FiUser /> },
  { label: "註冊案件審核", href: "RegisterReview", icon: <FiFileText /> },
  { label: "匯兌交易監控", href: "ExchangeMonitor", icon: <FiMonitor /> },
  { label: "會員風險註記", href: "RiskNotes", icon: <FiAlertTriangle /> },
  { label: "報表管理", href: "ReportManagement", icon: <FiBarChart2 /> },
  { label: "通知模版設定", href: "NotificationSettings", icon: <FiBell /> },
  { label: "操作日誌", href: "OperationLog", icon: <FiClipboard /> },
  { label: "仲介公司資料上傳", href: "UploadInfo", icon: <FiUploadCloud /> },
  { label: "會員反饋", href: "MemberFeeback", icon: <FiMessageCircle /> },
];

export default function SideMenu() {
  const pathname = usePathname();

  function handleLogout() {
    console.log("登出");
  }

  return (
    <aside className="fixed top-0 left-0 h-dvh w-[300px] bg-gray-900 text-white flex flex-col py-10 shadow-lg overflow-y-auto overflow-x-hidden justify-between">
      <div className="flex flex-col px-3 mb-10">
        <div className="text-xl font-bold text-white select-none px-6">
          Logo
        </div>
        <nav className="flex flex-col gap-2 mt-10">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={`/${item.href}`}
              className={`rounded-md px-6 py-3 text-base font-medium transition-colors duration-200 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none ${
                pathname === `/${item.href}` ? "bg-gray-700" : ""
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
          <span>登出 </span>
        </button>
      </div>
    </aside>
  );
}
