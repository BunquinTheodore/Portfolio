"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { blogPosts } from "@/data/portfolio";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export default function Blog() {
  return (
    <section id="blog" className="py-24 sm:py-28">
      <div className="section-wrap">
        <Reveal>
          <SectionHeader
            eyebrow="Insights"
            title="Writing about execution, growth, and shipping better software"
            description="Quick reads on engineering choices, workflow lessons, and practical delivery strategies."
          />
        </Reveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.title}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="surface-card rounded-2xl p-6 transition-colors hover:border-accent/35"
            >
              <p className="mb-3 text-xs uppercase tracking-wide text-muted">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                <span className="mx-2">•</span>
                {post.readTime}
              </p>

              <h3 className="mb-3 text-lg font-semibold leading-tight text-foreground">
                {post.title}
              </h3>

              <p className="mb-5 text-sm leading-relaxed text-muted">
                {post.excerpt}
              </p>

              <div className="mb-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-accent-glow px-2.5 py-1 text-xs font-medium text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                className="text-sm font-medium text-accent transition-opacity hover:opacity-80"
                aria-label={`Read ${post.title}`}
                type="button"
              >
                Read article
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
