"use client"

import { motion } from "framer-motion";

export function SectionConnector() {
  return (
    <div className="relative z-10 h-32 -mt-16">
      {/* Custom shaped mask/gradient that overlaps both sections */}
      <div 
        className="absolute inset-0 w-full h-full bg-gradient-to-b from-black via-black to-transparent"
        style={{ 
          clipPath: "polygon(0 0, 100% 0, 100% 50%, 0% 100%)",
          zIndex: 10
        }}
      ></div>
      
      {/* Floating elements that cross the boundary */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 0.7 }}
        transition={{ duration: 0.8 }}
        className="absolute right-[20%] top-[30%] w-16 h-16 rounded-full bg-blue-500/20 blur-md z-20"
      />
      
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 0.5 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute left-[30%] top-[40%] w-12 h-12 rounded-full bg-purple-500/20 blur-md z-20"
      />
      
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 0.3 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="absolute left-[70%] bottom-[20%] w-20 h-20 rounded-full bg-teal-500/20 blur-md z-20"
      />
    </div>
  );
} 