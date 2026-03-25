"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import Image from "next/image"

const servicesData = [
    {
        id: "landing",
        title: "LANDING",
        subtitle: "Tu presencia online, rápida y efectiva",
        contentTitleHighlight: "Landing Page Simple",
        content: "Diseñamos landing pages enfocadas en un solo objetivo: convertir. Cada sección, cada animación y cada palabra está pensada para guiar al usuario hacia la acción, sin distracciones ni elementos innecesarios. Ideales para campañas, lanzamientos y validación de productos o servicios.",
        includes: [
            "Diseño 100% responsive",
            "Estructura enfocada en conversión",
            "Formulario de contacto o botón de WhatsApp",
            "Integración con redes sociales y Google Maps",
            "SEO básico",
            "Dominio y hosting incluidos (primer año)",
            "Hasta 4 secciones de contenido"
        ],
        extras: "Tracking, integraciones con Mailchimp o CRM, secciones adicionales.",
        price: "$180.000",
        cta: "Quiero mi landing",
        image: "/images/about-mockup.png",
        video: "/videos/Arte1.mp4"
    },
    {
        id: "institucional",
        title: "INSTITUCIONAL",
        subtitle: "Tu marca con presencia profesional y escalable",
        contentTitleHighlight: "Página Institucional",
        content: "Creamos sitios institucionales que comunican quién sos, qué hacés y por qué tu marca es distinta. Diseño sobrio, estructura clara y una narrativa visual alineada con tus valores, pensada para generar confianza y presencia digital sólida.",
        includes: [
            "Diseño profesional y responsive",
            "Navegación completa (Inicio, Servicios, Nosotros, Portafolio, Blog, Contacto)",
            "Panel administrador (CMS) para editar contenido",
            "Formulario de contacto, WhatsApp, correo y Google Maps",
            "SEO inicial",
            "Dominio y hosting incluidos (primer año)",
            "Hasta 10 páginas o secciones internas",
            "Prueba social (clientes, testimonios o proyectos)",
            "Blog activo",
            "Newsletter"
        ],
        extras: "Chat en vivo, chatbot, sitio multi-idioma.",
        price: "$500.000",
        cta: "Quiero una web profesional",
        image: "/images/maria-reina.png",
        video: "/videos/Institucion1.mp4"
    },
    {
        id: "ecommerce",
        title: "E-COMMERCE",
        subtitle: "Vendé online las 24 horas, de forma segura y escalable",
        contentTitleHighlight: "E-commerce",
        content: "Desarrollamos tiendas online funcionales, claras y optimizadas para vender. Desde la arquitectura de productos hasta la experiencia de compra, todo está diseñado para crecer, escalar y adaptarse a tu negocio.",
        includes: [
            "Todo lo incluido en la Página Institucional",
            "Plataforma e-commerce completa (Shopify o WooCommerce)",
            "Catálogo de productos ilimitado",
            "Carrito de compras y checkout seguro",
            "Métodos de pago locales (Mercado Pago, tarjetas y transferencias)",
            "Gestión de envíos y stock",
            "Integración con CRM, newsletter y Analytics",
            "SEO básico para productos",
            "Carga inicial de hasta 20 productos",
            "Optimización de velocidad y performance"
        ],
        extras: "Suscripciones, cupones, promociones, marketplace.",
        price: "$1.000.000",
        cta: "Quiero vender online",
        image: "/images/sneaker-ad.png",
        video: "/videos/Tienda1.mp4"
    },
]

// Phase 1: steps 0-2 = title intros. Phase 2: steps 3-5 = white card detail.
const TOTAL_STEPS = 5;

export function Services() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [trapState, setTrapState] = useState<'idle' | 'trapped' | 'escaped'>('idle');
    const isAnimatingRef = useRef(false);

    const lastTopRef = useRef<number | null>(null);

    // Scroll Trap logic using robust DOM position checking
    useEffect(() => {
        const handleNativeScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const currentTop = rect.top;
            
            let didCrossBoundary = false;
            let isScrollingDownNatively = false;
            let isScrollingUpNatively = false;
            
            if (lastTopRef.current !== null) {
                const prevTop = lastTopRef.current;
                isScrollingDownNatively = prevTop > currentTop;
                isScrollingUpNatively = prevTop < currentTop;

                if (prevTop > 0 && currentTop <= 0) {
                    didCrossBoundary = true;
                } else if (prevTop < 0 && currentTop >= 0) {
                    didCrossBoundary = true;
                }
            }
            
            lastTopRef.current = currentTop;
            
            // Atrapa si cruzó la frontera o si está estáticamente encuadrado
            if (didCrossBoundary || Math.abs(currentTop) <= 20) {
                if (trapState === 'idle') {
                    setTrapState('trapped');

                    if (isScrollingUpNatively) {
                        setCurrentStep(TOTAL_STEPS);
                    } else if (isScrollingDownNatively) {
                        setCurrentStep(0);
                    }

                    window.scrollTo(0, window.scrollY + currentTop); // Snap top precise
                    document.body.style.overflow = 'hidden';
                    document.documentElement.style.overflow = 'hidden';
                    if (typeof window !== "undefined" && (window as any).lenis) {
                        (window as any).lenis.stop();
                    }
                }
            } else if (Math.abs(currentTop) >= 100) {
                // Salió de la zona de captura real
                if (trapState === 'escaped') {
                    setTrapState('idle'); 
                }
            }
        };

        window.addEventListener('scroll', handleNativeScroll, { passive: true });
        handleNativeScroll(); // check immediately on mount
        
        return () => window.removeEventListener('scroll', handleNativeScroll);
    }, [trapState]);

    // Anti Stale-Closure Reference for currentStep inside stable Event Listeners
    const currentStepRef = useRef(currentStep);
    useEffect(() => {
        currentStepRef.current = currentStep;
    }, [currentStep]);

    // Handle Wheel & Touch events inside Trapped state
    useEffect(() => {
        if (trapState !== 'trapped') return;

        let touchStartY = 0;

        const handleWheel = (e: WheelEvent) => {
            if (isAnimatingRef.current) {
                e.preventDefault();
                return;
            }

            const scrollingDown = e.deltaY > 0;

            e.preventDefault(); // Intercepta el scroll de la página para cambiar slide


            if (scrollingDown) {
                if (currentStepRef.current < TOTAL_STEPS) {
                    isAnimatingRef.current = true;
                    setCurrentStep(prev => prev + 1);
                    setTimeout(() => { isAnimatingRef.current = false }, 700);
                } else {
                    // Escapar hacia abajo - Fold away (Step 6)
                    isAnimatingRef.current = true;
                    setCurrentStep(6); // Fold away
                    setTrapState('escaped');
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                    if (typeof window !== "undefined" && (window as any).lenis) {
                        (window as any).lenis.start();
                    }
                    setTimeout(() => { isAnimatingRef.current = false }, 1000);
                }
            } else {
                if (currentStepRef.current > 0) {
                    isAnimatingRef.current = true;
                    setCurrentStep(prev => prev - 1);
                    setTimeout(() => { isAnimatingRef.current = false }, 700);
                } else {
                    // Escapar hacia arriba - Candado y Plegado
                    isAnimatingRef.current = true;
                    setCurrentStep(-1); // Fold away
                    setTrapState('escaped');
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                    if (typeof window !== "undefined" && (window as any).lenis) {
                        (window as any).lenis.start();
                    }
                    setTimeout(() => { isAnimatingRef.current = false }, 1000);
                }
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (isAnimatingRef.current) {
                e.preventDefault();
                return;
            }

            const touchEndY = e.touches[0].clientY;
            const deltaY = touchStartY - touchEndY;

            if (Math.abs(deltaY) < 40) return;

            const scrollingDown = deltaY > 0;



            e.preventDefault();

            if (scrollingDown) {
                if (currentStepRef.current < TOTAL_STEPS) {
                    isAnimatingRef.current = true;
                    setCurrentStep(prev => prev + 1);
                    setTimeout(() => { isAnimatingRef.current = false }, 700);
                    touchStartY = touchEndY; 
                } else {
                    isAnimatingRef.current = true;
                    setCurrentStep(6);
                    setTrapState('escaped');
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                    if (typeof window !== "undefined" && (window as any).lenis) {
                        (window as any).lenis.start();
                    }
                    setTimeout(() => { isAnimatingRef.current = false }, 1000);
                }
            } else {
                if (currentStepRef.current > 0) {
                    isAnimatingRef.current = true;
                    setCurrentStep(prev => prev - 1);
                    setTimeout(() => { isAnimatingRef.current = false }, 700);
                    touchStartY = touchEndY; 
                } else {
                    isAnimatingRef.current = true;
                    setCurrentStep(-1);
                    setTrapState('escaped');
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                    if (typeof window !== "undefined" && (window as any).lenis) {
                        (window as any).lenis.start();
                    }
                    setTimeout(() => { isAnimatingRef.current = false }, 1000);
                }
            }
        };

        const scrollTarget = sectionRef.current;
        if (!scrollTarget) return;

        scrollTarget.addEventListener('wheel', handleWheel, { passive: false });
        scrollTarget.addEventListener('touchstart', handleTouchStart, { passive: false });
        scrollTarget.addEventListener('touchmove', handleTouchMove, { passive: false });
        
        return () => {
            scrollTarget.removeEventListener('wheel', handleWheel);
            scrollTarget.removeEventListener('touchstart', handleTouchStart);
            scrollTarget.removeEventListener('touchmove', handleTouchMove);
        }
    }, [trapState, currentStep]);

    // Force clear body lock on unmount
    useEffect(() => {
        return () => { 
            document.body.style.overflow = ''; 
            document.documentElement.style.overflow = '';
            // Only start lenis if we were holding the lock, but defensively starting is safest
            if (typeof window !== "undefined" && (window as any).lenis) {
                (window as any).lenis.start();
            }
        };
    }, []);

    // Helper functions for clicking the titles
    const jumpToStep = (index: number) => {
        if (isAnimatingRef.current) return;
        isAnimatingRef.current = true;
        setCurrentStep(index);
        setTimeout(() => { isAnimatingRef.current = false }, 700);
    }

    // Step ranges
    const isInTitlePhase = currentStep >= 0 && currentStep <= 2;
    const isInCardPhase = currentStep >= 3 && currentStep <= 5;
    const isFolded = currentStep === 6 || currentStep === -1;

    // Title intro directions
    const titleDirections = [
        { x: "0%",    y: "-120%" },  // Landing:       from top
        { x: "120%",  y: "60%"  },   // Institucional: from bottom-right
        { x: "-120%", y: "0%"   },   // E-commerce:    from left
    ];

    return (
        <section ref={sectionRef} id="services" className="relative w-full h-screen bg-black overflow-hidden flex flex-col">

            {/* PHASE 1: Full-screen Title Intros (steps 0-2) */}
            <AnimatePresence>
                {servicesData.map((svc, index) => {
                    const titleActive = currentStep === index;
                    const titlePast  = currentStep > index && currentStep < 3; // only fade while still in title phase
                    const dir = titleDirections[index];

                    let tX = dir.x, tY = dir.y, tOp = 0;
                    if (titleActive) { tX = "0%"; tY = "0%"; tOp = 1; }
                    else if (titlePast) { tOp = 0; tX = dir.x; tY = dir.y; } // exit back to origin

                    // Hide completely during card phase or folded
                    if (isInCardPhase || isFolded) { tOp = 0; }

                    return (
                        <motion.div
                            key={`title-${svc.id}`}
                            initial={false}
                            animate={{ x: tX, y: tY, opacity: tOp }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            style={{ zIndex: 10 + index }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            <h2 className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary leading-none select-none text-center px-4">
                                {svc.title}
                            </h2>
                        </motion.div>
                    );
                })}
            </AnimatePresence>

            {/* PHASE 2: White Card Detail (steps 3-5) */}
            <div className="relative flex-1 w-full">
                <AnimatePresence mode="popLayout" initial={false}>
                    {servicesData.map((activeData, index) => {
                        // White card index maps: step 3→card 0, step 4→card 1, step 5→card 2
                        const cardStep = index + 3;
                        const isActive = currentStep === cardStep;
                        const isPast   = currentStep > cardStep && !isFolded;

                        // Card directions (same as title, as they "grow out" from title's settled center)
                        const cardDirs = [
                            { x: "0%",    y: "-100%" },
                            { x: "100%",  y: "60%"  },
                            { x: "-100%", y: "0%"   },
                        ];
                        const dir = cardDirs[index];

                        let animX = dir.x, animY = dir.y, animOpacity = 0, animScale = 1;

                        if (isFolded) {
                            animY = "100%"; animOpacity = 0;
                        } else if (isActive) {
                            animX = "0%"; animY = "0%"; animOpacity = 1;
                        } else if (isPast) {
                            animY = "-5%"; animOpacity = 0.2; animScale = 0.95;
                        } else {
                            // Not yet reached or still in title phase: hide offscreen
                            animX = dir.x; animY = dir.y; animOpacity = 0;
                        }

                        return (
                            <motion.div
                                key={activeData.id}
                                initial={false}
                                animate={{
                                    x: animX,
                                    y: animY,
                                    opacity: animOpacity,
                                    scale: animScale,
                                }}
                                transition={{
                                    duration: 0.75,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                style={{ zIndex: index }}
                                className="absolute inset-0 bg-[#FFFFF0] text-black rounded-t-3xl md:rounded-t-[3rem] shadow-[0_-15px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col pointer-events-auto"
                            >
                                <div className="container mx-auto px-4 md:px-8 pt-4 md:pt-6 pb-2 max-w-[85rem] h-full flex flex-col justify-start overflow-hidden">
                                    {/* Title inside card, centered at top */}
                                    <div className="text-center mb-3 lg:mb-4 pt-2">
                                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                                            {activeData.title}
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-12 items-center flex-1">
                                        
                                        {/* Text Column */}
                                        <div className="flex flex-col justify-center max-w-xl mx-auto lg:max-w-none">
                                            <div className="flex items-center gap-2 mb-2 lg:mb-3">
                                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black font-sans tracking-tight text-black leading-none">
                                                    {activeData.contentTitleHighlight}
                                                </h3>
                                            </div>
                                            <p className="text-sm md:text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary mb-3 lg:mb-4">
                                                {activeData.subtitle}
                                            </p>
                                            <p className="text-xs md:text-sm text-neutral-600 leading-snug lg:leading-relaxed mb-4 lg:mb-6 font-light italic">
                                                {activeData.content}
                                            </p>

                                            {/* Benefits List */}
                                            <div className="mb-4 lg:mb-6">
                                                <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-neutral-400 mb-2 md:mb-3">Incluye</h4>
                                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5 lg:gap-y-2">
                                                    {activeData.includes.slice(0, 4).map((item, idx) => (
                                                        <li key={idx} className="flex items-start gap-2 text-neutral-600 text-[11px] md:text-sm">
                                                            <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                                                            <span className="leading-tight">{item}</span>
                                                        </li>
                                                    ))}
                                                    <li className="text-primary/60 text-[10px] md:text-xs italic md:hidden">
                                                        + {activeData.includes.length - 4} más...
                                                    </li>
                                                    {activeData.includes.slice(4).map((item, idx) => (
                                                        <li key={idx + 4} className="hidden md:flex items-start gap-2 text-neutral-600 text-[11px] md:text-sm">
                                                            <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                                                            <span className="leading-tight">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Extras */}
                                            <div className="mb-4 lg:mb-6 p-2 lg:p-3 bg-white/50 border border-neutral-200 rounded-sm hidden md:block">
                                                <h4 className="text-[9px] font-bold uppercase text-neutral-400 mb-0.5">Extras opcionales</h4>
                                                <p className="text-[10px] lg:text-xs text-neutral-500 italic leading-snug">{activeData.extras}</p>
                                            </div>

                                            {/* CTA Only - Centered */}
                                            <div className="flex justify-center lg:justify-start pt-1">
                                                <a
                                                    href="#contact"
                                                    className="group relative px-8 lg:px-10 py-3 lg:py-4 bg-black text-white font-bold text-xs lg:text-sm tracking-widest uppercase overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
                                                >
                                                    <span className="relative z-10 flex items-center gap-2">
                                                        {activeData.cta}
                                                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                                    </span>
                                                </a>
                                            </div>
                                        </div>

                                        {/* Image Column */}
                                        <div className="hidden lg:flex relative items-center justify-center [perspective:1000px] h-full min-h-[300px]">
                                            <div className="relative aspect-auto h-[90%] w-full overflow-hidden rounded-sm shadow-[20px_20px_50px_rgba(0,0,0,0.3)] bg-gray-100 border border-white/20">
                                                {activeData.video ? (
                                                    <video
                                                        src={activeData.video}
                                                        autoPlay
                                                        loop
                                                        muted
                                                        playsInline
                                                        preload="none"
                                                        className="h-full w-full object-contain hover:scale-105 transition-transform duration-1000"
                                                    />
                                                ) : (
                                                    <Image
                                                        src={activeData.image}
                                                        alt={activeData.title}
                                                        fill
                                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                                        className="object-contain hover:scale-105 transition-transform duration-1000"
                                                    />
                                                )}
                                                {/* Decorative element */}
                                                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
        </section>
    )
}
