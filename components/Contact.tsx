"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { socials, personal } from "@/data/portfolio";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const iconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-28">
      <div className="section-wrap max-w-4xl text-center">
        <Reveal>
          <SectionHeader
            eyebrow="Contact"
            title="Let’s work together on your next build"
            description="Open to internship opportunities, freelance projects, and commission-based collaborations."
            align="center"
          />
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={personal.cvFile}
            download
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-accent-dark"
          >
            Download CV
          </a>
          <a
            href={personal.consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-card-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Book Consultation
          </a>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="surface-card flex flex-wrap items-center justify-center gap-5 rounded-3xl p-6 sm:p-8"
        >
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.name}
                variants={iconVariants}
                whileHover={{ y: -4, scale: 1.1, transition: { duration: 0.2 } }}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="group flex flex-col items-center gap-2"
              >
                <div className="rounded-xl border border-card-border bg-background/75 p-4 text-muted transition-all group-hover:border-accent/40 group-hover:bg-accent-glow group-hover:text-accent">
                  <Icon size={24} />
                </div>
                <span className="text-xs text-muted transition-colors group-hover:text-accent">
                  {social.name}
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="border-t border-card-border/80 py-8 text-center text-sm text-muted">
      <p>
        © {new Date().getFullYear()}{" "}
        <span className="font-medium text-foreground">{personal.name}</span>.
        Built with Next.js & Tailwind CSS.
      </p>
    </footer>
  );
}
