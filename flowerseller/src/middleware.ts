import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/signup"];
const AUTH_API_PREFIX = "/api/auth/";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 認証API・静的リソースは通す
  if (pathname.startsWith(AUTH_API_PREFIX) || pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // ログインページは未認証でも通す
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    const token = request.cookies.get("auth")?.value;
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // その他のページは認証必須
  const token = request.cookies.get("auth")?.value;
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
