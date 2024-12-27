import React from "react";

export default function GalleryProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden grid max-h-[500px] max-w-[270px] relative bg-gray-800 rounded">
      {/* Image Placeholder */}
      <div className="max-h-[270px] overflow-hidden rounded bg-gray-700 h-[300px] aspect-square"></div>

      {/* Text Placeholder */}
      <div className="my-4 space-y-2">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div> {/* Title */}
        <div className="h-4 bg-gray-700 rounded w-1/2"></div> {/* Price */}
      </div>

      {/* Sale Badge Placeholder */}
      <div className="ml-5 h-6 bg-gray-700 rounded w-12 absolute top-2"></div>
    </div>
  );
}
