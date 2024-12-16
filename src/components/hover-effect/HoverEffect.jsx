import { motion } from "framer-motion";

const HoverEffectWithMotion = () => {
  return (
    <div className="relative">
      <motion.div
        className="absolute top-0 left-0 h-1 bg-blue-500"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%", backgroundColor: "#9333ea" }} // Change color on hover
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <div className="p-4">
        <p>Hover over me!</p>
      </div>
    </div>
  );
};

export default HoverEffectWithMotion;
