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
            console.error("Web3Forms API Error Result:", result)
            return {
                success: false,
                error: result.message || "Error al enviar el mensaje por parte de la API."
            }
        }

        return {
            success: true,
            message: "¡Mensaje enviado exitosamente! Te contactaremos pronto."
        }
    } catch (error) {
        console.error("DEBUG - Trace de error completo:", error)
        return {
            success: false,
            error: `Error interno: ${error instanceof Error ? error.message : 'Error desconocido'}`
        }
    }
}
