import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const AUTH_COOKIE_NAME = "admin_auth_token";
const COOKIE_SECRET = process.env.COOKIE_SECRET || "your_super_secret_cookie_key";

// Verify admin authentication
async function verifyAdmin(request: Request) {
  const authToken = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
  
  if (!authToken) {
    return null;
  }
  
  try {
    const payload = jwt.verify(authToken, COOKIE_SECRET) as any;
    if (payload && typeof payload.userId === "string") {
      const admin = await prisma.adminUser.findUnique({
        where: { id: payload.userId }
      });
      return admin;
    }
    return null;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

export async function GET(
  request: NextRequest,
  context: any // DANGEROUS: Bypasses type checking for the second argument
) {
  // You would still access params like this:
  const params = context.params;
  const inquiryId = params.id as string; // Add a type assertion if needed later

  if (!inquiryId) {
     return NextResponse.json(
      { message: "Inquiry ID is missing." },
      { status: 400 }
    );
  }

  try {
    const inquiry = await prisma.contactInquiry.findUnique({
      where: {
        id: inquiryId,
      },
    });

    if (!inquiry) {
      return NextResponse.json(
        { message: "Inquiry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(inquiry, { status: 200 });
  } catch (error) {
    console.error("Error fetching single inquiry:", error);
    return NextResponse.json(
      { message: "Failed to fetch inquiry details." },
      { status: 500 }
    );
  } finally {
    // await prisma.$disconnect();
  }
}

// DELETE - Delete an inquiry
export async function DELETE(
  request: Request,
  { params }: any
) {
  const admin = await verifyAdmin(request);
  
  if (!admin) {
    return NextResponse.json(
      { message: "Unauthorized. Please log in as admin." },
      { status: 401 }
    );
  }
  
  const inquiryId = params.id;
  
  if (!inquiryId) {
    return NextResponse.json(
      { message: "Inquiry ID is missing." },
      { status: 400 }
    );
  }
  
  try {
    // Check if inquiry exists
    const existingInquiry = await prisma.contactInquiry.findUnique({
      where: { id: inquiryId }
    });
    
    if (!existingInquiry) {
      return NextResponse.json(
        { message: "Inquiry not found." },
        { status: 404 }
      );
    }
    
    // Delete the inquiry
    await prisma.contactInquiry.delete({
      where: { id: inquiryId }
    });
    
    return NextResponse.json(
      { message: "Inquiry deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json(
      { message: "Failed to delete inquiry." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
