// ============================================
// TypeScript Types — Pawan Kumar Portfolio
// ============================================

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  problem?: string;
  solution?: string;
  impact?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: 'ai' | 'fullstack' | 'automation' | 'other';
}

export interface Repo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  homepage: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
  size: number;
}

export interface GitHubProfile {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string | null;
  name: string | null;
}

export interface Skill {
  name: string;
  category: SkillCategory;
  level: number; // 0-100
  icon?: string;
  projects?: string[];
}

export type SkillCategory = 
  | 'frontend' 
  | 'backend' 
  | 'databases' 
  | 'ai' 
  | 'automation' 
  | 'devops';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  year?: string;
  icon?: string;
}

export interface TechCategory {
  name: string;
  key: SkillCategory;
  description: string;
  technologies: Skill[];
  color: string;
}

export interface ExpertiseNode {
  id: string;
  label: string;
  description: string;
  skills: string[];
  orbitRadius: number;
  orbitSpeed: number;
  startAngle: number;
}

export interface ParticleConfig {
  count: number;
  maxDistance: number;
  speed: number;
  mouseInfluence: number;
  colors: string[];
}
