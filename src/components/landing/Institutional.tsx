"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function Institutional() {
    return (
        <section className="py-24 relative bg-black/70 border-y border-white/10 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content (Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Small Label */}
                        <div className="text-sm font-medium text-primary tracking-widest uppercase">
                            Sector Especializado
                        </div>

                        {/* Main Title */}
                        <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1]">
                            Institucional
                            <br />
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-secondary bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500 cursor-default">y Educación</span>
                        </h2>

                        {/* Subtitle with Accent Border */}
                        <div className="border-l-4 border-primary pl-6">
                            <p className="text-xl font-semibold text-white/90">
                                Presencia digital clara, confiable y profesional.
                            </p>
                        </div>

                        {/* Description */}
                        <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                Trabajamos con instituciones y proyectos educativos que necesitan una presencia digital clara, confiable y profesional.
                            </p>
                            <p>
                                Entendemos la web como un canal institucional clave: un espacio donde la información debe ser accesible, ordenada y alineada a los valores de la organización.
                            </p>
                        </div>
                    </motion.div>

                    {/* Images Grid (Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[500px] lg:h-[600px]"
                    >
                        {/* Large Image - Left Column */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative col-span-1 md:row-span-2 overflow-hidden border border-white/10 aspect-video md:aspect-auto"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10" />
                            <Image
                                src="/images/about-mockup.png"
                                alt="Institucional"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </motion.div>

                        {/* Small Image Top - Right Column - Hidden on mobile */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="relative overflow-hidden border border-white/10 hidden md:block"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent z-10" />
                            <Image
                                src="/images/about-mockup.png"
                                alt="Educación"
                                fill
                                sizes="25vw"
                                className="object-cover"
                            />
                        </motion.div>

                        {/* Small Image Bottom - Right Column - Hidden on mobile */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="relative overflow-hidden border border-white/10 bg-gradient-to-br from-primary/10 to-secondary/10 hidden md:block"
                        >
                            <div className="p-8 bg-black/40 border border-white/10 flex flex-col items-center justify-center text-center h-full">
                                <div className="text-center space-y-2">
                                    <div className="text-6xl font-black text-white/10">+</div>
                                    <p className="text-sm font-medium text-white/60 tracking-wide">Proyectos<br />Institucionales</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
