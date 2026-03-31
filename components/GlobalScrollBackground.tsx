"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export default function GlobalScrollBackground() {
  const reduceMotion = useReducedMotion();
  const [performanceMode, setPerformanceMode] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const evaluate = () => {
      const smallScreen = window.matchMedia("(max-width: 1024px)").matches;
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const memory =
        "deviceMemory" in navigator
          ? Number((navigator as Navigator & { deviceMemory?: number }).deviceMemory)
          : undefined;
      const cores = navigator.hardwareConcurrency;
      const lowPower = (memory !== undefined && memory <= 4) || cores <= 4;

      setPerformanceMode(smallScreen || coarsePointer || lowPower);
    };

    evaluate();
    window.addEventListener("resize", evaluate);

    return () => {
      window.removeEventListener("resize", evaluate);
    };
  }, []);

  const smooth = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 28,
    mass: 0.8,
  });

  const driftX1 = useTransform(smooth, [0, 1], ["-10%", "10%"]);
  const driftY1 = useTransform(smooth, [0, 1], ["-6%", "8%"]);

  const driftX2 = useTransform(smooth, [0, 1], ["12%", "-12%"]);
  const driftY2 = useTransform(smooth, [0, 1], ["8%", "-6%"]);

  const gridX = useTransform(smooth, [0, 1], ["0%", "-18%"]);
  const gridY = useTransform(smooth, [0, 1], ["0%", "16%"]);

  const shimmer = useTransform(smooth, [0, 0.5, 1], [0.18, 0.28, 0.2]);
  const vignette = useTransform(smooth, [0, 0.5, 1], [0.2, 0.3, 0.22]);

  const gridOpacity = useTransform(smooth, [0, 1], [0.16, 0.28]);
  const gridFilter = useMotionTemplate`blur(${useTransform(smooth, [0, 1], [0.2, 1.4])}px)`;

  if (reduceMotion || performanceMode) {
    return (
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,191,255,0.1),transparent_42%),radial-gradient(circle_at_80%_70%,rgba(0,130,255,0.08),transparent_48%)]" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute -left-[12vw] -top-[18vh] h-[70vh] w-[70vw] rounded-full"
        style={{
          x: driftX1,
          y: driftY1,
          background:
            "radial-gradient(circle, rgba(0,191,255,0.26) 0%, rgba(0,191,255,0.08) 34%, transparent 68%)",
          filter: "blur(26px)",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute -bottom-[20vh] -right-[16vw] h-[78vh] w-[72vw] rounded-full"
        style={{
          x: driftX2,
          y: driftY2,
          background:
            "radial-gradient(circle, rgba(0,135,255,0.2) 0%, rgba(0,135,255,0.07) 38%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute inset-[-20%]"
        style={{
          x: gridX,
          y: gridY,
          opacity: gridOpacity,
          filter: gridFilter,
          backgroundImage:
            "linear-gradient(to right, rgba(130,180,220,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(130,180,220,0.12) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          opacity: shimmer,
          background:
            "linear-gradient(120deg, transparent 0%, rgba(0,191,255,0.08) 18%, transparent 38%, transparent 100%)",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          opacity: vignette,
          background:
            "radial-gradient(circle at 50% 50%, transparent 45%, rgba(0,0,0,0.24) 100%)",
        }}
      />
    </div>
  );
}
