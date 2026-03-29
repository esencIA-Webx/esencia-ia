---
description: Premium Awwwards UI Animations & Micro-interactions
---

# Premium Awwwards Animations Skill

Este skill contiene las directrices, lógicas y referencias para implementar animaciones de muy alta calidad y físicas (nivel Awwwards) extraídas de sitios referentes como `digitalpresent.io`, `sirnik.co` y `thehapticscompany.com`. 

Utiliza este documento como referencia obligatoria cuando el usuario pida "una animación brutal", "nivel Awwwards", o refiera a estos sitios.

## 1. Fondo de Retícula Interactiva con Físicas (The Haptics Company)
**Descripción:** Un canvas de fondo con una cuadrícula (grid) o puntos que reaccionan de manera física (se hunden o repelen) ante la proximidad del cursor, regresando a su sitio con inercia elástica (spring).
**Implementación ideal:**
- Usar `Canvas API` puro para rendimiento o `react-three-fiber` si es 3D.
- Rastrear el evento `mousemove` para generar un "radio de influencia".
- Aplicar fórmulas de resorte (spring physics) a la posición `x,y` de cada nodo de la cuadrícula: `velocidad += (posObjetivo - posActual) * tension - velocidad * friccion`.

## 2. Navegación Magnética y "Píldora Flotante" (Digital Present / Sirnik)
**Descripción:** Un navbar que en lugar de ocupar el 100% del ancho, flota como una "píldora" anclada arriba. Además, cada botón es magnético: al acercar el cursor, el botón se desplaza sutilmente hacia el puntero.
**Implementación ideal (Framer Motion / GSAP):**
- **Magnético:** Envolver el elemento en un contenedor que escuche `onMouseMove`. Calcular la distancia del cursor al centro del div y hacer `x = (clientX - centerX) * 0.3`.
- Usar un Interpolador Lineal (Lerp) para suavizar la atracción y sobre todo la vuelta al centro (`onMouseLeave`).

## 3. Máscaras Geométricas por Scroll (Digital Present)
**Descripción:** Las imágenes o videos no entran "haciendo fade in", sino que se revelan a través de una forma geométrica (círculo pequeño o un rectángulo redondeado curvado) que "crece" (clip-path expand) hasta llenar el contenedor a medida que el usuario hace scroll.
**Implementación ideal (GSAP ScrollTrigger):**
- Contenedor con `clipPath: circle(10% at 50% 50%)` o `inset(20% round 50px)`.
- `scrollTrigger` con `scrub: true`.
- Animar hacia `clipPath: circle(100% at 50% 50%)` o `inset(0% round 0px)`.

## 4. Revelación Segmentada "Cinemática" (Sirnik)
**Descripción:** Los grandes títulos h1/h2 se dividen por letras o palabras (`split-text`). Se revelan desde `transform: translateY(100%)` escondidas dentro de un contenedor `overflow: hidden`.
**Implementación ideal (GSAP o Framer Motion):**
- Fragmentar el texto.
- Easing agresivo: `power4.out` o curva de bezier personalizada `[0.16, 1, 0.3, 1]`.
- Stagger estricto: `stagger: 0.03` a `0.05` segundos entre letras. Transmite muchísima elegancia editorial.

## 5. Tipografía Parallax (Float Text)
**Descripción:** Dentro de un gran bloque de texto, palabras clave específicas o renglones completos viajan vertical u horizontalmente a distinta velocidad al scrollear.
**Implementación ideal (GSAP):**
- Identificar renglones o palabras con un atributo `data-speed`.
- Usar `gsap.to(el, { y: ScrollY * speed, scrollTrigger: { scrub: true }})`.
- Rompe la rigidez clásica del texto web, dándole una dimensión "flotante".
