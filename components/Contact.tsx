"use client";

import { motion } from "framer-motion";
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
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm font-medium uppercase tracking-widest text-accent"
        >
          Contact
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4 text-2xl font-semibold sm:text-3xl"
        >
          Let&apos;s connect
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-12 max-w-md text-muted"
        >
          I&apos;m always open to new opportunities, collaborations, and
          conversations. Reach out through any of these channels.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-5"
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
                <div className="rounded-xl border border-card-border bg-card p-4 text-muted transition-all group-hover:border-accent/40 group-hover:bg-accent-glow group-hover:text-accent">
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
    <footer className="border-t border-card-border py-8 text-center text-sm text-muted">
      <p>
        © {new Date().getFullYear()}{" "}
        <span className="font-medium text-foreground">{personal.name}</span>.
        Built with Next.js & Tailwind CSS.
      </p>
    </footer>
  );
}
