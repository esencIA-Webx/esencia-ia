"use client"

import { ReactNode, useEffect } from "react"
import Lenis from "lenis"

export function SmoothScroll({ children }: { children: ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.7, // Fast but smooth
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 3, // Very responsive to touch
        })

        if (typeof window !== "undefined") {
            (window as any).lenis = lenis;
        }

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            if (typeof window !== "undefined" && (window as any).lenis === lenis) {
                delete (window as any).lenis;
            }
            lenis.destroy()
        }
    }, [])

    return <>{children}</>
}
