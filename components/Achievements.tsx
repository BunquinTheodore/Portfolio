"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { achievements } from "@/data/portfolio";
import { Trophy, Award } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 sm:py-28">
      <div className="section-wrap max-w-4xl">
        <Reveal>
          <SectionHeader
            eyebrow="Achievements"
            title="Milestones from competitions and technical growth"
            description="Competitive and project-based accomplishments that strengthened my analytical and engineering skills."
          />
        </Reveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-4"
        >
          {achievements.map((a) => (
            <motion.div
              key={a.event}
              variants={itemVariants}
              className={`surface-card flex items-start gap-4 rounded-2xl p-6 transition-colors ${
                a.highlight
                  ? "border-accent/40 bg-accent-glow"
                  : ""
              }`}
            >
              <div
                className={`mt-0.5 rounded-lg p-2 ${
                  a.highlight
                    ? "bg-accent text-black"
                    : "bg-accent-glow text-accent"
                }`}
              >
                {a.highlight ? <Trophy size={20} /> : <Award size={20} />}
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {a.title}
                </h3>
                <p className="text-sm text-muted">{a.event}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
