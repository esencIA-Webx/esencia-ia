"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const plans = [
    {
        name: "Landing Page",
        fullName: "Landing Page estratégica",
        price: "$180.000",
        description: "Ideal para presentar un servicio, lanzar una propuesta o captar clientes de forma directa y efectiva.",
        features: [
            "Estructura clara y directa",
            "Diseño enfocado en conversión",
            "Optimización para móviles",
            "Integración con WhatsApp/Formulario"
        ],
        popular: false,
    },
    {
        name: "Institucional",
        fullName: "Web institucional",
        price: "$500.000",
        description: "Pensada para marcas y profesionales que buscan transmitir confianza, orden y presencia digital sólida.",
        features: [
            "Múltiples secciones informativas",
            "Diseño profesional y coherente",
            "Gestión de contenido básica",
            "Canal oficial de comunicación"
        ],
        popular: true,
    },
    {
        name: "E-Commerce",
        fullName: "Tienda online básica",
        price: "$1.000.000",
        description: "Comenzá a vender por internet las 24 horas de forma simple, segura y profesional.",
        features: [
            "Catálogo de productos",
            "Carrito de compras simple",
            "Integración de pagos básicos",
            "Sin dependencias complejas"
        ],
        popular: false,
    },
]

export function Pricing() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const containerRef = useRef<HTMLElement>(null)

    useGSAP(() => {
        const rows = gsap.utils.toArray(".pricing-row")
        if (rows.length === 0) return

        gsap.from(rows, {
            y: 60,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        })
    }, { scope: containerRef })

    return (
        <section ref={containerRef} id="pricing" className="py-24 md:py-40 bg-[#0A0A0A] text-white relative border-t border-white/5">
            {/* Background noise/texture subtle */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/images/noise.png')" }} />
            
            <div className="container mx-auto px-4 md:px-8 max-w-[90rem] relative z-10">
                {/* Header Section */}
                <div className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12 pricing-row">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-[1px] bg-primary"></div>
                            <span className="text-primary tracking-[0.3em] uppercase text-xs font-bold">Inversión</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                            Planes
                            <br />
                            <span className="text-white/30 italic font-light tracking-normal">Base</span>
                        </h2>
                    </div>
                    <div className="max-w-sm">
                        <p className="text-base md:text-lg text-white/50 font-light leading-relaxed">
                            Nuestros proyectos se desarrollan a partir de planes base orientativos. Elige el punto de partida ideal y lo escalaremos según tu necesidad.
                        </p>
                    </div>
                </div>

                {/* Interactive List */}
                <div className="flex flex-col border-t border-white/10">
                    {plans.map((plan, index) => {
                        const isHovered = hoveredIndex === index;
                        
                        return (
                            <div 
                                key={plan.name}
                                className="pricing-row group relative border-b border-white/10"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => setHoveredIndex(isHovered ? null : index)} // Mobile toggle
                            >
                                {/* Hover background reveal */}
                                <div 
                                    className={`absolute inset-0 bg-white/[0.02] pointer-events-none transition-opacity duration-700 ease-out ${isHovered ? "opacity-100" : "opacity-0"}`} 
                                />

                                {/* Row Header */}
                                <div className="py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 cursor-pointer relative z-10 w-full transition-all duration-500">
                                    
                                    {/* Number & Title */}
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-16 w-full md:w-auto">
                                        <div className="flex justify-between md:block w-full md:w-auto pr-4 md:pr-0">
                                            <span className="text-xs md:text-sm font-mono text-white/30 tracking-widest block">
                                                NO.0{index + 1}
                                            </span>
                                            {/* Mobile Popular Badge */}
                                            {plan.popular && (
                                                <span className="md:hidden text-primary text-[10px] tracking-[0.2em] uppercase font-bold px-2 py-1 border border-primary/30 rounded-full">
                                                    Popular
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-6 mt-2 md:mt-0">
                                            <h3 className={`text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter transition-all duration-700 ease-out origin-left ${isHovered ? "text-white translate-x-0 md:translate-x-4" : "text-white/60"}`}>
                                                {plan.name}
                                            </h3>
                                            {/* Desktop Popular Badge */}
                                            {plan.popular && (
                                                <span className="hidden md:inline-block text-primary text-xs tracking-[0.2em] uppercase font-bold border border-primary/30 px-3 py-1 rounded-full whitespace-nowrap">
                                                    Más Popular
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Price & Arrow */}
                                    <div className="flex items-center justify-between md:justify-end gap-6 md:gap-12 w-full md:w-auto mt-2 md:mt-0 px-1 md:px-0">
                                        <div className="flex flex-col items-start md:items-end">
                                            <span className={`text-2xl md:text-4xl font-light tracking-tight transition-colors duration-700 ${isHovered ? "text-primary" : "text-white/50"}`}>
                                                {plan.price}
                                            </span>
                                            <span className="text-[10px] md:text-xs text-white/30 tracking-widest uppercase mt-1">
                                                Valores Base
                                            </span>
                                        </div>

                                        {/* Icon container */}
                                        <div className={`shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full border flex items-center justify-center transition-all duration-700 ease-out ${isHovered ? "border-primary bg-primary text-black scale-110" : "border-white/20 text-white"}`}>
                                            <ArrowRight className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-700 ease-out ${isHovered ? "-rotate-45" : "rotate-0"}`} />
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Content (Accordion) */}
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-12 pt-2 md:pt-4 flex flex-col lg:flex-row gap-10 lg:gap-24 pl-0 md:pl-[6.5rem] relative z-10 px-2 md:px-0">
                                                {/* Details */}
                                                <div className="flex-1 max-w-xl">
                                                    <h4 className="text-xl md:text-2xl font-bold mb-4 text-white uppercase tracking-tight">
                                                        {plan.fullName}
                                                    </h4>
                                                    <p className="text-base md:text-lg font-light text-white/60 leading-relaxed mb-8">
                                                        {plan.description}
                                                    </p>
                                                    <a 
                                                        href="#contact" 
                                                        data-magnetic="true"
                                                        className="group/btn inline-flex items-center gap-3 border-b border-primary pb-1 text-primary hover:text-white hover:border-white transition-colors uppercase tracking-[0.2em] text-xs md:text-sm font-bold"
                                                    >
                                                        Consultar Plan
                                                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                                    </a>
                                                </div>

                                                {/* Features */}
                                                <div className="flex-1 md:pr-12">
                                                    <h5 className="text-xs font-mono text-white/30 mb-6 tracking-widest uppercase flex items-center gap-3">
                                                        <div className="w-4 h-[1px] bg-white/30"></div>
                                                        Incluye
                                                    </h5>
                                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                                        {plan.features.map((feature, fi) => (
                                                            <motion.li 
                                                                key={fi}
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 0.1 + (fi * 0.05), duration: 0.5 }}
                                                                className="flex items-start gap-3"
                                                            >
                                                                <Check className="w-4 h-4 text-white/20 mt-1 shrink-0" />
                                                                <span className="text-sm font-light text-white/70 tracking-wide">{feature}</span>
                                                            </motion.li>
                                                        ))}
                                                    </ul>
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
        </section>
    )
}
