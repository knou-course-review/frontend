import { NextRequest, NextResponse } from "next/server";
import { api } from "@/utils/api";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const searchType = searchParams.get("searchType") ?? "courseName";
  const name = searchParams.get("name");
  const pageQuery = searchParams.get("page");

  try {
    const res = await api.get(`/api/v2/courses/search?page=${pageQuery}&searchType=${searchType}&name=${name}`);
    if (res.status === 200) {
      const body = await res.json();
      return NextResponse.json(body.data);
    }
  } catch (e) {
    console.log(e);
  }
  return NextResponse.json({});
}
