import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_API_URL;
// 參數更改
export async function POST(request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  try {
    const data = await request.json();
    console.log(data);
    const response = await fetch(`${url}/api/ExchangeRate/CreateApply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },

      body: JSON.stringify(data),
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