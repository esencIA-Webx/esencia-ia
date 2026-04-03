"use client"

import { motion, useTransform, useMotionValue, animate } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import NextImage from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { SplitText } from "gsap/SplitText"

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, SplitText)
}

// Puntos de anclaje de animación para emular el scroll original
const MILESTONES = [0.0, 0.15, 0.48, 0.65, 0.77, 0.87, 1.0];
const TOTAL_STEPS = MILESTONES.length - 1;

export function HeroTransition() {
    const containerRef = useRef<HTMLDivElement>(null)
    const esenciaAnchorRef = useRef<HTMLDivElement>(null)

    const [centerOffset, setCenterOffset] = useState({ x: 0, y: 0 })
    const [logoOffset, setLogoOffset] = useState({ x: 0, y: 0 })
    const [isMobile, setIsMobile] = useState(true)
    const [isMounted, setIsMounted] = useState(false)

    // Virtual Scroll State
    const [currentStep, setCurrentStep] = useState(0);
    const isAnimatingRef = useRef(false);
    const unlockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // This is the single, hyper-smooth progress variable driven by `animate`
    const smoothProgress = useMotionValue(0);

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
            
            let resizeTimer: NodeJS.Timeout;
            const handleResize = () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(checkLayout, 100);
            };

            window.addEventListener('resize', handleResize)
            setTimeout(checkLayout, 100)
            return () => window.removeEventListener('resize', handleResize)
        }, [])

    // Efecto que desliza con extrema suavidad de un punto a otro cada vez que cambias de "slide"
    useEffect(() => {
        animate(smoothProgress, MILESTONES[currentStep], {
            duration: 0.4,
            ease: "easeInOut"
        });
    }, [currentStep, smoothProgress]);

    // --- GSAP PREMUM EFFECTS (SplitText) ---
    useGSAP(() => {
        if (!isMounted) return;

        // Split the main "ESENCIA" text for a character-by-character entrance
        const splitEsencia = new SplitText(".hero-main-title", { type: "chars" });
        gsap.from(splitEsencia.chars, {
            opacity: 0,
            y: 50,
            rotateX: -90,
            stagger: 0.05,
            duration: 1.2,
            ease: "power4.out",
            delay: 0.5
        });

        // Split lines for subtext
        const splitSub = new SplitText(".hero-subtext", { type: "words,lines" });
        gsap.from(splitSub.words, {
            opacity: 0,
            y: 20,
            stagger: 0.03,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".hero-subtext",
                start: "top 80%"
            }
        });

        return () => {
            splitEsencia.revert();
            splitSub.revert();
        }
    }, { scope: containerRef, dependencies: [isMounted] });

    // --- SCROLL EVENT LISTENER & LOCK ---
    useEffect(() => {
        if (!isMounted) return;

        // Bloqueo estricto y total del scroll de todo el documento
        if (currentStep < TOTAL_STEPS) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden'; // Vital in Next.js
            window.scrollTo(0, 0); // Fija al usuario forzosamente arriba de todo
            if ((window as any).lenis) (window as any).lenis.stop();
            if (unlockTimeoutRef.current) clearTimeout(unlockTimeoutRef.current);
        } else {
            // Cuando llega al último slide, retrasamos el desbloqueo.
            unlockTimeoutRef.current = setTimeout(() => {
                document.body.style.overflow = '';
                document.documentElement.style.overflow = ''; // Release the lock
                if ((window as any).lenis) (window as any).lenis.start();
            }, 600);
        }

        let touchStartY = 0;

        const handleWheel = (e: WheelEvent) => {
            // AISLAMIENTO DE CONTEXTO: Si el usuario ya bajó por la página, Hero debe ignorar el evento de inmediato.
            if (window.scrollY > 20) return;

            // Protect native escape ONLY if we successfully unlocked (and they are technically scrolling down)
            if (currentStep === TOTAL_STEPS && document.body.style.overflow === '') {
                if (window.scrollY > 5) return;
            }

            // Atrapamos TODOS los eventos de scroll hasta que termine
            // Si intenta scrollear y no ha terminado los pasos, BLOQUEAMOS NATIVO SIEMPRE
            if (currentStep < TOTAL_STEPS || document.body.style.overflow === 'hidden') {
                e.preventDefault();
            }

            // Bloquea nuevos triggers para que no se sobrepongan muchos tics
            if (isAnimatingRef.current) {
                return;
            }

            const scrollingDown = e.deltaY > 0;

            if (scrollingDown) {
                if (currentStep < TOTAL_STEPS) {
                    isAnimatingRef.current = true;
                    setCurrentStep(prev => prev + 1);
                    setTimeout(() => { isAnimatingRef.current = false }, 350); // Rápida respuesta para máxima fluidez
                }
            } else {
                if (currentStep > 0) {
                    isAnimatingRef.current = true;
                    setCurrentStep(prev => prev - 1);
                    
                    // Si scrolea para arriba, re-bloqueamos el framework de inmediato
                    document.body.style.overflow = 'hidden';
                    document.documentElement.style.overflow = 'hidden';
                    window.scrollTo(0, 0);
                    if ((window as any).lenis) (window as any).lenis.stop();
                    if (unlockTimeoutRef.current) clearTimeout(unlockTimeoutRef.current);
                    
                    setTimeout(() => { isAnimatingRef.current = false }, 350); 
                }
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            // AISLAMIENTO DE CONTEXTO
            if (window.scrollY > 20) return;

            if (currentStep === TOTAL_STEPS && document.body.style.overflow === '') {
                if (window.scrollY > 5) return;
            }

            if (currentStep < TOTAL_STEPS || document.body.style.overflow === 'hidden') {
                e.preventDefault();
            }

            if (isAnimatingRef.current) {
                return;
            }

            const touchEndY = e.touches[0].clientY;
            const deltaY = touchStartY - touchEndY;

            if (Math.abs(deltaY) < 20) return; // Ignora movimientos cortitos

            const scrollingDown = deltaY > 0;

            if (scrollingDown) {
                if (currentStep < TOTAL_STEPS) {
                    isAnimatingRef.current = true;
                    setCurrentStep(prev => prev + 1);
                    setTimeout(() => { isAnimatingRef.current = false }, 350);
                    touchStartY = touchEndY; 
                }
            } else {
                if (currentStep > 0) {
                    isAnimatingRef.current = true;
                    setCurrentStep(prev => prev - 1);
                    
                    document.body.style.overflow = 'hidden';
                    document.documentElement.style.overflow = 'hidden';
                    window.scrollTo(0, 0);
                    if ((window as any).lenis) (window as any).lenis.stop();
                    if (unlockTimeoutRef.current) clearTimeout(unlockTimeoutRef.current);
                    
                    setTimeout(() => { isAnimatingRef.current = false }, 350);
                    touchStartY = touchEndY; 
                }
            }
        };


        const scrollTarget = containerRef.current;
        if (!scrollTarget) return;

        // Eventos no pasivos anclados estrictamente al contenedor para NO ahogar el performance de toda la página
        scrollTarget.addEventListener('wheel', handleWheel, { passive: false });
        scrollTarget.addEventListener('touchstart', handleTouchStart, { passive: false });
        scrollTarget.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            scrollTarget.removeEventListener('wheel', handleWheel);
            scrollTarget.removeEventListener('touchstart', handleTouchStart);
            scrollTarget.removeEventListener('touchmove', handleTouchMove);
        };
    }, [currentStep, isMounted]);

    // Force clear body lock on unmount
    useEffect(() => {
        return () => { 
            document.body.style.overflow = ''; 
            document.documentElement.style.overflow = '';
            if ((window as any).lenis) (window as any).lenis.start();
        };
    }, []);

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

    // 8. BACKGROUND TYPOGRAPHY
    const bgTextX1 = useTransform(smoothProgress, [0, 1], ["0%", "-15%"])
    const bgTextX2 = useTransform(smoothProgress, [0, 1], ["-15%", "0%"])

    return (
        <div ref={containerRef} className="relative h-screen bg-[#0a0a0a]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col pt-8 md:pt-16 px-6 md:px-12 lg:px-20 pb-8">

                {/* Background Typography */}
                <div className="absolute flex flex-col justify-center inset-0 gap-4 opacity-[0.03] pointer-events-none select-none z-0 overflow-hidden">
                    <motion.div 
                        animate={{ x: ["2%", "-2%", "2%"] }} 
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="text-[15vw] md:text-[12vw] font-black whitespace-nowrap leading-none tracking-tighter"
                    >
                        DISEÑO WEB DISEÑO WEB DISEÑO WEB DISEÑO WEB
                    </motion.div>
                    <motion.div 
                        animate={{ x: ["-2%", "2%", "-2%"] }} 
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        style={{ WebkitTextStroke: "2px rgba(255,255,255,1)" }} 
                        className="text-[15vw] md:text-[12vw] font-black whitespace-nowrap leading-none tracking-tighter text-transparent"
                    >
                        EXPERIENCIA DIGITAL EXPERIENCIA DIGITAL EXPERIENCIA DIGITAL
                    </motion.div>
                    <motion.div 
                        animate={{ x: ["1%", "-3%", "1%"] }} 
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                        className="text-[15vw] md:text-[12vw] font-black whitespace-nowrap leading-none tracking-tighter"
                    >
                        ESTRATEGIA DIGITAL ESTRATEGIA DIGITAL ESTRATEGIA DIGITAL
                    </motion.div>
                </div>

                {/* Noise Grain Overlay */}
                <div 
                    className="absolute inset-0 z-0 pointer-events-none opacity-[0.05] mix-blend-screen" 
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
                />

                {/* Subtle Gradient Atmosphere */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.2] mix-blend-screen">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent blur-3xl" />
                </div>
                
                {/* Bottom Fade Transition */}
                <div className="absolute bottom-0 left-0 right-0 h-48 md:h-64 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-20 pointer-events-none" />

                <motion.div
                    style={{
                        x: logoX,
                        y: logoY,
                        scale: logoScale,
                    }}
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

                {/* Main Fully-Balanced Content Container */}
                <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between mt-20 md:mt-32">

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
                                    className="flex items-end transform-gpu origin-center will-change-transform"
                                >
                                    <h1 className="hero-main-title text-[3rem] sm:text-[5rem] md:text-[8rem] lg:text-[10rem] xl:text-[10.5rem] font-black tracking-tighter leading-none whitespace-nowrap">
                                        <span className="text-white">ESENC</span>
                                        <span className="relative group cursor-default">
                                            {/* The foreground text that fades to transparent to show its own background gradient clip */}
                                            <motion.span
                                                style={{ color: iaColor }}
                                                className="relative z-10 transition-all duration-500 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text bg-[length:200%_auto] hover:bg-right cursor-default"
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

                        {/* STACKED SUBTEXT */}
                        <div className="flex flex-col w-full pb-8 z-20">
                            <motion.div style={{ opacity: line1Opacity, y: line1Y }} className="w-full">
                                <h2 className="hero-subtext text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white/90 tracking-tight leading-tight md:leading-none">
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

                                        <motion.span style={{ opacity: w1Opacity, y: w1Y }} className="absolute top-0 left-0 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500 cursor-default">propósito</motion.span>
                                        <motion.span style={{ opacity: w2Opacity, y: w2Y }} className="absolute top-0 left-0 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500 cursor-default">comunicación</motion.span>
                                        <motion.span style={{ opacity: w3Opacity, y: w3Y }} className="absolute top-0 left-0 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500 cursor-default">conversión</motion.span>
                                        <motion.span style={{ opacity: w4Opacity, y: w4Y }} className="absolute top-0 left-0 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500 cursor-default">identidad</motion.span>
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
