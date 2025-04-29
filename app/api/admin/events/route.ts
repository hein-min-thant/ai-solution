import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
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

// GET - List all events
export async function GET(request: Request) {
  try {
    const events = await prisma.Event.findMany({
      orderBy: {
        date: "asc",
      },
      include: {
        createdBy: {
          select: {
            username: true
          }
        }
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

// POST - Create a new event
export async function POST(request: Request) {
  const admin = await verifyAdmin(request);
  
  if (!admin) {
    return NextResponse.json(
      { message: "Unauthorized. Please log in as admin." },
      { status: 401 }
    );
  }
  
  try {
    const body = await request.json();
    const { name, date, time, location, description, link, category, image } = body;
    
    // Basic validation
    if (!name || !date || !location || !description || !category) {
      return NextResponse.json(
        { message: "Required fields are missing." },
        { status: 400 }
      );
    }
    
    const newEvent = await prisma.Event.create({
      data: {
        name,
        date,
        time,
        location,
        description,
        link,
        category,
        image,
        adminId: admin.id
      }
    });
    
    return NextResponse.json(
      { message: "Event created successfully!", event: newEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { message: "Failed to create event." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
