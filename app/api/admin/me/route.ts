// app/api/admin/me/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_auth_token")?.value;

  if (token) {
    return NextResponse.json({ isLoggedIn: true });
  } else {
    return NextResponse.json({ isLoggedIn: false });
  }
}
