import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    // 打API
  } catch (error) {
    return NextResponse.json({ message: "伺服器錯誤" }, { status: 500 });
  }
}
