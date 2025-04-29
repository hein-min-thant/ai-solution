// app/api/admin/inquiries/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";
import prisma from '@/lib/prisma';  // From singleton

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const inquiryId = params.id;

  if (!inquiryId) {
    return NextResponse.json(
      { error: "Inquiry ID is required." },
      { status: 400 }
    );
  }

  try {
    const inquiry = await prisma.contactInquiry.findUnique({
      where: { id: inquiryId },
    });

    if (!inquiry) {
      return NextResponse.json(
        { error: "Inquiry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(inquiry, { status: 200 });
  } catch (error) {
    console.error("Error fetching inquiry:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}