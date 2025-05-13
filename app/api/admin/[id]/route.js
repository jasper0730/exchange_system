import { NextResponse } from "next/server";

// 更新後台使用者
export async function PUT(request, { params }) {
  try {
    // 打API
  } catch (error) {
    return NextResponse.json({ message: "請檢查伺服器狀態" }, { status: 500 });
  }
}