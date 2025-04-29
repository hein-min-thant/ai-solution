"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  companyName: z.string().min(2, {
    message: "Company Name must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  jobTitle: z.string().optional(),
  jobDetails: z.string().min(10, {
    message: "Job Details must be at least 10 characters.",
  }),
});


type ContactFormValues = z.infer<typeof formSchema>;


const defaultValues: Partial<ContactFormValues> = {
  name: "",
  email: "",
  phone: "",
  companyName: "",
  country: "",
  jobTitle: "",
  jobDetails: "",
};

export default function ContactPage() {

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });


  async function onSubmit(values: ContactFormValues) {
    console.log(values);


    try {
      const response = await fetch("/api/contact", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        form.reset();
      } else {

      }
    } catch (error) {
      console.error("Submission error:", error);
    }

  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <p className="text-center text-gray-600 mb-12">
        Please fill out the form below with your job requirements and we will
        get back to you.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Field (Optional) */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number (Optional)</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Your Phone Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company Name Field */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Company Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Country Field */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Your Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job Title Field (Optional) */}
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Your Job Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job Details Field */}
          <FormField
            control={form.control}
            name="jobDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Details / Requirements</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your job details and requirements..."
                    {...field}
                    rows={6}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Submit Inquiry
          </Button>
        </form>
      </Form>
    </div>
  );
}
