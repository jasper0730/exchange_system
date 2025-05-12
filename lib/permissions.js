// 模擬打api拿取權限的開放路由
export const routeMap = {
  admin: {
    AdminManagement: "enable",
    AppManagement: "enable",
    ExchangeMonitor: "enable",
    PermissionManagement: "enable",
    RegisterReview: "enable",
    RiskNotes: "enable",
    ReportManagement: "enable",
    NotificationSettings: "enable",
    OperationLog: "enable",
    UploadInfo: "enable",
    MemberFeeback: "enable",
  },
  member: {
    AdminManagement: "disabled",
    AppManagement: "readOnly",
    ExchangeMonitor: "readOnly",
    PermissionManagement: "disabled",
    RegisterReview: "readOnly",
    RiskNotes: "readOnly",
    ReportManagement: "readOnly",
    NotificationSettings: "readOnly",
    OperationLog: "readOnly",
    UploadInfo: "readOnly",
    MemberFeeback: "readOnly",
  },
};

export async function getUserRoutesFromDB(role) {
  await new Promise((res) => setTimeout(res, 100));
  return routeMap[role] || {};
}