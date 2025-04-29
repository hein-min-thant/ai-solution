import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const AUTH_COOKIE_NAME = "admin_auth_token";
const COOKIE_SECRET = process.env.COOKIE_SECRET!;

export async function POST(request: Request) {
  try {
    // Verify critical environment variable
    if (!COOKIE_SECRET) {
      throw new Error("Cookie secret is not configured");
    }

    // Parse and validate input
    let requestBody;
    try {
      requestBody = await request.json();
    } catch (e) {
      return NextResponse.json(
        { message: "Invalid request body" },
        { status: 400 }
      );
    }

    const { username, password } = requestBody;
    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }

    // Database operations
    const user = await prisma.adminUser.findUnique({ 
      where: { username } 
    });
    
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Password verification
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // JWT creation
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      COOKIE_SECRET,
      { expiresIn: "7d" }
    );

    // Response preparation
    const response = NextResponse.json(
      { message: "Login successful", user: { id: user.id, username: user.username } },
      { status: 200 }
    );

    // Cookie setting
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;

  } catch (error) {
    console.error("Login error:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { 
        message: "Internal server error",
        details: process.env.NODE_ENV === "development" 
          ? (error instanceof Error ? error.message : "Unknown error")
          : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect().catch(error => {
      console.error("Error disconnecting Prisma:", error);
    });
  }
}