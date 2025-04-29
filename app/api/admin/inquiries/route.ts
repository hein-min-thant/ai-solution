// app/api/admin/inquiries/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(inquiries, { status: 200 });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      { message: "Failed to fetch inquiries." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
