import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpenText,
  Code,
  Cpu,
  Database,
  FloppyDisk,
  ShieldCheck,
} from "@phosphor-icons/react";
import type { JSX } from "react";
import { PROJECTS, SKILL_CATEGORIES } from "../data/portfolioData";

const CATEGORY_ICONS: Record<string, JSX.Element> = {
  frontend: <Code size={22} weight="fill" aria-hidden="true" />,
  backend: <Database size={22} weight="fill" aria-hidden="true" />,
  foundations: <Cpu size={22} weight="fill" aria-hidden="true" />,
  security: <ShieldCheck size={22} weight="fill" aria-hidden="true" />,
};

const STATUS_TONES: Record<string, string> = {
  amber: "bg-amber-500/10 text-amber-500 ring-amber-500/30",
  emerald: "bg-emerald-500/10 text-emerald-500 ring-emerald-500/30",
  zinc: "bg-muted text-muted-foreground ring-border",
};

export default function SkillsProjects() {
  const reduce = useReducedMotion();
  const item = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" as const },
        transition: { duration: 0.5, ease: "easeOut" as const },
      };

  return (
    <>
      {/* ============ SKILLS ============ */}
      <section id="skills" aria-label="Technical skills" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-4 font-mono text-sm uppercase tracking-widest text-emerald-500"
          >
            {`// skills`}
          </motion.h2>
          <motion.h3
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            className="mb-12 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            A focused stack, sharpened by coursework and practice
          </motion.h3>

          <div className="grid gap-5 sm:grid-cols-2">
            {SKILL_CATEGORIES.map((cat, i) => (
              <motion.article
                key={cat.id}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1, ease: "easeOut" }}
                className="group flex flex-col gap-4 rounded-xl border border-border bg-background p-6 transition hover:-translate-y-[2px] hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/25 transition group-hover:bg-emerald-500/20">
                    {CATEGORY_ICONS[cat.id] ?? <Code size={22} weight="fill" aria-hidden="true" />}
                  </div>
                  <span className="font-mono text-xs text-muted-foreground" aria-hidden="true">
                    {`0${i + 1}`}
                  </span>
                </div>
                <div>
                  <h4 className="mb-1.5 text-lg font-semibold text-foreground">{cat.title}</h4>
                  <p className="mb-4 text-sm leading-relaxed text-foreground/60">{cat.blurb}</p>
                </div>
                <ul className="mt-auto flex flex-wrap gap-2">
                  {cat.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-xs text-foreground/75"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROJECTS ============ */}
      <section
        id="projects"
        aria-label="Academic projects"
        className="scroll-mt-20 border-t border-border/70 bg-muted/30"
      >
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-4 font-mono text-sm uppercase tracking-widest text-emerald-500"
          >
            {`// projects`}
          </motion.h2>
          <motion.h3
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            className="mb-12 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Academic research, built to matter
          </motion.h3>

          <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
            {PROJECTS.map((project, i) => (
              <motion.article
                key={project.id}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="rounded-xl border border-border bg-background p-6 sm:p-8"
              >
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  {project.statuses.map((s) => (
                    <span
                      key={s.label}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ${STATUS_TONES[s.tone]}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
                      {s.label}
                    </span>
                  ))}
                </div>
                <h4 className="mb-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {project.name}
                </h4>
                <p className="mb-4 font-mono text-xs text-emerald-500">{project.category}</p>
                <p className="mb-6 max-w-xl text-sm leading-relaxed text-foreground/65 sm:text-base">
                  {project.description}
                </p>
                <ul className="mb-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-xs text-foreground/75"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    disabled
                    title={project.note}
                    aria-disabled="true"
                    className="inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-border bg-muted/40 px-4 py-2 text-sm font-medium text-muted-foreground/60"
                  >
                    <FloppyDisk size={16} weight="bold" aria-hidden="true" /> Source Locked
                  </button>
                  <button
                    type="button"
                    disabled
                    title={project.note}
                    aria-disabled="true"
                    className="inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-border bg-muted/40 px-4 py-2 text-sm font-medium text-muted-foreground/60"
                  >
                    <BookOpenText size={16} weight="bold" aria-hidden="true" /> Paper in Progress
                  </button>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  {project.note}
                </p>
              </motion.article>
            ))}

            <motion.aside
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="flex flex-col justify-between gap-6 rounded-xl border border-dashed border-border bg-background/60 p-6 sm:p-8"
              aria-label="What I am working toward"
            >
              <div>
                <p className="mb-2 font-mono text-xs text-muted-foreground">{`// roadmap`}</p>
                <h4 className="mb-3 text-lg font-semibold text-foreground">
                  Next on the bench
                </h4>
                <ul className="space-y-2.5 text-sm text-foreground/65">
                  <li className="flex gap-2.5">
                    <ArrowUpRight size={16} weight="bold" className="mt-0.5 shrink-0 text-emerald-500" aria-hidden="true" />
                    A PHP REST API with hardened auth and rate limiting
                  </li>
                  <li className="flex gap-2.5">
                    <ArrowUpRight size={16} weight="bold" className="mt-0.5 shrink-0 text-emerald-500" aria-hidden="true" />
                    An accessible dashboard for the sign language dataset
                  </li>
                  <li className="flex gap-2.5">
                    <ArrowUpRight size={16} weight="bold" className="mt-0.5 shrink-0 text-emerald-500" aria-hidden="true" />
                    Writing up the detection system as a research paper
                  </li>
                </ul>
              </div>
              <p className="rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-4 font-mono text-xs leading-relaxed text-emerald-600 dark:text-emerald-400">
                {`openToWork = true  // backend, full-stack, security roles`}
              </p>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
}