"use server"

import nodemailer from "nodemailer"

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

        const emailUser = process.env.EMAIL_USER
        const emailPass = process.env.EMAIL_PASS

        if (!emailUser || !emailPass) {
            console.error("DEBUG: Faltan variables de entorno EMAIL_USER o EMAIL_PASS")
            return {
                success: false,
                error: "Error de configuración: Credenciales de correo no detectadas."
            }
        }

        // Configurar el transporte de Nodemailer para Gmail
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        })

        // Configurar el contenido del mail
        const mailOptions = {
            from: `"Web Esencia IA" <${emailUser}>`,
            to: "contacto@esencia-ia.com", // O el mail donde quieras recibir las consultas
            subject: `Nuevo mensaje de contacto de ${formData.name}`,
            replyTo: formData.email, // Para que al darle a "Responder" se le escriba al cliente
            text: `Nombre: ${formData.name}\nEmail: ${formData.email}\nMensaje: ${formData.message}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
                    <h2 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">Nuevo contacto desde la Web</h2>
                    <p><strong>Nombre:</strong> ${formData.name}</p>
                    <p><strong>Email:</strong> ${formData.email}</p>
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
                        <p><strong>Mensaje:</strong></p>
                        <p style="white-space: pre-wrap;">${formData.message}</p>
                    </div>
                </div>
            `,
        }

        // Enviar el correo
        await transporter.sendMail(mailOptions)

        return {
            success: true,
            message: "¡Mensaje enviado exitosamente! Te contactaremos pronto."
        }
    } catch (error) {
        console.error("DEBUG - Error en Nodemailer:", error)
        return {
            success: false,
            error: `Error al enviar el mensaje: ${error instanceof Error ? error.message : 'Error desconocido'}`
        }
    }
}
