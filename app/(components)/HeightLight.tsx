import { Button } from "@/components/ui/button";
import React from "react";

const HeightLight = () => {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-center">
        Highlights of Our Past Solutions
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-4 mx-10">
        <div className="p-10 border-r border-gray-200">
          <h2 className="text-3xl font-semibold mb-4">
            Smart Manufacturing Optimization
          </h2>
          <p className="text-xl text-black/50 mb-4">
            Deployed AI-driven predictive maintenance for a leading automotive
            company, reducing production downtime by 28% and improving machine
            efficiency.
          </p>
          <Button>Explore -{">"}</Button>
        </div>
        <div className="p-10 border-r border-gray-200">
          <h2 className="text-3xl font-semibold mb-4">
            Virtual HR Assistant for Global Corporation
          </h2>
          <p className="text-xl text-black/50 mb-4">
            Built an intelligent virtual assistant that automated employee
            onboarding and support, cutting HR response times by 45%.
          </p>
          <Button>Explore -{">"}</Button>
        </div>
        <div className="p-10">
          <h2 className="text-3xl font-semibold mb-4">
            AI-Powered Helpdesk for IT Firms
          </h2>
          <p className="text-xl text-black/50 mb-4">
            Implemented a machine learning helpdesk system for a major IT
            services provider, achieving a 40% faster ticket resolution rate.
          </p>
          <Button>Explore -{">"}</Button>
        </div>
      </div>
    </div>
  );
};

export default HeightLight;
