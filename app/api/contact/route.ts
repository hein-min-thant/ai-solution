// app/api/contact/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, companyName, country, jobTitle, jobDetails } =
      body;


    if (!name || !email || !companyName || !country || !jobDetails) {
      return NextResponse.json(
        { message: "Required fields are missing." },
        { status: 400 }
      );
    }

    const newInquiry = await prisma.contactInquiry.create({
      data: {
        name,
        email,
        phone,
        companyName,
        country,
        jobTitle,
        jobDetails,
      },
    });
    console.log("New inquiry saved:", newInquiry);

    return NextResponse.json(
      { message: "Inquiry submitted successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving inquiry:", error);

    return NextResponse.json(
      { message: "Failed to submit inquiry." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


export function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
