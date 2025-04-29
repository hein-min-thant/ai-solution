import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

const SolutionsPage = () => {
  const solutions = [
    {
      title: "Smart Manufacturing Optimization",
      description:
        "Deployed AI-driven predictive maintenance for a leading automotive company, reducing production downtime by 28% and improving machine efficiency.",
      details: [
        "Implemented IoT sensors across production lines",
        "Developed real-time analytics dashboard for maintenance teams",
        "Created predictive algorithms to forecast equipment failures",
        "Integrated with existing ERP systems for seamless operations"
      ]
    },
    {
      title: "Virtual HR Assistant for Global Corporation",
      description:
        "Built an intelligent virtual assistant that automated employee onboarding and support, cutting HR response times by 45%.",
      details: [
        "Designed conversational AI interface for employee inquiries",
        "Automated document processing for new hires",
        "Integrated with HRIS systems for real-time data access",
        "Multilingual support for global workforce"
      ]
    },
    {
      title: "AI-Powered Helpdesk for IT Firms",
      description:
        "Implemented a machine learning helpdesk system for a major IT services provider, achieving a 40% faster ticket resolution rate.",
      details: [
        "Automated ticket categorization and prioritization",
        "Developed knowledge base with self-learning capabilities",
        "Created predictive models for resource allocation",
        "Implemented sentiment analysis for customer satisfaction tracking"
      ]
    }
  ];

  return (
    <div className="w-full max-w-7xl m-auto py-10 px-6">
      <h1 className="text-5xl font-bold text-center mb-10">Our Solutions</h1>
      <p className="text-xl text-center text-black/70 mb-16 max-w-3xl mx-auto">
        We deliver cutting-edge AI solutions that transform businesses across industries. 
        Our proven track record demonstrates our ability to solve complex problems with innovative technology.
      </p>

      <div className="space-y-16">
        {solutions.map((solution, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-10 border-b border-gray-200 pb-16">
            <div>
              <h2 className="text-3xl font-semibold mb-4">{solution.title}</h2>
              <p className="text-xl text-black/60 mb-6">{solution.description}</p>
              <Link href="/contact">
                <Button className="mt-4">Request a consultation</Button>
              </Link>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-medium mb-4">Key Features</h3>
              <ul className="space-y-3">
                {solution.details.map((detail, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolutionsPage;
