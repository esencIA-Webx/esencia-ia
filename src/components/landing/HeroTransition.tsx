"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import NextImage from "next/image"

export function HeroTransition() {
    const containerRef = useRef<HTMLDivElement>(null)
    const esenciaAnchorRef = useRef<HTMLDivElement>(null)

    const [centerOffset, setCenterOffset] = useState({ x: 0, y: 0 })
    const [logoOffset, setLogoOffset] = useState({ x: 0, y: 0 })
    const [isMobile, setIsMobile] = useState(true)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        const checkLayout = () => {
            const width = window.innerWidth
            const height = window.innerHeight
            const mobile = width < 768
            const lg = width >= 1024

            setIsMobile(mobile)

            // 1. ESENCIA calculations (starts centered)
            // To ensure PERFECT geometric centering regardless of font bounding box quirks:
            if (esenciaAnchorRef.current) {
                const rect = esenciaAnchorRef.current.getBoundingClientRect()
                const screenCenterX = width / 2
                const screenCenterY = height / 2

                // We calculate the exact center of the *entire* EN ESENCIA .webx div container initially
                // so the logo and this block align exactly on the vertical line.
                const targetCenterX = rect.left + (rect.width / 2)
                const targetCenterY = rect.top + (rect.height / 2)

                // The user explicitly requested it be shifted further to the RIGHT to land right under the Owl visually
                setCenterOffset({
                    x: (screenCenterX - targetCenterX) + 75,
                    y: screenCenterY - targetCenterY
                })
            }

            // 2. LOGO calculations. Target is TOP RIGHT natively, starts TOP CENTER.
            const logoRightMargin = lg ? 80 : (mobile ? 24 : 48);
            const logoWidth = mobile ? 96 : 128;
            const logoNativeCenterX = width - logoRightMargin - (logoWidth / 2);

            const logoTargetInitialX = width / 2;
            const logoMoveX = logoTargetInitialX - logoNativeCenterX;

            // Target Y is roughly the same height as the final position, just centered horizontally
            const logoMoveY = 0;
            setLogoOffset({ x: logoMoveX, y: logoMoveY });
        }

        checkLayout()
        window.addEventListener('resize', checkLayout)
        setTimeout(checkLayout, 100)
        return () => window.removeEventListener('resize', checkLayout)
    }, [])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 35,
        restDelta: 0.001
    })

    // --- ORCHESTRATION ---

    // 0. The "Push" for .webx
    // When .webx appears, ESENCIA itself needs to nudge slightly left so the entire block remains visually centered
    // Since centerOffset.x is the distance to the exact center, we subtract a small amount when .webx is visible.
    const webxNudge = isMobile ? -30 : -50; // offset in px when .webx is fully visible

    // 1. ESENCIA
    // Timeline: 
    // 0.0 -> Dead center
    // 0.05 -> .webx appears, push left
    // 0.15 -> start moving to final spot
    // 0.45 -> rested in final spot
    const esenciaX = useTransform(smoothProgress, [0.0, 0.05, 0.15, 0.45], [
        isMounted ? centerOffset.x : 0,
        isMounted ? centerOffset.x + webxNudge : 0,
        isMounted ? centerOffset.x + webxNudge : 0,
        0
    ])

    const esenciaY = useTransform(smoothProgress, [0.1, 0.45], [isMounted ? centerOffset.y : 0, 0])
    const esenciaScale = useTransform(smoothProgress, [0.1, 0.45], [isMobile ? 0.9 : 1.1, 1])

    // "IA" Gradient transition -> At the arrival of the word "propósito" (0.70 -> 0.75)
    // The span itself has the background gradient. We blend the native text color from white to transparent to reveal it.
    const iaColor = useTransform(smoothProgress, [0.70, 0.75], ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0)"])

    // 2. .webx Element
    const webxOpacity = useTransform(smoothProgress, [0.0, 0.05, 0.15, 0.25], [0, 1, 1, 0])

    // 3. LOGO
    const logoX = useTransform(smoothProgress, [0.1, 0.45], [isMounted ? logoOffset.x : 0, 0])
    const logoY = useTransform(smoothProgress, [0.1, 0.45], [isMounted ? logoOffset.y : 0, 0])
    const logoScale = useTransform(smoothProgress, [0.1, 0.45], [isMobile ? 1.2 : 1.4, 1])

    // 4. "EN"
    // Delay EN slightly so it doesn't overlap ESENCIA while ESENCIA is still huge and moving
    const enOpacity = useTransform(smoothProgress, [0.4, 0.50], [0, 1])
    const enX = useTransform(smoothProgress, [0.4, 0.50], [-30, 0])

    // 5. SUBTEXT
    const line1Opacity = useTransform(smoothProgress, [0.45, 0.55], [0, 1])
    const line1Y = useTransform(smoothProgress, [0.45, 0.55], [30, 0])

    const line2Opacity = useTransform(smoothProgress, [0.55, 0.65], [0, 1])
    const line2Y = useTransform(smoothProgress, [0.55, 0.65], [30, 0])

    // 6. SCROLL-DRIVEN WORD REPLACEMENT ("con propósito")
    // w1Opacity starts fully visible (1), fades out exactly when the next word arrives
    const w1Opacity = useTransform(smoothProgress, [0.70, 0.75], [1, 0]) // propósito
    const w1Y = useTransform(smoothProgress, [0.70, 0.75], [0, -20])

    const w2Opacity = useTransform(smoothProgress, [0.72, 0.77, 0.80, 0.85], [0, 1, 1, 0]) // comunicación
    const w2Y = useTransform(smoothProgress, [0.72, 0.77, 0.80, 0.85], [20, 0, 0, -20])

    const w3Opacity = useTransform(smoothProgress, [0.82, 0.87, 0.90, 0.95], [0, 1, 1, 0]) // conversión
    const w3Y = useTransform(smoothProgress, [0.82, 0.87, 0.90, 0.95], [20, 0, 0, -20])

    const w4Opacity = useTransform(smoothProgress, [0.92, 0.97], [0, 1]) // identidad
    const w4Y = useTransform(smoothProgress, [0.92, 0.97], [20, 0])

    // 7. ABOUT SECTION
    const aboutOpacity = useTransform(smoothProgress, [0.80, 0.95], [0, 1])
    const aboutY = useTransform(smoothProgress, [0.80, 0.95], [40, 0])

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col pt-4 md:pt-8 px-6 md:px-12 lg:px-20 pb-8">

                {/* Subtle Grain/Noise Backdrop */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent blur-3xl" />
                </div>

                <motion.div
                    style={{
                        x: logoX,
                        y: logoY,
                        scale: logoScale,
                    }}
                    className="absolute top-4 right-6 md:top-8 md:right-12 lg:right-20 z-50 w-24 h-24 md:w-32 md:h-32 pointer-events-none origin-top"
                >
                    <NextImage
                        src="/logo.png"
                        alt="Esencia IA"
                        fill
                        priority
                        className="object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    />
                </motion.div>

                {/* Main Fully-Balanced Content Container */}
                <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between mt-8 md:mt-16">

                    {/* Typographic Header Block */}
                    <div className="flex flex-col w-full">

                        {/* LINE 1: EN ESENCIA .webx */}
                        {/* We center this main container initially on screen load via the offset calculation */}
                        <div className="flex items-center w-full h-16 md:h-32 mb-2 md:mb-4">
                            <motion.span
                                style={{
                                    opacity: enOpacity,
                                    x: enX,
                                }}
                                className="text-4xl md:text-7xl font-thin text-white/40 tracking-[0.2em] italic mr-4 md:mr-8"
                            >
                                EN
                            </motion.span>

                            <div ref={esenciaAnchorRef} className="inline-flex items-end justify-center z-30">
                                <motion.div
                                    style={{
                                        x: esenciaX,
                                        y: esenciaY,
                                        scale: esenciaScale,
                                    }}
                                    className="flex items-end transform-gpu origin-center"
                                >
                                    <h1 className="text-[3rem] sm:text-[5rem] md:text-[8rem] lg:text-[10rem] xl:text-[10.5rem] font-black tracking-tighter leading-none whitespace-nowrap">
                                        <span className="text-white">ESENC</span>
                                        <span className="relative group cursor-default">
                                            {/* The foreground text that fades to transparent to show its own background gradient clip */}
                                            <motion.span
                                                style={{ color: iaColor }}
                                                className="relative z-10 transition-colors duration-300 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text"
                                            >
                                                IA
                                            </motion.span>
                                        </span>
                                    </h1>

                                    <motion.span
                                        style={{ opacity: webxOpacity }}
                                        className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-light text-primary tracking-tight ml-2 md:ml-4 pb-2 md:pb-4"
                                    >
                                        .webx
                                    </motion.span>
                                </motion.div>
                            </div>
                        </div>

                        {/* STACKED SUBTEXT: realizamos diseño web / con propósito */}
                        {/* Removed overflow-hidden entirely to ensure the absolute words show. Given high z-index. */}
                        <div className="flex flex-col w-full pb-8 z-20">
                            <motion.div style={{ opacity: line1Opacity, y: line1Y }} className="w-full">
                                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white/90 tracking-tight leading-tight md:leading-none">
                                    realizamos diseño web
                                </h2>
                            </motion.div>

                            <motion.div style={{ opacity: line2Opacity, y: line2Y }} className="w-full mt-1 md:mt-2">
                                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight leading-tight md:leading-none flex items-baseline pr-2 md:pr-0">
                                    <span className="text-white/90 mr-3 md:mr-4">con</span>

                                    {/* The Dynamic Word Container */}
                                    <span className="relative inline-block min-w-[300px] md:min-w-[500px] lg:min-w-[650px]">

                                        {/* Invisible placeholder for scale */}
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

                    {/* RESTORED ABOUT SECTION GRID */}
                    <motion.div style={{ opacity: aboutOpacity, y: aboutY }} className="w-full grid md:grid-cols-2 gap-6 md:gap-16 items-center mt-2 md:mt-8 z-10">
                        {/* Paragraph */}
                        <div className="space-y-3 md:space-y-6 max-w-lg">
                            <p className="border-l-4 border-primary pl-4 md:pl-6 text-base md:text-xl font-semibold text-white/90 leading-tight md:leading-snug">
                                Nuestro enfoque combina estrategia y diseño consciente.
                            </p>
                            <p className="text-sm md:text-lg text-white/60 leading-relaxed hidden sm:block">
                                Creamos sitios pensados para cumplir un objetivo concreto: comunicar con claridad, generar confianza y acompañar el crecimiento de cada proyecto. Una presencia digital que refleja la verdadera esencia de tu marca.
                            </p>
                        </div>

                        {/* Image */}
                        <div className="relative h-28 sm:h-40 md:h-[280px] w-full border border-white/10 overflow-hidden shadow-2xl rounded-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10" />
                            <NextImage
                                src="/images/about-main-new.png"
                                alt="Diseño con propósito"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                </div>

                {/* Progress Scroll Hint */}
                <motion.div
                    style={{
                        scaleY: useTransform(smoothProgress, [0, 1], [1, 0]),
                        opacity: useTransform(smoothProgress, [0, 0.1], [0.3, 0])
                    }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[1px] h-12 md:h-20 bg-gradient-to-b from-white to-transparent origin-bottom"
                />
            </div>
        </div>
    )
}
