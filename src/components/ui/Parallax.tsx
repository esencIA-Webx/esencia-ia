"use client"

import { ReactNode, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface ParallaxProps {
    children: ReactNode
    speed?: number // Positive for faster, negative for slower/reverse
    direction?: "vertical" | "horizontal"
    className?: string
}

export function Parallax({ children, speed = 1, direction = "vertical", className = "" }: ParallaxProps) {
    const target = useRef<HTMLDivElement>(null)

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)

        const element = target.current
        if (!element) return

        // Reduced motion check
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

        const yValue = direction === "vertical" ? speed * 100 : 0
        const xValue = direction === "horizontal" ? speed * 100 : 0

        const anim = gsap.fromTo(
            element,
            {
                y: 0,
                x: 0,
            },
            {
                y: -yValue,
                x: -xValue,
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom", // when the top of the element hits the bottom of the viewport
                    end: "bottom top", // when the bottom of the element hits the top of the viewport
                    scrub: 1.2, // use numeric value for inertia
                },
            }
        )

        return () => {
            anim.kill()
        }
    }, [speed, direction])

    return (
        <div ref={target} className={className}>
            {children}
        </div>
    )
}
