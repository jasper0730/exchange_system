import { NextResponse } from "next/server";

export function successResponse(
  data = null,
  message = "成功",
  status = 200
) {
  return NextResponse.json({ success: true, data, message }, { status });
}

export function errorResponse(
  message = "發生錯誤",
  error = null,
  status = 500
) {
  return NextResponse.json(
    { success: false, data: null, message, error: String(error) }, { status }
  );
}