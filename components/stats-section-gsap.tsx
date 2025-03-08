"use client"

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin (client-side only)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  
  // Values for the counters
  const deliverabilityRate = 92;
  const openRate = 55;
  const spamComplaintRate = 0.1;
  const automationHours = 24;
  
  useEffect(() => {
    // Initialize empty arrays for cleanup
    const timelines: gsap.core.Timeline[] = [];
    const triggers: ScrollTrigger[] = [];
    
    // Main timeline for header animations
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none none"
      }
    });
    
    timelines.push(headerTl);
    
    // Animate the heading and description
    if (headingRef.current && descriptionRef.current) {
      headerTl
        .from(headingRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        })
        .from(descriptionRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.6");
    }
    
    // Create animations for each card
    const cardRefs = [card1Ref, card2Ref, card3Ref, card4Ref];
    
    cardRefs.forEach((cardRef, index) => {
      if (!cardRef.current) return;
      
      // Card entrance animation
      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
      
      timelines.push(cardTl);
      
      cardTl.from(cardRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out"
      });
      
      // Animate the icons
      const icon = cardRef.current.querySelector(".stat-icon");
      if (icon) {
        cardTl.from(icon, {
          scale: 0.5,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)"
        }, "-=0.6");
      }
      
      // Counter animations
      const counterEl = cardRef.current.querySelector(".counter");
      const suffixEl = cardRef.current.querySelector(".counter-suffix");
      
      if (!counterEl) return;
      
      let targetValue: number;
      switch (index) {
        case 0: targetValue = deliverabilityRate; break;
        case 1: targetValue = openRate; break;
        case 2: targetValue = spamComplaintRate; break;
        case 3: targetValue = automationHours; break;
        default: targetValue = 0;
      }
      
      // Special case for decimal value
      if (index === 2) { // Spam complaint rate
        gsap.to(counterEl, {
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
          duration: 2,
          innerText: "0.1",
          snap: "innerText",
          ease: "power2.out"
        });
      } else {
        gsap.to(counterEl, {
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
          innerText: targetValue,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power2.out"
        });
      }
      
      // Add subtle animation to the suffix
      if (suffixEl) {
        gsap.from(suffixEl, {
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
          opacity: 0,
          x: -10,
          duration: 1,
          delay: 0.5,
          ease: "power3.out"
        });
      }
    });
    
    // Create a subtle parallax effect on the entire section
    if (cardsRef.current) {
      const parallaxTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(cardsRef.current, {
            y: progress * 30,
            duration: 0.1,
            ease: "none"
          });
        }
      });
      
      triggers.push(parallaxTrigger);
    }
    
    // Cleanup function
    return () => {
      timelines.forEach(timeline => timeline.kill());
      triggers.forEach(trigger => trigger.kill());
      
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);
  
  return (
    <div ref={sectionRef} className="bg-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="text-3xl font-bold text-black mb-4">AI-Powered Results</h2>
          <p ref={descriptionRef} className="text-gray-600 max-w-2xl mx-auto">
            Our system consistently outperforms industry standards,
            delivering exceptional results through automated intelligence.
          </p>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Deliverability Rate Card */}
          <div ref={card1Ref} className="p-8 rounded-xl shadow-lg border border-gray-100 bg-white hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gray-100 p-4 rounded-lg mb-4 inline-block stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </div>
            <div className="flex items-end mb-2">
              <span className="counter text-5xl font-bold">0</span>
              <span className="counter-suffix text-3xl font-bold ml-1">%+</span>
            </div>
            <div className="text-xl font-semibold text-gray-800">Deliverability Rate</div>
            <div className="text-gray-500 mt-1">Messages that reach their target</div>
          </div>
          
          {/* Open Rate Card */}
          <div ref={card2Ref} className="p-8 rounded-xl shadow-lg border border-gray-100 bg-white hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gray-100 p-4 rounded-lg mb-4 inline-block stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex items-end mb-2">
              <span className="counter text-5xl font-bold">0</span>
              <span className="counter-suffix text-3xl font-bold ml-1">%</span>
            </div>
            <div className="text-xl font-semibold text-gray-800">Open Rate</div>
            <div className="text-gray-500 mt-1">Industry avg: 20% for cold emails</div>
          </div>
          
          {/* Spam Complaint Rate Card */}
          <div ref={card3Ref} className="p-8 rounded-xl shadow-lg border border-gray-100 bg-white hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gray-100 p-4 rounded-lg mb-4 inline-block stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex items-end mb-2">
              <span className="counter text-5xl font-bold">0</span>
              <span className="counter-suffix text-3xl font-bold ml-1">%</span>
            </div>
            <div className="text-xl font-semibold text-gray-800">Spam Complaint Rate</div>
            <div className="text-gray-500 mt-1">Well below industry average</div>
          </div>
          
          {/* Automation Card */}
          <div ref={card4Ref} className="p-8 rounded-xl shadow-lg border border-gray-100 bg-white hover:shadow-xl transition-shadow duration-300">
            <div className="bg-gray-100 p-4 rounded-lg mb-4 inline-block stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex items-end mb-2">
              <span className="counter text-5xl font-bold">0</span>
              <span className="counter-suffix text-3xl font-bold ml-1">/7</span>
            </div>
            <div className="text-xl font-semibold text-gray-800">Automation</div>
            <div className="text-gray-500 mt-1">Always-on lead generation</div>
          </div>
        </div>
      </div>
    </div>
  );
} 