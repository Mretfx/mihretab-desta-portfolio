import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowUp,
  Check,
  Copy,
  EnvelopeSimple,
  GithubLogo,
  GraduationCap,
  LinkedinLogo,
  MapPin,
  PaperPlaneTilt,
  Phone,
  TelegramLogo,
} from "@phosphor-icons/react";
import { EDUCATION, PROFILE, SOCIAL_LINKS } from "../data/portfolioData";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  github: <GithubLogo size={18} weight="fill" aria-hidden="true" />,
  linkedin: <LinkedinLogo size={18} weight="fill" aria-hidden="true" />,
  telegram: <TelegramLogo size={18} weight="fill" aria-hidden="true" />,
};

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      toast.success("Email copied to clipboard");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy email. Try selecting it manually.");
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 font-mono text-sm text-foreground transition hover:border-emerald-500/50 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-[0.98]"
    >
      {copied ? (
        <Check size={16} weight="bold" className="text-emerald-500" aria-hidden="true" />
      ) : (
        <Copy size={16} weight="bold" aria-hidden="true" />
      )}
      {copied ? "Copied!" : PROFILE.email}
    </button>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio inquiry from ${name || "a visitor"}`;
    const body = `${message}

Best regards,
${name}
${email}`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    toast.success("Opening your email client");
  };

  const inputClasses =
    "w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition focus:border-emerald-500/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/40";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about the role or project..."
          className={`${inputClasses} resize-y`}
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
      >
        <PaperPlaneTilt size={16} weight="bold" aria-hidden="true" /> Send Message
      </button>
    </form>
  );
}

export default function EducationContact() {
  const reduce = useReducedMotion();
  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" as const },
          transition: { duration: 0.5, delay, ease: "easeOut" as const },
        };

  return (
    <>
      {/* ============ EDUCATION ============ */}
      <section id="education" aria-label="Education" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <motion.h2
            {...reveal()}
            className="mb-4 font-mono text-sm uppercase tracking-widest text-emerald-500"
          >
            {`// education`}
          </motion.h2>
          <motion.h3
            {...reveal(0.05)}
            className="mb-12 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            The foundation behind the builds
          </motion.h3>

          <div className="relative border-l border-border pl-8 sm:pl-10">
            <span
              className="absolute -left-[9px] top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-emerald-500 bg-background"
              aria-hidden="true"
            >
              <GraduationCap size={10} weight="fill" className="text-emerald-500" />
            </span>
            {EDUCATION.map((edu, i) => (
              <motion.article
                key={edu.id}
                {...reveal(i * 0.1)}
                className="rounded-xl border border-border bg-background p-6 sm:p-8"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h4 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {edu.degree}
                  </h4>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-500">
                    {edu.period}
                  </span>
                </div>
                <p className="mb-1 font-mono text-sm text-emerald-600 dark:text-emerald-400">
                  {edu.institution} · {edu.location}
                </p>
                <p className="mb-6 mt-3 max-w-2xl text-sm leading-relaxed text-foreground/65 sm:text-base">
                  {edu.detail}
                </p>
                <p className="mb-3 text-sm font-semibold text-foreground">Relevant coursework</p>
                <ul className="flex flex-wrap gap-2">
                  {edu.coursework.map((c) => (
                    <li
                      key={c}
                      className="rounded-md border border-border bg-muted/50 px-2.5 py-1 font-mono text-xs text-foreground/75"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section
        id="contact"
        aria-label="Contact Mihretab Desta"
        className="scroll-mt-20 border-t border-border/70 bg-muted/30"
      >
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <motion.h2 {...reveal()} className="mb-4 font-mono text-sm uppercase tracking-widest text-emerald-500">
            {`// contact`}
          </motion.h2>
          <motion.h3
            {...reveal(0.05)}
            className="mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Let's build something secure
          </motion.h3>
          <motion.p
            {...reveal(0.1)}
            className="mb-12 max-w-2xl text-base leading-relaxed text-foreground/65"
          >
            I am open to backend, full-stack, and security-focused roles, collaborations, and
            research conversations. The fastest way to reach me is email.
          </motion.p>

          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <motion.div {...reveal(0.1)} className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/25">
                  <EnvelopeSimple size={18} weight="fill" aria-hidden="true" />
                </span>
                <CopyEmailButton />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
                  <MapPin size={18} weight="bold" className="shrink-0 text-emerald-500" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-muted-foreground">Based in</p>
                    <p className="text-sm font-medium text-foreground">{PROFILE.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-4">
                  <Phone size={18} weight="bold" className="shrink-0 text-emerald-500" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-muted-foreground">Preferred channel</p>
                    <p className="text-sm font-medium text-foreground">Email · Telegram</p>
                  </div>
                </div>
              </div>

              <ul className="flex gap-3" aria-label="Social profiles">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label} (opens in a new tab)`}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-foreground/70 transition hover:border-emerald-500/50 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-95"
                    >
                      {SOCIAL_ICONS[s.icon]}
                    </a>
                    <span className="sr-only">{s.handle}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              {...reveal(0.15)}
              className="rounded-xl border border-border bg-background p-6 sm:p-8"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}