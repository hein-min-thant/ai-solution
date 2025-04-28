// components/ContactCtaSection.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ContactCtaSection = () => {
  return (
    <section className="py-16 bg-black/5 rounded-2xl text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Transform Your Digital Workplace?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Let's discuss how AI-Solution's innovative software and affordable
          prototyping can benefit your business.
        </p>
        <Button asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </section>
  );
};

export default ContactCtaSection;
