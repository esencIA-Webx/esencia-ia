"use client";

import { ReactLenis } from 'lenis/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from 'react'

// Aseguramos registrar el plugin de GSAP en el cliente
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null)
  
  useEffect(() => {
    // Sincroniza el ticker de GSAP con el bucle de actualización de Lenis
    function update(time: number) {
      if (lenisRef.current?.lenis) {
          lenisRef.current.lenis.raf(time * 1000)
      }
    }
  
    // Agregamos el update de Lenis al ticker principal de GSAP para evitar jitter
    gsap.ticker.add(update)
  
    // Sincronizar eventos de scroll para que ScrollTrigger recalcule posiciones
    lenisRef.current?.lenis?.on('scroll', ScrollTrigger.update)

    // Desactivamos el suavizado de lag de GSAP para que Lenis tome control real
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    // 'root' inyecta lenis al 'html/body' en lugar de crear un contenedor overflow-auto.
    // 'autoRaf={false}' permite que GSAP tome control del bucle de animación.
    // 'lerp' maneja la fricción/inercia (menor valor = mayor inercia).
    <ReactLenis root ref={lenisRef} autoRaf={false} options={{ lerp: 0.07, duration: 1.5, smoothWheel: true, wheelMultiplier: 1.2 }}>
      {children}
    </ReactLenis>
  )
}
