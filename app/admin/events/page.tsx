"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
  createdAt: string;
}

export default function EventsManagementPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  // Check if admin is logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch("/api/admin/me", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setIsLoggedIn(data.isLoggedIn);
        
        if (!data.isLoggedIn) {
          router.push("/admin/login");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
        router.push("/admin/login");
      }
    };

    checkLoginStatus();
  }, [router]);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      if (!isLoggedIn) return;
      
      try {
        setLoading(true);
        const response = await fetch("/api/admin/events", {
          credentials: "include",
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        
        const data = await response.json();
        setEvents(data);
        setError(null);
      } catch (err) {
        setError("Error loading events. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchEvents();
    }
  }, [isLoggedIn]);

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

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Event Management</h1>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
          <Link href="/admin/inquiries">
            <Button variant="outline" className="whitespace-nowrap">
              View Inquiries
            </Button>
          </Link>
          <Link href="/admin/events/new">
            <Button className="whitespace-nowrap">
              <Plus className="h-4 w-4 mr-2" />
              Add New Event
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-600 mb-4">No events found</p>
          <Link href="/admin/events/new">
            <Button>Create your first event</Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event Details
                </th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {event.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {event.date}{event.time ? `, ${event.time}` : ''}
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{event.location}</div>
                  </td>
                  <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {event.category}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/events/${event.id}/edit`}>
                        <Button variant="outline" size="sm" className="h-9 px-2 sm:px-3">
                          <Pencil className="h-4 w-4 sm:mr-1" />
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                      </Link>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="h-9 px-2 sm:px-3"
                        onClick={() => handleDelete(event.id)}
                        disabled={isDeleting && deleteId === event.id}
                      >
                        {isDeleting && deleteId === event.id ? (
                          <Loader2 className="h-4 w-4 animate-spin sm:mr-1" />
                        ) : (
                          <>
                            <Trash2 className="h-4 w-4 sm:mr-1" />
                            <span className="hidden sm:inline">Delete</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
