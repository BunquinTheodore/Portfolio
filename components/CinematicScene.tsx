"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import type { PropsWithChildren } from "react";
import { useRef } from "react";

type CinematicSceneProps = PropsWithChildren<{
  sceneId?: string;
  from?: "left" | "right";
  className?: string;
  profile?: "balanced" | "cinematic" | "extreme";
  isFocused?: boolean;
  focusLock?: boolean;
  signature?:
    | "hero"
    | "about"
    | "skills"
    | "projects"
    | "blog"
    | "experience"
    | "achievements"
    | "goals"
    | "contact";
}>;

export default function CinematicScene({
  children,
  sceneId,
  from = "right",
  className,
  profile = "cinematic",
  isFocused = true,
  focusLock = true,
  signature = "about",
}: CinematicSceneProps) {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const direction = from === "left" ? -1 : 1;

  const profileMap = {
    balanced: { intensity: 0.66, velocityAmp: 70, perspective: 1900 },
    cinematic: { intensity: 0.84, velocityAmp: 120, perspective: 2250 },
    extreme: { intensity: 1.02, velocityAmp: 180, perspective: 2650 },
  } as const;

  const signatureMap = {
    hero: { xBias: 1.15, yBias: 1.1, rotBias: 1.2, scaleBias: 1.16 },
    about: { xBias: 0.86, yBias: 0.72, rotBias: 0.9, scaleBias: 1 },
    skills: { xBias: 1.02, yBias: 0.62, rotBias: 1.12, scaleBias: 1.06 },
    projects: { xBias: 1.34, yBias: 0.82, rotBias: 1.26, scaleBias: 1.14 },
    blog: { xBias: 0.9, yBias: 0.64, rotBias: 0.82, scaleBias: 0.98 },
    experience: { xBias: 1.1, yBias: 0.9, rotBias: 1.2, scaleBias: 1.08 },
    achievements: { xBias: 1.26, yBias: 0.98, rotBias: 1.3, scaleBias: 1.12 },
    goals: { xBias: 1, yBias: 0.7, rotBias: 1.02, scaleBias: 1.04 },
    contact: { xBias: 0.78, yBias: 0.58, rotBias: 0.72, scaleBias: 0.94 },
  } as const;

  const profileConfig = profileMap[profile];
  const signatureConfig = signatureMap[signature];

  const depthIntensity = profileConfig.intensity * signatureConfig.scaleBias;
  const xIntensity = profileConfig.intensity * signatureConfig.xBias;
  const yIntensity = profileConfig.intensity * signatureConfig.yBias;
  const rotIntensity = profileConfig.intensity * signatureConfig.rotBias;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start end", "end start"],
  });

  const { scrollY } = useScroll();
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, {
    stiffness: 120,
    damping: 28,
    mass: 0.6,
  });

  const velocityFactor = useTransform(
    smoothVelocity,
    [-3500, -1600, 0, 1600, 3500],
    [-0.9, -0.4, 0, 0.4, 0.9],
  );

  const baseX = useTransform(
    scrollYProgress,
    [0, 0.22, 0.5, 0.78, 1],
    [direction * 320, direction * 110, 0, -direction * 95, -direction * 330],
  );

  const x = useTransform(() => baseX.get() + velocityFactor.get() * 210);
  const cinematicX = useTransform(
    () => x.get() * xIntensity + velocityFactor.get() * profileConfig.velocityAmp,
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.84, 1],
    [28, 10, 0, -8, -24],
  );
  const cinematicY = useTransform(() => y.get() * yIntensity);

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.78, 1.06, 1, 1.02, 0.82],
  );

  const velocityScale = useTransform(
    velocityFactor,
    [-1.2, -0.6, 0, 0.6, 1.2],
    [0.94, 0.98, 1, 1.04, 1.08],
  );

  const cinematicScale = useTransform(
    () => scale.get() * velocityScale.get() * depthIntensity,
  );

  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.24, 0.52, 0.8, 1],
    [direction * 18, direction * 8, 0, -direction * 6, -direction * 16],
  );
  const cinematicRotateY = useTransform(() => rotateY.get() * rotIntensity);

  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.24, 0.5, 0.8, 1],
    [5, 2.5, 0, -2, -4],
  );
  const cinematicRotateX = useTransform(() => rotateX.get() * rotIntensity);

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.16, 0.42, 0.8, 1],
    [0.12, 0.84, 1, 0.94, 0.24],
  );

  const depthBlur = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [5, 1.2, 0, 1, 4],
  );
  const filter = useMotionTemplate`blur(${depthBlur}px)`;

  const layerA = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-direction * 78, 0, direction * 78],
  );
  const parallaxA = useTransform(() => layerA.get() * xIntensity * 1.15);
  const layerB = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [direction * 58, 0, -direction * 58],
  );
  const parallaxB = useTransform(() => layerB.get() * xIntensity * 1.08);

  // Creates quick flash hits at scene boundaries for trailer-style hard cuts.
  const hardCut = useTransform(
    scrollYProgress,
    [0, 0.03, 0.06, 0.92, 0.965, 1],
    [0, 0.45, 0, 0, 0.38, 0],
  );

  const shutter = useTransform(
    scrollYProgress,
    [0, 0.045, 0.09, 0.93, 0.975, 1],
    [100, 0, 100, 100, 0, 100],
  );
  const shutterBottom = useTransform(() => -shutter.get());
  const focusedOpacity = useTransform(() =>
    focusLock ? opacity.get() * (isFocused ? 1 : 0.7) : opacity.get(),
  );
  const focusedFilter = useMotionTemplate`${filter} brightness(${focusLock ? (isFocused ? 1 : 0.85) : 1})`;

  if (reduceMotion) {
    return (
      <section id={sceneId} className={className}>
        {children}
      </section>
    );
  }

  return (
    <section
      id={sceneId}
      ref={sceneRef}
      className={`relative h-[170vh] md:h-[185vh] ${className ?? ""}`}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {focusLock && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[2] bg-background"
            animate={{
              opacity: isFocused ? 0 : 0.22,
            }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          />
        )}

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            x: parallaxA,
            background:
              "radial-gradient(circle at 20% 30%, rgba(0, 191, 255, 0.22), transparent 34%)",
          }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            x: parallaxB,
            background:
              "radial-gradient(circle at 80% 70%, rgba(0, 191, 255, 0.18), transparent 40%)",
          }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[3] bg-white mix-blend-screen"
          style={{ opacity: hardCut }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-[3] h-1.5 w-full bg-black/80"
          style={{ y: shutter }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 z-[3] h-1.5 w-full bg-black/80"
          style={{ y: shutterBottom }}
        />

        <div className="relative z-[4] flex h-full items-center">
          <motion.div
            style={{
              x: cinematicX,
              y: cinematicY,
              opacity: focusedOpacity,
              scale: cinematicScale,
              rotateX: cinematicRotateX,
              rotateY: cinematicRotateY,
              filter: focusedFilter,
              transformPerspective: profileConfig.perspective,
              transformOrigin:
                from === "left" ? "left center" : "right center",
              willChange: "transform, opacity, filter",
            }}
            className="w-full"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
