import { getUserRoutesFromDB } from "@/lib/permissions";
import { NextResponse } from "next/server";

export async function GET(request) {
  const role = request.cookies.get('role')?.value;
  if (!role) {
    return NextResponse.json({ routes: [], message: "無此角色權限" }, { status: 401 });
  }
  
  const routes = await getUserRoutesFromDB(role);
  return NextResponse.json({ routes, ok: true });
}