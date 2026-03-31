"use client"
import { motion, useTransform, useScroll, useSpring } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import NextImage from "next/image"

export function HeroTransition() {
    const containerRef = useRef<HTMLDivElement>(null)
    const esenciaAnchorRef = useRef<HTMLDivElement>(null)

    const [centerOffset, setCenterOffset] = useState({ x: 0, y: 0 })
    const [logoOffset, setLogoOffset] = useState({ x: 0, y: 0 })
    const [isMobile, setIsMobile] = useState(true)
    const [isMounted, setIsMounted] = useState(false)

    // Scroll-driven progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Smoothing the scroll progress for that extra "premium" feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    useEffect(() => {
        setIsMounted(true)
        const checkLayout = () => {
            const width = window.innerWidth
            const height = window.innerHeight
            const mobile = width < 768
            const lg = width >= 1024

            setIsMobile(mobile)

            if (esenciaAnchorRef.current) {
                const rect = esenciaAnchorRef.current.getBoundingClientRect()
                const screenCenterX = width / 2
                const screenCenterY = height / 2
                const targetCenterX = rect.left + (rect.width / 2)
                const targetCenterY = rect.top + (rect.height / 2)

                setCenterOffset({
                    x: (screenCenterX - targetCenterX) + (mobile ? 40 : 75),
                    y: screenCenterY - targetCenterY
                })
            }

            const logoRightMargin = lg ? 80 : (mobile ? 24 : 48);
            const logoWidth = mobile ? 96 : 128;
            const logoNativeCenterX = width - logoRightMargin - (logoWidth / 2);
            const logoTargetInitialX = width / 2;
            const logoMoveX = logoTargetInitialX - logoNativeCenterX;
            setLogoOffset({ x: logoMoveX, y: 0 });
        }

        checkLayout()
        window.addEventListener('resize', checkLayout)
        const timer = setTimeout(checkLayout, 100)
        return () => {
            window.removeEventListener('resize', checkLayout)
            clearTimeout(timer)
        }
    }, [])

    // --- TRANSFORMATIONS ---
    const webxNudge = isMobile ? -30 : -50;

    // ESENCIA
    const esenciaX = useTransform(smoothProgress, [0.0, 0.05, 0.15, 0.45], [
        isMounted ? centerOffset.x : 0,
        isMounted ? centerOffset.x + webxNudge : 0,
        isMounted ? centerOffset.x + webxNudge : 0,
        0
    ])
    const esenciaY = useTransform(smoothProgress, [0.1, 0.45], [isMounted ? centerOffset.y : 0, 0])
    const esenciaScale = useTransform(smoothProgress, [0.1, 0.45], [isMobile ? 0.85 : 1.1, 1])
    const iaColor = useTransform(smoothProgress, [0.70, 0.75], ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0)"])

    // .webx
    const webxOpacity = useTransform(smoothProgress, [0.0, 0.05, 0.15, 0.25], [0, 1, 1, 0])

    // LOGO
    const logoX = useTransform(smoothProgress, [0.1, 0.45], [isMounted ? logoOffset.x : 0, 0])
    const logoY = useTransform(smoothProgress, [0.1, 0.45], [isMounted ? logoOffset.y : 0, 0])
    const logoScale = useTransform(smoothProgress, [0.1, 0.45], [isMobile ? 1.1 : 1.4, 1])

    // "EN"
    const enOpacity = useTransform(smoothProgress, [0.4, 0.50], [0, 1])
    const enX = useTransform(smoothProgress, [0.4, 0.50], [-30, 0])

    // SUBTEXT
    const line1Opacity = useTransform(smoothProgress, [0.45, 0.55], [0, 1])
    const line1Y = useTransform(smoothProgress, [0.45, 0.55], [30, 0])
    const line2Opacity = useTransform(smoothProgress, [0.55, 0.65], [0, 1])
    const line2Y = useTransform(smoothProgress, [0.55, 0.65], [30, 0])

    // WORD REPLACEMENT
    const w1Opacity = useTransform(smoothProgress, [0.70, 0.75], [1, 0])
    const w1Y = useTransform(smoothProgress, [0.70, 0.75], [0, -20])
    const w2Opacity = useTransform(smoothProgress, [0.72, 0.77, 0.80, 0.85], [0, 1, 1, 0])
    const w2Y = useTransform(smoothProgress, [0.72, 0.77, 0.80, 0.85], [20, 0, 0, -20])
    const w3Opacity = useTransform(smoothProgress, [0.82, 0.87, 0.90, 0.95], [0, 1, 1, 0])
    const w3Y = useTransform(smoothProgress, [0.82, 0.87, 0.90, 0.95], [20, 0, 0, -20])
    const w4Opacity = useTransform(smoothProgress, [0.92, 0.97], [0, 1])
    const w4Y = useTransform(smoothProgress, [0.92, 0.97], [20, 0])

    return (
        <div ref={containerRef} className="relative h-[300vh] md:h-[400vh] bg-[#0a0a0a]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col pt-8 md:pt-16 px-6 md:px-12 lg:px-20 pb-8">

                {/* Noise Grain Overlay - OPTIMIZED: Static CSS noise, 80% lighter than SVG feTurbulence */}
                <div 
                    className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay" 
                    style={{ backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXVtbW1mz1mx1mxycmJubm5tbm1tbW1tbW1tbW1wbG9pbm1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1tbW1btZWXAAAAB3RSTlP88M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8P8M8OPXFAAAAAElFTkSuQmCC")` }} 
                />

                {/* Subtle Gradient Atmosphere - Optimized: Less blur, better performance */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15] mix-blend-screen">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent blur-2xl" />
                </div>
                
                {/* Background Typography - Constantly Moving */}
                <div className="absolute flex flex-col justify-center inset-0 gap-4 opacity-[0.03] pointer-events-none select-none z-0 overflow-hidden">
                    <motion.div 
                        initial={{ x: "0%" }}
                        animate={{ x: "-50%" }}
                        transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
                        className="text-[15vw] md:text-[12vw] font-black whitespace-nowrap leading-none tracking-tighter will-change-transform"
                    >
                        DISEÑO WEB DISEÑO WEB DISEÑO WEB DISEÑO WEB DISEÑO WEB DISEÑO WEB
                    </motion.div>
                    <motion.div 
                        initial={{ x: "-50%" }}
                        animate={{ x: "0%" }}
                        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                        className="text-[15vw] md:text-[12vw] font-black whitespace-nowrap leading-none tracking-tighter text-transparent will-change-transform" style={{ WebkitTextStroke: "2px rgba(255,255,255,1)" }}
                    >
                        EXPERIENCIA DIGITAL EXPERIENCIA DIGITAL EXPERIENCIA DIGITAL EXPERIENCIA DIGITAL
                    </motion.div>
                    <motion.div 
                        initial={{ x: "0%" }}
                        animate={{ x: "-50%" }}
                        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                        className="text-[15vw] md:text-[12vw] font-black whitespace-nowrap leading-none tracking-tighter will-change-transform"
                    >
                        ESTRATEGIA DIGITAL ESTRATEGIA DIGITAL ESTRATEGIA DIGITAL ESTRATEGIA DIGITAL
                    </motion.div>
                </div>

                {/* Logo - Fixed Z-index and GPU acceleration */}
                <motion.div
                    style={{ x: logoX, y: logoY, scale: logoScale }}
                    className="absolute top-12 right-6 md:top-24 md:right-12 lg:right-20 z-50 w-24 h-24 md:w-32 md:h-32 pointer-events-none origin-top will-change-transform"
                >
                    <NextImage
                        src="/logo.png"
                        alt="Esencia IA"
                        fill
                        priority
                        className="object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    />
                </motion.div>

                {/* Content Container */}
                <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between mt-20 md:mt-32">
                    <div className="flex flex-col w-full">
                        {/* LINE 1: ESENCIA */}
                        <div className="flex items-center w-full h-16 md:h-32 mb-2 md:mb-4">
                            <motion.span style={{ opacity: enOpacity, x: enX }} className="text-4xl md:text-7xl font-thin text-white/40 tracking-[0.2em] italic mr-4 md:mr-8">
                                EN
                            </motion.span>
                            <div ref={esenciaAnchorRef} className="inline-flex items-end justify-center z-30">
                                <motion.div style={{ x: esenciaX, y: esenciaY, scale: esenciaScale }} className="flex items-end transform-gpu origin-center will-change-transform">
                                    <h1 className="text-[3rem] sm:text-[5rem] md:text-[8rem] lg:text-[10rem] xl:text-[10.5rem] font-black tracking-tighter leading-none whitespace-nowrap">
                                        <span className="text-white">ESENC</span>
                                        <span className="relative">
                                            <motion.span style={{ color: iaColor }} className="relative z-10 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text">
                                                IA
                                            </motion.span>
                                        </span>
                                    </h1>
                                    <motion.span style={{ opacity: webxOpacity }} className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-light text-primary tracking-tight ml-2 md:ml-4 pb-2 md:pb-4">
                                        .webx
                                    </motion.span>
                                </motion.div>
                            </div>
                        </div>

                        {/* STACKED SUBTEXT */}
                        <div className="flex flex-col w-full pb-8 z-20">
                            <motion.div style={{ opacity: line1Opacity, y: line1Y }} className="w-full will-change-transform">
                                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white/90 tracking-tight leading-tight md:leading-none">
                                    realizamos diseño web
                                </h2>
                            </motion.div>
                            <motion.div style={{ opacity: line2Opacity, y: line2Y }} className="w-full mt-1 md:mt-2 will-change-transform">
                                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-tight md:leading-none flex items-baseline pr-2 md:pr-0">
                                    <span className="text-white/90 mr-3 md:mr-4">con</span>
                                    <span className="relative inline-block min-w-[300px] md:min-w-[500px] lg:min-w-[650px]">
                                        <span className="opacity-0 pointer-events-none">comunicación</span>
                                        <motion.span style={{ opacity: w1Opacity, y: w1Y }} className="absolute top-0 left-0 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">propósito</motion.span>
                                        <motion.span style={{ opacity: w2Opacity, y: w2Y }} className="absolute top-0 left-0 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">comunicación</motion.span>
                                        <motion.span style={{ opacity: w3Opacity, y: w3Y }} className="absolute top-0 left-0 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">conversión</motion.span>
                                        <motion.span style={{ opacity: w4Opacity, y: w4Y }} className="absolute top-0 left-0 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">identidad</motion.span>
                                    </span>
                                </h2>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
