import { NextResponse } from "next/server";

const url = process.env.NEXT_PUBLIC_API_URL;

// 取的所有後台使用者
export async function GET() {
  try {
    const response = await fetch(`${url}/api/Admin/GetAdmins`);

    if (!response.ok) {
      return NextResponse.json(
        { message: "HTTP 錯誤" },
        { status: response.status }
      );
    }

    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: "請檢查伺服器狀態" }, { status: 500 });
  }
}

// 新增後台使用者
export async function POST(request) {
  try {
    const body = await request.json();
    const addResponse = await fetch(`${url}/api/Admin/CreateAdmin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });


    const addResult = await addResponse.json();

    if (!addResponse.ok) {
      return NextResponse.json(
        { message: addResult.message || "Http 錯誤" },
        { status: addResponse.status }
      );
    }

    return NextResponse.json(addResult);
  } catch (error) {
    return NextResponse.json({ message: "請檢查伺服器狀態" }, { status: 500 });
  }
}
