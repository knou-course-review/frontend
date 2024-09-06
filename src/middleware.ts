import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (path.startsWith("/api")) return NextResponse.next();

  const originUrl = req.nextUrl.origin;
  const userSession = await getSession();

  if (path === "/login") {
    if (userSession.isLoggedIn) return NextResponse.redirect(`${originUrl}/`);
    else return NextResponse.next();
  }

  if (!userSession.isLoggedIn) return NextResponse.redirect(`${originUrl}/login`);
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/courses/:path*", "/account/:path*"],
};
