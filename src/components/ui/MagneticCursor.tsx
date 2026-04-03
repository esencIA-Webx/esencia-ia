"use client"

import { useEffect, useRef } from "react"

export function MagneticCursor() {
    const dotRef    = useRef<HTMLDivElement>(null)
    const ringRef   = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const dot  = dotRef.current
        const ring = ringRef.current
        if (!dot || !ring) return

        // Solo en dispositivos con puntero fino (ratón), no touch
        if (!window.matchMedia("(pointer: fine)").matches) return
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        // Empezamos fuera de pantalla para que no aparezcan en (0,0)
        let mouseX = -200, mouseY = -200
        let ringX  = -200, ringY  = -200
        let isHovered = false
        let rafId: number

        // Ubica el dot instantáneamente
        dot.style.left = `${mouseX}px`
        dot.style.top  = `${mouseY}px`
        ring.style.left = `${ringX}px`
        ring.style.top  = `${ringY}px`

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t

        // RAF loop para el anillo con inercia
        const tick = () => {
            if (!isHovered) {
                ringX = lerp(ringX, mouseX, 0.12)
                ringY = lerp(ringY, mouseY, 0.12)
                ring.style.left = `${ringX}px`
                ring.style.top  = `${ringY}px`
            }
            rafId = requestAnimationFrame(tick)
        }
        rafId = requestAnimationFrame(tick)

        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
            dot.style.left = `${mouseX}px`
            dot.style.top  = `${mouseY}px`
        }

        // ── HOVER magnético en links/buttons ──
        const onOver = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest("a, button, [data-magnetic]") as HTMLElement | null
            if (!target || isHovered) return
            isHovered = true

            const rect = target.getBoundingClientRect()
            const w = rect.width  + 20
            const h = rect.height + 20

            ring.style.transition = "width 0.3s, height 0.3s, border-radius 0.3s, border-color 0.3s"
            ring.style.width        = `${w}px`
            ring.style.height       = `${h}px`
            ring.style.borderRadius = "12px"
            ring.style.borderColor  = "rgba(255,255,255,0.6)"
            dot.style.opacity       = "0"

            // Snap al centro del elemento
            const cx = rect.left + rect.width  / 2
            const cy = rect.top  + rect.height / 2
            ringX = cx
            ringY = cy
            ring.style.left = `${ringX}px`
            ring.style.top  = `${ringY}px`

            const onPull = (e2: MouseEvent) => {
                const rx = (e2.clientX - cx) * 0.2
                const ry = (e2.clientY - cy) * 0.2
                ringX = cx + rx
                ringY = cy + ry
                target.style.transform = `translate(${rx * 0.5}px, ${ry * 0.5}px)`
            }

            const onLeave = () => {
                isHovered = false
                ring.style.width        = "30px"
                ring.style.height       = "30px"
                ring.style.borderRadius = "9999px"
                ring.style.borderColor  = "rgba(255,255,255,0.35)"
                dot.style.opacity       = "1"
                target.style.transform  = "translate(0,0)"
                target.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
                target.removeEventListener("mousemove",  onPull)
                target.removeEventListener("mouseleave", onLeave)
            }

            target.addEventListener("mousemove",  onPull)
            target.addEventListener("mouseleave", onLeave)
        }

        window.addEventListener("mousemove", onMove)
        window.addEventListener("mouseover", onOver)
        return () => {
            cancelAnimationFrame(rafId)
            window.removeEventListener("mousemove", onMove)
            window.removeEventListener("mouseover", onOver)
        }
    }, [])

    return (
        <div className="pointer-events-none" aria-hidden>
            {/* Punto central — sigue el mouse directamente */}
            <div
                ref={dotRef}
                className="pointer-events-none fixed z-[99999] rounded-full bg-white mix-blend-difference"
                style={{
                    width: 7,
                    height: 7,
                    transform: "translate(-50%, -50%)",
                    willChange: "left, top",
                }}
            />
            {/* Anillo exterior — lag con lerp */}
            <div
                ref={ringRef}
                className="pointer-events-none fixed z-[99998] border rounded-full"
                style={{
                    width: 30,
                    height: 30,
                    borderColor: "rgba(255,255,255,0.35)",
                    transform: "translate(-50%, -50%)",
                    willChange: "left, top",
                }}
            />
        </div>
    )
}
