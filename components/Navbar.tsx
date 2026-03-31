"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { personal } from "@/data/portfolio";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#about");
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const currentTheme = resolvedTheme ?? theme;
  const showDarkModeIcon = isClient ? currentTheme === "dark" : false;

  useEffect(() => {
    let ticking = false;
    const sections = navLinks
      .map((link) => document.querySelector(link.href) as HTMLElement | null)
      .filter(Boolean);

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
      const y = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      setScrolled(y > 14);
      setScrollProgress(Math.min(1, Math.max(0, y / max)));

      let current = "#about";
      for (let i = 0; i < sections.length; i++) {
        const el = sections[i];
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 140 && rect.bottom >= 140) {
          current = navLinks[i].href;
          break;
        }
      }
      setActiveHref(current);
      ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-card-border/80 bg-background/76 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div
        className="absolute left-0 top-0 h-[2px] bg-accent transition-[width] duration-150"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <div className="section-wrap flex items-center justify-between py-4">
        {/* Logo / Name */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-foreground"
        >
          Theodore <span className="text-accent">Bunquin</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                activeHref === link.href
                  ? "bg-accent-soft text-accent"
                  : "text-muted hover:text-accent"
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="rounded-lg p-2 text-muted transition-colors hover:bg-accent-glow hover:text-accent"
            aria-label="Toggle theme"
          >
            {showDarkModeIcon ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a
            href={personal.consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-accent-dark"
          >
            Book Consultation
          </a>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="rounded-lg p-2 text-muted transition-colors hover:text-accent"
            aria-label="Toggle theme"
          >
            {showDarkModeIcon ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-muted hover:text-accent"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-card-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="section-wrap flex flex-col gap-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                    activeHref === link.href
                      ? "bg-accent-soft text-accent"
                      : "text-muted hover:text-accent"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={personal.consultationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-accent px-4 py-2 text-center text-sm font-semibold text-black"
              >
                Book Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
