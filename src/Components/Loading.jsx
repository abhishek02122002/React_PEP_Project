import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Loading = () => {
  return (
    <motion.div className="flex justify-center items-center h-screen bg-gray-900">
      <motion.div className="flex space-x-2">
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            className="w-4 h-4 bg-white rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Loading;
