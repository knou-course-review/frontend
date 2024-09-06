import { NextRequest, NextResponse } from "next/server";
import { api } from "@/utils/api";
import { editReview, postReview } from "@/actions/user-review";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  // 리뷰 GET 요청은 토큰 필요
  const userSession = await getSession();
  if (!userSession.isLoggedIn || !userSession.token) return NextResponse.redirect(new URL("/login", req.url), 302);

  const { searchParams } = new URL(req.url);
  const reviewIdQuery = searchParams.get("rid");
  const courseIdQuery = searchParams.get("cid");
  const pageQuery = searchParams.get("page");

  if (reviewIdQuery) {
    try {
      const res = await api.get(`/api/v1/review/${reviewIdQuery}`, userSession.token);
      if (res.status === 200) {
        const body = await res.json();
        return NextResponse.json(body.data);
      }
    } catch (e) {
      console.log(e);
    }
  } else if (pageQuery) {
    try {
      const res = await api.get(`/api/v2/course/${courseIdQuery}/reviews?page=${pageQuery}`, userSession.token);
      if (res.status === 200) {
        const pageBody = await res.json();
        if (pageBody.data.content.length === 0) return NextResponse.json({ ...pageBody.data, likes: [] });
        const reviewIds = pageBody.data.content.map((item: any) => item.id);
        const likesQuery = reviewIds.map((id: number) => "reviewIds=" + id.toString()).join("&");
        const likesRes = await api.get(`/api/v1/likes?${likesQuery}`, userSession.token);
        const likesBody = await likesRes.json();
        return NextResponse.json({ ...pageBody.data, likes: likesBody.data });
      }
    } catch (e) {
      console.log(e);
    }
  }
  return NextResponse.json({});
}

export async function POST(req: NextRequest) {
  const userSession = await getSession();
  if (!userSession.isLoggedIn || !userSession.token) return NextResponse.redirect(new URL("/login", req.url), 302);

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
  const userSession = await getSession();
  if (!userSession.isLoggedIn || !userSession.token) return NextResponse.redirect(new URL("/login", req.url), 302);

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
