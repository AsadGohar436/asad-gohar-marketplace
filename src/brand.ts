// Brand profile and tokens strictly honoring the single source of truth

export const BRAND_PROFILE = {
  name: "Asad Gohar",
  handle: "asad-gohar",
  github: "AsadGohar436",
  githubUrl: "https://github.com/AsadGohar436",
  marketplaceRepoUrl: "https://github.com/AsadGohar436/asad-gohar-marketplace",
  linkedinSearchUrl: "https://www.linkedin.com/search/results/all/?keywords=Asad%20Gohar",
  designation: "Full Stack Developer",
  tagline: "Front to back, one stack.",
  bio: "Full Stack Developer | React · Node.js · TypeScript · PostgreSQL",
  about: "Full stack developer. Builds the interface in React and TypeScript, the API in Node.js, and the schema in PostgreSQL, and keeps the three of them agreeing with each other.",
  stack: ["React", "Node.js", "TypeScript", "PostgreSQL"],
  tags: ["Full Stack", "Web Development", "LinkedIn Studio", "Remotion"],
  footerRight: "Save & Share",
  voice: "First person, plain, practical. Writes from work actually done, not from advice read somewhere. No hype, no thread-bro rhythm, no engagement bait.",
};

export const BRAND_TOKENS = {
  theme: "dark-only",
  colors: {
    bg: "#070b09",
    surface: "#0e1512",
    card: "#111a15",
    border: "#1d2b23",
    borderLight: "#2a3b31",
    text: "#eaf6ef",
    textSecondary: "#c2d6cb",
    dim: "#8fa79a",
    accent: "#10b981",
    accent2: "#34d399",
    accentDeep: "#059669",
    white: "#ffffff",
  },
  gradient: "linear-gradient(135deg, #059669, #34d399)",
  font: "Inter, -apple-system, 'Segoe UI', Roboto, sans-serif",
  formats: {
    square: { width: 1080, height: 1080, label: "Square (1:1) — LinkedIn Feed" },
    portrait: { width: 1080, height: 1350, label: "Portrait (4:5) — Long List & Carousel" },
    story: { width: 1080, height: 1920, label: "Story (9:16) — Fullscreen Mobile" },
  },
};
