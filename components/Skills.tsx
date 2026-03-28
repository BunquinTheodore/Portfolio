"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { skillCategories } from "@/data/portfolio";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};
const iconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-28">
      <div className="section-wrap">
        <Reveal>
          <SectionHeader
            eyebrow="Skills"
            title="Tools and technologies I use to build and deliver"
            description="A balanced stack across frontend, backend, mobile, and data-oriented workflows."
          />
        </Reveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 sm:grid-cols-2"
        >
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.title}
              variants={cardVariants}
              className="surface-card rounded-2xl p-6 transition-colors hover:border-accent/30"
            >
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
                {cat.title}
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {cat.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      variants={iconVariants}
                      className="flex items-center gap-2 rounded-lg bg-accent-glow px-3 py-2 text-sm font-medium text-foreground"
                    >
                      <Icon size={16} className="text-accent" />
                      {skill.name}
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
