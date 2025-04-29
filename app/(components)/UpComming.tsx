import React from "react";

interface Event {
  id: string;
  name: string;
  date: string;
  time?: string;
  location: string;
  description?: string;
  link?: string;
}

interface UpcomingEventsProps {
  events: Event[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl text-gray-600">
          Check back soon for upcoming events!
        </p>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Date:</span> {event.date}
                {event.time && (
                  <span className="ml-4 font-medium">Time:</span>
                )}{" "}
                {event.time}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Location:</span> {event.location}
              </p>
              {event.description && (
                <p className="text-gray-700 mb-4">{event.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const exampleEvents: Event[] = [
  {
    id: "1",
    name: "AI in Digital Workplace Summit 2025",
    date: "September 15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Virtual Event",
    description:
      "Join industry leaders to discuss the impact of AI on employee productivity and experience.",
    link: "https://example.com/summit-registration",
  },
  {
    id: "2",
    name: "Sunderland Tech Meetup: AI for Startups",
    date: "October 10, 2025",
    time: "6:30 PM - 8:00 PM",
    location: "Sunderland Software Centre, Sunderland, UK",
    description:
      "Networking and talks focused on leveraging AI for business growth in the startup ecosystem.",
    link: "#",
  },
  {
    id: "3",
    name: "Webinar: Accelerating Prototyping with AI",
    date: "November 5, 2025",
    time: "2:00 PM - 3:00 PM GMT",
    location: "Online",
    description:
      "Learn how AI-Solution's tools can drastically cut down your prototyping time and costs.",
    link: "https://example.com/webinar-signup",
  },
];

const EventsPage: React.FC = () => {
  const upcomingEvents = exampleEvents;

  return (
    <div>
      <main>
        <UpcomingEvents events={upcomingEvents} />
      </main>
    </div>
  );
};

export default EventsPage;
