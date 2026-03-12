"use client";

import { motion } from "framer-motion";
import { goals } from "@/data/portfolio";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Goals() {
  return (
    <section id="goals" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm font-medium uppercase tracking-widest text-accent"
        >
          What I&apos;m Building
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 text-2xl font-semibold sm:text-3xl"
        >
          Current goals & interests
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 sm:grid-cols-2"
        >
          {goals.map((goal) => {
            const Icon = goal.icon;
            return (
              <motion.div
                key={goal.title}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group flex gap-4 rounded-2xl border border-card-border bg-card p-6 transition-colors hover:border-accent/30"
              >
                <div className="mt-0.5 rounded-lg bg-accent-glow p-2.5 text-accent transition-colors group-hover:bg-accent group-hover:text-black">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-foreground">
                    {goal.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {goal.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
