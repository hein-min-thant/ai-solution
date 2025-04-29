import { NextResponse } from "next/server";

const AUTH_COOKIE_NAME = "admin_auth_token";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );

    // Clear the auth cookie
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: "",
      maxAge: 0, // Immediately expire
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}
