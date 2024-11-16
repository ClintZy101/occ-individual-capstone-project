import React from "react";
import { motion } from "framer-motion";

const InfiniteSlide = () => {
  const items = ["Logo 1", "Logo 2", "Logo 3", "Logo 4"]; // Sample items

  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap", width: "100vw" }}>
        <h2 className="text-white my-2 uppercase px-5 text-lg">Selected Brands</h2>
      <motion.div
        style={{ display: "flex", gap: "20px" }}
        animate={{ x: ["0%", "-100%"] }} // Moves the items to the left
        transition={{
          repeat: Infinity,
          duration: 50, // Adjust for speed of the loop
          ease: "linear", // Ensures a continuous flow
        }}
      >
        {/* Render items twice for the looping effect */}
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            style={{
              minWidth: "300px",
              height: "200px",
              backgroundColor: "gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "1.5rem",
            }}
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteSlide;
