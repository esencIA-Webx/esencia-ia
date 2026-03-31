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

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            }
        })

        gsap.set(titles, { y: 150, opacity: 0, scale: 0.9 })

        titles.forEach((title, i) => {
            tl.to(title, {
                y: 0,
                opacity: 1,
                scale: 1,
                ease: "power2.out",
                duration: 1
            }, i * 0.8)
        })

        tl.to({}, { duration: 1 })

    }, { scope: sectionRef })

    // Lock scroll when curtain is open — compatible with Lenis
    useEffect(() => {
        const htmlEl = document.documentElement
        if (activeServiceId) {
            htmlEl.style.overflow = "hidden"
            if (typeof window !== "undefined" && (window as any).lenis) {
                (window as any).lenis.stop()
            }
        } else {
            htmlEl.style.overflow = ""
            if (typeof window !== "undefined" && (window as any).lenis) {
                (window as any).lenis.start()
            }
        }
        return () => {
            htmlEl.style.overflow = ""
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

                    {/* Background */}
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.15]"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23666666' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
                        />
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
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_85%)] z-10" />
                    </div>

                    <div className="flex flex-col items-center justify-center gap-6 sm:gap-10 z-20 w-full px-4 relative">
                        {servicesData.map((svc) => (
                            <button
                                key={svc.id}
                                onClick={() => setActiveServiceId(svc.id)}
                                className="service-btn group relative flex items-center justify-center w-full max-w-5xl transition-transform duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer origin-center will-change-transform"
                            >
                                <h2 className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-[rgba(255,255,255,0.9)] via-[rgba(200,200,200,0.8)] to-[rgba(150,150,150,0.6)] group-hover:from-primary group-hover:via-accent group-hover:to-secondary bg-[length:200%_auto] group-hover:bg-right transition-all duration-500 leading-none select-none text-center drop-shadow-2xl">
                                    {svc.title}
                                </h2>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Fullscreen Curtain Modal ── */}
            <AnimatePresence>
                {activeData && (
                    <motion.div
                        key={activeData.id}
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 9999,
                            backgroundColor: "#FFFFF0",
                            color: "#000",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {/* Inner scrollable area — owns its own scroll, independent of Lenis */}
                        <div style={{ width: "100%", height: "100%", overflowY: "scroll", overflowX: "hidden" }}>

                            {/* Sticky close button at top-right of the scroll container */}
                            <div style={{ position: "sticky", top: 0, zIndex: 10, display: "flex", justifyContent: "flex-end", padding: "1.5rem 1.5rem 0" }}>
                                <button
                                    onClick={() => setActiveServiceId(null)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 48,
                                        height: 48,
                                        borderRadius: "50%",
                                        background: "rgba(0,0,0,0.08)",
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "background 0.2s",
                                        backdropFilter: "blur(8px)",
                                        boxShadow: "0 2px 12px rgba(0,0,0,0.1)"
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.16)")}
                                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.08)")}
                                    aria-label="Cerrar"
                                >
                                    <X size={22} color="#000" />
                                </button>
                            </div>

                            {/* Page content */}
                            <div className="container mx-auto px-6 md:px-12 pb-24 max-w-[85rem]" style={{ marginTop: "-0.5rem" }}>

                                {/* Title */}
                                <div className="mb-10">
                                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500 cursor-default leading-none">
                                        {activeData.title}
                                    </h1>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 items-start">

                                    {/* ── Left: Text ── */}
                                    <div className="flex flex-col">
                                        <h3 className="text-2xl md:text-4xl font-black tracking-tight text-black leading-snug mb-3">
                                            {activeData.contentTitleHighlight}
                                        </h3>
                                        <p className="text-base md:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500 cursor-default mb-5">
                                            {activeData.subtitle}
                                        </p>
                                        <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-8 font-light italic">
                                            {activeData.content}
                                        </p>

                                        {/* Includes */}
                                        <div className="mb-8">
                                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-400 mb-4">Incluye</h4>
                                            <ul className="flex flex-col gap-3">
                                                {activeData.includes.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-neutral-700 text-sm md:text-base">
                                                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                                        <span className="leading-snug">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Extras */}
                                        <div className="mb-8 p-4 rounded-xl border border-black/10 bg-black/5">
                                            <h4 className="text-xs font-bold uppercase text-neutral-400 mb-1.5">Extras opcionales</h4>
                                            <p className="text-sm text-neutral-500 italic leading-snug">{activeData.extras}</p>
                                        </div>

                                        {/* CTA */}
                                        <div>
                                            <a
                                                href="#contact"
                                                onClick={() => setActiveServiceId(null)}
                                                className="group inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 active:scale-95"
                                            >
                                                {activeData.cta}
                                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* ── Right: Media ── */}
                                    <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-neutral-200"
                                        style={{ minHeight: 320, aspectRatio: "16/10" }}>
                                        {activeData.video ? (
                                            <video
                                                src={activeData.video}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                                            />
                                        ) : (
                                            <Image
                                                src={activeData.image}
                                                alt={activeData.title}
                                                fill
                                                sizes="(max-width: 1024px) 100vw, 55vw"
                                                className="object-cover"
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
