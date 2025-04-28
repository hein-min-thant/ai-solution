import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div>
      <nav className="flex justify-between items-center px-10 y-6 border-b border-gray-800/10 text-lg">
        <div>
          <Link href="/home">
            <Image src="/logo.png" width={80} height={40} alt="logo" />
          </Link>
        </div>
        <div className="space-x-4">
          <Link
            className="text-blue-600 hover:text-amber-600 transition-colors duration-300"
            href={"/"}
          >
            Home
          </Link>
          <Link
            className="text-blue-600 hover:text-amber-600 transition-colors duration-300"
            href={"/articles"}
          >
            Solutions
          </Link>
          <Link
            className="text-blue-600 hover:text-amber-600 transition-colors duration-300"
            href={""}
          >
            Articles
          </Link>
          <Link
            className="text-blue-600 hover:text-amber-600 transition-colors duration-300"
            href={""}
          >
            Contact Us
          </Link>
        </div>
        <div className="font-bold text-blue-600 hover:underline underline-offset-2">
          <Link href={""}>Admin -{">"}</Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
