"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Check } from "lucide-react"

const plans = [
    {
        name: "Landing Page estratégica",
        price: "Consultar",
        description: "Ideal para presentar un servicio, lanzar una propuesta o captar clientes.",
        features: [
            "Estructura clara y directa",
            "Diseño enfocado en conversión",
            "Optimización para móviles",
            "Integración con WhatsApp/Formulario"
        ],
    },
    {
        name: "Web institucional",
        price: "Consultar",
        description: "Pensada para marcas y profesionales que buscan transmitir confianza y orden.",
        features: [
            "Múltiples secciones informativas",
            "Diseño profesional y coherente",
            "Gestión de contenido básica",
            "Canal oficial de comunicación"
        ],
        popular: true,
    },
    {
        name: "Tienda online básica",
        price: "Consultar",
        description: "Comenzá a vender por internet de forma simple y profesional.",
        features: [
            "Catálogo de productos",
            "Carrito de compras simple",
            "Integración de pagos básicos",
            "Sin dependencias complejas"
        ],
    },
]

export function Pricing() {
    return (
        <section id="pricing" className="py-32 bg-black/70 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="mb-20 text-center max-w-4xl mx-auto">
                    <h2 className="mb-6 text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1]">
                        Planes
                        <br />
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500 cursor-default">Base</span>
                    </h2>
                    <div className="border-l-4 border-primary pl-6 inline-block">
                        <p className="text-xl font-semibold text-white/90 text-left">
                            Nuestros proyectos se desarrollan a partir de planes base orientativos
                        </p>
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-3 lg:gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className={`relative flex h-full flex-col p-6 ${plan.popular ? "border-primary shadow-lg shadow-primary/20" : ""}`}>
                                {plan.popular && (
                                    <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-none bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                                        Más Popular
                                    </div>
                                )}
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold tracking-wide">{plan.name}</h3>
                                    <p className="text-muted-foreground mt-2 text-sm h-10">{plan.description}</p>
                                </div>
                                <div className="mb-6">
                                    {/* Price removed as per request to avoid 'Consultar' in large text */}
                                </div>
                                <ul className="mb-8 space-y-4 flex-1">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <Check className={`h-5 w-5 ${plan.popular ? "text-primary" : "text-white/50"}`} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    className={`w-full ${plan.popular
                                        ? "bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(138,43,226,0.3)] hover:shadow-[0_0_30px_rgba(138,43,226,0.5)] transition-all duration-300"
                                        : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                                        }`}
                                    asChild
                                >
                                    <a href="#contact">CONSULTAR</a>
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
