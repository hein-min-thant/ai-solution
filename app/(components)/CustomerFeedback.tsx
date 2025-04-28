import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const feedbackData = [
  {
    name: "John Doe",
    image: "/customer1.jpg",
    initials: "JD",
    rating: 5,
    feedback:
      "AI-Solutions completely transformed our employee experience. The integration process was smooth and intuitive, and the AI-powered assistant has significantly improved the way our employees interact with internal systems. I highly recommend AI-Solutions for any company aiming to future-proof their digital experience.",
  },
  {
    name: "Emily Smith",
    image: "/customer2.jpg",
    initials: "ES",
    rating: 4,
    feedback:
      "Working with AI-Solutions has been an amazing journey. Their prototyping solutions saved us months of development time and the team's support has been outstanding. Although there were a few minor adjustments needed initially, they handled everything promptly and professionally.",
  },
  {
    name: "Mark Johnson",
    image: "/customer3.jpg",
    initials: "MJ",
    rating: 5,
    feedback:
      "The services offered by AI-Solutions are innovative and forward-thinking. While the setup phase took slightly longer than anticipated, the final results were worth the wait. Their virtual assistant provides quick responses and has helped us streamline repetitive tasks within our organization.",
  },
];

export default function CustomerFeedback() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {feedbackData.map((customer, index) => (
        <Card key={index} className="p-10">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage src={customer.image} />
              <AvatarFallback>{customer.initials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{customer.name}</h3>
              <div className="flex items-center text-yellow-500">
                {/* Filled Stars */}
                {Array.from({ length: customer.rating }).map((_, i) => (
                  <Star key={`filled-${i}`} size={16} fill="currentColor" />
                ))}
                {/* Empty Stars */}
                {Array.from({ length: 5 - customer.rating }).map((_, i) => (
                  <Star key={`empty-${i}`} size={16} />
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              &quot;{customer.feedback}&quot;
            </p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
