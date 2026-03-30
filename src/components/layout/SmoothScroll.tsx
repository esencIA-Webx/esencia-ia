"use client"

import { ReactNode, useEffect, useRef } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function SmoothScroll({ children }: { children: ReactNode }) {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger)

        // Accessibility: check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        if (prefersReducedMotion) return

        // Initialize Lenis with premium parameters
        const lenis = new Lenis({
            duration: 1.4, // Slightly longer for that "premium" feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing for smooth deceleration
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1.1,
            touchMultiplier: 1.5,
            lerp: 0.08, // The "magic" smoothness factor
        })

        // Expose lenis instance globally for use in other components (like parallax)
        if (typeof window !== "undefined") {
            (window as any).lenis = lenis
        }

        // Synchronize GSAP ScrollTrigger with Lenis
        lenis.on('scroll', (e: any) => {
            ScrollTrigger.update()
        })

        // Use GSAP ticker for the requestAnimationFrame loop to ensure precise sync
        const update = (time: number) => {
            lenis.raf(time * 1000)
        }
        
        gsap.ticker.add(update)
        gsap.ticker.lagSmoothing(0)

        // Clean up
        return () => {
            gsap.ticker.remove(update)
            lenis.destroy()
            if (typeof window !== "undefined" && (window as any).lenis === lenis) {
                delete (window as any).lenis
            }
        }
    }, [])

    return (
        <div id="smooth-wrapper" className="relative w-full">
            <div id="smooth-content" className="will-change-transform">
                {children}
            </div>
        </div>
    )
}
