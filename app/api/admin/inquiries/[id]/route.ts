import { PrismaClient } from "@prisma/client";
import { NextResponse,NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const inquiryId = params.id;

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
    await prisma.$disconnect();
  }
}
