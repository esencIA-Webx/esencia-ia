import { HeroTransition } from "@/components/landing/HeroTransition"
import { About } from "@/components/landing/About"
import { Services } from "@/components/landing/Services"
import { VisualContent } from "@/components/landing/VisualContent"
import { MarqueeSection } from "@/components/landing/MarqueeSection"
import { CustomDev } from "@/components/landing/CustomDev"
import { Contact } from "@/components/landing/Contact"
import { FixedContactButton } from "@/components/ui/FixedContactButton"

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col">
        <HeroTransition />
        <Services />
        <MarqueeSection />
        <VisualContent />
        <CustomDev />
        <Contact />
      </main>
      <FixedContactButton />
    </>
  )
}
