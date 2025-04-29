import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:space-x-5 p-4 sm:p-6 md:p-10 bg-black/5 mt-4 sm:mt-6 md:mt-10 rounded-xl sm:rounded-2xl">
      <div className="w-full md:flex-1 px-2 sm:px-6 md:px-10 mb-6 md:mb-0 order-2 md:order-1">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
          Revolutionizing the Digital Employee Experience with AI
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-black/60 mb-4">
          Empower your workforce with intelligent, affordable solutions designed
          to streamline design, engineering, and innovation.
        </p>
        <Button asChild className="w-full sm:w-auto"><Link href="/contact">Get Started -{">"}</Link></Button>
      </div>
      <div className="w-full md:flex-1 px-2 sm:px-6 md:px-10 order-1 md:order-2 mb-4 md:mb-0">
        <Image
          src="/hero_img.png"
          alt="hero-img"
          width={800}
          height={800}
          className="w-full h-auto rounded-lg"
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
