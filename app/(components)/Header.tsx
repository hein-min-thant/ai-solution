"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch("/api/admin/me", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setIsLoggedIn(false);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
            href={"/solutions"}
          >
            Solutions
          </Link>
          <Link
            className="text-blue-600 hover:text-amber-600 transition-colors duration-300"
            href={"/articles"}
          >
            Articles
          </Link>
          <Link
            className="text-blue-600 hover:text-amber-600 transition-colors duration-300"
            href={"/contact"}
          >
            Contact Us
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/inquiries"
            className="font-bold text-blue-600 hover:underline underline-offset-2 hover:text-amber-600 transition-colors duration-300"
          >
            Admin -{">"}
          </Link>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="font-bold text-blue-600 hover:underline underline-offset-2 hover:text-amber-600 transition-colors duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
