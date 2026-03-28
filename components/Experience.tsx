"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
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
    <section id="experience" className="py-24 sm:py-28">
      <div className="section-wrap max-w-4xl">
        <Reveal>
          <SectionHeader
            eyebrow="Experience"
            title="Hands-on work across projects, leadership, and internships"
            description="A timeline of roles where I shipped features, supported teams, and improved delivery quality."
          />
        </Reveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="surface-card relative rounded-3xl p-7 sm:p-8"
        >
          {/* Timeline line */}
          <div className="absolute bottom-8 left-[35px] top-8 w-px bg-card-border" />

          <div className="flex flex-col gap-10">
            {experiences.map((exp) => (
              <motion.div
                key={`${exp.role}-${exp.company}`}
                variants={itemVariants}
                className="relative pl-10"
              >
                {/* Dot */}
                <div className="cyan-ring absolute left-0 top-2 h-4 w-4 rounded-full border-2 border-accent bg-background" />

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
