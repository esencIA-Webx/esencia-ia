"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { useRef } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

export function Hero() {
    const ref = useRef(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Framer motion hooks para parallax continuo vinculado al scroll 
    // (GSAP ScrollTrigger scrub es idéntico, pero conservamos framer aquí
    //  para no rehacer la lógica del background infinito que ya rinde bien).
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    const textX1 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"])
    const textX2 = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"])

    // GSAP Cinematic Entrance Timeline
    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

        // Estado inicial
        gsap.set(".hero-logo", { scale: 0.7, opacity: 0, rotateZ: -5 })
        gsap.set(".hero-stagger", { yPercent: 120, opacity: 0 })
        gsap.set(".scroll-indicator", { scaleY: 0, transformOrigin: "top" })

        tl.to(".hero-logo", {
            scale: 1,
            opacity: 1,
            rotateZ: 0,
            duration: 1.8,
            ease: "expo.out"
        })
        .to(".hero-stagger", {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.12,
        }, "-=1.2") // Inicia antes de que termine el logo
        .to(".scroll-indicator", {
            scaleY: 1,
            duration: 1.5,
            ease: "expo.inOut"
        }, "-=0.5")

    }, { scope: containerRef })

    return (
        <section ref={ref} className="relative flex h-screen items-center justify-center overflow-hidden bg-black">
            {/* Dynamic Background */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0 flex flex-col items-center justify-center overflow-hidden"
            >
                {/* Typographic Scrolly Background */}
                <div className="absolute flex flex-col gap-4 opacity-[0.04] pointer-events-none select-none z-0">
                    <motion.div style={{ x: textX1 }} className="text-[15vw] md:text-[12vw] font-black whitespace-nowrap leading-none tracking-tighter">
                        CREATIVIDAD DIGITAL CREATIVIDAD DIGITAL
                    </motion.div>
                    <motion.div style={{ x: textX2, WebkitTextStroke: "2px rgba(255,255,255,1)" }} className="text-[15vw] md:text-[12vw] font-black whitespace-nowrap leading-none tracking-tighter text-transparent">
                        EXPERIENCIA WEB EXPERIENCIA WEB EXPERIENCIA WEB
                    </motion.div>
                    <motion.div style={{ x: textX1 }} className="text-[15vw] md:text-[12vw] font-black whitespace-nowrap leading-none tracking-tighter">
                        INNOVACIÓN IA INNOVACIÓN IA INNOVACIÓN IA
                    </motion.div>
                </div>

                {/* Noise Grain Overlay */}
                <div 
                    className="absolute inset-0 z-10 pointer-events-none opacity-[0.06] mix-blend-screen" 
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
                />

                {/* Atmosphere Gradients */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-black/60 to-black blur-3xl z-0 pointer-events-none mix-blend-overlay" />
            </motion.div>

            <div ref={containerRef} className="container relative z-10 mx-auto px-4 text-center">
                <div className="mb-8 flex flex-col items-center justify-center">
                    <motion.div
                        style={{ y: logoY }}
                        className="hero-logo mb-8 relative w-32 h-32 md:w-40 md:h-40"
                    >
                        <Image
                            src="/logo.png"
                            alt="Esencia IA Logo"
                            fill
                            priority
                            className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                        />
                    </motion.div>

                    <div className="overflow-hidden mb-4 p-2">
                        <h1 className="hero-stagger text-5xl font-black tracking-widest sm:text-8xl md:text-9xl relative inline-block">
                            ESENC<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary bg-[length:200%_auto] bg-[0%_0%] md:hover:bg-[100%_0%] transition-[background-position] duration-500 cursor-default">IA</span>
                        </h1>
                    </div>

                    <div className="overflow-hidden">
                        <h2 className="hero-stagger text-lg sm:text-3xl md:text-4xl font-semibold text-white/80 tracking-widest uppercase">
                            Diseño & Estrategia Digital
                        </h2>
                    </div>
                </div>

                <div className="overflow-hidden flex justify-center mb-12">
                    <p className="hero-stagger mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl font-light leading-relaxed">
                        Presencia digital profesional para marcas, instituciones y emprendedores.
                        <br />
                        <span className="text-white font-medium tracking-wide block mt-2">
                            Creamos sitios web claros, modernos y orientados a resultados.
                        </span>
                    </p>
                </div>

                <div className="overflow-hidden flex flex-col items-center justify-center gap-6 sm:flex-row">
                    <div className="hero-stagger">
                        <Link href="#contact" data-magnetic="true">
                            <Button variant="outline" size="lg" className="h-14 min-w-[200px] rounded-md text-lg bg-white/5 border-white/10 hover:bg-white/10 text-white cursor-hover">
                                Consultar proyecto
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 overflow-hidden h-16 w-[1px]">
                <div className="scroll-indicator h-full w-full bg-gradient-to-b from-transparent via-white/50 to-transparent" />
            </div>
        </section>
    )
}
