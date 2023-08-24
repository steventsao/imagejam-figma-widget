import { NextRequest, NextResponse } from "next/server";
export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  // return json hello
  console.log("coo");
  return NextResponse.json({ hello: "world" });
}
