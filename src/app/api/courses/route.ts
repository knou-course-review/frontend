import { NextRequest, NextResponse } from "next/server";
import { api } from "@/utils/api";
import { ErrorSchema } from "@/schema/error";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const idQuery = searchParams.get("id");
  const pageQuery = searchParams.get("page");
  let endpointUrl: string;

  if (idQuery) {
    endpointUrl = `/api/v1/course/${idQuery}`;
  } else if (pageQuery) {
    endpointUrl = `/api/v2/courses?page=${pageQuery}`;
  } else {
    endpointUrl = "/api/v2/courses";
  }

  try {
    const res = await api.get(endpointUrl);
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
    const isError = ErrorSchema.safeParse(e);
    if (isError.success) {
      console.log((e as Error).message);
    } else console.log(e);
  }
  return NextResponse.error();
}
