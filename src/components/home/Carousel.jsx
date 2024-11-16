import React, { useEffect, useRef } from "react";

const Carousel = ({ items }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 2; // Adjust scroll speed here
      }
    }, 16); // Adjust interval here for smoother/slower scroll

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="overflow-hidden relative">
      <div
        ref={carouselRef}
        className="flex gap-4 min-w-full animate-slide-right-to-left"
        style={{ whiteSpace: "nowrap" }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="w-60 h-40 bg-gray-300 rounded-lg flex items-center justify-center text-lg font-bold"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
