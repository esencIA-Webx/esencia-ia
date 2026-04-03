"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"

export function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null)
    const counterRef  = useRef<HTMLDivElement>(null)
    const logoRef     = useRef<HTMLDivElement>(null)
    const lineRef     = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = containerRef.current
        if (!el || !counterRef.current || !logoRef.current) return

        document.body.style.overflow = "hidden"

        const tl = gsap.timeline()

        // ── 1. Logo entra con perspectiva 3D (rotateX desde 90deg) ──
        gsap.set(logoRef.current, { rotationX: 90, opacity: 0, transformPerspective: 800, transformOrigin: "50% 100%" })
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" })

        tl.to(logoRef.current, {
            rotationX: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out"
        }, 0)

        // ── 2. Línea bajo el logo se extiende ──
        tl.to(lineRef.current, {
            scaleX: 1,
            duration: 0.6,
            ease: "power2.out"
        }, 0.4)

        // ── 3. Contador 0 → 100 ──
        const counter = { value: 0 }
        tl.to(counter, {
            value: 100,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate: () => {
                if (counterRef.current) {
                    counterRef.current.innerText = Math.round(counter.value) + "%"
                }
            }
        }, 0.3)

        // ── 4. SALIDA — cubierta con clip-path que sube en 3 franjas ──
        // Partimos el overlay en tres para recrear el efecto "venetian blind" 3D
        const stripes = el.querySelectorAll<HTMLElement>(".preloader-stripe")

        tl.to(stripes, {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 0.7,
            stagger: 0.07,
            ease: "power4.inOut",
            onComplete: () => {
                document.body.style.overflow = ""
                gsap.set(el, { display: "none" })

                // ── 5. Animación 3D de bienvenida al contenido de la página ──
                const mainContent = document.getElementById("page-content")
                if (mainContent) {
                    gsap.fromTo(mainContent,
                        {
                            rotationX: 8,
                            scale: 0.94,
                            opacity: 0,
                            transformPerspective: 1200,
                            transformOrigin: "50% 0%",
                            y: 40,
                        },
                        {
                            rotationX: 0,
                            scale: 1,
                            opacity: 1,
                            y: 0,
                            duration: 1.1,
                            ease: "power3.out"
                        }
                    )
                }
            }
        }, "+=0.15")

    }, [])

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[999999] bg-zinc-950 text-white overflow-hidden"
            aria-hidden
        >
            {/* ── Franjas de salida (venetian blind) ── */}
            {[0, 1, 2].map(i => (
                <div
                    key={i}
                    className="preloader-stripe absolute top-0 bottom-0 bg-zinc-950"
                    style={{
                        left:  `${(i / 3) * 100}%`,
                        width: `${(1  / 3) * 100}%`,
                        zIndex: 10,
                        transformOrigin: "top center",
                    }}
                />
            ))}

            {/* ── Contenido central del preloader ── */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-0">

                {/* Logo */}
                <div ref={logoRef} className="flex flex-col items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="Esencia IA"
                        width={120}
                        height={120}
                        className="object-contain"
                        priority
                    />
                    {/* Línea expansiva bajo el logo */}
                    <div
                        ref={lineRef}
                        className="h-[1px] w-32 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                    />
                </div>

                {/* Contador */}
                <div
                    ref={counterRef}
                    className="text-7xl md:text-8xl font-black tracking-tighter tabular-nums text-white/90 mt-2"
                >
                    0%
                </div>

                {/* Label inferior */}
                <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/30 mt-1">
                    Cargando experiencia
                </p>
            </div>
        </div>
    )
}
