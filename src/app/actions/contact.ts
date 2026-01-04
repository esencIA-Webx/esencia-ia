"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export interface ContactFormData {
    name: string
    email: string
    message: string
}

export async function sendContactEmail(formData: ContactFormData) {
    try {
        // Validate input
        if (!formData.name || !formData.email || !formData.message) {
            return {
                success: false,
                error: "Todos los campos son requeridos"
            }
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            return {
                success: false,
                error: "Email inválido"
            }
        }

        // Send email using Resend
        const { data: _data, error } = await resend.emails.send({
            from: "Esencia IA <onboarding@resend.dev>", // You'll need to update this with your verified domain
            to: ["contacto@esencia-ia.com"], // Replace with your actual email
            subject: `Nuevo mensaje de contacto de ${formData.name}`,
            html: `
                <h2>Nuevo mensaje de contacto</h2>
                <p><strong>Nombre:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${formData.message.replace(/\n/g, '<br>')}</p>
            `,
        })

        if (error) {
            console.error("Error sending email:", error)
            return {
                success: false,
                error: "Error al enviar el mensaje. Por favor intenta nuevamente."
            }
        }

        return {
            success: true,
            message: "¡Mensaje enviado exitosamente! Te contactaremos pronto."
        }
    } catch (error) {
        console.error("Unexpected error:", error)
        return {
            success: false,
            error: "Error inesperado. Por favor intenta nuevamente."
        }
    }
}
