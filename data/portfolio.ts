import {
  FaReact,
  FaLaravel,
  FaPhp,
  FaJava,
  FaPython,
  FaGithub,
  FaLinkedin,
  FaFacebook,
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

type ProjectCategory = "fullstack" | "mobile" | "data";

type Project = {
  title: string;
  description: string;
  tags: string[];
  category: ProjectCategory;
  githubUrl?: string;
  liveUrl?: string;
};

// ─── Personal ────────────────────────────────────────────────────
export const personal = {
  name: "Theodore Bunquin",
  tagline:
    "Turning ideas into solutions, building tech that matters, and transforming vision into lasting impact.",
  role: "Full Stack Developer · Data Analyst · CS Student",
  location: "Philippines",
  university: "Batangas State University",
  year: "2nd Year — Computer Science",
  bio: `I'm a second-year Computer Science student at Batangas State University, a full stack developer, and an aspiring data analyst. I build practical digital products for communities, student organizations, and growing businesses. I'm currently open to internship opportunities, freelance commissions, and collaborative projects where technology can create measurable impact.`,
  availability: "Open for internships, freelance work, and commissions",
  cvFile: "/Theodore-Developer-Resume.pdf",
  consultationUrl: "https://www.facebook.com/profile.php?id=61582763437544",
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
export const projects: Project[] = [
  {
    title: "SpartaHub",
    description:
      "Hyperlocal delivery platform built for the BatStateU-Alangilan campus. Connects students with nearby vendors for fast, affordable deliveries.",
    tags: ["Flutter", "Firebase", "Dart"],
    category: "fullstack",
    githubUrl: "https://github.com/BunquinTheodore",
  },
  {
    title: "HackHunt",
    description:
      "A discovery app that helps students and developers find upcoming hackathons — filterable by tech stack, location, and deadline.",
    tags: ["React Native", "API", "UI/UX"],
    category: "data",
    githubUrl: "https://github.com/BunquinTheodore",
  },
  {
    title: "CareConnect",
    description:
      "Health referral system addressing the fragmentation of Philippine healthcare. Streamlines patient routing across facilities.",
    tags: ["Laravel", "PHP", "MySQL"],
    category: "fullstack",
    githubUrl: "https://github.com/BunquinTheodore",
  },
  {
    title: "ALERTO",
    description:
      "Early warning system for class suspensions during disasters. Built with Team Vibe Coders to keep students informed in real time.",
    tags: ["Flutter", "Firebase", "Notifications"],
    category: "mobile",
    githubUrl: "https://github.com/BunquinTheodore",
  },
  {
    title: "UTrack",
    description:
      "Money lending and borrowing tracker app using Firestore. Simplifies peer-to-peer debt management with a clean interface.",
    tags: ["Flutter", "Firestore", "Dart"],
    category: "mobile",
    githubUrl: "https://github.com/BunquinTheodore",
  },
  {
    title: "Bluemoon Coffee",
    description:
      "Delivery app for a local coffee shop — built to help them avoid high third-party delivery platform margins.",
    tags: ["Flutter", "Firebase", "UI/UX"],
    category: "fullstack",
    githubUrl: "https://github.com/BunquinTheodore",
  },
];

export const projectFilters = [
  { key: "all", label: "All" },
  { key: "fullstack", label: "Full Stack" },
  { key: "mobile", label: "Mobile" },
  { key: "data", label: "Data / Analytics" },
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
    title: "Scaling Client Work",
    description:
      "Delivering reliable full stack solutions for businesses, organizations, and founders through commission-based projects.",
  },
];

// ─── Blog ───────────────────────────────────────────────────────
export const blogPosts = [
  {
    title: "How I Approach Full Stack Projects as a Student Developer",
    excerpt:
      "A practical framework I use to move from idea to deployment while balancing university and client work.",
    date: "2026-02-10",
    readTime: "6 min read",
    tags: ["Full Stack", "Workflow"],
  },
  {
    title: "From Hackathons to Real Products: Lessons That Improved My Code",
    excerpt:
      "Key engineering habits I learned from competitive events and how they translate to production-ready projects.",
    date: "2026-01-18",
    readTime: "5 min read",
    tags: ["Hackathons", "Engineering"],
  },
  {
    title: "Getting Started with Data Analysis for Social Impact Projects",
    excerpt:
      "A beginner-friendly roadmap for using data analysis to solve local community and public service problems.",
    date: "2025-12-22",
    readTime: "7 min read",
    tags: ["Data Analysis", "Impact"],
  },
];

// ─── Socials ─────────────────────────────────────────────────────
export const socials = [
  {
    name: "GitHub",
    icon: FaGithub,
    url: "https://github.com/BunquinTheodore",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/theodore-bunquin-4150ba255/",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:your-email@example.com",
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    url: "https://www.facebook.com/theodore.bunquin.7",
  },
  {
    name: "Software Company",
    icon: FaFacebook,
    url: "https://www.facebook.com/profile.php?id=61582763437544",
  },
  { name: "Phone", icon: Phone, url: "tel:+639629935762" },
];
