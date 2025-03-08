"use client"

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { CheckCircle } from "lucide-react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { WhyChooseAI } from "@/components/why-choose-ai";

export function ServicesSection() {
  const servicesData = [
    {
      title: "Consistent Flow of Qualified Leads",
      content: (
        <div className="bg-white dark:bg-black/20 rounded-xl p-6 shadow-lg">
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-4">
            Our AI proactively identifies, captures, and nurtures high-quality leads around the clock, ensuring your pipeline stays full.
          </p>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
            <CheckCircle className="h-5 w-5" />
            <span>24/7 lead sourcing</span>
          </div>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium mt-2">
            <CheckCircle className="h-5 w-5" />
            <span>Always-on prospecting</span>
          </div>
        </div>
      ),
    },
    {
      title: "Real-Time Lead Qualification",
      content: (
        <div className="bg-white dark:bg-black/20 rounded-xl p-6 shadow-lg">
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-4">
            Instantly segment and qualify leads using intelligent criteria tailored specifically to your business needs, eliminating wasted effort on unqualified prospects.
          </p>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
            <CheckCircle className="h-5 w-5" />
            <span>Custom qualification criteria</span>
          </div>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium mt-2">
            <CheckCircle className="h-5 w-5" />
            <span>Smart prospect filtering</span>
          </div>
        </div>
      ),
    },
    {
      title: "Hyper-Personalized Engagement",
      content: (
        <div className="bg-white dark:bg-black/20 rounded-xl p-6 shadow-lg">
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-4">
            Leverage AI-driven personalization to automatically engage prospects at scale with messages that resonate deeply, increasing response rates significantly.
          </p>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
            <CheckCircle className="h-5 w-5" />
            <span>Dynamic content personalization</span>
          </div>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium mt-2">
            <CheckCircle className="h-5 w-5" />
            <span>Contextual outreach</span>
          </div>
        </div>
      ),
    },
    {
      title: "Automated Follow-Up & Nurturing",
      content: (
        <div className="bg-white dark:bg-black/20 rounded-xl p-6 shadow-lg">
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-4">
            No lead falls through the cracks. Our AI systematically follows up, nurtures prospects, and sets appointments, allowing your sales team to focus exclusively on closing.
          </p>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
            <CheckCircle className="h-5 w-5" />
            <span>Intelligent follow-up sequences</span>
          </div>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium mt-2">
            <CheckCircle className="h-5 w-5" />
            <span>Automated appointment setting</span>
          </div>
        </div>
      ),
    },
    {
      title: "Seamless Integration with Your Existing Systems",
      content: (
        <div className="bg-white dark:bg-black/20 rounded-xl p-6 shadow-lg">
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-4">
            Our solutions effortlessly integrate into your current CRM and sales workflows, ensuring zero disruption and maximum productivity.
          </p>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
            <CheckCircle className="h-5 w-5" />
            <span>Native CRM integrations</span>
          </div>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium mt-2">
            <CheckCircle className="h-5 w-5" />
            <span>API connectivity</span>
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: '200vh' }}>
      {/* Absolute position with extreme height */}
      <div className="absolute inset-0" style={{ height: '300vh' }}>
        <AnimatedGridPattern 
          numSquares={35}
          maxOpacity={0.1}
          duration={4}
          width={50}
          height={50}
          repeatDelay={0.5}
          className="w-full h-full"
        />
      </div>
      
      {/* Content with the Timeline */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
          <Timeline data={servicesData} />
        </div>
      </div>
      
      {/* New WhyChooseAI Section */}
      <WhyChooseAI />
    </div>
  );
} 