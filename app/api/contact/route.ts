// app/api/contact/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server"; // Import NextResponse for sending responses

const prisma = new PrismaClient();

// Define the POST method handler
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, companyName, country, jobTitle, jobDetails } =
      body;

    // Basic validation (enhance as needed)
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
    console.log("New inquiry saved:", newInquiry); // Log for confirmation

    return NextResponse.json(
      { message: "Inquiry submitted successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving inquiry:", error);
    // In production, avoid sending detailed error info to the client
    return NextResponse.json(
      { message: "Failed to submit inquiry." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }
}

// If you only want to allow POST, you don't need to export other methods.
// Optionally, you can export a handler for other methods to return 405 Method Not Allowed
export function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
