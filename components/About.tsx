"use client";

import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { personal } from "@/data/portfolio";
import { MapPin, GraduationCap } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-28">
      <div className="section-wrap">
        <Reveal>
          <SectionHeader
            eyebrow="About"
            title="I build practical, polished solutions for real users"
            description="I focus on software that solves immediate problems and scales with the people using it."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <article className="surface-card rounded-3xl p-7 sm:p-9">
            <p className="text-pretty text-lg leading-relaxed text-foreground sm:text-xl">
              {personal.bio}
            </p>

            <div className="mt-7 flex flex-wrap gap-3 text-sm text-muted">
              <span className="inline-flex items-center gap-2 rounded-full border border-card-border bg-background/80 px-4 py-2">
                <MapPin size={16} className="text-accent" />
                {personal.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-card-border bg-background/80 px-4 py-2">
                <GraduationCap size={16} className="text-accent" />
                {personal.year} — {personal.university}
              </span>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
