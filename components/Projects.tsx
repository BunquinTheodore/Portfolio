"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { projectFilters, projects } from "@/data/portfolio";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="py-24 sm:py-28">
      <div className="section-wrap">
        <Reveal>
          <SectionHeader
            eyebrow="Projects"
            title="Selected work focused on utility, quality, and impact"
            description="Each project reflects practical problem-solving, reliable implementation, and user-centered execution."
          />
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-wrap gap-2"
        >
          {projectFilters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                activeFilter === filter.key
                  ? "border-accent bg-accent text-black"
                  : "border-card-border text-muted hover:border-accent/40 hover:text-accent"
              }`}
              aria-label={`Filter projects by ${filter.label}`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <motion.article
              key={project.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="surface-card group relative flex flex-col rounded-2xl p-6 transition-colors hover:border-accent/40"
            >
              {/* Glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-accent/0 transition-all duration-500 group-hover:bg-accent/3" />

              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {project.title}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-accent-glow px-2.5 py-1 text-xs font-medium text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-4 text-sm">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent transition-opacity hover:opacity-80"
                  >
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground transition-colors hover:text-accent"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
