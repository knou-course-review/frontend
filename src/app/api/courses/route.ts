import { NextResponse } from "next/server";
import { api } from "@/utils/api";

export async function GET() {
  try {
    const res = await api.get("/api/v1/courses");
    if (res.status === 200) {
      const body = await res.json();
      return NextResponse.json(body.data);
    }
  } catch (e) {
    console.log(e);
  }
  return NextResponse.json({});
}
