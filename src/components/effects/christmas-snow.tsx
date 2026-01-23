"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Snowfall from "react-snowfall";
import { motion, AnimatePresence } from "framer-motion";

interface MouseParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  // Pre-computed random offsets for sparkle effects (avoids Math.random during render)
  sparkleOffsetX: number;
  sparkleOffsetY: number;
}

export function ChristmasSnow() {
  const [mouseParticles, setMouseParticles] = useState<MouseParticle[]>([]);
  const particleIdRef = useRef(0);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const throttleRef = useRef(false);

  const createParticle = useCallback((x: number, y: number) => {
    const newParticle: MouseParticle = {
      id: particleIdRef.current++,
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      size: Math.random() * 8 + 4,
      opacity: Math.random() * 0.5 + 0.5,
      rotation: Math.random() * 360,
      // Pre-compute sparkle offsets
      sparkleOffsetX: (Math.random() - 0.5) * 30,
      sparkleOffsetY: (Math.random() - 0.5) * 30,
    };

    setMouseParticles((prev) => {
      const updated = [...prev, newParticle];
      // Keep only the last 30 particles for performance
      return updated.slice(-30);
    });

    // Remove particle after animation
    setTimeout(() => {
      setMouseParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1500);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (throttleRef.current) return;

      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only create particles if mouse moved enough
      if (distance > 15) {
        createParticle(e.clientX, e.clientY);
        lastMousePosRef.current = { x: e.clientX, y: e.clientY };

        // Throttle particle creation
        throttleRef.current = true;
        setTimeout(() => {
          throttleRef.current = false;
        }, 50);
      }
    },
    [createParticle],
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <>
      {/* Main Snowfall Effect */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <Snowfall
          snowflakeCount={150}
          speed={[0.5, 2.5]}
          wind={[-0.5, 1.5]}
          radius={[1, 6]}
          color="rgba(255, 255, 255, 0.9)"
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
          }}
        />
      </div>

      {/* Light Blue Snowflakes */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <Snowfall
          snowflakeCount={50}
          speed={[0.3, 1.5]}
          wind={[-0.3, 0.8]}
          radius={[2, 4]}
          color="rgba(173, 216, 230, 0.8)"
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
          }}
        />
      </div>

      {/* Mouse Trail Particles */}
      <div className="fixed inset-0 pointer-events-none z-[60]">
        <AnimatePresence>
          {mouseParticles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                x: particle.x,
                y: particle.y,
                scale: 1,
                opacity: particle.opacity,
                rotate: particle.rotation,
              }}
              animate={{
                y: particle.y + 100,
                opacity: 0,
                scale: 0.5,
                rotate: particle.rotation + 180,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
              className="absolute"
              style={{
                width: particle.size,
                height: particle.size,
                left: -particle.size / 2,
                top: -particle.size / 2,
              }}
            >
              {/* Snowflake SVG */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-full h-full"
                style={{
                  filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.8))",
                }}
              >
                <path
                  d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="12" r="2" fill="white" />
                <circle cx="12" cy="4" r="1" fill="rgba(173, 216, 230, 0.9)" />
                <circle cx="12" cy="20" r="1" fill="rgba(173, 216, 230, 0.9)" />
                <circle cx="4" cy="12" r="1" fill="rgba(173, 216, 230, 0.9)" />
                <circle cx="20" cy="12" r="1" fill="rgba(173, 216, 230, 0.9)" />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sparkle Effects on Mouse */}
      <div className="fixed inset-0 pointer-events-none z-[60]">
        <AnimatePresence>
          {mouseParticles.map((particle, index) =>
            index % 3 === 0 ? (
              <motion.div
                key={`sparkle-${particle.id}`}
                initial={{
                  x: particle.x + particle.sparkleOffsetX,
                  y: particle.y + particle.sparkleOffsetY,
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [1, 0.8, 0],
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="absolute w-2 h-2"
                style={{
                  left: -4,
                  top: -4,
                  background:
                    "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(173,216,230,0.5) 50%, transparent 100%)",
                  borderRadius: "50%",
                  boxShadow: "0 0 8px 2px rgba(255, 255, 255, 0.6)",
                }}
              />
            ) : null,
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
