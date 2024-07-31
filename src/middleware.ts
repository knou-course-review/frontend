import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  console.log(req);
  const originUrl = req.nextUrl.origin;
  const path = req.nextUrl.pathname;
  try {
    const token = req.cookies.get("knous")?.value;
    if (token) {
      if (path === "/login") {
        return NextResponse.redirect(`${originUrl}/`);
      }
      return NextResponse.next();
    }
  } catch (e) {
    console.log(e);
    return NextResponse.redirect(`${originUrl}/login`);
  }
}

export const config = {
  matcher: ["/login", "/courses/:path*"],
};
