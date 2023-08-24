import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("SUP");
  return NextResponse.json(
    { title: "cron" },
    {
      status: 200,
    }
  );
}
