import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter-tight",
  display: "swap",
});



export const metadata: Metadata = {
  title: "Esencia IA | Diseño Web Estratégico",
  description: "Transformamos ideas en experiencias digitales con IA y diseño de vanguardia. Sitios web rápidos, modernos y optimizados para resultados.",
  keywords: ["diseño web", "IA", "landing pages", "e-commerce", "institucional", "estrategia digital"],
  authors: [{ name: "Esencia IA" }],
  openGraph: {
    title: "Esencia IA | Diseño Web Estratégico",
    description: "Presencia digital profesional para marcas, instituciones y emprendedores.",
    url: "https://esencia-ia.com",
    siteName: "Esencia IA",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Esencia IA | Diseño Web Estratégico",
    description: "Diseño web moderno impulsado por inteligencia artificial.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${interTight.variable} antialiased bg-black text-white selection:bg-primary/30`}
      >
        <SmoothScroll>
          <CustomCursor />
          
          {/* Global Film Grain Overlay */}
          <div 
            className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.06] mix-blend-overlay" 
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilterGlobal'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilterGlobal)'/%3E%3C/svg%3E")` }} 
          />

          {/* Global Background Video */}
          <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-black/70 z-10" /> {/* Dark Overlay for readability */}
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/video-poster.png"
              className="w-full h-full object-cover opacity-60"
            >
              <source src="/background-video-v2.mp4" type="video/mp4" />
            </video>
          </div>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
