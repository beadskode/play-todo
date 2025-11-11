import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const didLogin = request.cookies.has("nextjs");
  if (!didLogin) return NextResponse.redirect(new URL("/sign", request.url));
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!login|regist|_next/static|_next/image|auth|favicon.ico|robots.txt|images|.well-known|$).*)",
    "/api/:path*",
  ],
};
