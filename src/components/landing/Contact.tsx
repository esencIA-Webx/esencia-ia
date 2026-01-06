"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { useState } from "react"
import { sendContactEmail, type ContactFormData } from "@/app/actions/contact"

export function Contact() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        message: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error" | null
        message: string
    }>({ type: null, message: "" })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus({ type: null, message: "" })

        const result = await sendContactEmail(formData)

        if (result.success) {
            setSubmitStatus({
                type: "success",
                message: result.message || "¡Mensaje enviado!"
            })
            // Reset form
            setFormData({ name: "", email: "", message: "" })
        } else {
            setSubmitStatus({
                type: "error",
                message: result.error || "Error al enviar el mensaje"
            })
        }

        setIsSubmitting(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }

    return (
        <section id="contact" className="py-24 bg-[#FFFFF0] border-t border-neutral-200">
            <div className="container mx-auto px-4">
                <div className="grid gap-12 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6 md:space-y-8"
                    >
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-black font-sans">
                            ¿Listo para
                            <br className="hidden md:block" />
                            <span className="md:block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary bg-[length:200%_auto] md:hover:bg-right transition-[background-position] duration-500 cursor-default"> profesionalizar </span>
                            <span className="md:block">tu proyecto?</span>
                        </h2>
                        <div className="border-l-4 border-primary pl-4 md:pl-6">
                            <p className="text-lg md:text-xl font-semibold text-black/90 font-sans tracking-wide">
                                Si necesitás una web profesional, con estructura, claridad y criterio, podés escribirnos para conversar sobre tu proyecto.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                                    📧
                                </div>
                                <div>
                                    <div className="font-medium tracking-wide text-black font-sans">Email</div>
                                    <div className="text-neutral-600 font-sans">esenciaweb.ia@gmail.com</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                                    📍
                                </div>
                                <div>
                                    <div className="font-medium tracking-wide text-black font-sans">Ubicación</div>
                                    <div className="text-neutral-600 font-sans">Buenos Aires, Argentina</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="bg-[#FFFFF0] border-neutral-200 shadow-2xl">
                            <CardHeader>
                                <CardTitle className="text-black font-sans tracking-tight">Contáctanos</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium tracking-wide text-black font-sans">Nombre</label>
                                            <Input
                                                id="name"
                                                placeholder="Tu nombre"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                disabled={isSubmitting}
                                                className="bg-white border-neutral-200 text-black placeholder:text-gray-400 focus-visible:ring-primary"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium tracking-wide text-black font-sans">Email</label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="tu@email.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                disabled={isSubmitting}
                                                className="bg-white border-neutral-200 text-black placeholder:text-gray-400 focus-visible:ring-primary"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium tracking-wide text-black font-sans">Mensaje</label>
                                        <textarea
                                            id="message"
                                            className="flex min-h-[120px] w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-black ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-sans"
                                            placeholder="Cuéntanos sobre tu proyecto..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    {submitStatus.type && (
                                        <div className={`p-3 rounded-md text-sm ${submitStatus.type === "success"
                                            ? "bg-green-500/10 text-green-500 border border-green-500/20"
                                            : "bg-red-500/10 text-red-500 border border-red-500/20"
                                            }`}>
                                            {submitStatus.message}
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full font-sans tracking-wide"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
