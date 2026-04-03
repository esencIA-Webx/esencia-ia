import { HeroTransition } from "@/components/landing/HeroTransition"
import Services from "@/components/landing/Services"
import VisualContent from "@/components/landing/VisualContent"
import MarqueeSection from "@/components/landing/MarqueeSection"
import { AboutAwwwards } from "@/components/landing/AboutAwwwards"
import Contact from "@/components/landing/Contact"
import FixedContactButton from "@/components/ui/FixedContactButton"

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col">
        <HeroTransition />
        <AboutAwwwards />
        <Services />
        <MarqueeSection />
        <VisualContent />
        <Contact />
      </main>
      <FixedContactButton />
    </>
  )
}
