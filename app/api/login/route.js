import { NextResponse } from "next/server";
import { encode } from "js-base64";
import { loginFromDB } from "@/lib/loginRes";

const url = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request) {
  try {
    const { Account, Password } = await request.json();

    const data = {
      Account,
      Password: encode(Password),
    };
    const loginResponse = await fetch(`${url}/api/Auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const loginResult = await loginResponse.json();
    // const result = await loginFromDB();

    if (loginResult.ResultCode !== 0 || !loginResult.Token) {
      return NextResponse.json(
        { message: loginResult.Message || "請重新登入" },
        { status: 401 }
      );
    }

    // 打Api拿Role

    // 時間換算
    const now = Date.now();
    const expiredStr =
    loginResult.ExpiredTime.replace(/\//g, "-").replace(" ", "T") + "+08:00";
    const expiredDate = new Date(expiredStr);
    const maxAge = Math.max(
      0,
      Math.floor((expiredDate.getTime() - now) / 1000)
    );

    const response = NextResponse.json({
      message: "success",
      ok: true,
      role: "admin" // 先放假的
    });

    response.cookies.set("token", loginResult.Token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge,
    });

    return response;
  } catch (error) {
    console.error("Error setting token:", error);
    return NextResponse.json({ message: "請檢查伺服器狀態" }, { status: 500 });
  }
}
