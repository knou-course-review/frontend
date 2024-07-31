import { NextResponse } from "next/server";
import { checkSession } from "@/lib/auth";

export async function GET() {
  const session = await checkSession();
  return NextResponse.json(session);
}
