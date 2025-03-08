"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Completely simplified text animation approach
const animateHeadingText = (headingElement: HTMLElement | null, paragraphElement: HTMLElement | null) => {
  if (!headingElement || !paragraphElement) return;
  
  // Remove debug indicator - no longer needed
  // const debugIndicator = document.createElement('div');
  // debugIndicator.style.position = 'fixed';
  // debugIndicator.style.top = '0';
  // debugIndicator.style.left = '0';
  // debugIndicator.style.backgroundColor = 'red';
  // debugIndicator.style.color = 'white';
  // debugIndicator.style.padding = '4px 8px';
  // debugIndicator.style.zIndex = '9999';
  // debugIndicator.textContent = 'Timeline Debug: Active';
  // document.body.appendChild(debugIndicator);
  
  // Clear existing contents and store original text
  const headingText = headingElement.textContent || '';
  const paragraphText = paragraphElement.textContent || '';
  
  // Clear the elements
  headingElement.innerHTML = '';
  paragraphElement.innerHTML = '';
  
  // Function to create word spans
  const createWordSpans = (text: string, element: HTMLElement) => {
    // Split the text into words
    const words = text.trim().split(' ');
    
    // Create a wrapper with proper word spacing
    const wrapper = document.createElement('div');
    wrapper.style.wordSpacing = '0.7em';
    
    // Add each word as a separate span
    words.forEach(word => {
      const span = document.createElement('span');
      span.className = 'inline-block opacity-0';
      span.style.transform = 'translateY(50px)';
      // Add extra space after each word
      span.textContent = word + '  ';
      span.style.marginRight = '0.3em';
      wrapper.appendChild(span);
    });
    
    element.appendChild(wrapper);
    return Array.from(wrapper.children) as HTMLElement[];
  };
  
  // Create word spans for both elements
  const headingSpans = createWordSpans(headingText, headingElement);
  const paragraphSpans = createWordSpans(paragraphText, paragraphElement);
  
  // Function to set initial state (hidden)
  const setToHidden = () => {
    headingSpans.forEach(span => {
      span.style.opacity = '0';
      span.style.transform = 'translateY(50px)';
    });
    
    paragraphSpans.forEach(span => {
      span.style.opacity = '0';
      span.style.transform = 'translateY(50px)';
    });
  };
  
  // Function to set visible state
  const animateToVisible = () => {
    const tl = gsap.timeline({
      defaults: {
        ease: "power1.out", // Gentler ease for both animations
      }
    });
    
    // Reset to ensure clean animation state
    setToHidden();
    
    // More consistent heading animation
    tl.to(headingSpans, {
      opacity: 1,
      y: 0,
      duration: 1.6,
      stagger: 0.04, // More subtle stagger
      ease: "sine.out" // Very smooth easing
    });
    
    // More consistent paragraph animation
    tl.to(paragraphSpans, {
      opacity: 1,
      y: 0,
      duration: 1.4,
      stagger: 0.03,
      ease: "sine.out" // Match heading easing
    }, "-=1.2"); // Smaller overlap for more predictable timing
    
    return tl;
  };
  
  // Set initial state
  setToHidden();
  
  // Create ScrollTrigger that works in both directions - more reliable triggers
  ScrollTrigger.create({
    trigger: headingElement,
    start: "top bottom-=20%", // Trigger earlier when scrolling down
    end: "bottom top+=30%", // End later when scrolling up
    onEnter: () => animateToVisible(),
    onEnterBack: () => animateToVisible(),
    onLeave: () => setToHidden(),
    onLeaveBack: () => setToHidden(),
    markers: false,
  });
};

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  // Text animation effect with GSAP
  useEffect(() => {
    // Add a small delay to ensure the element is properly rendered
    const timer = setTimeout(() => {
      animateHeadingText(headingRef.current, paragraphRef.current);
      
      // Force refresh ScrollTrigger
      ScrollTrigger.refresh();
    }, 500);
    
    return () => {
      clearTimeout(timer);
      // Clean up any active ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-transparent dark:bg-transparent font-sans"
      ref={containerRef}
    >
      <div className="w-full pt-20 pb-8 px-4 md:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 
            ref={headingRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white max-w-4xl tracking-tight leading-tight"
          >
            What Our AI Lead Generation does for you
          </h2>
          
          <div className="flex flex-col md:flex-row items-start gap-8 mt-8">
            <p 
              ref={paragraphRef}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl"
            >
              Our cutting-edge AI technology transforms your lead generation process, delivering consistent results without human intervention.
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100%" }}
            transition={{ duration: 1.2, delay: 0.8 }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mt-12"
          />
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex justify-start ${index === 0 ? 'pt-2 md:pt-12' : 'pt-10 md:pt-40'} md:gap-10`}
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-3xl font-bold text-neutral-500 dark:text-neutral-500 ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
}; 