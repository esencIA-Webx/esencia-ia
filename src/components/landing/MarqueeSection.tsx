"use client"

import { motion } from "framer-motion"

const marqueeText = "TRABAJA CON NOSOTROS • TRABAJA CON NOSOTROS • TRABAJA CON NOSOTROS • TRABAJA CON NOSOTROS • "

export default function MarqueeSection() {
    return (
        <section className="bg-white py-8 md:py-16 overflow-hidden flex flex-col gap-2 md:gap-6 w-full relative z-10 border-y-4 border-black">
            <div className="flex flex-col gap-2 md:gap-6 relative w-full overflow-hidden">
                {/* Fila superior: Se mueve hacia la derecha (de -50% a 0%) */}
                <div className="flex relative w-full overflow-hidden">
                    <motion.div
                        className="flex whitespace-nowrap w-fit will-change-transform"
                        animate={{ x: ["-50%", "0%"] }}
                        transition={{ ease: "linear", duration: 45, repeat: Infinity }}
                    >
                        <h2 className="text-black text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none pr-8 flex-shrink-0">
                            {marqueeText}
                        </h2>
                        <h2 className="text-black text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none pr-8 flex-shrink-0">
                            {marqueeText}
                        </h2>
                    </motion.div>
                </div>

                {/* Fila inferior: Se mueve hacia la izquierda (de 0% a -50%) */}
                <div className="flex relative w-full overflow-hidden">
                    <motion.div
                        className="flex whitespace-nowrap w-fit will-change-transform"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ ease: "linear", duration: 45, repeat: Infinity }}
                    >
                        <h2 className="text-black text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none pr-8 flex-shrink-0">
                            {marqueeText}
                        </h2>
                        <h2 className="text-black text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none pr-8 flex-shrink-0">
                            {marqueeText}
                        </h2>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
