"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function AboutAwwwards() {
    const containerRef = useRef<HTMLElement>(null)

    useGSAP(() => {
        const mm = gsap.matchMedia()

        // Todos los elementos anidados en el contenedor, bien tipados
        const imageWrap = containerRef.current?.querySelector(".about-clip") as HTMLElement
        const imageInner = containerRef.current?.querySelector(".about-image-inner") as HTMLElement
        const title1 = containerRef.current?.querySelector(".about-t1") as HTMLElement
        const title2 = containerRef.current?.querySelector(".about-t2") as HTMLElement
        const title3 = containerRef.current?.querySelector(".about-t3") as HTMLElement
        const sub = containerRef.current?.querySelector(".about-sub") as HTMLElement
        const btn = containerRef.current?.querySelector(".about-btn") as HTMLElement
        const hud1 = containerRef.current?.querySelector(".about-hud1") as HTMLElement
        const hud2 = containerRef.current?.querySelector(".about-hud2") as HTMLElement

        if (!imageWrap || !imageInner) return

        // Timeline principal sincronizada al scroll con scrub
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5, // valor de "amortiguamiento": más alto = más suavidad
            }
        })

        // 1. Clip-path reveal (de imagen encuadrada a full bleed)
        tl.fromTo(imageWrap,
            { clipPath: "inset(20% round 24px)" },
            { clipPath: "inset(0% round 0px)", ease: "none" },
            0
        )

        // 2. Scale down de imagen al revelarla 
        tl.fromTo(imageInner,
            { scale: 1.12 },
            { scale: 1, ease: "none" },
            0
        )

        // 3. Parallax suave en imagen durante el scroll total
        tl.fromTo(imageInner,
            { yPercent: -6 },
            { yPercent: 6, ease: "none" },
            0
        )

        // 4. Títulos emergiendo en cascada (manejados con offsets dentro del scrub)
        tl.fromTo(title1, { yPercent: 110 }, { yPercent: 0, ease: "power2.out" }, 0)
        tl.fromTo(title2, { yPercent: 110 }, { yPercent: 0, ease: "power2.out" }, 0.05)
        tl.fromTo(title3, { yPercent: 110 }, { yPercent: 0, ease: "power2.out" }, 0.1)

        // 5. Subtítulo y botón aparecen más tarde
        tl.fromTo(sub, { opacity: 0, x: -30 }, { opacity: 1, x: 0, ease: "power2.out" }, 0.2)
        tl.fromTo(btn, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "power2.out" }, 0.3)
        tl.fromTo([hud1, hud2], { opacity: 0 }, { opacity: 1, ease: "none" }, 0.2)

    }, { scope: containerRef })

    return (
        <section
            ref={containerRef}
            className="relative h-[200vh] sm:h-[180vh] w-full text-black"
        >
            {/* Sticky viewport */}
            <div className="sticky top-0 w-full h-screen flex flex-col lg:flex-row overflow-hidden relative z-10 bg-[#f2f2ef]">

                {/* Noise: CSS-only, cero impacto CPU (sin feTurbulence SVG) */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none opacity-[0.035] mix-blend-multiply"
                    style={{ backgroundImage: "url('/images/noise.png')" }}
                />

                {/* HUD Superior Izquierda */}
                <div className="about-hud1 absolute top-6 left-6 md:top-10 md:left-10 z-50 text-[10px] sm:text-xs font-thin tracking-[0.4em] lg:tracking-[0.6em] text-neutral-400 uppercase pointer-events-none opacity-0">
                    Destaca
                </div>

                {/* HUD Inferior Derecha */}
                <div className="about-hud2 absolute bottom-6 right-6 md:bottom-10 md:right-10 z-50 text-[10px] sm:text-xs font-thin tracking-[0.4em] lg:tracking-[0.6em] text-white/50 uppercase pointer-events-none opacity-0">
                    Sé Original
                </div>

                {/* ← Lado Izquierdo: Texto */}
                <div className="w-full lg:w-1/2 h-[50vh] lg:h-full flex items-end justify-start pb-16 lg:pb-32 px-6 sm:px-12 lg:px-16 xl:px-[5rem] order-2 lg:order-1 relative">
                    <div className="flex flex-col space-y-10 max-w-4xl lg:-mr-32 relative">

                        {/* Títulos en cascada — ocultos inicialmente via overflow:hidden del padre */}
                        <div className="flex flex-col">
                            <div className="overflow-hidden pb-1">
                                <h2 className="about-t1 text-[3.5rem] md:text-7xl lg:text-[6rem] xl:text-[7.5rem] 2xl:text-[8.5rem] font-bold tracking-tighter text-white mix-blend-difference leading-[0.80]"
                                    style={{ transform: "translateY(110%)" }}>
                                    Destacar
                                </h2>
                            </div>
                            <div className="overflow-hidden pb-1">
                                <h2 className="about-t2 text-[3.5rem] md:text-7xl lg:text-[6rem] xl:text-[7.5rem] 2xl:text-[8.5rem] font-bold tracking-tighter text-white mix-blend-difference leading-[0.80]"
                                    style={{ transform: "translateY(110%)" }}>
                                    no es opcional,
                                </h2>
                            </div>
                            <div className="overflow-hidden pb-4">
                                <h2 className="about-t3 text-[3.5rem] md:text-7xl lg:text-[6rem] xl:text-[7.5rem] 2xl:text-[8.5rem] font-black tracking-tighter text-primary leading-[0.80] italic pr-4"
                                    style={{ transform: "translateY(110%)", rotate: "-2deg" }}>
                                    es estratégico.
                                </h2>
                            </div>
                        </div>

                        {/* Subtítulo */}
                        <div className="about-sub border-l-[4px] border-neutral-300 pl-6 lg:ml-2 opacity-0" style={{ transform: "translateX(-30px)" }}>
                            <p className="text-xl md:text-3xl xl:text-4xl text-neutral-600 leading-snug font-medium max-w-[95%]">
                                Construimos presencia digital para marcas que quieren <span className="text-neutral-950 font-bold">liderar</span>, no perderse en el ruido.
                            </p>
                        </div>

                        {/* Botón CTA */}
                        <div className="about-btn pt-2 lg:pt-6 opacity-0" style={{ transform: "translateY(30px)" }}>
                            <Link
                                href="#contact"
                                className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full border border-neutral-900/30 text-neutral-900 bg-transparent isolation-auto z-10 w-fit"
                            >
                                <div className="absolute inset-0 bg-neutral-900 translate-y-[100%] rounded-full transition-transform duration-[0.6s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 z-0" />
                                <span className="relative z-10 text-base md:text-lg font-bold tracking-tight uppercase group-hover:text-white transition-colors duration-500">
                                    COMENZAR PROYECTO
                                </span>
                                <span className="relative z-10 ml-3 flex items-center justify-center bg-transparent group-hover:bg-primary/20 rounded-full transition-colors duration-500">
                                    <ArrowRight className="h-5 w-5 group-hover:text-white transition-colors duration-500 transform group-hover:-rotate-45" />
                                </span>
                            </Link>
                        </div>

                    </div>
                </div>

                {/* → Lado Derecho: Imagen con clip-path reveal */}
                <div className="relative w-full lg:w-1/2 h-[50vh] sm:h-[60vh] lg:h-screen flex items-center justify-center order-1 lg:order-2">
                    <div
                        className="about-clip relative w-full h-full overflow-hidden shadow-2xl bg-neutral-200"
                        style={{ clipPath: "inset(20% round 24px)" }}
                    >
                        {/* Wrapper con overflow para el parallax interno */}
                        <div
                            className="about-image-inner absolute inset-x-[-10%] inset-y-[-10%] w-[120%] h-[120%] z-0"
                            style={{ scale: 1.12 }}
                        >
                            <Image
                                src="/images/about-awwwards.jpg"
                                alt="Diseño web con estrategia"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
                            {/* Grain CSS-only sobre la foto */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay z-10"
                                style={{ backgroundImage: "url('/images/noise.png')" }}
                            />
                        </div>
                        <div className="absolute inset-0 border border-black/5 pointer-events-none z-20" />
                    </div>
                </div>
            </div>
        </section>
    )
}
