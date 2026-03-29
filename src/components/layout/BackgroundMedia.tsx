"use client";

import { useEffect, useState } from "react";

export function BackgroundMedia() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {/* Global Film Grain Overlay - Optimized with small repeating tile */}
      <div 
        className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.05] mix-blend-overlay" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }} 
      />

      {/* Global Background Video - Conditional rendering & WebM optimized */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-black/70 z-10" />
        {!isMobile && (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/video-poster.png"
            className="w-full h-full object-cover opacity-60"
          >
            <source src="/background-video-v2.webm" type="video/webm" />
          </video>
        )}
        {/* Fallback image for mobile */}
        {isMobile && (
          <div 
            className="w-full h-full bg-cover bg-center opacity-40 bg-no-repeat"
            style={{ backgroundImage: 'url(/video-poster.png)' }}
          />
        )}
      </div>
    </>
  );
}
