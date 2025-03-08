"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Script from "next/script";

export const CalendlyCTA: React.FC = () => {
  const calendlyLoaded = useRef(false);

  // Initialize Calendly when script loads
  const handleCalendlyScriptLoad = () => {
    if (window.Calendly && !calendlyLoaded.current) {
      calendlyLoaded.current = true;
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/kavindul755/lead-gen-system-break-down',
        parentElement: document.getElementById('calendly-container'),
        prefill: {},
        utm: {}
      });
    }
  };

  // Ensure cleanup
  useEffect(() => {
    return () => {
      calendlyLoaded.current = false;
    };
  }, []);

  return (
    <section id="book-appointment" className="relative py-20 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Load Calendly script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={handleCalendlyScriptLoad}
      />

      <div className="absolute inset-0 opacity-25">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="text-blue-100 dark:text-blue-900 fill-current"
        >
          <defs>
            <pattern
              id="dots"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Ready to Transform Your Lead Generation?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Schedule a free consultation to learn how our AI-powered system can help your business generate more qualified leads while saving you time and resources.
          </motion.p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="p-2 md:p-6"
          >
            {/* Calendly inline widget container */}
            <div 
              id="calendly-container"
              className="calendly-inline-widget" 
              data-url="https://calendly.com/kavindul755/lead-gen-system-break-down" 
              style={{ minWidth: "320px", height: "700px" }}
            />
          </motion.div>
        </div>

        <div className="mt-10 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-500 dark:text-gray-400"
          >
            No commitment required. Let's discuss how we can best serve your business needs.
          </motion.p>
        </div>
      </div>
    </section>
  );
}; 