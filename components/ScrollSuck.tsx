"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PropsWithChildren } from "react";
import { useRef } from "react";

type ScrollSuckProps = PropsWithChildren<{
  className?: string;
  from?: "left" | "right";
}>;

export default function ScrollSuck({
  children,
  className,
  from = "right",
}: ScrollSuckProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const sign = from === "left" ? -1 : 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 96%", "end 4%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
    mass: 0.55,
  });

  const scale = useTransform(
    smoothProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.52, 1.11, 0.96, 1.04, 0.68],
  );

  const opacity = useTransform(
    smoothProgress,
    [0, 0.16, 0.46, 0.78, 1],
    [0.04, 0.9, 1, 0.88, 0.16],
  );

  const x = useTransform(
    smoothProgress,
    [0, 0.22, 0.5, 0.76, 1],
    [sign * 420, sign * 120, 0, -sign * 180, -sign * 420],
  );

  const y = useTransform(
    smoothProgress,
    [0, 0.25, 0.52, 0.78, 1],
    [140, 40, 0, -35, -120],
  );

  const rotateY = useTransform(
    smoothProgress,
    [0, 0.24, 0.5, 0.8, 1],
    [sign * 38, sign * 16, 0, -sign * 12, -sign * 30],
  );

  const rotateX = useTransform(
    smoothProgress,
    [0, 0.3, 0.54, 0.82, 1],
    [22, 8, 0, -6, -16],
  );

  const blurValue = useTransform(
    smoothProgress,
    [0, 0.2, 0.5, 0.82, 1],
    [6, 1, 0, 0.8, 4],
  );
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        scale,
        x,
        y,
        opacity,
        rotateX,
        rotateY,
        filter,
        transformPerspective: 2200,
        transformOrigin: from === "left" ? "left center" : "right center",
        willChange: "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
}
