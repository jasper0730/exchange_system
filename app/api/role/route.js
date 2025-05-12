import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // 確認有沒有token
    const token = request.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    // 打API取得最新的Role與Routes
    return NextResponse.json({
      ResultCode: 0,
      Role: "admin",
      routes: {
        AdminManagement: "enable",
        AppManagement: "disabled",
        ExchangeMonitor: "enable",
        PermissionManagement: "enable",
        RegisterReview: "enable",
        RiskNotes: "enable",
        ReportManagement: "enable",
        NotificationSettings: "enable",
        OperationLog: "enable",
        UploadInfo: "enable",
        MemberFeeback: "enable",
      }
    });
  } catch (error) {
    return NextResponse.json({ message: "請檢查伺服器狀態" }, { status: 500 });
  }
}