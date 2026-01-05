"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import Image from "next/image"

// Updated content based on user request
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
        video: "/videos/Arte1.mov"
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
        video: "/videos/Institucion1.mov"
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
        video: "/videos/Tienda1.mov"
    },
]

export function Services() {
    const [activeService, setActiveService] = useState<string | null>(null)

    const toggleService = (id: string) => {
        if (activeService === id) {
            setActiveService(null)
        } else {
            setActiveService(id)
        }
    }

    const activeData = servicesData.find((s) => s.id === activeService)

    return (
        <section id="services" className="pt-10 pb-20 lg:pt-16 lg:pb-32 relative">
            {/* Main Titles - Contained, Centered */}
            <div className="container mx-auto px-4 relative z-20 mb-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 max-w-7xl mx-auto px-4 text-center md:text-left">
                    {servicesData.map((service) => (
                        <button
                            key={service.id}
                            onClick={() => toggleService(service.id)}
                            className={`group relative text-3xl md:text-4xl lg:text-3xl xl:text-5xl font-black tracking-tighter transition-all duration-500 uppercase leading-none py-2 ${activeService === service.id
                                ? "text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary bg-[length:200%_auto] bg-[0%_0%] hover:bg-[100%_0%] scale-105 opacity-100"
                                : "text-white/40 hover:text-white"
                                }`}
                        >
                            {service.title}
                            <span
                                className={`absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-500 ${activeService === service.id ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area - Full Width Dropdown */}
            <div className="w-full relative z-10 -mt-4">
                <AnimatePresence mode="wait">
                    {activeService && activeData && (
                        <motion.div
                            key={activeService}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden relative bg-[#FFFFF0]"
                        >
                            <div className="container mx-auto px-4 pt-16 pb-20 max-w-7xl relative z-10">
                                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-12 lg:gap-20 items-center">
                                    {/* Text Column */}
                                    <div className="flex flex-col justify-center">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <div className="flex items-center gap-3 mb-4">
                                                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black font-sans tracking-tight text-black">
                                                    {activeData.contentTitleHighlight}
                                                </h3>
                                            </div>
                                            <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary mb-6">
                                                {activeData.subtitle}
                                            </p>
                                            <p className="text-lg text-neutral-600 leading-relaxed mb-8 font-light italic">
                                                {activeData.content}
                                            </p>
                                        </motion.div>

                                        {/* Benefits List */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="mb-8"
                                        >
                                            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-neutral-400 mb-6">Incluye</h4>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                                {activeData.includes.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-neutral-600 text-sm">
                                                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>

                                        {/* Extras */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="mb-10 p-4 bg-white/50 border border-neutral-200 rounded-sm"
                                        >
                                            <h4 className="text-xs font-bold uppercase text-neutral-400 mb-2">Extras opcionales</h4>
                                            <p className="text-sm text-neutral-500 italic">{activeData.extras}</p>
                                        </motion.div>

                                        {/* CTA Only - Centered */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="flex justify-center pt-8"
                                        >
                                            <a
                                                href="#contact"
                                                className="group relative px-12 py-5 bg-black text-white font-bold text-sm tracking-widest uppercase overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                                            >
                                                <span className="relative z-10 flex items-center gap-2">
                                                    {activeData.cta}
                                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                </span>
                                            </a>
                                        </motion.div>
                                    </div>

                                    {/* Image Column */}
                                    <div className="relative flex items-center justify-center [perspective:1000px]">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9, rotateY: 0, x: 50 }}
                                            animate={{ opacity: 1, scale: 1, rotateY: -15, x: 0 }}
                                            transition={{
                                                delay: 0.4,
                                                duration: 0.8,
                                                ease: [0.22, 1, 0.36, 1]
                                            }}
                                            className="relative aspect-video w-full overflow-hidden rounded-sm shadow-[20px_20px_50px_rgba(0,0,0,0.3)] bg-gray-100 border border-white/20"
                                        >
                                            {activeData.video ? (
                                                <video
                                                    src={activeData.video}
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                    preload="none"
                                                    className="h-full w-full object-cover hover:scale-110 transition-transform duration-1000"
                                                />
                                            ) : (
                                                <Image
                                                    src={activeData.image}
                                                    alt={activeData.title}
                                                    fill
                                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                                    className="object-cover hover:scale-110 transition-transform duration-1000"
                                                />
                                            )}
                                            {/* Decorative element */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
