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
      const pageBody = await res.json();
      if (pageBody.data.content.length === 0) return NextResponse.json({ ...pageBody.data, likes: [] });
      const courseIds = pageBody.data.content.map((item: any) => item.id);
      const reviewsQuery = courseIds.map((id: number) => "courseIds=" + id.toString()).join("&");
      const reviewsRes = await api.get(`/api/v1/review-count?${reviewsQuery}`);
      const reviewsBody = await reviewsRes.json();
      return NextResponse.json({ ...pageBody.data, reviews: reviewsBody.data });
    }
  } catch (e) {
    console.log(e);
  }
  return NextResponse.json({});
}
