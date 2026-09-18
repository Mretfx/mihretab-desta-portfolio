import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Code,
  Database,
  Cpu,
  ShieldCheck,
  TerminalWindow,
} from "@phosphor-icons/react";
import type { JSX } from "react";
import { PROFILE, SKILL_CATEGORIES, TERMINAL_LINES } from "../data/portfolioData";

const PILLAR_ICONS: Record<string, JSX.Element> = {
  backend: <Database size={20} weight="fill" aria-hidden="true" />,
  frontend: <Code size={20} weight="fill" aria-hidden="true" />,
  security: <ShieldCheck size={20} weight="fill" aria-hidden="true" />,
};

const PILLARS = [
  {
    id: "backend",
    title: "Backend Architecture",
    text: "Designing PHP and MySQL systems with RESTful APIs, sane authentication, and SQL that stays fast as data grows.",
  },
  {
    id: "frontend",
    title: "Web Foundations",
    text: "Semantic HTML5, modern CSS, vanilla JavaScript, and Bootstrap 5 building blocks tuned for clarity and accessibility.",
  },
  {
    id: "security",
    title: "Cybersecurity",
    text: "Applying defensive practices, secure auth patterns, and OWASP Top 10 awareness to every layer of the stack.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

function TerminalPanel() {
  return (
    <div className="relative rounded-xl border border-border bg-card/80 shadow-xl shadow-black/20 backdrop-blur-sm">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" aria-hidden="true" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">~/portfolio</span>
      </div>
      <div className="space-y-2 p-4 font-mono text-[13px] leading-relaxed sm:p-5">
        {TERMINAL_LINES.map((line, i) => (
          <div key={i}>
            <p className="text-muted-foreground">
              <span className="text-emerald-500">{line.prompt}</span>
              <span className="text-foreground/50"> $ </span>
              <span className="text-foreground">{line.command}</span>
            </p>
            <p className="pl-4 text-foreground/70">{line.output}</p>
          </div>
        ))}
        <p className="pt-1 text-foreground/50">
          <span className="text-emerald-500">~</span>
          <span className="text-foreground/50"> $ </span>
          <span className="animate-pulse text-emerald-500">▊</span>
        </p>
      </div>
    </div>
  );
}

export default function HeroAbout() {
  const reduce = useReducedMotion();
  const variants = reduce
    ? {}
    : {
        hidden: { opacity: 0, y: 28 },
        show: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: { delay: i * 0.09, duration: 0.55, ease: "easeOut" as const },
        }),
      };

  return (
    <>
      {/* ============ HERO ============ */}
      <section id="home" aria-label="Introduction" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklab, currentColor 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, currentColor 6%, transparent) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          className="pointer-events-none absolute -top-32 right-0 -z-10 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-40 -left-24 -z-10 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="mx-auto grid max-w-6xl gap-14 px-4 pb-20 pt-28 sm:px-6 md:grid-cols-[1.15fr_0.85fr] md:items-center md:pb-28 md:pt-36 lg:pt-40">
          <motion.div initial="hidden" animate="show" variants={variants} className="space-y-6">
            <motion.p
              custom={0}
              variants={variants}
              className="inline-flex flex-wrap items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 font-mono text-xs text-emerald-500"
            >
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Class of 2026 · Computer Science @ Wachemo University
            </motion.p>

            <motion.h1
              custom={1}
              variants={variants}
              className="text-4xl font-semibold leading-[1.05] tracking-tighter text-foreground sm:text-5xl lg:text-6xl"
            >
              Building robust web systems{" "}
              <span className="text-emerald-500">&</span> exploring cybersecurity frontiers.
            </motion.h1>

            <motion.p
              custom={2}
              variants={variants}
              className="max-w-xl text-base leading-relaxed text-foreground/65 sm:text-lg"
            >
              I'm {PROFILE.name}, a computer science graduate in {PROFILE.location}. I focus on
              backend architecture, full-stack web applications, and secure systems that last.
            </motion.p>

            <motion.div custom={3} variants={variants} className="flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
              >
                Get in Touch <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background/60 px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-emerald-500/50 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-[0.98]"
              >
                View Academic Work
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 px-2 py-2.5 text-sm font-medium text-foreground/60 transition hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <ArrowDown size={16} weight="bold" aria-hidden="true" /> Scroll
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-transparent to-transparent blur-2xl" aria-hidden="true" />
            <TerminalPanel />
          </motion.div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section id="about" aria-label="About Mihretab Desta" className="scroll-mt-20 border-t border-border/70 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-4 font-mono text-sm uppercase tracking-widest text-emerald-500"
          >
            {`// about`}
          </motion.h2>
          <motion.h3
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            className="mb-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            From Wachemo's labs to production-grade thinking
          </motion.h3>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mb-12 max-w-2xl text-base leading-relaxed text-foreground/65 sm:text-lg"
          >
            {PROFILE.mission}
          </motion.p>

          <div className="grid gap-5 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <motion.article
                key={p.id}
                custom={i}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="group rounded-xl border border-border bg-background p-6 transition hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/25 transition group-hover:bg-emerald-500/20">
                  {PILLAR_ICONS[p.id] ?? <Code size={20} weight="fill" aria-hidden="true" />}
                </div>
                <h4 className="mb-2 text-base font-semibold text-foreground">{p.title}</h4>
                <p className="text-sm leading-relaxed text-foreground/60">{p.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}