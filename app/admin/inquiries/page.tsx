// app/admin/inquiries/page.tsx
"use client"; // This is a Client Component

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Use useRouter for navigation in App Router
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Adjust import path if necessary
import { Button } from "@/components/ui/button"; // Adjust import path if necessary
import { Skeleton } from "@/components/ui/skeleton"; // Optional: for loading state

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

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // --- Authentication Check Placeholder ---
    // You would typically check if the user is authenticated here.
    // If not authenticated, redirect to the login page.
    // Example (conceptual):
    // const isAuthenticated = checkAdminAuthentication(); // Your auth function
    // if (!isAuthenticated) {
    //   router.push('/admin/login'); // Redirect to your admin login page
    //   return; // Stop fetching if not authenticated
    // }
    // -----------------------------------------

    const fetchInquiries = async () => {
      try {
        // Fetch data from your protected API route
        const response = await fetch("/api/admin/inquiries", {
          // You might need to include authentication headers/cookies here
          // depending on your auth implementation
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer ${yourAuthToken}`, // Example
          },
        });

        if (!response.ok) {
          // Handle non-successful responses (e.g., 401 Unauthorized, 500 Server Error)
          if (response.status === 401) {
            // If unauthorized, redirect to login
            router.push("/admin/login"); // Redirect to your admin login page
            return;
          }
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch inquiries");
        }

        const data: ContactInquiry[] = await response.json();
        setInquiries(data);
      } catch (err: any) {
        setError(err.message);
        console.error("Error fetching inquiries:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInquiries();
  }, [router]); // Add router to dependency array

  if (isLoading) {
    // Optional: Show a loading skeleton while fetching
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Admin: Contact Inquiries</h1>
        <Skeleton className="w-full h-[300px] rounded-md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-red-600">
        <h1 className="text-3xl font-bold mb-8">Admin: Contact Inquiries</h1>
        <p>Error loading inquiries: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin: Contact Inquiries</h1>

      <div className="rounded-md border">
        {" "}
        {/* Shadcn border styling */}
        <Table>
          <TableCaption>A list of recent contact inquiries.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">
                Company Name
              </TableHead>{" "}
              {/* Hide on small screens */}
              <TableHead className="hidden sm:table-cell">
                Country
              </TableHead>{" "}
              {/* Hide on extra small screens */}
              <TableHead className="hidden lg:table-cell">
                Received At
              </TableHead>{" "}
              {/* Hide on large screens */}
              <TableHead className="text-right">View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.map((inquiry) => (
              <TableRow key={inquiry.id}>
                <TableCell className="font-medium">{inquiry.name}</TableCell>
                <TableCell>{inquiry.email}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {inquiry.companyName}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {inquiry.country}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {new Date(inquiry.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {/* Link to the single inquiry page */}
                  <Link
                    href={`/admin/inquiries/${inquiry.id}`}
                    passHref
                    legacyBehavior
                  >
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {inquiries.length === 0 && !isLoading && !error && (
        <p className="text-center text-gray-600 mt-8">No inquiries found.</p>
      )}
    </div>
  );
}
