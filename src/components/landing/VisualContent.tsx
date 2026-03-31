"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#_"

function ScrambleText({ text, duration = 1, className = "", as: Component = "span" }: { text: string, duration?: number, className?: string, as?: any }) {
    const containerRef = useRef<HTMLElement>(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.5 })

    useEffect(() => {
        const container = containerRef.current
        if (!container || !isInView) return

        container.innerHTML = ""
        const spans: HTMLSpanElement[] = []
        
        text.split("").forEach(ch => {
            if (ch === " " || ch === "\n") {
                 container.appendChild(document.createTextNode(ch))
            } else {
                 const span = document.createElement("span")
                 span.className = "inline-block will-change-transform text-center"
                 span.textContent = ch 
                 span.setAttribute("data-char", ch)
                 container.appendChild(span)
                 spans.push(span)
            }
        })

        requestAnimationFrame(() => {
            spans.forEach(span => {
                 const rect = span.getBoundingClientRect()
                 if (rect.width > 0) {
                     span.style.width = `${rect.width}px`
                 }
            })

            const startTime = performance.now()
            const frameInterval = 66; // ~15 FPS is enough for the scramble effect
            let lastUpdate = 0;

            const update = (currentTime: number) => {
                const elapsed = currentTime - startTime
                const totalDuration = duration * 1000

                if (elapsed >= totalDuration) {
                    spans.forEach(span => {
                        span.textContent = span.getAttribute("data-char")
                        span.style.width = "auto"
                    })
                    return
                }

                if (currentTime - lastUpdate >= frameInterval) {
                    lastUpdate = currentTime
                    spans.forEach(span => {
                        span.textContent = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
                    })
                }

                requestAnimationFrame(update)
            }

            requestAnimationFrame(update)
        })
    }, [text, isInView, duration])

    return <Component ref={containerRef} className={className} />
}

export default function VisualContent() {
    const containerRef = useRef<HTMLElement>(null)
    
    // Total scroll duration: 400vh
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // --- Timelines ---
    
    // HEADER: fades out immediately as scroll begins to remove "dead scroll" feel
    const headerOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0])

    // PROJECT 1 (OWO 3D) starts fading in simultaneously
    const p1Opacity = useTransform(scrollYProgress, [0, 0.04], [0, 1])
    const p1ClipPath = useTransform(scrollYProgress, [0, 0.08], ["inset(25% round 30px)", "inset(0% round 0px)"])
    const p1Scale = useTransform(scrollYProgress, [0, 0.08], [1.1, 1])
    const p1OverlayOpacity = useTransform(scrollYProgress, [0.04, 0.08, 0.12, 0.16], [0, 1, 1, 0])

    // PROJECT 2 (Viajes Oeste)
    const p2Opacity = useTransform(scrollYProgress, [0.12, 0.16], [0, 1]) 
    const p2ClipPath = useTransform(scrollYProgress, [0.12, 0.20], ["inset(25% round 30px)", "inset(0% round 0px)"])
    const p2Scale = useTransform(scrollYProgress, [0.12, 0.20], [1.1, 1])
    const p2OverlayOpacity = useTransform(scrollYProgress, [0.16, 0.20, 0.28, 0.32], [0, 1, 1, 0])

    // PROJECT 3 (Instituto Maria Reina)
    const p3Opacity = useTransform(scrollYProgress, [0.28, 0.32], [0, 1])
    const p3ClipPath = useTransform(scrollYProgress, [0.28, 0.36], ["inset(25% round 30px)", "inset(0% round 0px)"])
    const p3Scale = useTransform(scrollYProgress, [0.28, 0.36], [1.1, 1])
    const p3OverlayOpacity = useTransform(scrollYProgress, [0.32, 0.36, 0.44, 0.48], [0, 1, 1, 0])

    // PROJECT 4 (KOE DIGITAL)
    const p4Opacity = useTransform(scrollYProgress, [0.44, 0.48], [0, 1])
    const p4ClipPath = useTransform(scrollYProgress, [0.44, 0.52], ["inset(25% round 30px)", "inset(0% round 0px)"])
    const p4Scale = useTransform(scrollYProgress, [0.44, 0.52], [1.1, 1])
    const p4OverlayOpacity = useTransform(scrollYProgress, [0.48, 0.52, 0.60, 0.64], [0, 1, 1, 0])

    // PROJECT 5 (KLARK & TIGRE VERDE)
    const p5Opacity = useTransform(scrollYProgress, [0.60, 0.64], [0, 1])
    const p5ClipPath = useTransform(scrollYProgress, [0.60, 0.68], ["inset(25% round 30px)", "inset(0% round 0px)"])
    const p5Scale = useTransform(scrollYProgress, [0.60, 0.68], [1.1, 1])
    const p5OverlayOpacity = useTransform(scrollYProgress, [0.64, 0.68, 0.76, 0.80], [0, 1, 1, 0])

    // PROJECT 6 (ARTE A MEDIDA)
    const p6Opacity = useTransform(scrollYProgress, [0.76, 0.80], [0, 1])
    const p6ClipPath = useTransform(scrollYProgress, [0.76, 0.88], ["inset(25% round 30px)", "inset(0% round 0px)"])
    const p6Scale = useTransform(scrollYProgress, [0.76, 0.88], [1.1, 1])
    const p6OverlayOpacity = useTransform(scrollYProgress, [0.84, 0.88, 1.0, 1.0], [0, 1, 1, 1])

    const projectsTransform = [
        { clipPath: p1ClipPath, scale: p1Scale, opacity: p1Opacity, overlayOpacity: p1OverlayOpacity, zIndex: 10 },
        { clipPath: p2ClipPath, scale: p2Scale, opacity: p2Opacity, overlayOpacity: p2OverlayOpacity, zIndex: 20 },
        { clipPath: p3ClipPath, scale: p3Scale, opacity: p3Opacity, overlayOpacity: p3OverlayOpacity, zIndex: 30 },
        { clipPath: p4ClipPath, scale: p4Scale, opacity: p4Opacity, overlayOpacity: p4OverlayOpacity, zIndex: 40 },
        { clipPath: p5ClipPath, scale: p5Scale, opacity: p5Opacity, overlayOpacity: p5OverlayOpacity, zIndex: 50 },
        { clipPath: p6ClipPath, scale: p6Scale, opacity: p6Opacity, overlayOpacity: p6OverlayOpacity, zIndex: 60 }
    ]

    const PROJECTS = [
        { title: "OWO 3D", image: "/images/owo3d.png", link: "https://owo3d.fun" },
        { title: "Viajes Oeste", image: "/images/viajes-oeste.jpg", link: "https://viajesoeste-one.vercel.app" },
        { title: "Instituto Maria Reina", image: "/images/maria-reina.png", link: "https://page-institucional-two.vercel.app" },
        { title: "KOE DIGITAL", image: "/images/koe-digital.png", link: "https://koe-digital.vercel.app/" },
        { title: "KLARK & TIGRE VERDE", image: "/images/clark-tigre.png", link: "https://www.clarkytigreverde.com/" },
        { title: "ARTE A MEDIDA", image: "/images/arte-fondo.png", link: "https://arteamedida.vercel.app/" }
    ]

    return (
        <section ref={containerRef} id="visual-content" className="relative h-[700vh] w-full bg-black">
            {/* Contenedor Sticky */}
            <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-transparent">
                
                {/* Header (Fades out) */}
                <motion.div 
                    style={{ opacity: headerOpacity }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-[5] text-center w-full px-4 pointer-events-none"
                >
                    <motion.div
                        initial={{ y: 150, opacity: 0, scale: 0.9 }}
                        whileInView={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        viewport={{ once: true, amount: 0.1 }}
                        className="flex flex-col items-center justify-center max-w-full"
                    >
                        <h2 className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-[rgba(255,255,255,0.9)] via-[rgba(200,200,200,0.8)] to-[rgba(150,150,150,0.6)] leading-none select-none text-center drop-shadow-2xl mb-6">
                            RESPALDO VISUAL
                        </h2>
                        <div className="border-l-4 border-accent pl-6 inline-block bg-black/50 p-6 rounded-2xl backdrop-blur-md max-w-4xl mx-auto shadow-2xl">
                            <p className="text-xl md:text-2xl font-medium text-white/90 text-left leading-relaxed">
                                <ScrambleText duration={0.8} text="Cada proyecto está diseñado con un objetivo claro: comunicar mejor, generar confianza y convertir visitas en clientes." />
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Stacking Images */}
                {PROJECTS.map((col, index) => {
                    const transforms = projectsTransform[index]
                    return (
                        <motion.div
                            key={index}
                            style={{ 
                                opacity: transforms.opacity,
                                clipPath: transforms.clipPath,
                                zIndex: transforms.zIndex
                            }}
                            className="absolute inset-0 w-full h-full bg-neutral-900 shadow-2xl origin-center"
                        >
                            {/* Scaled Inner Image Wrapper */}
                            <motion.div 
                                style={{ scale: transforms.scale }}
                                className="absolute inset-0 w-full h-full"
                            >
                                {/* 1. Blurred Background Filler (Ocupa el 100% pase lo que pase) */}
                                <Image
                                    src={col.image}
                                    alt="Background filler"
                                    fill
                                    sizes="100vw"
                                    className="object-cover blur-[40px] opacity-60 scale-110"
                                    priority={index === 0}
                                />
                                
                                {/* 2. Main Image (Contenida sin recortes) */}
                                <Image
                                    src={col.image}
                                    alt={col.title}
                                    fill
                                    sizes="100vw"
                                    className="object-contain drop-shadow-2xl"
                                    priority={index === 0}
                                />
                                {/* Gradiente oscuro para que el texto resalte */}
                                <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                            </motion.div>

                            {/* Floating Overlay Info */}
                            <motion.div 
                                style={{ opacity: transforms.overlayOpacity }}
                                className="absolute inset-0 pointer-events-none"
                            >
                                {/* Center Link UI */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                                    <Link 
                                        href={col.link} 
                                        target="_blank"
                                        className="group relative w-48 h-48 sm:w-64 sm:h-64 rounded-[2rem] overflow-hidden flex flex-col items-center justify-center border-2 border-white/20 hover:border-white/80 bg-black/20 hover:bg-black/40 backdrop-blur-md transition-all duration-500 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_80px_-15px_rgba(255,255,255,0.2)] hover:-translate-y-2 cursor-pointer pointer-events-auto"
                                    >
                                        {/* Link inner gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        
                                        {/* Placeholder visual layout for the user to add the logo */}
                                        <span className="text-white/80 group-hover:text-white font-black text-xl tracking-[0.2em] uppercase mb-4 transition-colors">
                                            LOGO
                                        </span>
                                        <div className="w-16 h-16 rounded-full border border-dashed border-white/40 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500">
                                             <span className="text-[10px] text-white/50 text-center leading-tight">Tu<br/>Logo<br/>Aquí</span>
                                        </div>
                                        <span className="absolute bottom-6 text-xs font-bold text-white/50 group-hover:text-primary transition-colors duration-500 uppercase tracking-widest">
                                            Ingresar
                                        </span>
                                    </Link>
                                </div>
                                
                                {/* Bottom Right Title (Smaller Font) */}
                                <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] tracking-tighter text-right uppercase">
                                        {col.title}
                                    </h3>
                                </div>
                            </motion.div>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}
