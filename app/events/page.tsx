"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PrismaClient } from "@prisma/client";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";

interface Event {
  id: string;
  name: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  link?: string;
  category: string;
  image?: string;
  createdAt: Date;
}

interface AdminUser {
  id: string;
  username: string;
}

// Function to fetch events from the database
async function getEvents() {
  const prisma = new PrismaClient();
  try {
    const events = await prisma.Event.findMany({
      orderBy: {
        date: 'asc',
      },
    });
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}

// Fallback events in case there are no events in the database yet
const fallbackEvents: Event[] = [
  {
    id: "1",
    name: "AI in Digital Workplace Summit 2025",
    date: "September 15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Virtual Event",
    description:
      "Join industry leaders to discuss the impact of AI on employee productivity and experience. This summit features keynote presentations, panel discussions, and interactive workshops focused on the latest AI innovations transforming the workplace.",
    link: "https://example.com/summit-registration",
    category: "Conference",
    image: "/img1.png",
    createdAt: new Date()
  },
  {
    id: "2",
    name: "Sunderland Tech Meetup: AI for Startups",
    date: "October 10, 2025",
    time: "6:30 PM - 8:00 PM",
    location: "Sunderland Software Centre, Sunderland, UK",
    description:
      "Networking and talks focused on leveraging AI for business growth in the startup ecosystem. Meet fellow entrepreneurs and learn how AI can help your business scale efficiently. Light refreshments will be provided.",
    link: "https://example.com/sunderland-meetup",
    category: "Meetup",
    image: "/img2.png",
    createdAt: new Date()
  },
  {
    id: "3",
    name: "Webinar: Accelerating Prototyping with AI",
    date: "November 5, 2025",
    time: "2:00 PM - 3:00 PM GMT",
    location: "Online",
    description:
      "Learn how AI-Solution's tools can drastically cut down your prototyping time and costs. This webinar will demonstrate practical examples of AI-assisted prototyping and provide actionable insights for implementation in your workflow.",
    link: "https://example.com/webinar-signup",
    category: "Webinar",
    image: "/img3.png",
    createdAt: new Date()
  }
];

function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  // Check if admin is logged in
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const res = await fetch("/api/admin/me", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setIsAdmin(data.isLoggedIn);
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, []);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/events", {
          credentials: "include",
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        
        const data = await response.json();
        setEvents(data.length > 0 ? data : fallbackEvents);
        setError(null);
      } catch (err) {
        setError("Error loading events. Please try again.");
        console.error(err);
        setEvents(fallbackEvents); // Use fallback events on error
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle event deletion
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        setDeleteId(id);
        setIsDeleting(true);
        
        const response = await fetch(`/api/admin/events/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        
        if (!response.ok) {
          throw new Error("Failed to delete event");
        }
        
        // Remove the deleted event from the state
        setEvents(events.filter(event => event.id !== id));
      } catch (err) {
        console.error("Error deleting event:", err);
        alert("Failed to delete event. Please try again.");
      } finally {
        setDeleteId(null);
        setIsDeleting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-left mb-4 md:mb-0">
          Upcoming Events
        </h1>
        {isAdmin && (
          <div className="flex space-x-4 justify-center md:justify-end">
            <Link href="/admin/inquiries">
              <Button variant="outline">View Inquiries</Button>
            </Link>
            <Link href="/admin/events/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Event
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      <p className="text-base sm:text-lg text-center text-black/70 mb-8 sm:mb-12 max-w-3xl mx-auto">
        Join us at these upcoming events to learn more about AI solutions, 
        network with industry professionals, and stay updated on the latest 
        technological advancements.
      </p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-8 sm:space-y-10">
        {events.map((event: Event) => (
          <div 
            key={event.id} 
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {event.image && (
                <div className="relative h-48 md:h-full bg-gray-100">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${event.image})` }}
                  />
                  <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm font-medium">
                    {event.category}
                  </div>
                </div>
              )}
              <div className="p-6 md:col-span-2">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <h2 className="text-2xl font-bold mb-2 md:mb-0">{event.name}</h2>
                  <div className="text-sm text-gray-600 md:text-right">
                    <div className="font-medium">{event.date}</div>
                    {event.time && <div>{event.time}</div>}
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700 mr-2">
                    {event.location}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-6">{event.description}</p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  {isAdmin ? (
                    <>
                      <Link href={`/admin/events/${event.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(event.id)}
                        disabled={isDeleting && deleteId === event.id}
                      >
                        {isDeleting && deleteId === event.id ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-1" />
                        ) : (
                          <Trash2 className="h-4 w-4 mr-1" />
                        )}
                        Delete
                      </Button>
                    </>
                  ) : (
                    <>
                      {event.link && (
                        <Link href={event.link} target="_blank" rel="noopener noreferrer">
                          <Button className="w-full sm:w-auto">Register Now</Button>
                        </Link>
                      )}
                      <Link href="/contact">
                        <Button variant="outline" className="w-full sm:w-auto">Request Information</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;
