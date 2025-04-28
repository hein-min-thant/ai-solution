// components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  // Define social media links (replace with actual links and icons)
  // Consider using an icon library like Lucide Icons, often paired with Shadcn
  const socialLinks = [
    { name: "LinkedIn", href: "#", icon: "/images/icon-linkedin-white.png" }, // Placeholder
    { name: "Twitter", href: "#", icon: "/images/icon-twitter-white.png" }, // Placeholder
    // Add more social links as needed
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card text-card-foreground py-12 mt-6">
      {" "}
      {/* Adjusted colors and padding */}
      <div className="container mx-auto px-4">
        {/* Footer Content Grid - Adjusted for slightly more space */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-16 mb-8">
          {" "}
          {/* Refined gap */}
          {/* Company Info / About */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              AI-Solution
            </h3>{" "}
            {/* Adjusted text color */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {" "}
              {/* Adjusted text color */}
              Innovating and delivering AI software solutions to transform the
              digital employee experience from Sunderland to the world.
            </p>
          </div>
          {/* Contact & Social */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Connect With Us
            </h3>{" "}
            {/* Adjusted text color */}
            <div className="text-sm text-muted-foreground mb-4">
              {" "}
              {/* Adjusted text color */}
              <p>Sunderland, UK</p>
              {/* Replace with actual contact details */}
              <p>
                Email:{" "}
                <a
                  href="mailto:info@ai-solution.com"
                  className="hover:text-foreground transition-colors"
                >
                  info@ai-solution.com
                </a>
              </p>{" "}
              {/* Adjusted hover */}
              <p>
                Phone:{" "}
                <a
                  href="tel:+44191XXXXXXX"
                  className="hover:text-foreground transition-colors"
                >
                  +44 191 XXX XXXX
                </a>
              </p>{" "}
              {/* Adjusted hover */}
            </div>
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/*
                    Replace img with an icon component if using an icon library
                    Example with Lucide Icons (requires installation and setup):
                    <social.icon className="h-6 w-6" />
                   */}
                  <img
                    src={social.icon}
                    alt={`${social.name} Icon`}
                    className="h-6 w-6 filter grayscale invert dark:filter-none"
                  />{" "}
                  {/* Example styling, adjust as needed */}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
          {" "}
          {/* Adjusted border color, padding, text color */}
          <p>
            &copy; {currentYear} AI-Solution. All rights reserved. Proudly based
            in Sunderland.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
