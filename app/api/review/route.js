import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// 取得待審核案件列表
export async function GET() {
  try {
    // 打API
    return NextResponse.json({
      ResultCode: 0,
      data: [{
        id: uuidv4(),
        account: "aaa",
        sentTime: "2025-03-24T12:40:45"
      }]
    });
  } catch (error) {
    return NextResponse.json({ message: "伺服器錯誤" }, { status: 500 });
  }
}