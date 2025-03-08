"use client"

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function StatsSection() {
  // Refs for particles
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  // Refs for section and cards
  const sectionRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);
  
  // Refs for counters
  const counter1Ref = useRef<HTMLSpanElement>(null);
  const counter2Ref = useRef<HTMLSpanElement>(null);
  const counter3Ref = useRef<HTMLSpanElement>(null);
  const counter4Ref = useRef<HTMLSpanElement>(null);
  const counter5Ref = useRef<HTMLSpanElement>(null);
  
  // Ref to track animation state
  const hasAnimatedRef = useRef(false);

  // Particles animation
  useEffect(() => {
    // Initialize particle animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles with black color
    const particleColor = theme === 'dark' ? 'rgba(100, 100, 100, 0.3)' : 'rgba(0, 0, 0, 0.2)';
    
    const particles = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1,
      vx: (Math.random() - 0.5) * 0.3
    }));
    
    // Animation loop
    function animateParticles() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
        
        // Move particles
        particle.y += particle.speed;
        particle.x += particle.vx;
        
        // Reset particles when they go off screen
        if (
          particle.y > canvas.height || 
          particle.y < 0 ||
          particle.x > canvas.width ||
          particle.x < 0
        ) {
          particle.y = Math.random() * canvas.height;
          particle.x = Math.random() * canvas.width;
        }
      });
      
      requestAnimationFrame(animateParticles);
    }
    
    animateParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  // Function to check if element is in viewport
  const isElementInViewport = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) * 0.2
    );
  };

  // Function to animate cards with counter
  const animateContent = () => {
    if (!sectionRef.current) return;
    
    // Check if the section is in the viewport
    if (isElementInViewport(sectionRef.current)) {
      if (hasAnimatedRef.current) return; // Only animate once while in viewport
      
      // Animate cards
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current, card5Ref.current];
      cards.forEach((card, index) => {
        if (card) {
          card.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
          card.style.transitionDelay = `${index * 150}ms`;
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }
      });
      
      // Animate counters
      animateCounter(counter1Ref.current, 92);
      animateCounter(counter2Ref.current, 55);
      animateCounter(counter3Ref.current, 0.1, true);
      animateCounter(counter4Ref.current, 2000);
      animateCounter(counter5Ref.current, 3.5, true);
      
      hasAnimatedRef.current = true;
    } else {
      // Reset when out of viewport
      hasAnimatedRef.current = false;
      
      // Reset cards
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current, card5Ref.current];
      cards.forEach((card) => {
        if (card) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          card.style.transition = 'none'; // Remove transition to instantly reset
        }
      });
      
      // Reset counters
      if (counter1Ref.current) counter1Ref.current.textContent = '0';
      if (counter2Ref.current) counter2Ref.current.textContent = '0';
      if (counter3Ref.current) counter3Ref.current.textContent = '0';
      if (counter4Ref.current) counter4Ref.current.textContent = '0';
      if (counter5Ref.current) counter5Ref.current.textContent = '0';
    }
  };

  // Function to animate counting
  const animateCounter = (
    element: HTMLSpanElement | null, 
    targetValue: number,
    isDecimal: boolean = false
  ) => {
    if (!element) return;
    
    let startValue = 0;
    const duration = 1500;
    const startTime = performance.now();
    
    const updateCounter = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      let currentValue;
      if (isDecimal) {
        if (targetValue === 0.1) {
          currentValue = progress >= 0.9 ? 0.1 : 0;
        } else {
          currentValue = progress >= 0.9 ? 3.5 : (progress >= 0.6 ? 3.0 : 0);
        }
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
  
  // Set up scroll event and initial load animation
  useEffect(() => {
    // Check on initial load
    setTimeout(animateContent, 300);
    
    // Check on scroll
    const handleScroll = () => {
      requestAnimationFrame(animateContent);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div ref={sectionRef} className="bg-white py-20 relative overflow-hidden min-h-[400px]">
      {/* Particles background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full" 
        style={{ pointerEvents: 'none' }}
      />
      
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black mb-4">Proven Performance Metrics</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These numbers don't lie. Our lead generation system delivers industry-leading results 
            that directly impact your bottom line.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {/* Card 1 - Personalized Emails (2000+) */}
          <div 
            ref={card4Ref}
            className="p-8 rounded-xl shadow-lg border border-gray-100 bg-white" 
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            <div className="bg-gray-100 p-4 rounded-lg mb-4 inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div className="flex items-end mb-2">
              <span ref={counter4Ref} className="text-5xl font-bold">0</span>
              <span className="text-3xl font-bold ml-1">+</span>
            </div>
            <div className="text-xl font-semibold text-gray-800">Personalized Emails</div>
            <div className="text-gray-500 mt-1">Sent daily to quality prospects</div>
          </div>
          
          {/* Card 2 - Deliverability Rate (92%+) */}
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
          
          {/* Card 3 - Open Rate (55%) */}
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
          
          {/* Card 4 - Click Through Rate (3.5%) */}
          <div 
            ref={card5Ref}
            className="p-8 rounded-xl shadow-lg border border-gray-100 bg-white" 
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            <div className="bg-gray-100 p-4 rounded-lg mb-4 inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
              </svg>
            </div>
            <div className="flex items-end mb-2">
              <span ref={counter5Ref} className="text-5xl font-bold">0</span>
              <span className="text-3xl font-bold ml-1">%</span>
            </div>
            <div className="text-xl font-semibold text-gray-800">Click Through Rate</div>
            <div className="text-gray-500 mt-1">2x higher than industry average</div>
          </div>
          
          {/* Card 5 - Spam Complaint Rate (0.1%) */}
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
        </div>
      </div>
    </div>
  );
} 