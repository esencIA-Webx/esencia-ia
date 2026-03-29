"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const processSteps = [
    {
        id: 1,
        title: "Análisis del proyecto",
        description: "El proceso comienza con una primera comunicación para conocer el emprendimiento, las ideas y los objetivos. Analizamos el negocio, el público y el contexto para definir una estrategia clara desde el inicio."
    },
    {
        id: 2,
        title: "Estructura y planificación",
        description: "A partir de esa primera charla, enviamos un formulario con preguntas estratégicas, estructurales y de diseño. Con esta información organizamos el contenido y definimos el recorrido del usuario, guiándolo de forma simple y efectiva hacia la acción."
    },
    {
        id: 3,
        title: "Diseño visual",
        description: "Creamos una maqueta o diseño inicial alineado a la identidad del proyecto. La interfaz se va moldeando junto al cliente mediante intercambios, revisiones y ajustes, buscando siempre claridad, coherencia y confianza desde el primer vistazo."
    },
    {
        id: 4,
        title: "Desarrollo técnico",
        description: "Una vez aprobado el diseño y el presupuesto, se solicita una seña del 50% y se avanza en el desarrollo del sitio. Implementamos tecnología optimizada para velocidad, correcto funcionamiento y crecimiento futuro."
    },
    {
        id: 5,
        title: "Ajustes finales y entrega",
        description: "Presentamos una versión final para cerrar detalles, responder consultas y realizar los últimos ajustes. Dejamos el sitio online y listo para recibir visitas, consultas o ventas desde el primer día."
    },
]

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}—=+*^?#_"

function ScrambleText({ text, className = "", as: Component = "span" }: { text: string, className?: string, as?: any }) {
    const containerRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

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
            const frameInterval = 66; 
            const totalDuration = 800; // default duration for CustomDev
            let lastUpdate = 0;

            const update = (currentTime: number) => {
                const elapsed = currentTime - startTime

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
    }, [text])

    return <Component ref={containerRef} className={className} />
}

export default function CustomDev() {
    const [activeStep, setActiveStep] = useState<number | null>(null)

    // Find active data safely
    const activeData = activeStep ? processSteps.find((s) => s.id === activeStep) : null

    return (
        <section className="py-24 relative overflow-hidden bg-transparent text-white">
            {/* Upper Header */}
            <div className="container mx-auto px-4 mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1] mb-6">
                        PROCESO Y <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary bg-[length:200%_auto] bg-[0%_0%] hover:bg-[100%_0%] transition-[background-position] duration-500 cursor-default">ENFOQUE</span>
                    </h2>
                    <div className="border-l-4 border-primary pl-6 inline-block">
                        <p className="text-xl font-semibold text-white/90 text-left">
                            <ScrambleText text="Nuestro trabajo no empieza con una pantalla en blanco, sino con una comprensión profunda de cada proyecto." />
                            <br className="hidden md:block" />
                            <ScrambleText text="Creemos en el diseño web con propósito: sitios que no solo se ven bien, sino que cumplen un objetivo real." />
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Main Layout (3 Columns) */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[0.6fr_2.4fr] gap-12 lg:gap-8 items-stretch min-h-[500px]">

                    {/* Left Column: Navigation */}
                    <div className="relative order-1 lg:order-1 flex lg:flex-col justify-center gap-4 lg:gap-0 lg:border-r border-white/20 lg:pr-12 lg:text-right z-20">
                        {processSteps.map((step) => (
                            <button
                                key={step.id}
                                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                                className={`group relative py-4 transition-all duration-300 ${activeStep === step.id ? "opacity-100 scale-105" : "opacity-40 hover:opacity-100"
                                    }`}
                            >
                                <span className={`inline-block text-6xl md:text-7xl font-black tracking-tighter uppercase leading-none relative ${activeStep === step.id
                                    ? "text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary bg-[length:200%_auto] bg-[0%_0%] hover:bg-[100%_0%]"
                                    : "text-white"
                                    }`}>
                                    {step.id}
                                    <span
                                        className={`absolute -bottom-2 left-0 w-full h-[4px] bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-500 ${activeStep === step.id ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                                            }`}
                                    />
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Dynamic Content Area */}
                    <AnimatePresence mode="wait">
                        {!activeStep ? (
                            /* Cover Text State */
                            <motion.div
                                key="cover"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="order-2 lg:order-2 flex items-center relative h-full min-h-[400px] overflow-hidden rounded-sm group bg-neutral-900 border border-white/10 p-8 md:p-12"
                            >
                                <div className="max-w-xl">
                                    <h3 className="text-4xl md:text-6xl text-white font-black uppercase tracking-tighter mb-6 leading-none">
                                        <ScrambleText text="Tu visión," as="div" />
                                        <ScrambleText text="Nuestra estrategia" as="div" className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary bg-[length:200%_auto] bg-[0%_0%] hover:bg-[100%_0%] transition-all duration-500 mt-2" />
                                    </h3>
                                    <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed">
                                        <ScrambleText text="Explora cada etapa de nuestro proceso creativo y técnico seleccionando los pasos numéricos en el menú." />
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            /* Active Text State */
                            <motion.div
                                key={`unified-${activeStep}`}
                                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                                animate={{ clipPath: "inset(0 0 0 0%)", opacity: 1 }}
                                exit={{ clipPath: "inset(0 0 0 100%)", opacity: 0 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="order-2 lg:order-2 relative z-10 bg-[#FFFFF0] rounded-sm shadow-xl flex flex-col overflow-hidden min-h-[400px]"
                            >
                                <div className="flex-1 p-8 md:p-16 flex flex-col justify-center relative">
                                    <span className="text-[12rem] md:text-[20rem] font-black text-black/5 leading-none absolute -bottom-12 -right-12 select-none z-0">
                                        {activeData?.id}
                                    </span>
                                    <div className="relative z-10 max-w-4xl">
                                        <h3 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary bg-[length:200%_auto] bg-[0%_0%] hover:bg-[100%_0%] transition-all duration-500 mb-8 pb-2">
                                            <ScrambleText text={activeData?.title || ""} />
                                        </h3>
                                        <p className="text-xl md:text-3xl text-neutral-600 leading-relaxed font-light mb-12">
                                            <ScrambleText text={activeData?.description || ""} />
                                        </p>

                                        <div className="pt-8 border-t border-neutral-200">
                                            <p className="text-base md:text-lg font-medium text-neutral-400 italic">
                                                <ScrambleText text="Trabajamos cada etapa de forma consciente y colaborativa." />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
