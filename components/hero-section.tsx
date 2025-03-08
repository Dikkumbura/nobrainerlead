"use client"

import { SplineScene } from "@/components/ui/splite"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  return (
    <Card className="w-full h-[600px] bg-black/[0.96] relative overflow-hidden border-none">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" size={300} />

      <div className="flex flex-col md:flex-row h-full">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-4 tracking-wider">
          Unlock Your Growth with AI-Powered Lead Generation
          </h1>
          <p className="mt-4 text-gray-400 max-w-lg text-lg font-sen">
            Generate high-quality leads while you sleep. Our AI lead generation system identifies, qualifies, and nurtures
            prospects without human intervention.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#book-appointment">
              <Button className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-md text-lg font-sen">
                Get Started
              </Button>
            </a>
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 relative">
          <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <a href="#book-appointment">
          <Button variant="ghost" className="text-white hover:text-gray-300 hover:bg-transparent">
            <ArrowDown className="h-6 w-6" />
            <span className="sr-only">Scroll down</span>
          </Button>
        </a>
      </div>
    </Card>
  )
}

