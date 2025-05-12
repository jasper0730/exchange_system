import { NextResponse } from "next/server";

// 取得群組列表
export async function GET() {
  try {
    // 打API
  } catch (error) {
    return NextResponse.json({ message: "伺服器錯誤" }, { status: 500 });
  }
}

// 新增群組
export async function POST(request) {
  try {
    // 確認是否有權限編輯
    // 打API
  } catch (error) {
    return NextResponse.json({ message: "伺服器錯誤" }, { status: 500 });
  }
}
