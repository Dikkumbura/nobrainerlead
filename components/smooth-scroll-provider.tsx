"use client";

import React, { useEffect, useState } from "react";
// Remove direct import which might be causing the issue
// import Lenis from "@studio-freight/lenis";

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run on client side
    if (!isClient) return;
    
    // Add try-catch block to handle potential errors
    try {
      // Use dynamic import to ensure proper loading
      const initLenis = async () => {
        try {
          // Dynamic import Lenis
          const LenisModule = await import('@studio-freight/lenis');
          // Get the constructor (could be default export or not)
          const Lenis = LenisModule.default;
          
          if (typeof Lenis !== 'function') {
            console.error('Lenis is not a constructor function');
            return;
          }
          
          // Create Lenis instance
          const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
            lerp: 0.1,  // Linear interpolation - helps with smoothness
            wheelMultiplier: 1,
            normalizeWheel: true,
            infinite: false,
          });
          
          // Set up animation frame loop
          function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
          }
          
          requestAnimationFrame(raf);
          
          // Handle anchor links for smooth scrolling
          document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
              e.preventDefault();
              
              // Get the target element
              const targetId = this.getAttribute('href');
              if (!targetId || targetId === '#') return;
              
              const targetElement = document.querySelector(targetId);
              if (targetElement) {
                // Use Lenis to scroll to the element
                lenis.scrollTo(targetElement, {
                  offset: 0,
                  duration: 1.2,
                  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
              }
            });
          });
          
          // Check for hash in URL on page load and scroll to it
          if (window.location.hash) {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
              // Small delay to ensure everything is loaded
              setTimeout(() => {
                lenis.scrollTo(targetElement, {
                  offset: 0,
                  duration: 1.2,
                  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
              }, 500);
            }
          }
          
          // Store cleanup function
          return () => {
            if (lenis) lenis.destroy();
          };
        } catch (err) {
          console.error("Error dynamically importing Lenis:", err);
        }
      };
      
      // Initialize Lenis and store cleanup
      const cleanupPromise = initLenis();
      
      // Return cleanup function
      return () => {
        cleanupPromise.then(cleanup => {
          if (cleanup) cleanup();
        }).catch(error => {
          console.error("Error in cleanup:", error);
        });
      };
    } catch (error) {
      console.error("Error initializing Lenis smooth scroll:", error);
      // Fall back to native scrolling by not doing anything special
    }
  }, [isClient]);
  
  return <>{children}</>;
} 