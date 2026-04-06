"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BadgeCheck, Clock3 } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const upcomingCertifications = [
  {
    title: "Next Certification",
    note: "To be followed",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 sm:py-28">
      <div className="section-wrap max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Certifications"
            title="Verified learning that supports my delivery skills"
            description="Additional credentials that reflect my social media strategy and communication capabilities."
          />
        </Reveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="grid gap-5 md:grid-cols-3"
        >
          <motion.article variants={cardVariants} className="h-full">
            {/* Begin: HubSpot Academy - Social Media Marketing Badge */}
            <a
              href="https://app-na2.hubspot.com/academy/achievements/f814cl2j/en/1/theodore-von-joshua-bunquin/social-media-marketing"
              title="Social Media Marketing"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-card-border bg-background/70 p-4 transition-all hover:-translate-y-1 hover:border-accent/45 hover:bg-accent-glow"
            >
              <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/12 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
                <BadgeCheck size={14} /> Earned
              </span>

              <div className="academy-badge overflow-hidden rounded-xl border border-card-border/80 bg-white">
                <Image
                  src="https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/8067725897da46adbde9ce0b99fe6bd7.png"
                  alt="HubSpot Academy Social Media Marketing Badge"
                  width={1100}
                  height={700}
                  className="h-auto w-full object-contain"
                />
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-foreground">Social Media Marketing</h3>
                <p className="text-xs text-muted">HubSpot Academy</p>
              </div>
            </a>
            {/* End: HubSpot Academy - Social Media Marketing Badge */}
          </motion.article>

          <motion.article variants={cardVariants} className="h-full">
            {/* Begin: HubSpot Academy - Digital Marketing Badge */}
            <a
              href="https://app-na2.hubspot.com/academy/achievements/r9h8s197/en/1/theodore-von-joshua-bunquin/digital-marketing"
              title="Digital Marketing"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-card-border bg-background/70 p-4 transition-all hover:-translate-y-1 hover:border-accent/45 hover:bg-accent-glow"
            >
              <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/12 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
                <BadgeCheck size={14} /> Earned
              </span>

              <div className="academy-badge overflow-hidden rounded-xl border border-card-border/80 bg-white">
                <Image
                  src="https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/9243a98b84044603adaa143b61d2ba5c.png"
                  alt="HubSpot Academy Digital Marketing Badge"
                  width={1100}
                  height={700}
                  className="h-auto w-full object-contain"
                />
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-foreground">Digital Marketing</h3>
                <p className="text-xs text-muted">HubSpot Academy</p>
              </div>
            </a>
            {/* End: HubSpot Academy - Digital Marketing Badge */}
          </motion.article>

          {upcomingCertifications.map((cert) => (
            <motion.article
              key={cert.title}
              variants={cardVariants}
              className="flex h-full flex-col rounded-2xl border border-dashed border-card-border bg-background/50 p-5"
            >
              <span className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
                <Clock3 size={14} /> Coming Soon
              </span>

              <div className="mt-auto mb-auto rounded-xl border border-card-border/70 bg-background/60 px-4 py-5 text-center">
                <h3 className="text-sm font-semibold text-foreground">{cert.title}</h3>
                <p className="mt-1 text-xs text-muted">{cert.note}</p>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-muted">
                This slot is reserved for your next credential.
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}