import {
  FaReact,
  FaLaravel,
  FaPhp,
  FaJava,
  FaPython,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaThreads,
} from "react-icons/fa6";
import {
  SiFlutter,
  SiKotlin,
  SiFirebase,
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
  SiDart,
} from "react-icons/si";
import { Mail, Phone, Sparkles, Rocket, Brain, Globe } from "lucide-react";

// ─── Personal ────────────────────────────────────────────────────
export const personal = {
  name: "Theodore",
  tagline: "Building tech that matters.",
  role: "CS Student · Builder · Founder of Theoraux",
  location: "Batangas, Philippines",
  university: "Batangas State University",
  year: "2nd Year — Computer Science",
  bio: `I'm a second-year Computer Science student at Batangas State University and the founder of Theoraux — a vision for scalable, human-centered technology. I build apps and platforms that solve real problems for real communities, with a strong focus on social impact and the UN Sustainable Development Goals.`,
};

// ─── Skills ──────────────────────────────────────────────────────
export const skillCategories = [
  {
    title: "Mobile Development",
    skills: [
      { name: "Flutter", icon: SiFlutter },
      { name: "Dart", icon: SiDart },
      { name: "Java", icon: FaJava },
      { name: "Kotlin", icon: SiKotlin },
    ],
  },
  {
    title: "Web & Frontend",
    skills: [
      { name: "React / Next.js", icon: FaReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Next.js", icon: SiNextdotjs },
    ],
  },
  {
    title: "Backend & Data",
    skills: [
      { name: "PHP", icon: FaPhp },
      { name: "Laravel", icon: FaLaravel },
      { name: "Firebase", icon: SiFirebase },
      { name: "Python", icon: FaPython },
    ],
  },
  {
    title: "Emerging Tech",
    skills: [
      { name: "Prompt Engineering", icon: Brain },
      { name: "AI / LLMs", icon: Sparkles },
      { name: "Blockchain / DeFi", icon: Globe },
      { name: "Data Science", icon: Rocket },
    ],
  },
];

// ─── Projects ────────────────────────────────────────────────────
export const projects = [
  {
    title: "SpartaHub",
    description:
      "Hyperlocal delivery platform built for the BatStateU-Alangilan campus. Connects students with nearby vendors for fast, affordable deliveries.",
    tags: ["Flutter", "Firebase", "Dart"],
  },
  {
    title: "HackHunt",
    description:
      "A discovery app that helps students and developers find upcoming hackathons — filterable by tech stack, location, and deadline.",
    tags: ["React Native", "API", "UI/UX"],
  },
  {
    title: "CareConnect",
    description:
      "Health referral system addressing the fragmentation of Philippine healthcare. Streamlines patient routing across facilities.",
    tags: ["Laravel", "PHP", "MySQL"],
  },
  {
    title: "ALERTO",
    description:
      "Early warning system for class suspensions during disasters. Built with Team Vibe Coders to keep students informed in real time.",
    tags: ["Flutter", "Firebase", "Notifications"],
  },
  {
    title: "UTrack",
    description:
      "Money lending and borrowing tracker app using Firestore. Simplifies peer-to-peer debt management with a clean interface.",
    tags: ["Flutter", "Firestore", "Dart"],
  },
  {
    title: "Bluemoon Coffee",
    description:
      "Delivery app for a local coffee shop — built to help them avoid high third-party delivery platform margins.",
    tags: ["Flutter", "Firebase", "UI/UX"],
  },
];

// ─── Experience ──────────────────────────────────────────────────
export const experiences = [
  {
    role: "Founder",
    company: "Theoraux",
    period: "Present",
    description:
      "Building a vision for scalable, human-centered technology that uplifts and empowers communities.",
  },
  {
    role: "Freelance Web Developer & Social Media Manager",
    company: "Various Clients",
    period: "2024 — Present",
    description:
      "Delivered web projects and managed social media for clients including BSU Chess Club and Fruity Bites.",
  },
  {
    role: "Teaching Assistant",
    company: "Batangas State University",
    period: "2024 — Present",
    description:
      "Creates study materials and assists in teaching CS courses to fellow students.",
  },
  {
    role: "Intern",
    company: "CodeAlpha",
    period: "2024",
    description:
      "Software development internship focused on building practical applications and learning industry workflows.",
  },
  {
    role: "Intern",
    company: "FutureIntern",
    period: "2024",
    description:
      "Gained hands-on experience in software engineering and modern development practices.",
  },
];

// ─── Achievements ────────────────────────────────────────────────
export const achievements = [
  {
    title: "Top 10 Finalist",
    event: "Philippine Junior Data Science Challenge",
    highlight: true,
  },
  {
    title: "Participant",
    event: "Kadakareer × Home Credit Hackathon — Generative AI for FinTech",
    highlight: false,
  },
  {
    title: "Active Competitor",
    event: "Competitive Programming & Hackathons",
    highlight: false,
  },
];

// ─── Goals ───────────────────────────────────────────────────────
export const goals = [
  {
    icon: Sparkles,
    title: "Flexible Productivity App",
    description:
      "Developing a minimalist productivity app with modular notes, multi-view task management, and beautiful animations.",
  },
  {
    icon: Brain,
    title: "AI & Prompt Engineering",
    description:
      "Deepening expertise in LLMs, modular prompt design, and generative AI applied to real-world problems.",
  },
  {
    icon: Globe,
    title: "Social Impact Tech",
    description:
      "Building technology aligned with UN Sustainable Development Goals — climate resilience, healthcare access, and education.",
  },
  {
    icon: Rocket,
    title: "Scaling Theoraux",
    description:
      "Turning Theoraux into a platform that bridges engineering precision with empathetic, human-centered design.",
  },
];

// ─── Socials ─────────────────────────────────────────────────────
export const socials = [
  { name: "GitHub", icon: FaGithub, url: "https://github.com/YOUR_GITHUB" },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    url: "https://linkedin.com/in/YOUR_LINKEDIN",
  },
  { name: "Email", icon: Mail, url: "mailto:YOUR_EMAIL@gmail.com" },
  {
    name: "Facebook",
    icon: FaFacebook,
    url: "https://facebook.com/YOUR_FACEBOOK",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "https://instagram.com/YOUR_INSTAGRAM",
  },
  {
    name: "Threads",
    icon: FaThreads,
    url: "https://threads.net/@YOUR_THREADS",
  },
  { name: "Phone", icon: Phone, url: "tel:+63XXXXXXXXXX" },
];
