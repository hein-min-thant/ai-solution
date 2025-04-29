// app/admin/inquiries/page.tsx
"use client"; // This is a Client Component

import { useEffect, useState } from "react"; // React hooks for side effects and state
import Link from "next/link"; // Next.js Link component for client-side navigation
import { useRouter } from "next/navigation"; // Next.js hook for client-side navigation (App Router)
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Shadcn UI Table components
import { Button } from "@/components/ui/button"; // Shadcn UI Button component
import { Skeleton } from "@/components/ui/skeleton"; // Shadcn UI Skeleton component (optional loading state)
import { Trash2, Loader2 } from "lucide-react"; // Icons for delete and loading

// Define the type for a contact inquiry (should match your Prisma schema)
interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  companyName: string;
  country: string;
  createdAt: string; // Assuming ISO string format from API
  // Include other fields if you want to display them in the list
}

// Admin Inquiries List Page component
export default function AdminInquiriesPage() {
  // State to store the list of inquiries
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);
  // State to store any error messages
  const [error, setError] = useState<string | null>(null);
  // State to track which inquiry is being deleted
  const [deletingId, setDeletingId] = useState<string | null>(null);
  // Get the router instance for potential redirects (e.g., if API returns 401)
  const router = useRouter();

  // Function to handle inquiry deletion
  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) {
      return;
    }
    
    setDeletingId(id);
    
    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          router.push("/admin/login");
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete inquiry");
      }
      
      // Remove the deleted inquiry from the state
      setInquiries(inquiries.filter(inquiry => inquiry.id !== id));
    } catch (err: any) {
      setError(err.message);
      console.error("Error deleting inquiry:", err);
    } finally {
      setDeletingId(null);
    }
  };

  // useEffect hook to fetch inquiries when the component mounts
  useEffect(() => {
    // The middleware handles the primary authentication check and redirection.
    // This fetch call assumes the user is authenticated because they reached this page.
    // However, we still handle a 401 response from the API as a fallback
    // in case the session expires while the user is on the page.

    const fetchInquiries = async () => {
      try {
        const response = await fetch("/api/admin/inquiries", {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            // Cookies are automatically sent by the browser to the same origin API routes
            // You might need to handle credentials if your API is on a different origin
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
          throw new Error(errorData.message || "Failed to fetch inquiries"); // Throw an error with the message
        }

        // Parse the JSON data from the successful response
        const data: ContactInquiry[] = await response.json();
        // Update the state with the fetched inquiries
        setInquiries(data);
      } catch (err: any) {
        // Catch any errors during the fetch process or response handling
        setError(err.message); // Set the error state
        console.error("Error fetching inquiries:", err); // Log the error to the console
      } finally {
        // This block always runs after try/catch, whether successful or not
        setIsLoading(false); // Set loading state to false
      }
    };

    // Call the fetch function
    fetchInquiries();
  }, [router]); // Dependency array includes router

  // Render a loading skeleton while data is being fetched
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Admin: Contact Inquiries</h1>
        {/* Skeleton component to show a loading placeholder */}
        <Skeleton className="w-full h-[300px] rounded-md" />
      </div>
    );
  }

  // Render an error message if fetching failed
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-red-600">
        <h1 className="text-3xl font-bold mb-8">Admin: Contact Inquiries</h1>
        <p>Error loading inquiries: {error}</p>
      </div>
    );
  }

  // Render the table of inquiries once data is loaded
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin: Contact Inquiries</h1>

      {/* Table wrapper with border */}
      <div className="rounded-md border">
        {" "}
        {/* Shadcn border styling */}
        <Table>
          <TableCaption>A list of recent contact inquiries.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">
                Company Name
              </TableHead>
              <TableHead className="hidden sm:table-cell">
                Country
              </TableHead>
              <TableHead className="hidden lg:table-cell">
                Received At
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Map over the inquiries array to render each row */}
            {inquiries.map((inquiry) => (
              <TableRow key={inquiry.id}>
                {" "}
                {/* Use inquiry.id as the unique key */}
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{inquiry.name}</span>
                    <span className="text-sm text-gray-500 sm:hidden">{inquiry.email}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{inquiry.email}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {inquiry.companyName}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {inquiry.country}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {new Date(inquiry.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end space-x-2">
                    {/* Link to the single inquiry page using dynamic route */}
                    <Link href={`/admin/inquiries/${inquiry.id}`}>
                      <Button variant="outline" size="sm" className="whitespace-nowrap">
                        <span className="sm:hidden">View</span>
                        <span className="hidden sm:inline">View Details</span>
                      </Button>
                    </Link>
                    
                    {/* Delete button */}
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteInquiry(inquiry.id)}
                      disabled={deletingId === inquiry.id}
                    >
                      {deletingId === inquiry.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </>
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Display a message if no inquiries are found after loading */}
      {inquiries.length === 0 && !isLoading && !error && (
        <p className="text-center text-gray-600 mt-8">No inquiries found.</p>
      )}
    </div>
  );
}
