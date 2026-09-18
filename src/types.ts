/**
 * Shared data types for the Mihretab Desta developer portfolio.
 */

export type IconName =
  | "code"
  | "database"
  | "cpu"
  | "shield"
  | "gradCap"
  | "envelope"
  | "mapPin"
  | "phone"
  | "github"
  | "linkedin"
  | "telegram";

export interface SkillCategory {
  id: string;
  title: string;
  icon: IconName;
  blurb: string;
  tags: string[];
}

export interface ProjectStatus {
  label: string;
  tone: "emerald" | "zinc" | "amber";
}

export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  statuses: ProjectStatus[];
  note: string;
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  detail: string;
  coursework: string[];
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: "github" | "linkedin" | "telegram";
  handle: string;
}

export interface ContactLink {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: IconName;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface TerminalLine {
  prompt: string;
  command: string;
  output: string;
}