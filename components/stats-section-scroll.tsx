"use client"

import { useRef, useEffect } from "react";

export function StatsSection() {
  // Refs for elements we'll animate
  const sectionRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  
  // Refs for counter elements
  const counter1Ref = useRef<HTMLSpanElement>(null);
  const counter2Ref = useRef<HTMLSpanElement>(null);
  const counter3Ref = useRef<HTMLSpanElement>(null);
  const counter4Ref = useRef<HTMLSpanElement>(null);
  
  // Function to animate counting
  const animateCounter = (
    element: HTMLSpanElement, 
    targetValue: number,
    isDecimal: boolean = false
  ) => {
    let startValue = 0;
    const duration = 1500;
    const startTime = performance.now();
    
    const updateCounter = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      let currentValue;
      if (isDecimal) {
        currentValue = progress >= 0.9 ? 0.1 : 0;
      } else {
        currentValue = Math.floor(progress * targetValue);
      }
      
      element.textContent = isDecimal ? currentValue.toString() : currentValue.toString();
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
  };
  
  useEffect(() => {
    // Create Intersection Observer to detect when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // When section is in view, animate the cards
            const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current];
            cards.forEach((card, index) => {
              if (card) {
                card.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
                card.style.transitionDelay = `${index * 150}ms`;
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }
            });
            
            // Animate the counters
            if (counter1Ref.current) animateCounter(counter1Ref.current, 92);
            if (counter2Ref.current) animateCounter(counter2Ref.current, 55);
            if (counter3Ref.current) animateCounter(counter3Ref.current, 0.1, true);
            if (counter4Ref.current) animateCounter(counter4Ref.current, 24);
          } else {
            // When section leaves view, reset the cards and counters
            const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current];
            cards.forEach(card => {
              if (card) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
              }
            });
            
            // Reset counters
            if (counter1Ref.current) counter1Ref.current.textContent = '0';
            if (counter2Ref.current) counter2Ref.current.textContent = '0';
            if (counter3Ref.current) counter3Ref.current.textContent = '0';
            if (counter4Ref.current) counter4Ref.current.textContent = '0';
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of section is visible
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <div ref={sectionRef} className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black mb-4">AI-Powered Results</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our system consistently outperforms industry standards,
            delivering exceptional results through automated intelligence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div 
            ref={card1Ref} 
            className="p-8 rounded-xl shadow-lg border border-gray-100 bg-white" 
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            <div className="bg-gray-100 p-4 rounded-lg mb-4 inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </div>
            <div className="flex items-end mb-2">
              <span ref={counter1Ref} className="text-5xl font-bold">0</span>
              <span className="text-3xl font-bold ml-1">%+</span>
            </div>
            <div className="text-xl font-semibold text-gray-800">Deliverability Rate</div>
            <div className="text-gray-500 mt-1">Messages that reach their target</div>
          </div>
          
          {/* Card 2 */}
          <div 
            ref={card2Ref} 
            className="p-8 rounded-xl shadow-lg border border-gray-100 bg-white" 
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            <div className="bg-gray-100 p-4 rounded-lg mb-4 inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex items-end mb-2">
              <span ref={counter2Ref} className="text-5xl font-bold">0</span>
              <span className="text-3xl font-bold ml-1">%</span>
            </div>
            <div className="text-xl font-semibold text-gray-800">Open Rate</div>
            <div className="text-gray-500 mt-1">Industry avg: 20% for cold emails</div>
          </div>
          
          {/* Card 3 */}
          <div 
            ref={card3Ref} 
            className="p-8 rounded-xl shadow-lg border border-gray-100 bg-white" 
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            <div className="bg-gray-100 p-4 rounded-lg mb-4 inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex items-end mb-2">
              <span ref={counter3Ref} className="text-5xl font-bold">0</span>
              <span className="text-3xl font-bold ml-1">%</span>
            </div>
            <div className="text-xl font-semibold text-gray-800">Spam Complaint Rate</div>
            <div className="text-gray-500 mt-1">Well below industry average</div>
          </div>
          
          {/* Card 4 */}
          <div 
            ref={card4Ref} 
            className="p-8 rounded-xl shadow-lg border border-gray-100 bg-white" 
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            <div className="bg-gray-100 p-4 rounded-lg mb-4 inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex items-end mb-2">
              <span ref={counter4Ref} className="text-5xl font-bold">0</span>
              <span className="text-3xl font-bold ml-1">/7</span>
            </div>
            <div className="text-xl font-semibold text-gray-800">Automation</div>
            <div className="text-gray-500 mt-1">Always-on lead generation</div>
          </div>
        </div>
      </div>
    </div>
  );
} 