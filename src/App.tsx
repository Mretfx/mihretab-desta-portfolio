import { ArrowUp, ShieldCheck } from "@phosphor-icons/react";
import SonnerToaster from "./components/ui/sonner";
import { PROFILE } from "./data/portfolioData";
import Navbar from "./components/Navbar";
import HeroAbout from "./components/HeroAbout";
import SkillsProjects from "./components/SkillsProjects";
import EducationContact from "./components/EducationContact";

function BackToTop() {
  return (
    <a
      href="#home"
      aria-label="Back to top"
      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-foreground/70 transition hover:border-emerald-500/50 hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-95"
    >
      <ArrowUp size={18} weight="bold" aria-hidden="true" />
    </a>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-emerald-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-emerald-950"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <HeroAbout />
        <SkillsProjects />
        <EducationContact />
      </main>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 font-mono text-sm text-foreground/60">
            <ShieldCheck size={16} weight="fill" className="text-emerald-500" aria-hidden="true" />
            <span>
              © {new Date().getFullYear()} {PROFILE.name}. Built with semantic HTML, CSS, and
              JavaScript.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <nav aria-label="Footer">
              <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm">
                {["About", "Skills", "Projects", "Education", "Contact"].map((label) => (
                  <li key={label}>
                    <a
                      href={`#${label.toLowerCase()}`}
                      className="text-foreground/60 transition hover:text-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-sm"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <BackToTop />
          </div>
        </div>
      </footer>

      <SonnerToaster />
    </div>
  );
}

export default App;