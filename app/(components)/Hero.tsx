import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const Hero = () => {
  return (
    <div className="flex justify-between items-center space-x-5 p-10 bg-black/5 mt-10 rounded-2xl">
      <div className="flex-1 px-10">
        <h1 className="text-6xl font-bold mb-4">
          Revolutionizing the Digital Employee Experience with AI
        </h1>

        <p className="text-xl text-black/50 mb-4">
          Empower your workforce with intelligent, affordable solutions designed
          to streamline design, engineering, and innovation.
        </p>
        <Button asChild><Link href="/contact">Get Started -{">"}</Link></Button>
      </div>
      <div className="flex-1 px-10">
        <Image
          src="/hero_img.png"
          alt="hero-img"
          width={800}
          height={800}
        ></Image>
      </div>
    </div>
  );
};

export default Hero;
