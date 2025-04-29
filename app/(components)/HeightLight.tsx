import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const HeightLight = () => {
  return (
    <div className="py-8 px-4 sm:p-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-center">
        Highlights of Our Past Solutions
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 sm:mt-8 mx-0 sm:mx-4 md:mx-8">
        <div className="p-6 sm:p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 md:border-r">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4">
            Smart Manufacturing Optimization
          </h2>
          <p className="text-base sm:text-lg text-black/60 mb-4">
            Deployed AI-driven predictive maintenance for a leading automotive
            company, reducing production downtime by 28% and improving machine
            efficiency.
          </p>
          <Link href="/solutions" className="inline-block">
            <Button className="w-full sm:w-auto">Explore -{">"}</Button>
          </Link>
        </div>
        <div className="p-6 sm:p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 md:border-r">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4">
            Virtual HR Assistant for Global Corporation
          </h2>
          <p className="text-base sm:text-lg text-black/60 mb-4">
            Built an intelligent virtual assistant that automated employee
            onboarding and support, cutting HR response times by 45%.
          </p>
          <Link href="/solutions" className="inline-block">
            <Button className="w-full sm:w-auto">Explore -{">"}</Button>
          </Link>
        </div>
        <div className="p-6 sm:p-8 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4">
            AI-Powered Helpdesk for IT Firms
          </h2>
          <p className="text-base sm:text-lg text-black/60 mb-4">
            Implemented a machine learning helpdesk system for a major IT
            services provider, achieving a 40% faster ticket resolution rate.
          </p>
          <Link href="/solutions" className="inline-block">
            <Button className="w-full sm:w-auto">Explore -{">"}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeightLight;
