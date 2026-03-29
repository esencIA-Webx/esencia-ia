"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ArrowRight, X } from "lucide-react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const servicesData = [
    {
        id: "landing",
        title: "LANDING",
        subtitle: "Tu presencia online, rápida y efectiva",
        contentTitleHighlight: "Landing Page Simple",
        content: "Diseñamos landing pages enfocadas en un solo objetivo: convertir. Cada sección, cada animación y cada palabra está pensada para guiar al usuario hacia la acción, sin distracciones ni elementos innecesarios. Ideales para campañas, lanzamientos y validación de productos o servicios.",
        includes: [
            "Diseño 100% responsive",
            "Estructura enfocada en conversión",
            "Formulario de contacto o botón de WhatsApp",
            "Integración con redes sociales y Google Maps",
            "SEO básico",
            "Dominio y hosting incluidos (primer año)",
            "Hasta 4 secciones de contenido"
        ],
        extras: "Tracking, integraciones con Mailchimp o CRM, secciones adicionales.",
        price: "$180.000",
        cta: "Quiero mi landing",
        image: "/images/about-mockup.png",
        video: "/videos/Arte1.mp4"
    },
    {
        id: "institucional",
        title: "INSTITUCIONAL",
        subtitle: "Tu marca con presencia profesional y escalable",
        contentTitleHighlight: "Página Institucional",
        content: "Creamos sitios institucionales que comunican quién sos, qué hacés y por qué tu marca es distinta. Diseño sobrio, estructura clara y una narrativa visual alineada con tus valores, pensada para generar confianza y presencia digital sólida.",
        includes: [
            "Diseño profesional y responsive",
            "Navegación completa (Inicio, Servicios, Nosotros, Portafolio, Blog, Contacto)",
            "Panel administrador (CMS) para editar contenido",
            "Formulario de contacto, WhatsApp, correo y Google Maps",
            "SEO inicial",
            "Dominio y hosting incluidos (primer año)",
            "Hasta 10 páginas o secciones internas",
            "Prueba social (clientes, testimonios o proyectos)",
            "Blog activo",
            "Newsletter"
        ],
        extras: "Chat en vivo, chatbot, sitio multi-idioma.",
        price: "$500.000",
        cta: "Quiero una web profesional",
        image: "/images/maria-reina.png",
        video: "/videos/Institucion1.mp4"
    },
    {
        id: "ecommerce",
        title: "E-COMMERCE",
        subtitle: "Vendé online las 24 horas, de forma segura y escalable",
        contentTitleHighlight: "E-commerce",
        content: "Desarrollamos tiendas online funcionales, claras y optimizadas para vender. Desde la arquitectura de productos hasta la experiencia de compra, todo está diseñado para crecer, escalar y adaptarse a tu negocio.",
        includes: [
            "Todo lo incluido en la Página Institucional",
            "Plataforma e-commerce completa (Shopify o WooCommerce)",
            "Catálogo de productos ilimitado",
            "Carrito de compras y checkout seguro",
            "Métodos de pago locales (Mercado Pago, tarjetas y transferencias)",
            "Gestión de envíos y stock",
            "Integración con CRM, newsletter y Analytics",
            "SEO básico para productos",
            "Carga inicial de hasta 20 productos",
            "Optimización de velocidad y performance"
        ],
        extras: "Suscripciones, cupones, promociones, marketplace.",
        price: "$1.000.000",
        cta: "Quiero vender online",
        image: "/images/sneaker-ad.png",
        video: "/videos/Tienda1.mp4"
    },
]

export default function Services() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [activeServiceId, setActiveServiceId] = useState<string | null>(null)

    // GSAP Scroll Animation for the Titles
    useGSAP(() => {
        const titles = gsap.utils.toArray<HTMLElement>(".service-btn")
        if (titles.length === 0 || !sectionRef.current) return

        // Create a Timeline tied to the scroll of this section natively
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom bottom", // Anima durante todo el trayecto de los 300vh
                scrub: 1, // Smooth scrub
            }
        })

        // Initial invisible pushed-down state
        gsap.set(titles, { y: 150, opacity: 0, scale: 0.9 })

        // Sequentially rise the titles as we scroll
        titles.forEach((title, i) => {
            tl.to(title, {
                y: 0,
                opacity: 1,
                scale: 1,
                ease: "power2.out",
                duration: 1
            }, i * 0.8) // Stagger start time slightly wider
        })

        // Añadimos un espacio de tiempo inactivo al final de la línea de tiempo.
        // Esto crea un "buffer" donde el usuario sigue haciendo scroll pero no pasa nada,
        // dándole tiempo para apreciar el menú terminado antes de que se despegue.
        tl.to({}, { duration: 1 })

    }, { scope: sectionRef })

    // Body lock when curtain is open
    useEffect(() => {
        if (activeServiceId) {
            document.body.style.overflow = "hidden"
            if (typeof window !== "undefined" && (window as any).lenis) {
                (window as any).lenis.stop()
            }
        } else {
            document.body.style.overflow = ""
            if (typeof window !== "undefined" && (window as any).lenis) {
                (window as any).lenis.start()
            }
        }
        return () => {
            document.body.style.overflow = ""
            if (typeof window !== "undefined" && (window as any).lenis) {
                (window as any).lenis.start()
            }
        }
    }, [activeServiceId])

    const activeData = servicesData.find(s => s.id === activeServiceId)

    return (
        <>
        <section ref={sectionRef} id="services" className="relative w-full h-[400vh] bg-[#0A0A0A]">
            
            {/* Visual Viewport locked natively */}
            <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]">
                
                {/* Awwwards Abstract Dark Grey Architectural Background */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    {/* Subtle Crosshair Grid */}
                    <div className="absolute inset-0 opacity-[0.15]" 
                         style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23666666' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
                    />
                    
                    {/* Volumetric Fog / Shifting Spotlights */}
                    <motion.div
                        animate={{ x: ["-5%", "5%", "-5%"], y: ["0%", "10%", "0%"] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-1/4 -left-1/4 w-[75vw] h-[75vw] rounded-full mix-blend-screen blur-[100px] md:blur-[150px] opacity-[0.25]"
                        style={{ background: "radial-gradient(circle, #595959 0%, transparent 70%)" }}
                    />
                    <motion.div
                        animate={{ x: ["5%", "-5%", "5%"], y: ["10%", "0%", "10%"] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-1/4 -right-1/4 w-[80vw] h-[80vw] rounded-full mix-blend-screen blur-[100px] md:blur-[150px] opacity-[0.20]"
                        style={{ background: "radial-gradient(circle, #404040 0%, transparent 70%)" }}
                    />
                    
                    {/* Global Dark Vignette Overlay for Center Focus */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_85%)] z-10" />
                </div>

                <div className="flex flex-col items-center justify-center gap-6 sm:gap-10 perspective-1000 z-20 w-full px-4 relative">
                    {servicesData.map((svc) => (
                        <button
                            key={svc.id}
                            onClick={() => setActiveServiceId(svc.id)}
                            className="service-btn group relative flex items-center justify-center w-full max-w-5xl transition-transform duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer origin-center will-change-transform"
                        >
                            <h2 className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-[rgba(255,255,255,0.9)] via-[rgba(200,200,200,0.8)] to-[rgba(150,150,150,0.6)] group-hover:from-primary group-hover:via-accent group-hover:to-secondary transition-all duration-500 leading-none select-none text-center drop-shadow-2xl">
                                {svc.title}
                            </h2>
                            {/* Glow accent */}
                            <div className="absolute inset-0 bg-accent/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full pointer-events-none z-[-1]" />
                        </button>
                    ))}
                </div>
            </div>
        </section>

            {/* The Fullscreen Curtain Reveal Overlay */}
            <AnimatePresence>
                {activeData && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[100] bg-[#FFFFF0] text-black overflow-y-auto overflow-x-hidden flex flex-col"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setActiveServiceId(null)}
                            className="fixed top-6 right-6 md:top-10 md:right-10 z-[110] p-3 md:p-4 bg-black/5 hover:bg-black/10 rounded-full transition-transform duration-300 hover:rotate-90 cursor-pointer flex items-center justify-center backdrop-blur-md"
                        >
                            <X className="w-6 h-6 md:w-8 md:h-8 text-black" />
                            <span className="sr-only">Cerrar</span>
                        </button>

                        {/* Content Area (Reusing the robust details layout) */}
                        <div className="container mx-auto px-4 md:px-8 pt-24 pb-12 max-w-[85rem] min-h-full flex flex-col justify-start relative">
                            {/* Header inside curtain */}
                            <div className="text-center md:text-left mb-8 md:mb-12">
                                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                                    {activeData.title}
                                </h1>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-16 items-start flex-1">
                                {/* Text Column */}
                                <div className="flex flex-col justify-center w-full max-w-xl mx-auto lg:max-w-none">
                                    <div className="flex items-center gap-2 mb-3">
                                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-black font-sans tracking-tight text-black leading-[1.1]">
                                            {activeData.contentTitleHighlight}
                                        </h3>
                                    </div>
                                    <p className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary mb-4">
                                        {activeData.subtitle}
                                    </p>
                                    <p className="text-sm md:text-base text-neutral-600 leading-relaxed lg:leading-loose mb-8 font-light italic">
                                        {activeData.content}
                                    </p>

                                    {/* Benefits List */}
                                    <div className="mb-8">
                                        <h4 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-neutral-400 mb-4">Incluye</h4>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                                            {activeData.includes.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-neutral-600 text-[13px] md:text-sm">
                                                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                                    <span className="leading-snug">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Extras */}
                                    <div className="mb-8 p-4 bg-white/50 border border-neutral-200 rounded-lg hidden md:block w-full">
                                        <h4 className="text-xs font-bold uppercase text-neutral-400 mb-1.5">Extras opcionales</h4>
                                        <p className="text-sm text-neutral-500 italic leading-snug">{activeData.extras}</p>
                                    </div>

                                    {/* CTA Only - Centered or Left */}
                                    <div className="flex justify-center lg:justify-start pt-2">
                                        <a
                                            href="#contact"
                                            onClick={() => setActiveServiceId(null)} // Cerrar cortina si navega a contacto
                                            className="group relative px-8 lg:px-12 py-4 lg:py-5 bg-black text-white font-bold text-sm lg:text-base tracking-widest uppercase overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                                        >
                                            <span className="relative z-10 flex items-center gap-3">
                                                {activeData.cta}
                                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                                            </span>
                                        </a>
                                    </div>
                                </div>

                                {/* Media/Video/Image Column */}
                                <div className="relative items-center justify-center [perspective:1000px] h-full min-h-[400px] lg:min-h-[600px] flex">
                                    <div className="relative aspect-auto h-full w-full max-h-[700px] overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] bg-gray-100 border border-black/5 hover:shadow-[0_25px_60px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all duration-500">
                                        {activeData.video ? (
                                            <video
                                                src={activeData.video}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="h-full w-full object-cover opacity-90 hover:scale-105 transition-transform duration-1000"
                                            />
                                        ) : (
                                            <Image
                                                src={activeData.image}
                                                alt={activeData.title}
                                                fill
                                                sizes="(max-width: 1024px) 100vw, 50vw"
                                                className="object-cover hover:scale-105 transition-transform duration-1000"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
