import { FiUserCheck, FiUsers, FiUser, FiFileText, FiMonitor, FiAlertTriangle, FiBarChart2, FiBell, FiClipboard, FiUploadCloud, FiMessageCircle, FiDollarSign } from "react-icons/fi";

export const menuItems = [
  { label: "後台使用者管理", href: "AdminManagement", icon: <FiUsers /> },
  { label: "權限管理", href: "PermissionManagement", icon: <FiUserCheck /> },
  { label: "App 會員管理", href: "AppManagement", icon: <FiUser /> },
  { label: "註冊案件審核", href: "RegisterReview", icon: <FiFileText /> },
  { label: "匯兌交易監控", href: "ExchangeMonitor", icon: <FiMonitor /> },
  { label: "匯率更新與調整", href: "ExchangeRate", icon: <FiDollarSign /> },
  { label: "會員風險註記", href: "RiskNotes", icon: <FiAlertTriangle /> },
  { label: "報表管理", href: "ReportManagement", icon: <FiBarChart2 /> },
  { label: "通知模版設定", href: "NotificationSettings", icon: <FiBell /> },
  { label: "操作日誌", href: "OperationLog", icon: <FiClipboard /> },
  { label: "仲介公司資料上傳", href: "UploadInfo", icon: <FiUploadCloud /> },
  { label: "會員反饋", href: "MemberFeedback", icon: <FiMessageCircle /> },
];