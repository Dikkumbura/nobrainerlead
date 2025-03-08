"use client"

import { motion } from "framer-motion";

export function SlopedDivider() {
  return (
    <div className="relative w-full -mt-1 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-white" style={{ clipPath: "polygon(0 0, 100% 30%, 100% 100%, 0% 100%)" }}></div>
      
      {/* Floating elements for visual interest */}
      <div className="relative h-48 w-full">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.8 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute left-[15%] top-[30%] w-12 h-12 rounded-full bg-blue-500 opacity-30"
        />
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute left-[30%] top-[60%] w-8 h-8 rounded-full bg-purple-500 opacity-20"
        />
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.6 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute left-[70%] top-[40%] w-16 h-16 rounded-full bg-teal-500 opacity-20"
        />
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute left-[85%] top-[60%] w-10 h-10 rounded-full bg-orange-500 opacity-20"
        />
      </div>
    </div>
  );
} 