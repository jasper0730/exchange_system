import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      message: "登出成功",
      ok: true,
    });

    // 清除 Token Cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "伺服器錯誤" }, { status: 500 });
  }
}
