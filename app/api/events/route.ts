import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET - List all events for public view
export async function GET(request: Request) {
  try {
    // @ts-ignore - Prisma types may be out of sync with schema
    const events = await prisma.Event.findMany({
      orderBy: {
        date: "asc",
      },
      select: {
        id: true,
        name: true,
        date: true,
        time: true,
        location: true,
        description: true,
        link: true,
        category: true,
        image: true,
        createdAt: true
      }
    });

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { message: "Failed to fetch events." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
