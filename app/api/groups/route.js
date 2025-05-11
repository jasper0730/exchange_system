import { mockDB } from "@/lib/mockDB";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';


export async function GET() {
  return NextResponse.json({
    data: mockDB,
    ok: true
  });
}

export async function POST(request) {
  try {
    const { groupName, permissions } = await request.json();
    if (!groupName) {
      return NextResponse.json({ message: "群組名稱必填" }, { status: 400 });
    }

    const newGroup = {
      id: uuidv4(),
      name: groupName,
      permissions,
    };

    mockDB.push(newGroup);

    return NextResponse.json({ message: "新增成功", group: newGroup, ok: true });
  } catch (error) {
    return NextResponse.json({ message: "伺服器錯誤" }, { status: 500 });
  }
}
