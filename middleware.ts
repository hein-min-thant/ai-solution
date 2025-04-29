import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE_NAME = "admin_auth_token";
const COOKIE_SECRET = process.env.COOKIE_SECRET;

if (!COOKIE_SECRET) {
  throw new Error("COOKIE_SECRET environment variable is required");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const authToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;


  if (isLoginPage && !authToken) {
    return NextResponse.next();
  }


  if (authToken) {
    try {

      if (isLoginPage) {
        return NextResponse.redirect(new URL("/admin/inquiries", request.url));
      }

      return NextResponse.next();
    } catch (error) {

      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
      response.cookies.delete(AUTH_COOKIE_NAME);
      return response;
    }
  }


  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export const config = {
  matcher: ["/admin/:path*"],
};
