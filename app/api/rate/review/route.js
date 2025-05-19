import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_API_URL;
// 取得待審核資料
export async function GET() {
  const cookieStore = cookies()
    const token = cookieStore.get("token")?.value;
  try {
    const response = await fetch(`${url}/api/ExchangeRate/SearchApply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      return NextResponse.json({ message: "HTTP 錯誤" }, { status: response.status });
    }

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: "請檢查伺服器狀態" }, { status: 500 });
  }
}
