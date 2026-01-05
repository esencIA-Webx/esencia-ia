"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function About() {
    return (
        <section id="about" className="py-24 relative bg-black border-y border-white/10">
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
                        {/* Main Title */}
                        <div className="space-y-4">
                            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1] text-white">
                                Diseño web
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500 cursor-default">con propósito.</span>
                            </h2>
                        </div>

                        {/* Subtitle */}
                        <div className="border-l-4 border-primary pl-6">
                            <p className="text-xl font-semibold text-white/90">
                                En ESENCIA creamos sitios que cumplen un objetivo real.
                            </p>
                        </div>

                        {/* Description */}
                        <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                Diseñamos sitios pensados para cumplir un objetivo concreto: comunicar con claridad, generar confianza y acompañar el crecimiento de cada proyecto.
                            </p>
                            <p>
                                Nuestro enfoque combina estrategia, estructura y diseño consciente, entendiendo la web como una herramienta clave para profesionalizar tu presencia digital.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <a
                                href="#contact"
                                className="inline-flex h-14 items-center justify-center rounded-none border-2 border-primary bg-transparent px-10 text-base font-medium text-white transition-all hover:bg-primary hover:text-white hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
                            >
                                Iniciar Conversación
                            </a>
                        </div>
                    </motion.div>

                    {/* Image (Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[500px] lg:h-[600px]"
                    >
                        {/* Main Large Image */}
                        <div className="relative h-full w-full overflow-hidden border border-white/10">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10" />
                            <Image
                                src="/images/about-mockup.png"
                                alt="Diseño Estratégico"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Smaller Overlapping Image - Bottom Left */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="absolute -bottom-8 -left-8 lg:-bottom-12 lg:-left-12 w-48 h-48 lg:w-64 lg:h-64 overflow-hidden border-4 border-black shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-transparent z-10" />
                            <Image
                                src="/images/about-mockup.png"
                                alt="Detalle de diseño"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
