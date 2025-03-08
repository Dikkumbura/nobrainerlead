import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { StatsSection } from "@/components/stats-section-script"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <header className="container mx-auto py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-black text-2xl font-bold tracking-wider">nobrainerlead.com</span>
        </div>
        <a href="#book-appointment">
          <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md transition-colors">
            Book Appointment
          </button>
        </a>
      </header>

      <section className="container mx-auto py-12">
        <HeroSection />
      </section>

      <StatsSection />
      
      <section className="py-4">
        <ServicesSection />
      </section>
    </main>
  )
}

