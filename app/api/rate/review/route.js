import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_API_URL;
// 取得待審核資料
export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "未取得授權 Token" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const pageIndex = searchParams.get("pageIndex");
    const pageSize = searchParams.get("pageSize");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const body = {
      StartTime: from,
      EndTime: to,
      PageIndex: pageIndex,
      PageSize: pageSize
    };
    // 如果其中一個沒有填就不成立
    if (!from || !to) {
      delete body.StartTime;
      delete body.EndTime;
    }

    const response = await fetch(`${url}/api/ExchangeRate/SearchApply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
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
