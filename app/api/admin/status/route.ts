import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const AUTH_COOKIE_NAME = "admin_auth_token";
const COOKIE_SECRET =
  process.env.COOKIE_SECRET || "your_super_secret_cookie_key";

async function verifyToken(token: string): Promise<any | null> {
  if (!COOKIE_SECRET) {
    console.error("COOKIE_SECRET environment variable is not defined!");
    return null;
  }
  try {
    const payload = jwt.verify(token, COOKIE_SECRET) as any;
    if (payload && typeof payload.userId === "string") {
      return payload;
    }
    return null;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const authToken = (await cookies()).get(AUTH_COOKIE_NAME)?.value;

    if (!authToken) {
      return NextResponse.json(
        { isAuthenticated: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    // Verify the token/cookie value server-side using the secure verification function
    const payload = await verifyToken(authToken);

    // If the token is invalid or expired, the user is not authenticated
    if (!payload) {
      // Optionally, clear the invalid cookie here to force a fresh login attempt
      (
        await // Optionally, clear the invalid cookie here to force a fresh login attempt
        cookies()
      ).delete(AUTH_COOKIE_NAME);
      return NextResponse.json(
        { isAuthenticated: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    // If the token is valid, the user is authenticated
    // You could optionally return some user info from the payload here if needed by the client
    return NextResponse.json(
      { isAuthenticated: true, user: payload },
      { status: 200 }
    );
  } catch (error) {
    // Log the error on the server side
    console.error("Error checking auth status:", error);
    // Return a generic error response to the client
    return NextResponse.json(
      {
        isAuthenticated: false,
        message: "An error occurred during authentication check.",
      },
      { status: 500 }
    );
  }
  // No finally block needed here as we don't use Prisma or other resources that need explicit disconnection
}

// Explicitly disallow other HTTP methods for this route
export function POST() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
export function PUT() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
export function DELETE() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
