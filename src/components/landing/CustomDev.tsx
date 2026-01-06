"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const processSteps = [
    {
        id: 1,
        title: "Análisis del proyecto",
        description: "El proceso comienza con una primera comunicación para conocer el emprendimiento, las ideas y los objetivos. Analizamos el negocio, el público y el contexto para definir una estrategia clara desde el inicio.",
        image: "/images/procesos-1-analysis.png",
    },
    {
        id: 2,
        title: "Estructura y planificación",
        description: "A partir de esa primera charla, enviamos un formulario con preguntas estratégicas, estructurales y de diseño. Con esta información organizamos el contenido y definimos el recorrido del usuario, guiándolo de forma simple y efectiva hacia la acción.",
        image: "/images/procesos-2-structure.png",
    },
    {
        id: 3,
        title: "Diseño visual",
        description: "Creamos una maqueta o diseño inicial alineado a la identidad del proyecto. La interfaz se va moldeando junto al cliente mediante intercambios, revisiones y ajustes, buscando siempre claridad, coherencia y confianza desde el primer vistazo.",
        image: "/images/procesos-3-design.png",
    },
    {
        id: 4,
        title: "Desarrollo técnico",
        description: "Una vez aprobado el diseño y el presupuesto, se solicita una seña del 50% y se avanza en el desarrollo del sitio. Implementamos tecnología optimizada para velocidad, correcto funcionamiento y crecimiento futuro.",
        image: "/images/procesos-4-development.png",
    },
    {
        id: 5,
        title: "Ajustes finales y entrega",
        description: "Presentamos una versión final para cerrar detalles, responder consultas y realizar los últimos ajustes. Dejamos el sitio online y listo para recibir visitas, consultas o ventas desde el primer día.",
        image: "/images/procesos-5-delivery.png",
    },
]

export function CustomDev() {
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
                        PROCESO Y <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500 cursor-default">ENFOQUE</span>
                    </h2>
                    <div className="border-l-4 border-primary pl-6 inline-block">
                        <p className="text-xl font-semibold text-white/90 text-left">
                            Nuestro trabajo no empieza con una pantalla en blanco, sino con una comprensión profunda de cada proyecto.
                            <br className="hidden md:block" />
                            Creemos en el diseño web con propósito: sitios que no solo se ven bien, sino que cumplen un objetivo real.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Main Layout (3 Columns) */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-[0.6fr_1.2fr_1.2fr] gap-12 lg:gap-8 items-stretch min-h-[600px]">

                    {/* Left Column: Navigation */}
                    <div className="relative order-3 lg:order-1 flex lg:flex-col justify-center gap-4 lg:gap-0 lg:border-r border-white/20 lg:pr-12 lg:text-right z-20">
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

                    {/* Dynamic Content Area (Cols 2 & 3) */}
                    <AnimatePresence mode="wait">
                        {!activeStep ? (
                            /* Cover Image State */
                            <motion.div
                                key="cover"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="order-1 lg:order-2 lg:col-span-2 relative h-full min-h-[500px] overflow-hidden rounded-sm group"
                            >
                                {/* Active Large Cover Image */}
                                <div className="absolute inset-0 bg-neutral-900">
                                    <img
                                        src="/images/procesos-cover.jpg"
                                        alt="Proceso y Enfoque"
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-1000 scale-105 group-hover:scale-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                                    <div className="absolute bottom-12 left-12 max-w-lg pointer-events-none">
                                        <h3 className="text-5xl text-white font-black uppercase tracking-tighter mb-4 cursor-pointer hover:scale-105 transition-transform duration-300">
                                            Tu visión, <br />
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500">
                                                Nuestra estrategia
                                            </span>
                                        </h3>
                                        <p className="text-white/70 text-lg font-light leading-relaxed">
                                            Explora cada etapa de nuestro proceso creativo y técnico seleccionando los pasos.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            /* Active Unified State (Content + Image in one block) */
                            <motion.div
                                key={`unified-${activeStep}`}
                                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                                animate={{ clipPath: "inset(0 0 0 0%)", opacity: 1 }}
                                exit={{ clipPath: "inset(0 0 0 100%)", opacity: 0 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="order-1 lg:order-2 lg:col-span-2 relative z-10 bg-[#FFFFF0] rounded-sm shadow-xl flex flex-col lg:flex-row overflow-hidden min-h-[500px]"
                            >
                                {/* Text Section */}
                                <div className="flex-1 p-8 md:p-12 flex flex-col justify-center relative">
                                    <span className="text-[8rem] lg:text-[10rem] font-black text-black/5 leading-none absolute -top-8 -right-4 lg:-right-8 select-none z-0">
                                        {activeData?.id}
                                    </span>
                                    <div className="relative z-10">
                                        <h3 className="text-3xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary mb-8">
                                            {activeData?.title}
                                        </h3>
                                        <p className="text-lg md:text-xl text-neutral-600 leading-relaxed font-light mb-12">
                                            {activeData?.description}
                                        </p>

                                        <div className="pt-8 border-t border-neutral-200">
                                            <p className="text-sm font-medium text-neutral-400 italic">
                                                Trabajamos cada etapa de forma consciente y colaborativa.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Image Section */}
                                <div className="flex-1 relative min-h-[300px] lg:min-h-full bg-[#FFFFF0] border-l border-neutral-100">
                                    <div className="absolute inset-2 overflow-hidden rounded-sm">
                                        {/* Unified Image Display */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-[#FFFFF0]">
                                            <img
                                                src={activeData?.image}
                                                alt={activeData?.title}
                                                className="w-full h-full object-contain p-4"
                                            />
                                            {/* Removed text overlay as the images are self-explanatory neon icons now */}
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
