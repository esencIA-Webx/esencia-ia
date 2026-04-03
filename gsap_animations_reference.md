# Inspiración de Animaciones GSAP

Este documento contiene un catálogo de animaciones de alta gama construidas con GSAP, recolectadas como inspiración para futuros desarrollos en Esencia IA. 

## 1. www.sirnik.co

### Progress Preloader
*   **Comportamiento**: Pantalla oscura inicial con un logotipo estilizado y un contador (0-100%). El contador aumenta progresivamente hasta completarse la carga y luego revela suavemente el inicio de la página.
*   **Etiquetas GSAP sugeridas**: `preloader`, `SVG animation`, `counter`

### Hero Text Reveal (Split Text)
*   **Comportamiento**: Los títulos principales ingresan a escena separándose palabra por palabra o letra por letra, surgiendo desde elementos inferiores invisibles (`overflow: hidden`) y con una diferencia de tiempo (`stagger`) entre ellos.
*   **Etiquetas GSAP sugeridas**: `hero`, `SplitText`, `stagger`, `reveal`

### Scroll-Scrub Text Reveal
*   **Comportamiento**: Al hacer scroll por un párrafo grande, el texto cambia dinámicamente de una opacidad baja a alta de forma progresiva, palabra a palabra.
*   **Etiquetas GSAP sugeridas**: `ScrollTrigger`, `scrub`, `text-opacity`

### Dynamic Scaling Typography
*   **Comportamiento**: Elementos tipográficos de fondo de gran tamaño se escalan y mueven dinámicamente dependiendo del porcentaje de scroll en la pantalla.
*   **Etiquetas GSAP sugeridas**: `ScrollTrigger`, `scrub`, `scale`, `typography`

### Section Pinned Transitions
*   **Comportamiento**: Una sección padre se clava en la pantalla (`pinning`) y el contenido de la misma fluye de forma horizontal o a través de transformaciones internas hasta que termina antes de reanudar el scroll vertical normal.
*   **Etiquetas GSAP sugeridas**: `ScrollTrigger`, `pinning`, `horizontal-scroll`

### Custom Magnetic Cursor
*   **Comportamiento**: El puntero del ratón es reemplazado por un elemento DOM custom que persigue al ratón a través de una inercia ligera (`lerp`). Se expande imantándose a los links al pasar sobre ellos.
*   **Etiquetas GSAP sugeridas**: `custom-cursor`, `magnetic-hover`, `lerp`

---

## 2. www.mcshannock.design

### Masked Staggered Text Reveal
*   **Comportamiento**: Variación elegante de entrada de texto para títulos largos desde la parte inferior, usando agrupaciones por líneas y retardos muy cuidados para exhibir cada línea limpiamente.
*   **Etiquetas GSAP sugeridas**: `text-mask`, `stagger`, `entry-animation`

### Linear Smooth Scroll
*   **Comportamiento**: No es estrictamente una animación por timeline, pero una integración perfecta con bibliotecas inerciales como Lenis sumado al refresco del ticker de GSAP haciendo que todo fluya muy natural.
*   **Etiquetas GSAP sugeridas**: `smooth-scroll`, `inertia`, `GSAP ticker`

### Image Scale-on-Hover
*   **Comportamiento**: Al hacer `hover` sobre las tarjetas de portfolio o servicios, la escala de las imágenes internas crece suavemente sin desbordar el contenedor que tiene bordes redondeados.
*   **Etiquetas GSAP sugeridas**: `hover`, `scale`, `transition`

### Content Fade-in on Scroll
*   **Comportamiento**: Transiciones de opacidad unidas con una leve traslación vertical al deslizar componentes hacia la zona de visión.
*   **Etiquetas GSAP sugeridas**: `ScrollTrigger`, `fade-in`, `entry`

---

## 3. digitalpresent.io

### Fluid Generative Background
*   **Comportamiento**: Fondos muy orgánicos y responsivos a través del uso de máscaras o canvas donde elementos como manchas de colores ("blobs") se relajan, combinan e interactúan.
*   **Etiquetas GSAP sugeridas**: `canvas`, `svg-blob`, `RoughEase`, `background`

### SVG Mask Clip Reveal
*   **Comportamiento**: Imágenes estáticas o videos incrustados que se van revelando progresivamente utilizando elementos como `clip-path` u otras máscaras de recorte SVG basadas en el recorrido del scroll.
*   **Etiquetas GSAP sugeridas**: `ScrollTrigger`, `svg-mask`, `clip-path`, `reveal`

### Section Stacking Transition (Layered Scroll)
*   **Comportamiento**: Sensación inmersiva en la que las secciones se ubican visualmente una encima de la anterior haciendo un efecto de "apilamiento".
*   **Etiquetas GSAP sugeridas**: `ScrollTrigger`, `pinning`, `layered-scroll`, `depth`, `parallax`

### Character-Level Staggered Reveal
*   **Comportamiento**: Al igual que SplitText pero a nivel de caracteres con variaciones estrictas de opacidad y desplazamiento en el eje Y. Simbolizando muchas veces la construcción dinámica de las cabeceras tipo mecanografía suave.
*   **Etiquetas GSAP sugeridas**: `SplitText`, `character-animation`, `stagger`
