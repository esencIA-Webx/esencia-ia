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
        const sel = (c: string) => containerRef.current?.querySelector(c) as HTMLElement

        const imageWrap  = sel(".about-clip")
        const imageInner = sel(".about-image-inner")
        const title1     = sel(".about-t1")
        const title2     = sel(".about-t2")
        const title3     = sel(".about-t3")
        const sub        = sel(".about-sub")
        const btn        = sel(".about-btn")
        const hud1       = sel(".about-hud1")
        const hud2       = sel(".about-hud2")

        if (!imageWrap || !imageInner || !title1) return

        // --- Estado inicial (GSAP controla transforms, no inline styles) ---
        gsap.set(imageWrap, { clipPath: "inset(22% round 20px)" })
        gsap.set(imageInner, { scale: 1.12 })
        gsap.set([title1, title2, title3], { yPercent: 105 })
        gsap.set(sub,  { opacity: 0, x: -30 })
        gsap.set(btn,  { opacity: 0, y: 30 })
        gsap.set([hud1, hud2], { opacity: 0 })

        // --- Timeline principal con scrub vinculado al scroll ---
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.2,
            }
        })

        // 0.0 → 0.35 : Clip-path abre + imagen se estabiliza
        tl.to(imageWrap, {
            clipPath: "inset(0% round 0px)",
            ease: "none",
            duration: 0.35
        }, 0)
        tl.to(imageInner, {
            scale: 1,
            yPercent: 6,
            ease: "none",
            duration: 1
        }, 0)

        // 0.0 → 0.40 : Títulos emergen en cascada
        tl.to(title1, { yPercent: 0, ease: "power2.out", duration: 0.4 }, 0)
        tl.to(title2, { yPercent: 0, ease: "power2.out", duration: 0.4 }, 0.06)
        tl.to(title3, {
            yPercent: 0,
            rotate: -2,          // inclinación solo en destino
            ease: "power2.out",
            duration: 0.4
        }, 0.12)

        // 0.30 → 0.50 : Subtítulo contenedor (margen y desplazamiento lateral)
        tl.to(sub, { x: 0, ease: "power2.out", duration: 0.2 }, 0.30)
        tl.to([hud1, hud2], { opacity: 1, ease: "none", duration: 0.15 }, 0.30)

        // Text scrub reveal (word by word)
        const scrubWords = sel(".about-sub").querySelectorAll(".scrub-word")
        tl.to(scrubWords, {
            opacity: 1,
            stagger: 0.02,
            ease: "none",
            duration: 0.25
        }, 0.30) // Fades in simultaneously as it moves

        // 0.40 → 0.65 : Botón
        tl.to(btn, { opacity: 1, y: 0, ease: "power2.out", duration: 0.2 }, 0.40)

        // Parallax continuo de imagen durante el resto del scroll
        tl.to(imageInner, { yPercent: -6, ease: "none", duration: 0.6 }, 0.40)

    }, { scope: containerRef })

    return (
        <section
            ref={containerRef}
            className="relative h-[220vh] sm:h-[200vh] w-full text-black"
        >
            {/* Panel sticky */}
            <div className="sticky top-0 w-full h-screen flex flex-col lg:flex-row overflow-hidden relative z-10 bg-[#f2f2ef]">

                {/* Noise CSS-only */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none opacity-[0.035] mix-blend-multiply"
                    style={{ backgroundImage: "url('/images/noise.png')" }}
                />

                {/* HUD Superior Izquierda */}
                <div className="about-hud1 absolute top-6 left-6 md:top-10 md:left-10 z-50 text-[10px] sm:text-xs font-thin tracking-[0.4em] lg:tracking-[0.6em] text-neutral-400 uppercase pointer-events-none">
                    Destaca
                </div>

                {/* HUD Inferior Derecha */}
                <div className="about-hud2 absolute bottom-6 right-6 md:bottom-10 md:right-10 z-50 text-[10px] sm:text-xs font-thin tracking-[0.4em] lg:tracking-[0.6em] text-white/50 uppercase pointer-events-none">
                    Sé Original
                </div>

                {/* ← Lado Izquierdo: Texto */}
                <div className="w-full lg:w-1/2 h-[50vh] lg:h-full flex items-end justify-start pb-16 lg:pb-32 px-6 sm:px-12 lg:px-16 xl:px-[5rem] order-2 lg:order-1 relative">
                    <div className="flex flex-col space-y-10 max-w-4xl lg:-mr-32 relative">

                        {/* Títulos — overflow:hidden crea la "trampa" del mask reveal */}
                        <div className="flex flex-col">
                            <div className="overflow-hidden pb-1">
                                <h2 className="about-t1 text-[3.5rem] md:text-7xl lg:text-[6rem] xl:text-[7.5rem] 2xl:text-[8.5rem] font-bold tracking-tighter text-white mix-blend-difference leading-[0.80]">
                                    Destacar
                                </h2>
                            </div>
                            <div className="overflow-hidden pb-1">
                                <h2 className="about-t2 text-[3.5rem] md:text-7xl lg:text-[6rem] xl:text-[7.5rem] 2xl:text-[8.5rem] font-bold tracking-tighter text-white mix-blend-difference leading-[0.80]">
                                    no es opcional,
                                </h2>
                            </div>
                            <div className="overflow-hidden pb-4">
                                <h2 className="about-t3 text-[3.5rem] md:text-7xl lg:text-[6rem] xl:text-[7.5rem] 2xl:text-[8.5rem] font-black tracking-tighter text-primary leading-[0.80] italic pr-4">
                                    es estratégico.
                                </h2>
                            </div>
                        </div>

                        {/* Subtítulo con Scrub Reveal */}
                        <div className="about-sub border-l-[4px] border-neutral-300 pl-6 lg:ml-2">
                            <p className="text-xl md:text-3xl xl:text-4xl text-neutral-600 leading-snug font-medium max-w-[95%]">
                                {"Construimos presencia digital para marcas que quieren ".split(" ").map((w, i) => (
                                    <span key={`a-${i}`} className="scrub-word inline-block mr-[0.25em] opacity-20">{w}</span>
                                ))}
                                <span className="scrub-word inline-block mr-[0.25em] opacity-20 text-neutral-950 font-bold">liderar,</span>
                                {"no perderse en el ruido.".split(" ").map((w, i) => (
                                    <span key={`b-${i}`} className="scrub-word inline-block mr-[0.25em] opacity-20">{w}</span>
                                ))}
                            </p>
                        </div>

                        {/* Botón CTA */}
                        <div className="about-btn pt-2 lg:pt-6">
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
                    <div className="about-clip relative w-full h-full overflow-hidden shadow-2xl bg-neutral-200">
                        <div className="about-image-inner absolute inset-x-[-10%] inset-y-[-10%] w-[120%] h-[120%] z-0">
                            <Image
                                src="/images/about-awwwards.jpg"
                                alt="Diseño web con estrategia"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                priority
                            />
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
