"use client";

import { motion } from "framer-motion";
import { personal } from "@/data/portfolio";
import { MapPin, GraduationCap } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="flex flex-col gap-8"
        >
          <motion.h2
            variants={fadeUp}
            className="text-sm font-medium uppercase tracking-widest text-accent"
          >
            About Me
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-2xl font-semibold leading-relaxed sm:text-3xl"
          >
            {personal.bio}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-2 flex flex-wrap gap-4 text-sm text-muted"
          >
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-accent" />
              {personal.location}
            </span>
            <span className="flex items-center gap-2">
              <GraduationCap size={16} className="text-accent" />
              {personal.year} — {personal.university}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
