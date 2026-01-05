"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"


export function VisualContent() {
    return (
        <section id="visual-content" className="py-24 scroll-snap-start">
            <div className="container mx-auto px-4 space-y-16">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <h2 className="text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1] mb-6">
                        RESPALDO <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500 cursor-default">VISUAL</span>
                    </h2>
                    <div className="border-l-4 border-accent pl-6 inline-block">
                        <p className="text-xl font-semibold text-white/90 text-left">
                            Cada proyecto está diseñado con un objetivo claro: comunicar mejor, generar confianza y convertir visitas en clientes.
                        </p>
                    </div>
                </motion.div>
                {/* Example Grid with Perspective */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 [perspective:1000px]">
                    {[
                        { title: "OWO 3D", image: "/images/owo3d.png", link: "https://owo3d.fun" },
                        { title: "Viajes Oeste", image: "/images/viajes-oeste.jpg", link: "https://viajesoeste-one.vercel.app" },
                        { title: "Instituto Maria Reina", image: "/images/maria-reina.png", link: "https://page-institucional-two.vercel.app" }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9, rotateY: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{
                                rotateY: -10,
                                rotateX: 5,
                                scale: 1.05,
                                transition: { duration: 0.4, ease: "easeOut" }
                            }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="aspect-video bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden group hover:border-primary/50 transition-colors rounded-sm shadow-xl hover:shadow-2xl hover:shadow-primary/20"
                        >
                            {item.link !== "#" ? (
                                <Link href={item.link} target="_blank" className="absolute inset-0 z-10">
                                    <span className="sr-only">Ver {item.title}</span>
                                </Link>
                            ) : null}

                            {item.image ? (
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-500"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}

                            {/* Inner Shine Effect on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section >
    )
}
