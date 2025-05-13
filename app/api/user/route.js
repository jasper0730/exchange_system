import { NextResponse } from "next/server";

const url = process.env.NEXT_PUBLIC_API_URL;

// 取的所有APP會員
export async function GET() {
  try {
    // 打API
    return NextResponse.json({
      ResultCode: 0,
      getUser: [
        {
          "userId": "UID0919249d5ff046f5a7998ff26ec6c07e",
          "role": "User",
          "account": "david65497",
          "phone": "0973080065",
          "email": "qaztgb818@gmail.com",
          "status": true,
          "remark": "正常",
          "createTime": "2025-03-24T12:40:45",
          "updateTime": "2025-03-25T14:11:19"
      },
      ]
    });
  } catch (error) {
    return NextResponse.json({ message: "請檢查伺服器狀態" }, { status: 500 });
  }
}

