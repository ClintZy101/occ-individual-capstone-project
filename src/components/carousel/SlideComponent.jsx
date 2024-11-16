import React from "react";
import { motion } from "framer-motion";

const SlideInComponent = () => {
  return (
    <motion.div
      initial={{ x: "-100vw" }} // Start position off-screen to the left
      animate={{ x: 0 }}        // End position on-screen
      transition={{
        type: "tween",
        duration: 2,             // Adjust the duration for a slower slide
        ease: "easeInOut",       // Smooth transition
      }}
      style={{
        width: "200px",
        height: "100px",
        backgroundColor: "#4A90E2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      Slide In
    </motion.div>
  );
};

export default SlideInComponent;
