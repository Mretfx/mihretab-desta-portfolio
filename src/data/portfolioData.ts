import type {
  ContactLink,
  EducationEntry,
  NavLink,
  Project,
  SkillCategory,
  SocialLink,
  TerminalLine,
} from "../types";

export const PROFILE = {
  name: "Mihretab Desta",
  firstName: "Mihretab",
  role: "Developer & CS Graduate",
  tagline: "Building robust web systems & exploring cybersecurity frontiers.",
  location: "Hossana, Ethiopia",
  email: "destamihretab@gmail.com",
  resumeSummary: [
    "BSc Computer Science candidate, Class of 2026 at Wachemo University, Ethiopia.",
    "Hands-on experience building full-stack web applications with PHP, MySQL, JavaScript and Bootstrap 5.",
    "Machine learning research background through the Sign Language Detection System capstone project.",
    "Focused on clean, accessible front-ends, sound backend architecture, and defensive security practices.",
  ],
  mission:
    "I build functional, secure software with clean code and measurable outcomes, and I am happiest when a system I designed runs reliably end to end.",
};

export const NAV_LINKS: NavLink[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "education", label: "Education", href: "#education" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export const TERMINAL_LINES: TerminalLine[] = [
  { prompt: "~", command: "whoami", output: "mihretab-desta" },
  { prompt: "~", command: "cat focus.txt", output: "web · backend · security" },
  { prompt: "~", command: "stack --list", output: "HTML · CSS · JS · PHP · MySQL" },
  { prompt: "~", command: "status", output: "cs-graduate · class of 2026" },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    icon: "code",
    blurb: "Semantic, responsive interfaces that work for everyone.",
    tags: ["HTML5", "CSS3", "JavaScript (ES6+)", "Bootstrap 5", "Responsive Design", "Semantic Markup", "Accessibility", "Web Performance"],
  },
  {
    id: "backend",
    title: "Backend & Databases",
    icon: "database",
    blurb: "Reliable data flows and APIs that hold up under load.",
    tags: ["PHP", "MySQL", "Relational Database Design", "SQL Query Optimization", "RESTful Architecture", "Authentication"],
  },
  {
    id: "foundations",
    title: "CS Foundations",
    icon: "cpu",
    blurb: "The fundamentals behind every solid engineering decision.",
    tags: ["Data Structures", "Algorithms", "Object-Oriented Programming", "Operating Systems", "Software Engineering Principles", "System Design Basics"],
  },
  {
    id: "security",
    title: "Cybersecurity & Systems",
    icon: "shield",
    blurb: "Defensive thinking applied to the systems I build.",
    tags: ["Network Security Basics", "Secure Authentication", "Vulnerability Analysis", "Web App Security", "OWASP Top 10 Awareness"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "sign-language-detection",
    name: "Sign Language Detection System",
    category: "Academic Capstone · Machine Learning",
    description:
      "An intelligent gesture recognition model that classifies sign language gestures in real time, designed to assist accessibility and bridge communication barriers.",
    tags: ["Python", "Machine Learning", "Computer Vision", "OpenCV", "NumPy"],
    statuses: [
      { label: "Academic Research Project", tone: "amber" },
      { label: "Completed Model", tone: "emerald" },
    ],
    note: "Academic capstone demonstration. Source and demo access restricted to maintain academic integrity.",
  },
];

export const EDUCATION: EducationEntry[] = [
  {
    id: "bsc-cs",
    degree: "Bachelor of Science in Computer Science",
    institution: "Wachemo University",
    location: "Hossana, Ethiopia",
    period: "2022 - 2026 (Expected)",
    detail:
      "Candidate for the Class of 2026. Combining core computer science theory with sustained hands-on practice in web engineering and machine learning.",
    coursework: [
      "Database Systems",
      "Web Programming",
      "Data Structures & Algorithms",
      "Network & Information Security",
      "Software Engineering",
      "Object-Oriented System Design",
    ],
  },
];



export const SOCIAL_LINKS: SocialLink[] = [
  { id: "github", label: "GitHub", href: "https://github.com/", icon: "github", handle: "github.com/mihretab" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin", handle: "linkedin.com/in/mihretabdesta" },
  { id: "telegram", label: "Telegram", href: "https://t.me/", icon: "telegram", handle: "@mihretab" },
];

export const CONTACT_LINKS: ContactLink[] = [
  { id: "email", label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}`, icon: "envelope" },
  { id: "location", label: "Location", value: PROFILE.location, href: "#contact", icon: "mapPin" },
  { id: "phone", label: "Phone / WhatsApp", value: "+251 9X XXX XXXX", href: "tel:+251900000000", icon: "phone" },
];