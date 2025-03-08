"use client"

import { motion } from "framer-motion";

export function CircuitDivider() {
  return (
    <div className="relative w-full -mt-1 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-800"></div>
      
      <div className="relative h-40">
        {/* Circuit lines */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "60%" }}
          transition={{ duration: 1.5 }}
          className="absolute top-[30%] left-0 h-[2px] bg-gradient-to-r from-blue-500 to-blue-300"
        />
        
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: "70%" }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute top-[30%] left-[60%] w-[2px] bg-gradient-to-b from-blue-300 to-purple-500"
        />
        
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "20%" }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-[30%] left-[60%] h-[2px] bg-gradient-to-r from-purple-500 to-purple-300"
        />
        
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "30%" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-[50%] left-[20%] h-[2px] bg-gradient-to-r from-teal-500 to-teal-300"
        />
        
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: "40%" }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="absolute top-[10%] left-[35%] w-[2px] bg-gradient-to-b from-teal-300 to-green-500"
        />
        
        {/* Circuit nodes */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-[30%] left-0 w-3 h-3 rounded-full bg-blue-500"
        />
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="absolute top-[30%] left-[60%] w-3 h-3 rounded-full bg-blue-300"
        />
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
          className="absolute bottom-[30%] left-[60%] w-3 h-3 rounded-full bg-purple-500"
        />
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 2.3 }}
          className="absolute bottom-[30%] left-[80%] w-3 h-3 rounded-full bg-purple-300"
        />
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute top-[50%] left-[20%] w-3 h-3 rounded-full bg-teal-500"
        />
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="absolute top-[50%] left-[50%] w-3 h-3 rounded-full bg-teal-300"
        />
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="absolute top-[10%] left-[35%] w-3 h-3 rounded-full bg-green-500"
        />
      </div>
    </div>
  );
} 