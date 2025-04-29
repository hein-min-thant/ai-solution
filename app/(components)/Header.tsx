"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="sticky top-0 bg-white z-50">
      <nav className="flex justify-between items-center px-4 sm:px-10 py-4 border-b border-gray-800/10 text-lg">
        <div className="flex items-center">
          <Link href="/">
            <Image 
              src="/logo.png" 
              width={120} 
              height={60} 
              alt="logo" 
              className="h-10 sm:h-12 md:h-14 w-auto object-contain" 
              priority
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
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
        
        {/* Desktop Admin Links */}
        <div className="hidden md:flex items-center space-x-4">
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
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-blue-600 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 shadow-md">
          <div className="flex flex-col space-y-4">
            <Link
              className="text-blue-600 hover:text-amber-600 transition-colors duration-300"
              href={"/"}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              className="text-blue-600 hover:text-amber-600 transition-colors duration-300"
              href={"/solutions"}
              onClick={() => setMobileMenuOpen(false)}
            >
              Solutions
            </Link>
            <Link
              className="text-blue-600 hover:text-amber-600 transition-colors duration-300"
              href={"/articles"}
              onClick={() => setMobileMenuOpen(false)}
            >
              Articles
            </Link>
            <Link
              className="text-blue-600 hover:text-amber-600 transition-colors duration-300"
              href={"/contact"}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
            <div className="pt-2 border-t border-gray-100">
              <Link
                href="/admin/inquiries"
                className="font-bold text-blue-600 hover:underline underline-offset-2 hover:text-amber-600 transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin -{">"}
              </Link>
              {isLoggedIn && (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block mt-2 font-bold text-blue-600 hover:underline underline-offset-2 hover:text-amber-600 transition-colors duration-300"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
