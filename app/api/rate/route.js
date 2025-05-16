import { NextResponse } from "next/server";
import { successResponse, errorResponse } from "@/lib/apiResponse";

const url = process.env.NEXT_PUBLIC_API_URL;
export async function GET() {
  try {
    const response = await fetch(`${url}/api/ExchangeRate/GetCountry`);

    if (!response.ok) {
      return errorResponse("HTTP 錯誤", response.status);
    }

    const result = await response.json();

    return successResponse(result);
  } catch (error) {
    return errorResponse("請檢查伺服器狀態", error);
  }
}