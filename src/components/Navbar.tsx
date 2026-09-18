import { useEffect, useRef, useState } from "react";
import { GithubLogo, LinkedinLogo, Moon, Sun, TelegramLogo, X, List } from "@phosphor-icons/react";
import { NAV_LINKS } from "../data/portfolioData";

function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    root.style.colorScheme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((d) => !d)}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background/60 text-foreground/70 transition hover:border-emerald-500/50 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-95"
    >
      {dark ? <Sun size={17} weight="bold" aria-hidden="true" /> : <Moon size={17} weight="bold" aria-hidden="true" />}
    </button>
  );
}

function Brand() {
  return (
    <a
      href="#home"
      className="group inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md"
      aria-label="Mihretab Desta, back to top"
    >
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500/15 font-mono text-sm font-bold text-emerald-500 ring-1 ring-emerald-500/30 transition group-hover:bg-emerald-500/25">
        MD
      </span>
      <span className="hidden font-mono text-sm font-semibold tracking-tight text-foreground sm:inline">
        mihretab<span className="text-emerald-500">.</span>dev
      </span>
    </a>
  );
}

export default function Navbar() {
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState<boolean>(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollTo = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const nav = document.querySelector("header");
      const offset = nav ? nav.getBoundingClientRect().height + 8 : 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-md">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
        >
          <Brand />
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={scrollTo(link.href)}
                  aria-current={active === link.id ? "true" : undefined}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    active === link.id
                      ? "text-emerald-500"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background/60 text-foreground/70 transition hover:border-emerald-500/50 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-95 md:hidden"
            >
              {open ? <X size={18} weight="bold" aria-hidden="true" /> : <List size={18} weight="bold" aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div
          ref={drawerRef}
          id="mobile-nav"
          className="fixed inset-x-0 top-16 z-40 border-b border-border bg-background/95 backdrop-blur-md md:hidden"
        >
          <ul className="mx-auto max-w-6xl space-y-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={scrollTo(link.href)}
                  aria-current={active === link.id ? "true" : undefined}
                  className={`block rounded-md px-3 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    active === link.id
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "text-foreground/70 hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-background/90 px-2 py-1.5 shadow-lg backdrop-blur-md md:flex">
        {SOCIAL_ICON_LINKS.map((s) => (
          <a
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-foreground/60 transition hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            {s.icon}
          </a>
        ))}
      </div>
    </>
  );
}

const SOCIAL_ICON_LINKS = [
  { id: "github", label: "GitHub profile", href: "https://github.com/", icon: <GithubLogo size={16} weight="fill" aria-hidden="true" /> },
  { id: "linkedin", label: "LinkedIn profile", href: "https://www.linkedin.com/", icon: <LinkedinLogo size={16} weight="fill" aria-hidden="true" /> },
  { id: "telegram", label: "Telegram profile", href: "https://t.me/", icon: <TelegramLogo size={16} weight="fill" aria-hidden="true" /> },
];