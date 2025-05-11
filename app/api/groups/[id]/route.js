import { mockDB } from "@/lib/mockDB";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { groupName, permissions } = await request.json();

    const groupIndex = mockDB.findIndex((group) => group.id === id);

    if (groupIndex === -1) {
      return NextResponse.json({ message: "找不到群組" }, { status: 404 });
    }

    mockDB[groupIndex] = {
      ...mockDB[groupIndex],
      name: groupName,
      permissions,
    };

    return NextResponse.json({ message: "更新成功", group: mockDB[groupIndex], ok: true });
  } catch (error) {
    return NextResponse.json({ message: "伺服器錯誤" }, { status: 500 });
  }
}
