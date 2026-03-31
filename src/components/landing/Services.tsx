"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Plus, Minus } from "lucide-react"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

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
        cta: "Quiero una web",
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
            "Plataforma e-commerce (Shopify o WooCommerce)",
            "Catálogo de productos ilimitado",
            "Carrito de compras y checkout seguro",
            "Métodos de pago locales (Mercado Pago, medios offline)",
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
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const containerRef = useRef<HTMLElement>(null)

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    useGSAP(() => {
        // Animación de cascada para el contenedor general y listado (stagger)
        const rows = gsap.utils.toArray(".service-row")
        
        gsap.from(".services-header", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        })

        if (rows.length > 0) {
            gsap.from(rows, {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".services-list",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            })
        }

        // Parallax sutil en elementos dentro de la lista al scrollear (efecto Awwwards)
        rows.forEach((row: any, i) => {
            gsap.to(row, {
                y: -30, // Desplazamiento sutil hacia arriba mientras bajamos
                ease: "none",
                scrollTrigger: {
                    trigger: row,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            })
        })

    }, { scope: containerRef })

    return (
        <section ref={containerRef} id="services" className="relative w-full bg-[#0A0A0A] py-24 md:py-32 xl:py-40 text-white overflow-hidden">
            {/* Background elements minimal */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
            />
            
            <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 relative z-10 w-full max-w-[1600px]">
                {/* Section Header */}
                <div className="services-header flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
                    <div>
                        <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-4 block">
                            Nuestras Especialidades
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-light tracking-tighter">
                            Servicios Core
                        </h2>
                    </div>
                    <div className="max-w-md text-white/50 text-sm md:text-base font-light">
                        Diseñamos soluciones digitales enfocadas en la conversión, estructuradas con precisión y desarrolladas para comunicar el valor de tu marca con claridad.
                    </div>
                </div>

                {/* Accordion List */}
                <div className="services-list flex flex-col border-t border-white/10">
                    {servicesData.map((svc, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div 
                                key={svc.id} 
                                className="service-row group/item flex flex-col border-b border-white/10"
                            >
                                {/* Header / Trigger */}
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex items-center justify-between py-6 md:py-10 lg:py-12 text-left hover:bg-white/[0.015] transition-colors duration-500 cursor-pointer group"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12 lg:gap-20">
                                        {/* Number */}
                                        <span className="text-xs md:text-sm lg:text-base font-mono text-white/30 group-hover:text-white/60 transition-colors w-8 md:w-10">
                                            {(index + 1).toString().padStart(2, '0')}
                                        </span>
                                        {/* Main Title */}
                                        <h3 className="text-5xl sm:text-6xl md:text-7xl lg:text-[7vw] leading-[0.9] font-black tracking-tighter uppercase text-white/90 group-hover:text-white transition-colors">
                                            {svc.title}
                                        </h3>
                                    </div>
                                    {/* Icon */}
                                    <div className="relative w-8 h-8 md:w-12 md:h-12 flex items-center justify-center shrink-0 text-white/30 group-hover:text-white transition-colors">
                                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.5, ease: "easeInOut" }}>
                                            {isOpen ? <Minus className="w-5 h-5 md:w-8 md:h-8" /> : <Plus className="w-5 h-5 md:w-8 md:h-8" />}
                                        </motion.div>
                                    </div>
                                </button>

                                {/* Expanding Body */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-12 md:pb-24 pt-4 md:pt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 xl:gap-20 items-stretch border-t border-white/5 mt-2">
                                                
                                                {/* Left: Info Section */}
                                                <div className="lg:col-span-7 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                                                    
                                                    {/* Description Box */}
                                                    <div className="flex flex-col gap-6">
                                                        <h4 className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/30 border-b border-white/10 pb-4">
                                                            Approach // Enfoque
                                                        </h4>
                                                        <p className="text-base md:text-lg text-white/70 font-light leading-relaxed">
                                                            {svc.content}
                                                        </p>
                                                        <div className="mt-4 border-l-2 border-white/10 pl-4 py-1">
                                                            <p className="text-xs md:text-sm text-white/40 font-light italic">
                                                                <span className="font-semibold text-white/60 not-italic">Extras sugeridos: </span> {svc.extras}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Includes List */}
                                                    <div className="flex flex-col gap-6 h-full justify-between">
                                                        <div>
                                                            <h4 className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/30 border-b border-white/10 pb-4 mb-6">
                                                                Detalle de Entregables
                                                            </h4>
                                                            <ul className="flex flex-col gap-3">
                                                                {svc.includes.slice(0, 6).map((item, idx) => (
                                                                    <li key={idx} className="flex items-start gap-4">
                                                                        <span className="w-1 h-1 rounded-full bg-white/30 mt-[0.6rem] shrink-0"></span>
                                                                        <span className="text-sm md:text-base text-white/70 font-light leading-snug">{item}</span>
                                                                    </li>
                                                                ))}
                                                                {svc.includes.length > 6 && (
                                                                    <li className="text-xs text-white/30 font-mono mt-3 ml-5">
                                                                        + {svc.includes.length - 6} ítems adicionales
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </div>

                                                        {/* CTA */}
                                                        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col items-start gap-6">
                                                            <a
                                                                href="#contact"
                                                                data-magnetic="true"
                                                                className="group/cta inline-flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-white"
                                                            >
                                                                <span className="border-b border-white/30 pb-1 group-hover/cta:border-white transition-colors">
                                                                    {svc.cta}
                                                                </span>
                                                                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/cta:bg-white group-hover/cta:text-black group-hover/cta:border-transparent transition-all duration-300">
                                                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:-rotate-45" />
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right: Media Grid */}
                                                <div className="lg:col-span-5 xl:col-span-4 relative pl-0 lg:pl-10 lg:border-l lg:border-white/10 flex flex-col items-start lg:items-center justify-center">
                                                    <div className="w-full aspect-video relative overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
                                                        {svc.video ? (
                                                            <video
                                                                src={svc.video}
                                                                autoPlay
                                                                loop
                                                                muted
                                                                playsInline
                                                                className="parallax-media h-full w-full object-cover grayscale-[80%] hover:grayscale-0 transition-all duration-1000 scale-[1.15] hover:scale-110"
                                                            />
                                                        ) : (
                                                            <Image
                                                                src={svc.image}
                                                                alt={svc.title}
                                                                fill
                                                                sizes="(max-width: 1024px) 100vw, 33vw"
                                                                className="parallax-media object-cover grayscale-[80%] hover:grayscale-0 transition-all duration-1000 scale-[1.15] hover:scale-110"
                                                            />
                                                        )}
                                                        {/* Badge */}
                                                        <div className="absolute top-4 left-4 lg:top-6 lg:left-6 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/10 pointer-events-none">
                                                            <span className="text-[10px] text-white/80 uppercase tracking-widest font-mono">
                                                                {svc.contentTitleHighlight}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            {/* Ambient Lights */}
            <div className="absolute top-1/4 left-0 w-[40vw] h-[40vw] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none z-0 mix-blend-screen" />
            <div className="absolute bottom-1/4 right-0 w-[50vw] h-[50vw] bg-white/[0.015] blur-[150px] rounded-full pointer-events-none z-0 mix-blend-screen" />
        </section>
    )
}
