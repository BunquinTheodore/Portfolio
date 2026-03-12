"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { personal } from "@/data/portfolio";
import { ArrowDown } from "lucide-react";

/* ─── Particle canvas ─────────────────────────────────────────── */
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      r: number;
      dx: number;
      dy: number;
      alpha: number;
    }

    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    let animId: number;
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
      // draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 191, 255, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const cleanup = draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => {
      cleanup?.();
      window.removeEventListener("resize", onResize);
    };
  }, [draw]);

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
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <ParticleBackground />

      {/* Radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center gap-6 px-6 text-center"
      >
        <motion.p
          variants={fadeUp}
          className="text-sm font-medium uppercase tracking-widest text-accent"
        >
          {personal.role}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-5xl font-bold tracking-tight sm:text-7xl"
        >
          {personal.name}
          <span className="text-accent">.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="max-w-md text-lg text-muted sm:text-xl"
        >
          {personal.tagline}
        </motion.p>

        <motion.div variants={fadeUp} className="flex gap-4 pt-4">
          <a
            href="#projects"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/25"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-card-border px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-accent hover:text-accent"
          >
            Get in Touch
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-12"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={20} className="text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
