"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { personal } from "@/data/portfolio";
import { ArrowDown, Download, CalendarCheck, BriefcaseBusiness } from "lucide-react";

/* ─── Particle canvas ─────────────────────────────────────────── */
function ParticleBackground({ disabled }: { disabled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (disabled) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    interface Particle {
      x: number;
      y: number;
      r: number;
      dx: number;
      dy: number;
      alpha: number;
    }

    const particleCount = 28;
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: 0,
      y: 0,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.32,
      dy: (Math.random() - 0.5) * 0.32,
      alpha: Math.random() * 0.4 + 0.08,
    }));

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      for (const p of particles) {
        if (p.x === 0 && p.y === 0) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
        } else {
          p.x = Math.min(canvas.width, Math.max(0, p.x));
          p.y = Math.min(canvas.height, Math.max(0, p.y));
        }
      }
    };

    resizeCanvas();

    let animId = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 191, 255, ${p.alpha})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 95) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 191, 255, ${0.06 * (1 - dist / 95)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    window.addEventListener("resize", resizeCanvas, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [disabled]);

  if (disabled) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
    />
  );
}

/* ─── Hero section ────────────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [performanceMode, setPerformanceMode] = useState(false);

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

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-28 sm:pt-24">
      <ParticleBackground disabled={!!shouldReduceMotion || performanceMode} />

      <div className="mesh-overlay pointer-events-none absolute inset-0 opacity-45" />

      {/* Radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="section-wrap relative z-10 grid items-center gap-10 py-10 md:grid-cols-[1.2fr_0.8fr]"
      >
        <div className="text-center md:text-left">
          <motion.p
            variants={fadeUp}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent"
          >
            {personal.role}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-balance text-4xl font-bold tracking-tight sm:text-6xl"
          >
            {personal.name}
            <span className="text-accent">.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg md:mx-0"
          >
            {personal.tagline}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 text-sm font-medium text-accent">
            {personal.availability}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start"
          >
            <a
              href={personal.cvFile}
              download
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-black transition-all hover:bg-accent-dark"
            >
              <Download size={16} />
              Download CV
            </a>
            <a
              href="#projects"
              className="rounded-full border border-card-border px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-accent hover:text-accent"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="rounded-full border border-card-border px-5 py-3 text-sm font-semibold text-foreground transition-all hover:border-accent hover:text-accent"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        <motion.aside
          variants={fadeUp}
          className="surface-card rounded-3xl p-6 md:p-7"
        >
          <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-accent">
            Quick Snapshot
          </p>
          <div className="grid gap-4">
            <div className="rounded-2xl border border-card-border/80 bg-background/70 p-4">
              <p className="text-xs uppercase tracking-wider text-muted">
                Focus
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                Full Stack Apps, Data-Driven Features, Business Tools
              </p>
            </div>
            <div className="rounded-2xl border border-card-border/80 bg-background/70 p-4">
              <p className="text-xs uppercase tracking-wider text-muted">
                Current Goal
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                Internship + client commissions with measurable outcomes
              </p>
            </div>
            <div className="rounded-2xl border border-card-border/80 bg-background/70 p-4">
              <p className="text-xs uppercase tracking-wider text-muted">
                Based In
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                Philippines
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-2 text-sm text-muted">
            <a
              href={personal.consultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <CalendarCheck size={16} />
              Book Consultation
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              <BriefcaseBusiness size={16} />
              Hire for Project Work
            </a>
          </div>
        </motion.aside>

        <motion.div
          variants={fadeUp}
          className="col-span-full mt-2 flex justify-center"
          animate={shouldReduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={shouldReduceMotion ? undefined : { repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={20} className="text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
