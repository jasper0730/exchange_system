import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  console.log(from,to)

  const data = {
    today: {
      total: { count: 100, amount: 50000 },
      completed: { count: 80, amount: 40000 },
      pending: { count: 15, amount: 7000 },
      failed: { count: 5, amount: 3000 },
    },
    week: {
      total: { count: 700, amount: 350000 },
      completed: { count: 600, amount: 300000 },
      pending: { count: 70, amount: 35000 },
      failed: { count: 30, amount: 15000 },
    },
    month: {
      total: { count: 3000, amount: 1400000 },
      completed: { count: 2500, amount: 1200000 },
      pending: { count: 300, amount: 120000 },
      failed: { count: 200, amount: 80000 },
    },
    custom: {
      total: { count: 500, amount: 250000 },
      completed: { count: 400, amount: 200000 },
      pending: { count: 70, amount: 35000 },
      failed: { count: 30, amount: 15000 },
    },
    currencies: { USD: 50, EUR: 30, JPY: 20 },
    fundLevel: 85,
  };;

  return NextResponse.json({
    ResultCode: 0,
    data,
  });
}