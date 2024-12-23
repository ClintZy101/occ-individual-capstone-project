import React from "react";

export default function GallerySkeletonLoader({ count = 8 }) {
  const skeletons = Array(count).fill(null); // Number of skeleton items to render

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 place-items-center w-full">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden grid max-h-[500px] max-w-[270px] relative bg-gray-800 rounded"
        >
          {/* Image Placeholder */}
          <div className="bg-gray-700 rounded h-[300px] w-full"></div>
          {/* Text Placeholder */}
          <div className="my-4">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
