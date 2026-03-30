"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function AboutAwwwards() {
    const containerRef = useRef<HTMLElement>(null)
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Cinematic Scroll Timeline (Pinning Effect):
    const clipPath = useTransform(
        scrollYProgress,
        [0, 0.4],
        ["inset(25% round 30px)", "inset(0% round 0px)"]
    )
    
    // Scale Down on Entry
    const imageScale = useTransform(scrollYProgress, [0, 0.4], [1.1, 1])
    
    // Continuous Parallax Scroll across the whole 200vh pin
    const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

    // IN TIMING LOGIC (Text and Buttons)
    const titleY1 = useTransform(scrollYProgress, [0.0, 0.2], ["110%", "0%"])
    const titleY2 = useTransform(scrollYProgress, [0.05, 0.25], ["110%", "0%"])
    const titleY3 = useTransform(scrollYProgress, [0.10, 0.30], ["110%", "0%"])

    const subOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
    const subX = useTransform(scrollYProgress, [0.2, 0.4], ["-30px", "0px"])

    const btnOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
    const btnY = useTransform(scrollYProgress, [0.3, 0.5], ["30px", "0px"])

    return (
        <section 
            ref={containerRef} 
            className="relative h-[200vh] sm:h-[180vh] w-full text-black"
        >
            {/* Contenedor Sticky para simular "Bloqueo/Pinning" */}
            <div className="sticky top-0 w-full h-screen flex flex-col lg:flex-row overflow-hidden relative z-10 bg-[#f2f2ef]">
                
                {/* Ruido SVG Estilo Editorial Global */}
                <div 
                    className="absolute inset-0 z-0 pointer-events-none opacity-[0.02] mix-blend-multiply" 
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
                />

                {/* HUD: Esquina Superior Izquierda */}
                <motion.div 
                    style={{ opacity: subOpacity }} 
                    className="absolute top-6 left-6 md:top-10 md:left-10 z-50 text-[10px] sm:text-xs font-thin tracking-[0.4em] lg:tracking-[0.6em] text-neutral-400 uppercase pointer-events-none"
                >
                    Destaca
                </motion.div>

                {/* HUD: Esquina Inferior Derecha (sobre imagen, mix-blend o blanco/gris tenue para contraste) */}
                <motion.div 
                    style={{ opacity: subOpacity }} 
                    className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-50 text-[10px] sm:text-xs font-thin tracking-[0.4em] lg:tracking-[0.6em] text-white/50 uppercase pointer-events-none"
                >
                    Sé Original
                </motion.div>

                {/* Mitad Izquierda: Texto */}
                <div className="w-full lg:w-1/2 h-[50vh] lg:h-full flex items-end justify-start pb-16 lg:pb-32 px-6 sm:px-12 lg:px-16 xl:px-[5rem] order-2 lg:order-1 relative h-full">
                    <div className="flex flex-col space-y-10 max-w-4xl lg:-mr-32 relative">
                        
                        {/* Animated Staggered Title - Linked to Scroll */}
                        <div className="flex flex-col">
                            <div className="overflow-hidden pb-1">
                                <motion.h2 
                                    style={{ y: titleY1, rotate: 0 }}
                                    className="text-[3.5rem] md:text-7xl lg:text-[6rem] xl:text-[7.5rem] 2xl:text-[8.5rem] font-bold tracking-tighter text-white mix-blend-difference leading-[0.80]"
                                >
                                    Destacar
                                </motion.h2>
                            </div>
                            <div className="overflow-hidden pb-1">
                                <motion.h2 
                                    style={{ y: titleY2, rotate: 0 }}
                                    className="text-[3.5rem] md:text-7xl lg:text-[6rem] xl:text-[7.5rem] 2xl:text-[8.5rem] font-bold tracking-tighter text-white mix-blend-difference leading-[0.80]"
                                >
                                    no es opcional,
                                </motion.h2>
                            </div>
                            <div className="overflow-hidden pb-4">
                                <motion.h2 
                                    style={{ y: titleY3, rotate: -2 }}
                                    className="text-[3.5rem] md:text-7xl lg:text-[6rem] xl:text-[7.5rem] 2xl:text-[8.5rem] font-black tracking-tighter text-primary leading-[0.80] italic pr-4"
                                >
                                    es estratégico.
                                </motion.h2>
                            </div>
                        </div>
                        
                        {/* Subtitle Line - Linked to Scroll */}
                        <motion.div 
                            style={{ opacity: subOpacity, x: subX }}
                            className="border-l-[4px] border-neutral-300 pl-6 lg:ml-2"
                        >
                            <p className="text-xl md:text-3xl xl:text-4xl text-neutral-600 leading-snug font-medium max-w-[95%]">
                                Construimos presencia digital para marcas que quieren <span className="text-neutral-950 font-bold">liderar</span>, no perderse en el ruido.
                            </p>
                        </motion.div>

                        {/* Animated Awwwards Button - Linked to Scroll */}
                        <motion.div
                            style={{ opacity: btnOpacity, y: btnY }}
                            className="pt-2 lg:pt-6"
                        >
                            <Link 
                                href="#contact" 
                                className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full border border-neutral-900/30 text-neutral-900 bg-transparent isolation-auto z-10 w-fit"
                            >
                                {/* Fill background (slide up) */}
                                <div className="absolute inset-0 bg-neutral-900 translate-y-[100%] rounded-full transition-transform duration-[0.6s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 z-0" />
                                
                                <span className="relative z-10 text-base md:text-lg font-bold tracking-tight uppercase group-hover:text-white transition-colors duration-500">
                                    COMENZAR PROYECTO
                                </span>
                                
                                <span className="relative z-10 ml-3 flex items-center justify-center bg-transparent group-hover:bg-primary/20 rounded-full transition-colors duration-500">
                                    <ArrowRight className="h-5 w-5 group-hover:text-white transition-colors duration-500 transform group-hover:-rotate-45" />
                                </span>
                            </Link>
                        </motion.div>

                    </div>
                </div>

                {/* Mitad Derecha: Imagen con Revelado Awwwards Full Bleed */}
                <div className="relative w-full lg:w-1/2 h-[50vh] sm:h-[60vh] lg:h-screen flex items-center justify-center order-1 lg:order-2">
                    <motion.div 
                        style={{ clipPath }}
                        className="relative w-full h-full overflow-hidden shadow-2xl bg-neutral-200"
                    >
                        {/* Wrapper for image parallax - scaled up slightly safely to hide translation empty bounds */}
                        <motion.div 
                            style={{ scale: imageScale, y: imageY }} 
                            className="absolute inset-x-[-10%] inset-y-[-10%] w-[120%] h-[120%] z-0"
                        >
                            <Image
                                src="/images/about-awwwards.jpg"
                                alt="Diseño web con estrategia"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                            
                            {/* Ruido Granulado Mínimo Específico para la Foto */}
                            <div 
                                className="absolute inset-0 pointer-events-none opacity-[0.10] mix-blend-overlay z-10" 
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter2)'/%3E%3C/svg%3E")` }} 
                            />
                        </motion.div>
                        
                        {/* Inner Highlight transparente paramacro geométrico suave */}
                        <div className="absolute inset-0 border border-black/5 pointer-events-none z-20" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
