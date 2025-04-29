import PhotoGallery from "./PhotoGallrey";
import React from "react";

interface GalleryImage {
  url: string;
  alt?: string;
}

const galleryImages: GalleryImage[] = [
  { url: "/img1.png", alt: "Product demo session" },
  { url: "/img2.png", alt: "Networking at conference" },
  { url: "/img3.png", alt: "AI-Solution office interior" },
  { url: "/img4.png", alt: "AI-Solution team photo" },
  { url: "/img5.png", alt: "Software prototyping example" },
  { url: "/img6.png", alt: "Software prototyping example" },
];

const GalleryPage: React.FC = () => {
  return (
    <div className="">
      <main className="container mx-auto px-6 py-8">

        <h1 className="text-4xl font-bold text-center my-10">
          Our Photo Gallery
        </h1>
        <PhotoGallery images={galleryImages} />
      </main>


    </div>
  );
};

export default GalleryPage;
