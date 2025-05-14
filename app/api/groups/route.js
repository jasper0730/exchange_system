import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
// 取得群組列表
export async function GET() {
  try {
    // 打API
    return NextResponse.json({
      ResultCode: 0,
      data: [{
        id: uuidv4(),
        name: "aaa",
        permissions: {
          PermissionManagement: "enable",
          AdminManagement: "readonly",
          AppManagement: "enable",
          ExchangeMonitor: "enable",
          ExchangeRate: "enable",
          RegisterReview: "enable",
          RiskNotes: "enable",
          ReportManagement: "enable",
          NotificationSettings: "enable",
          OperationLog: "enable",
          UploadInfo: "enable",
          MemberFeedback: "enable",
        }
      }]
    });
  } catch (error) {
    return NextResponse.json({ message: "伺服器錯誤" }, { status: 500 });
  }
}

// 新增群組
export async function POST(request) {
  try {
    // 打API
  } catch (error) {
    return NextResponse.json({ message: "伺服器錯誤" }, { status: 500 });
  }
}
