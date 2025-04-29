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

// GET - Get a single event by ID
export async function GET(
  request: Request,
  { params }: any
) {
  const eventId = params.id;

  if (!eventId) {
    return NextResponse.json(
      { message: "Event ID is missing." },
      { status: 400 }
    );
  }

  try {
        // @ts-ignore - Prisma types may be out of sync with schema
    const event = await prisma.Event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        createdBy: {
          select: {
            username: true
          }
        }
      }
    });

    if (!event) {
      return NextResponse.json(
        { message: "Event not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { message: "Failed to fetch event details." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PUT - Update an event
export async function PUT(
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
  
  const eventId = params.id;
  
  if (!eventId) {
    return NextResponse.json(
      { message: "Event ID is missing." },
      { status: 400 }
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
    
    // Check if event exists
        // @ts-ignore - Prisma types may be out of sync with schema
    const existingEvent = await prisma.Event.findUnique({
      where: { id: eventId }
    });
    
    if (!existingEvent) {
      return NextResponse.json(
        { message: "Event not found." },
        { status: 404 }
      );
    }
    
    // Update the event
        // @ts-ignore - Prisma types may be out of sync with schema
    const updatedEvent = await prisma.Event.update({
      where: { id: eventId },
      data: {
        name,
        date,
        time,
        location,
        description,
        link,
        category,
        image
      }
    });
    
    return NextResponse.json(
      { message: "Event updated successfully!", event: updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { message: "Failed to update event." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE - Delete an event
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
  
  const eventId = params.id;
  
  if (!eventId) {
    return NextResponse.json(
      { message: "Event ID is missing." },
      { status: 400 }
    );
  }
  
  try {
    // Check if event exists
        // @ts-ignore - Prisma types may be out of sync with schema
    const existingEvent = await prisma.Event.findUnique({
      where: { id: eventId }
    });
    
    if (!existingEvent) {
      return NextResponse.json(
        { message: "Event not found." },
        { status: 404 }
      );
    }
    
    // Delete the event
        // @ts-ignore - Prisma types may be out of sync with schema
    await prisma.Event.delete({
      where: { id: eventId }
    });
    
    return NextResponse.json(
      { message: "Event deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { message: "Failed to delete event." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
