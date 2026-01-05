"use server"

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

        const accessKey = process.env.WEB3FORMS_ACCESS_KEY

        if (!accessKey) {
            console.error("WEB3FORMS_ACCESS_KEY is not defined")
            return {
                success: false,
                error: "Error de configuración en el servidor"
            }
        }

        // Send email using Web3Forms
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: accessKey,
                name: formData.name,
                email: formData.email,
                message: formData.message,
                subject: `Nuevo mensaje de contacto de ${formData.name}`,
                from_name: "Esencia IA Web",
            }),
        })

        const result = await response.json()

        if (!result.success) {
            console.error("Web3Forms Error:", result)
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
