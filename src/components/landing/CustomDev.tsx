"use client"

import { motion } from "framer-motion"
import { Layers, CheckCircle, FileText, Layout, Code } from "lucide-react"

export function CustomDev() {
    return (
        <section id="process" className="py-24 scroll-snap-start relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" />
            {/* Grid removed */}

            <div className="container mx-auto px-4 space-y-16 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1] mb-6">
                        PROCESO Y <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-secondary bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500 cursor-default">ENFOQUE</span>
                    </h2>
                    <div className="border-l-4 border-secondary pl-6 inline-block">
                        <p className="text-xl font-semibold text-white/90 text-left">
                            Un método claro que transforma ideas en presencia digital efectiva.
                        </p>
                    </div>
                </motion.div>

                {/* Methodology Steps */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="space-y-6 md:space-y-8">
                            {[
                                {
                                    title: "1. Análisis",
                                    titleFull: "1. Análisis del proyecto",
                                    desc: "Analizamos tu negocio, tu público y tus objetivos para definir una estrategia clara desde el inicio.",
                                    icon: FileText
                                },
                                {
                                    title: "2. Contenido",
                                    titleFull: "2. Estructura del contenido",
                                    desc: "Organizamos la información y definimos el recorrido del usuario para guiarlo de forma simple.",
                                    icon: Layers
                                },
                                {
                                    title: "3. Diseño",
                                    titleFull: "3. Diseño visual",
                                    desc: "Creamos una interfaz moderna y profesional alineada a tu identidad de marca.",
                                    icon: Layout
                                },
                                {
                                    title: "4. Desarrollo",
                                    titleFull: "4. Desarrollo técnico",
                                    desc: "Implementamos el sitio con tecnología optimizada para velocidad y correcto funcionamiento.",
                                    icon: Code
                                },
                                {
                                    title: "5. Entrega",
                                    titleFull: "5. Entrega y puesta en marcha",
                                    desc: "Dejamos tu sitio online, listo para recibir visitas y consultas desde el primer día.",
                                    icon: CheckCircle
                                },
                            ].map((step, i) => (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-4 items-start group"
                                >
                                    <div className="mt-1 min-w-8 md:min-w-10">
                                        <step.icon className="h-5 w-5 md:h-6 md:w-6 text-secondary group-hover:text-primary transition-colors duration-300" />
                                    </div>
                                    <div>
                                        <h4 className="text-base md:text-lg font-bold tracking-wide mb-1 text-white group-hover:text-secondary transition-colors duration-300">
                                            <span className="hidden md:inline">{step.titleFull}</span>
                                            <span className="md:hidden">{step.title}</span>
                                        </h4>
                                        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="mt-8 pt-6 border-t border-white/10 hidden md:block">
                            <p className="text-base font-medium tracking-wide text-white/80 leading-relaxed italic">
                                &quot;Este enfoque garantiza sitios claros, profesionales y enfocados en resultados.&quot;
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative h-[300px] md:h-[500px] overflow-hidden border border-white/10 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-sm group hidden lg:block"
                    >
                        {/* Process Visual Graphic */}
                        <div className="absolute inset-0 flex items-center justify-center p-12">
                            <svg viewBox="0 0 400 400" className="w-full h-full opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                                <motion.path
                                    d="M 50 200 Q 200 50 350 200 Q 200 350 50 200"
                                    fill="none"
                                    stroke="url(#grad1)"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "linear" }}
                                />
                                <defs>
                                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style={{ stopColor: "var(--primary)", stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: "var(--secondary)", stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                                {/* Strategy Layers Mockup */}
                                <motion.rect x="100" y="150" width="200" height="40" rx="4" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1"
                                    animate={{ y: [150, 140, 150] }} transition={{ duration: 4, repeat: Infinity }} />
                                <motion.rect x="120" y="200" width="160" height="40" rx="4" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1"
                                    animate={{ y: [200, 190, 200] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }} />
                                <motion.rect x="140" y="250" width="120" height="40" rx="4" fill="white" fillOpacity="0.05" stroke="white" strokeOpacity="0.1"
                                    animate={{ y: [250, 240, 250] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} />

                                {/* Connection lines */}
                                <line x1="200" y1="100" x2="200" y2="300" stroke="white" strokeOpacity="0.05" strokeWidth="1" strokeDasharray="4 4" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-xl font-black tracking-[0.5em] text-white/20 uppercase pointer-events-none">
                                    ESTRATEGIA
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
