"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/portfolio";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm font-medium uppercase tracking-widest text-accent"
        >
          Experience
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 text-2xl font-semibold sm:text-3xl"
        >
          Where I&apos;ve worked
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-card-border" />

          <div className="flex flex-col gap-10">
            {experiences.map((exp) => (
              <motion.div
                key={`${exp.role}-${exp.company}`}
                variants={itemVariants}
                className="relative pl-8"
              >
                {/* Dot */}
                <div className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-accent bg-background" />

                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {exp.role}
                  </h3>
                  <span className="text-sm text-accent">{exp.company}</span>
                  <span className="text-xs text-muted">{exp.period}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
