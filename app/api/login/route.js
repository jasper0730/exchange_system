import { NextResponse } from "next/server";
import { encode } from "js-base64";

const url = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request) {
  try {
    const { Account, Password } = await request.json();

    const data = {
      Account,
      Password: encode(Password),
    };
    const response = await fetch(`${url}/api/Auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.ResultCode !== 0 || !result.Token) {
      return NextResponse.json(
        { error: result.Message || "請重新登入" },
        { status: 401 }
      );
    }

    const now = Date.now();
    const expiredStr =
      result.ExpiredTime.replace(/\//g, "-").replace(" ", "T") + "+08:00";
    const expiredDate = new Date(expiredStr);
    const maxAge = Math.max(
      0,
      Math.floor((expiredDate.getTime() - now) / 1000)
    );

    const res = NextResponse.json({ message: "success", ok: true });
    res.cookies.set("token", result.Token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge,
    });
    return res;
  } catch (error) {
    console.error("Error setting token:", error);
    return NextResponse.json({ error: "請檢查伺服器狀態" }, { status: 500 });
  }
}
