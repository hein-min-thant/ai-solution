import Image from "next/image";
import React from "react";

interface GalleryImage {
  url: string;
  alt?: string;
}

interface PhotoGalleryProps {
  images: GalleryImage[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images }) => {
  if (!images || images.length === 0) {
    return <p className="text-center text-gray-600">No images to display.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full h-64 overflow-hidden rounded-lg shadow-md"
          >
            <Image
              src={image.url}
              alt={image.alt || `Gallery image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
