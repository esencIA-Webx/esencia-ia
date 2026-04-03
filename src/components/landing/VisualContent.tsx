"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin"

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin)
}

const PROJECTS = [
    { title: "OWO 3D",              category: "Interactive 3D",     image: "/images/owo3d.png",        link: "https://owo3d.fun" },
    { title: "Viajes Oeste",         category: "Web Design",         image: "/images/viajes-oeste.png", link: "https://viajesoeste-one.vercel.app" },
    { title: "Inst. Maria Reina",    category: "Institutional",      image: "/images/maria-reina.png",  link: "https://page-institucional-two.vercel.app" },
    { title: "KOE DIGITAL",          category: "Creative Agency",    image: "/images/koe-digital.png",  link: "https://koe-digital.vercel.app/" },
    { title: "CLARK & TIGRE",        category: "E-Commerce",         image: "/images/clark-tigre.png",  link: "https://www.clarkytigreverde.com/" },
    { title: "ARTE A MEDIDA",        category: "Portfolio",          image: "/images/arte-fondo.png",   link: "https://arteamedida.vercel.app/" }
]

export default function VisualContent() {
    const containerRef = useRef<HTMLElement>(null)

    useGSAP(() => {
        // Estado inicial: todas las imagenes ocultas excepto la primera
        PROJECTS.forEach((_, i) => {
            if (i === 0) {
                gsap.set(`.vc-panel-${i}`, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)" })
                gsap.set(`.vc-scale-${i}`, { scale: 1 })
                gsap.set(`.vc-hud-${i}`,   { autoAlpha: 1, y: 0 })
            } else {
                // Cada panel empieza "oculto" con clip-path cerrado desde la derecha
                gsap.set(`.vc-panel-${i}`, { autoAlpha: 1, clipPath: "inset(0% 100% 0% 0%)" })
                gsap.set(`.vc-scale-${i}`, { scale: 1.06 })
                gsap.set(`.vc-hud-${i}`,   { autoAlpha: 0, y: 30 })
            }
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5,
            }
        })

        let t = 0

        for (let i = 1; i < PROJECTS.length; i++) {
            // SALIDA: el panel anterior se hace zoom-in y se oscurece ligeramente
            tl.to(`.vc-scale-${i-1}`, {
                scale: 1.06,
                duration: 1.2,
                ease: "power2.inOut"
            }, t)
            tl.to(`.vc-overlay-${i-1}`, {
                opacity: 0.35,
                duration: 1.2,
                ease: "power2.inOut"
            }, t)

            // ENTRADA: clip-path wipe horizontal de derecha a izquierda
            // El nuevo panel se "desvela" barriendo desde el borde derecho
            tl.to(`.vc-panel-${i}`, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.4,
                ease: "power3.inOut"
            }, t)
            tl.to(`.vc-scale-${i}`, {
                scale: 1,
                duration: 1.4,
                ease: "power3.inOut"
            }, t)

            // HUD: el anterior sube y desaparece
            tl.to(`.vc-hud-${i-1}`, {
                autoAlpha: 0,
                y: -30,
                duration: 0.5,
                ease: "power2.in"
            }, t + 0.1)

            // HUD: el nuevo aparece desde abajo con efecto scramble en el título
            tl.to(`.vc-hud-${i}`, {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            }, t + 0.7)

            tl.to(`.vc-title-${i}`, {
                scrambleText: {
                    text: PROJECTS[i].title,
                    chars: "upperCase",
                    speed: 0.3,
                    revealDelay: 0.1
                },
                duration: 0.8
            }, t + 0.9)

            // Pulso de línea separadora al transicionar
            tl.fromTo(`.vc-line`, {
                scaleX: 0,
                transformOrigin: "left center"
            }, {
                scaleX: 1,
                duration: 0.4,
                ease: "power2.out"
            }, t + 0.4)
            tl.to(`.vc-line`, {
                scaleX: 0,
                transformOrigin: "right center",
                duration: 0.4,
                ease: "power2.in"
            }, t + 0.8)

            // Pausa de contemplación entre transiciones
            t += 1.8
        }

    }, { scope: containerRef })

    return (
        <section
            ref={containerRef}
            id="visual-content"
            className="relative w-full bg-black"
            style={{ height: `${PROJECTS.length * 150}vh` }}
        >
            {/* Panel fijo sticky */}
            <div className="sticky top-0 w-full h-screen overflow-hidden">

                {/* ─── Capas de imágenes apiladas ─── */}
                {PROJECTS.map((proj, i) => (
                    <div
                        key={i}
                        className={`vc-panel-${i} absolute inset-0 w-full h-full`}
                        style={{ zIndex: i + 1 }}
                    >
                        {/* Imagen a pantalla completa */}
                        <div className={`vc-scale-${i} absolute inset-0 w-full h-full origin-center`}>
                            <Image
                                src={proj.image}
                                alt={proj.title}
                                fill
                                sizes="100vw"
                                className="object-cover"
                                priority={i === 0}
                            />
                        </div>

                        {/* Overlay muy sutil — solo para dar contraste al HUD */}
                        <div
                            className={`vc-overlay-${i} absolute inset-0 pointer-events-none`}
                            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)", opacity: i === 0 ? 0.15 : 0 }}
                        />

                        {/* Botón de visita — centrado, invisible hasta hover */}
                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                            <Link
                                href={proj.link}
                                target="_blank"
                                className="group pointer-events-auto flex items-center gap-3 px-7 py-4 rounded-full border border-white/25 bg-white/5 backdrop-blur-xl text-white/80 hover:bg-white/15 hover:border-white/60 hover:text-white transition-all duration-500 cursor-none opacity-0 group-hover:opacity-100 translate-y-3 hover:translate-y-0"
                                style={{ opacity: 0, transition: "opacity 0.5s, transform 0.5s" }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLAnchorElement
                                    el.style.opacity = "1"
                                    el.style.transform = "translateY(0)"
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLAnchorElement
                                    el.style.opacity = "0"
                                    el.style.transform = "translateY(12px)"
                                }}
                            >
                                <span className="text-sm font-bold tracking-widest uppercase">Visitar sitio</span>
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                ))}

                {/* ─── Línea de pulso de transición ─── */}
                <div
                    className="vc-line pointer-events-none absolute left-0 right-0 top-1/2 h-[1px] bg-white/60 z-[100]"
                    style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
                />

                {/* ─── HUD flotante (número + título + categoría) ─── */}
                {PROJECTS.map((proj, i) => (
                    <div
                        key={i}
                        className={`vc-hud-${i} absolute bottom-8 left-8 md:bottom-12 md:left-12 z-[50] pointer-events-none`}
                        style={{ willChange: "transform, opacity" }}
                    >
                        <div className="flex items-end gap-3 mb-2">
                            <span className="text-[3.5rem] md:text-[5rem] font-black text-white leading-none tabular-nums tracking-tighter opacity-90">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-xl text-white/30 font-light mb-3 tabular-nums">
                                /{String(PROJECTS.length).padStart(2, "0")}
                            </span>
                        </div>
                        <p className="text-[11px] font-mono tracking-[0.3em] uppercase text-primary mb-1">
                            {proj.category}
                        </p>
                        <h3 className={`vc-title-${i} text-3xl md:text-5xl font-extrabold text-white tracking-tight uppercase leading-none`}>
                            {i === 0 ? proj.title : ""}
                        </h3>
                    </div>
                ))}

                {/* ─── Barra de progreso inferior ─── */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-[50]">
                    {PROJECTS.map((_, i) => (
                        <div
                            key={i}
                            className={`vc-progress-${i} absolute top-0 h-full bg-primary`}
                            style={{
                                left: `${(i / PROJECTS.length) * 100}%`,
                                width: `${(1 / PROJECTS.length) * 100}%`,
                                opacity: 0
                            }}
                        />
                    ))}
                </div>

            </div>
        </section>
    )
}
