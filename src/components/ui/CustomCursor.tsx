"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const followerRef = useRef<HTMLDivElement>(null)
    const [isHovering, setIsHovering] = useState(false)

    useEffect(() => {
        // Accessibility check
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefersReducedMotion) return

        if (!cursorRef.current || !followerRef.current) return

        // Centrar elementos desde su diseño original (para que (0,0) esté en el centro)
        gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, opacity: 0 })
        gsap.set(followerRef.current, { xPercent: -50, yPercent: -50, opacity: 0 })

        // quickTo devuelve una función que actualiza instantáneamente sin lag
        const xToCursor = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" })
        const yToCursor = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" })
        
        const xToFollower = gsap.quickTo(followerRef.current, "x", { duration: 0.5, ease: "power3" })
        const yToFollower = gsap.quickTo(followerRef.current, "y", { duration: 0.5, ease: "power3" })

        let hasMoved = false

        const handleMouseMove = (e: MouseEvent) => {
            if (!hasMoved) {
                gsap.to([cursorRef.current, followerRef.current], { opacity: 1, duration: 0.5 })
                hasMoved = true
            }
            xToCursor(e.clientX)
            yToCursor(e.clientY)
            xToFollower(e.clientX)
            yToFollower(e.clientY)
        }

        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).closest("a, button, input, textarea, .cursor-hover, [data-magnetic]")) {
                setIsHovering(true)
            } else {
                setIsHovering(false)
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseover", handleMouseOver)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseover", handleMouseOver)
        }
    }, [])

    useEffect(() => {
        if (!cursorRef.current || !followerRef.current) return

        if (isHovering) {
            gsap.to(cursorRef.current, { scale: 2.5, duration: 0.3, ease: "power2.out" })
            gsap.to(followerRef.current, { scale: 1.5, opacity: 0.2, duration: 0.3, ease: "power2.out" })
        } else {
            gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: "power2.out" })
            gsap.to(followerRef.current, { scale: 1, opacity: 0.5, duration: 0.3, ease: "power2.out" })
        }
    }, [isHovering])

    return (
        <div className="hidden md:block">
            <div
                ref={cursorRef}
                className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-primary mix-blend-difference"
            />
            <div
                ref={followerRef}
                className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 rounded-full border border-primary/50"
            />
        </div>
    )
}
