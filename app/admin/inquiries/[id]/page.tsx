// app/admin/inquiries/[id]/page.tsx
"use client"; // This is a Client Component

import { useEffect, useState } from "react"; // React hooks for side effects and state
import { useParams, useRouter } from "next/navigation"; // Next.js hooks for accessing route params and navigation (App Router)
import { Button } from "@/components/ui/button"; // Shadcn UI Button component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Shadcn UI Card components
import { Skeleton } from "@/components/ui/skeleton"; // Shadcn UI Skeleton component (optional loading state)

// Define the type for a contact inquiry (should match your Prisma schema)
interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string; // Optional field
  companyName: string;
  country: string;
  jobTitle?: string; // Optional field
  jobDetails: string;
  createdAt: string; // Assuming ISO string format from API
}

// Admin Single Inquiry Page component
export default function AdminSingleInquiryPage() {
  // Get route parameters from the URL
  const params = useParams();
  // Extract the dynamic 'id' segment from the parameters and cast it to string
  const inquiryId = params.id as string;
  // Get the router instance for navigation (e.g., going back)
  const router = useRouter();

  // State to store the single inquiry data
  const [inquiry, setInquiry] = useState<ContactInquiry | null>(null);
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);
  // State to store any error messages
  const [error, setError] = useState<string | null>(null);

  // useEffect hook to fetch the single inquiry when the component mounts or inquiryId changes
  useEffect(() => {
    // The middleware handles the primary authentication check and redirection.
    // This fetch call assumes the user is authenticated because they reached this page.
    // We still handle a 401 response from the API as a fallback.

    // If inquiryId is not available (shouldn't happen with dynamic routes, but good check)
    if (!inquiryId) {
      setError("Inquiry ID is missing.");
      setIsLoading(false);
      return; // Stop execution
    }

    const fetchInquiry = async () => {
      try {
        // Fetch data from your protected API route for the single inquiry
        // The URL includes the inquiryId from the route parameters
        const response = await fetch(`/api/admin/inquiries/${inquiryId}`, {
          headers: {
            "Content-Type": "application/json",
            // Cookies are automatically sent by the browser
          },
        });

        // Check if the response was successful (status code 200-299)
        if (!response.ok) {
          // If the API returns 401 Unauthorized, redirect to the login page
          if (response.status === 401) {
            router.push("/admin/login");
            return; // Stop execution
          }
          // For other non-OK status codes, parse the error message from the response
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch inquiry"); // Throw an error
        }

        // Parse the JSON data from the successful response
        const data: ContactInquiry = await response.json();
        // Update the state with the fetched inquiry data
        setInquiry(data);
      } catch (err: any) {
        // Catch any errors during the fetch process or response handling
        setError(err.message); // Set the error state
        console.error("Error fetching inquiry:", err); // Log the error to the console
      } finally {
        // This block always runs after try/catch
        setIsLoading(false); // Set loading state to false
      }
    };

    // Call the fetch function
    fetchInquiry();
  }, [inquiryId, router]); // Dependency array includes inquiryId and router

  // Render a loading skeleton while data is being fetched
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Admin: Inquiry Details</h1>
        {/* Skeleton component for loading state */}
        <Skeleton className="w-full h-[400px] rounded-md" />
      </div>
    );
  }

  // Render an error message if fetching failed
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl text-red-600">
        <h1 className="text-3xl font-bold mb-8">Admin: Inquiry Details</h1>
        <p>Error loading inquiry: {error}</p>
        {/* Button to go back */}
        <Button onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  // Render a "not found" message if inquiry data is null after loading
  if (!inquiry) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl text-gray-600">
        <h1 className="text-3xl font-bold mb-8">Admin: Inquiry Details</h1>
        <p>Inquiry not found.</p>
        {/* Button to go back */}
        <Button onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  // Render the inquiry details using Shadcn Card component
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Admin: Inquiry Details</h1>

      <Card>
        {" "}
        {/* Shadcn Card component */}
        <CardHeader>
          <CardTitle>Inquiry from {inquiry.name}</CardTitle> {/* Card Title */}
        </CardHeader>
        <CardContent className="space-y-4">
          {" "}
          {/* Card Content with vertical spacing */}
          <div>
            <p className="text-sm font-medium text-gray-500">Received At:</p>
            <p>{new Date(inquiry.createdAt).toLocaleString()}</p>{" "}
            {/* Format date */}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Email:</p>
            <p>{inquiry.email}</p>
          </div>
          {/* Conditionally render Phone if it exists */}
          {inquiry.phone && (
            <div>
              <p className="text-sm font-medium text-gray-500">Phone:</p>
              <p>{inquiry.phone}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-500">Company Name:</p>
            <p>{inquiry.companyName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Country:</p>
            <p>{inquiry.country}</p>
          </div>
          {/* Conditionally render Job Title if it exists */}
          {inquiry.jobTitle && (
            <div>
              <p className="text-sm font-medium text-gray-500">Job Title:</p>
              <p>{inquiry.jobTitle}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-500">
              Job Details / Requirements:
            </p>
            {/* Use whitespace-pre-wrap to preserve line breaks in job details */}
            <p className="whitespace-pre-wrap">{inquiry.jobDetails}</p>
          </div>
        </CardContent>
      </Card>

      {/* Button to go back to the list page */}
      <Button onClick={() => router.back()} className="mt-8">
        Go Back to List
      </Button>
    </div>
  );
}
