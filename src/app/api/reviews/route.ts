import { NextRequest, NextResponse } from "next/server";
import { api } from "@/utils/api";
import { editReview, postReview } from "@/actions/user-review";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  // 리뷰 GET 요청은 토큰 필요
  const userSession = await getSession();
  if (!userSession.isLoggedIn || !userSession.token) return NextResponse.json({});

  const { searchParams } = new URL(req.url);
  const reviewIdQuery = searchParams.get("rid");
  const courseIdQuery = searchParams.get("cid");
  const pageQuery = searchParams.get("page");

  if (reviewIdQuery) {
    try {
      const res = await api.get(`/api/v1/review/${reviewIdQuery}`, userSession.token);
      if (res.status === 200) {
        const body = await res.json();
        console.log(body);
        return NextResponse.json(body.data);
      }
    } catch (e) {
      console.log(e);
    }
  } else if (pageQuery) {
    try {
      const res = await api.get(`/api/v2/course/${courseIdQuery}/reviews?page=${pageQuery}`, userSession.token);
      console.log(res);
      if (res.status === 200) {
        const body = await res.json();
        console.log(body);
        return NextResponse.json(body.data);
      }
    } catch (e) {
      console.log(e);
    }
  }
  return NextResponse.json({});
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("cid");
  if (!courseId) return NextResponse.json({ error: "No course id" });

  const userReview = await req.json();
  const res = await postReview(courseId, userReview);
  if (res.isValid) {
    return NextResponse.json({ isSuccess: true });
  }
  return NextResponse.json({ error: "Operation failed" });
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("cid");
  if (!courseId) return NextResponse.json({ error: "No course id" });

  const userReview = await req.json();
  const res = await editReview(courseId, userReview);
  if (res.isValid) {
    return NextResponse.json({ isSuccess: true });
  }
  return NextResponse.json({ error: "Operation failed" });
}
