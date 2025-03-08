"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendlyCTA } from "./calendly-cta";

// Register ScrollTrigger with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BenefitCardProps {
  title: string;
  description: string;
  index: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ title, description, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    gsap.set(element, {
      y: 100,
      opacity: 0,
      scale: 0.9,
      rotationX: 15,
    });

    ScrollTrigger.create({
      trigger: element,
      start: "top bottom-=10%",
      end: "bottom top+=30%",
      onEnter: () => {
        gsap.to(element, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.15,
        });
      },
      onLeave: () => {
        gsap.to(element, {
          y: -50,
          opacity: 0,
          scale: 0.95,
          rotationX: -5,
          duration: 0.6,
          ease: "power2.in",
        });
      },
      onEnterBack: () => {
        gsap.to(element, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(element, {
          y: 100,
          opacity: 0,
          scale: 0.9,
          rotationX: 15,
          duration: 0.6,
          ease: "power2.in",
        });
      },
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="bg-white/90 dark:bg-black/30 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-800 transform hover:scale-105 transition-all duration-300 ease-out hover:shadow-xl"
    >
      <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
        {title}
      </h3>
      <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const OrbitBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (!isClient || !canvasRef.current || !containerRef.current) return;
    
    // Use dynamic import for Three.js
    const initThreeJs = async () => {
      try {
        // Dynamically import Three.js
        const THREE = await import('three');
        
        // Get container dimensions
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!containerRect || !canvasRef.current) return;
        
        const width = containerRect.width;
        const height = containerRect.height;
        
        // Initialize Three.js
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          alpha: true,
          antialias: true,
        });
        
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for better performance
        
        // Create orbit of particles
        const particles: any[] = [];
        const particleCount = 150; // Increased particle count for better visual effect
        const orbitRadius = 5; // Increased orbit radius for better visibility
        const particleGeometry = new THREE.SphereGeometry(0.03, 16, 16);
        const particleMaterial = new THREE.MeshBasicMaterial({
          color: 0x6c8eff,
          transparent: true,
          opacity: 0.7,
        });
        
        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2;
          const particle = new THREE.Mesh(particleGeometry, particleMaterial);
          
          const x = Math.cos(angle) * orbitRadius;
          const z = Math.sin(angle) * orbitRadius;
          
          particle.position.set(x, 0, z);
          scene.add(particle);
          particles.push(particle);
        }
        
        // Add central larger particle
        const centerGeometry = new THREE.SphereGeometry(0.3, 32, 32); // Increased size
        const centerMaterial = new THREE.MeshBasicMaterial({
          color: 0x4763e4,
          transparent: true,
          opacity: 0.9,
        });
        const centerSphere = new THREE.Mesh(centerGeometry, centerMaterial);
        scene.add(centerSphere);
        
        // Position camera
        camera.position.z = 10; // Increased distance for better view
        
        // Create ScrollTrigger for rotation
        const scrollTrigger = ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const progress = self.progress;
            centerSphere.rotation.y = progress * Math.PI * 4;
          },
        });
        
        // Animation loop
        let animationFrameId: number;
        const animate = () => {
          animationFrameId = requestAnimationFrame(animate);
          
          particles.forEach((particle, i) => {
            const angle = (i / particleCount) * Math.PI * 2;
            const time = Date.now() * 0.0003; // Slowed down animation for smoother effect
            
            particle.position.x = Math.cos(angle + time) * orbitRadius;
            particle.position.z = Math.sin(angle + time) * orbitRadius;
            
            // Add vertical movement
            particle.position.y = Math.sin(angle * 3 + time * 2) * 0.3;
          });
          
          centerSphere.rotation.y += 0.002; // Constant rotation independent of scroll
          centerSphere.rotation.x += 0.001;
          
          renderer.render(scene, camera);
        };
        
        animate();
        
        // Handle resize
        const handleResize = () => {
          if (!containerRef.current || !canvasRef.current) return;
          
          const containerRect = containerRef.current.getBoundingClientRect();
          const width = containerRect.width;
          const height = containerRect.height;
          
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        };
        
        window.addEventListener("resize", handleResize);
        
        return () => {
          cancelAnimationFrame(animationFrameId);
          window.removeEventListener("resize", handleResize);
          if (scrollTrigger) scrollTrigger.kill();
          
          // Dispose resources
          particles.forEach(particle => {
            if (particle.geometry) particle.geometry.dispose();
            if (particle.material) particle.material.dispose();
          });
          
          if (centerGeometry) centerGeometry.dispose();
          if (centerMaterial) centerMaterial.dispose();
          if (renderer) renderer.dispose();
        };
      } catch (error) {
        console.error('Error initializing Three.js scene:', error);
      }
    };
    
    // Initialize Three.js
    const cleanupPromise = initThreeJs();
    
    // Return cleanup function
    return () => {
      cleanupPromise.then(cleanup => {
        if (cleanup) cleanup();
      }).catch(error => {
        console.error("Error in cleanup:", error);
      });
    };
  }, [isClient]);
  
  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export const WhyChooseAI: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    // Setup the title text animation
    if (titleRef.current) {
      const element = titleRef.current;
      
      // Split text into spans
      const text = element.textContent || "";
      element.innerHTML = "";
      
      text.split(" ").forEach(word => {
        const span = document.createElement("span");
        span.className = "inline-block";
        span.textContent = word + " ";
        element.appendChild(span);
      });
      
      const childSpans = Array.from(element.children) as HTMLElement[];
      
      gsap.set(childSpans, {
        y: 50,
        opacity: 0,
      });
      
      ScrollTrigger.create({
        trigger: element,
        start: "top bottom-=20%",
        end: "bottom top+=20%",
        onEnter: () => {
          gsap.to(childSpans, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.08,
            ease: "power2.out",
          });
        },
        onLeave: () => {
          gsap.to(childSpans, {
            y: -30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.in",
          });
        },
        onEnterBack: () => {
          gsap.to(childSpans, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.08,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(childSpans, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.in",
          });
        },
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const benefits = [
    {
      title: "Increased Conversion Rates",
      description: "Businesses using AI-based lead generation typically see conversion improvements by 20%-30% over traditional methods."
    },
    {
      title: "Cost-Efficient Growth",
      description: "Reduce your cost-per-lead and maximize your marketing ROI with targeted, AI-optimized campaigns."
    },
    {
      title: "Accelerate Your Sales Cycle",
      description: "AI-driven qualification dramatically shortens the time it takes leads to move from initial interest to closed sale."
    },
    {
      title: "Save Valuable Time",
      description: "Free up your team to focus on high-value activities while AI handles time-consuming prospecting and lead qualification tasks."
    }
  ];
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  
  return (
    <>
      <div 
        ref={sectionRef}
        className="relative w-full min-h-screen overflow-hidden py-32 mt-20"
      >
        {/* Fallback gradient background in case Three.js has issues */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 opacity-50 z-0"></div>
        
        {/* 3D Orbit Background */}
        <OrbitBackground />
        
        <motion.div 
          style={{ scale, opacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-10"
        >
          <h2 
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white max-w-4xl tracking-tight leading-tight text-center mx-auto mb-24"
          >
            Why Choose AI for Your Lead Generation?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mt-16">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                title={benefit.title}
                description={benefit.description}
                index={index}
              />
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100%" }}
            transition={{ duration: 1.2, delay: 0.8 }}
            viewport={{ once: true }}
            className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent mt-32"
          />
        </motion.div>
      </div>
      
      {/* Call to Action Section with Calendly */}
      <CalendlyCTA />
    </>
  );
}; 