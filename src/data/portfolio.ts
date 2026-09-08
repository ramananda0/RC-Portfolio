export const PROFILE = {
  name: "Ramananda Chakraborty",
  tagline: "CS Engineer • Technology Enthusiast • Developer",
  intro:
    "Computer Science Engineer passionate about building modern web experiences, exploring AI and data-driven technologies, and turning ideas into interactive digital products.",
  roles: [
    "CS Engineer",
    "Frontend Developer",
    "React Developer",
    "AI Enthusiast",
    "Creative Technologist",
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/ramananda0", key: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ramananda-chakraborty/", key: "linkedin" },
    { label: "Facebook", href: "https://www.facebook.com/share/1BmUCKjd7u/", key: "facebook" },
    { label: "Instagram", href: "https://www.facebook.com/share/1BmUCKjd7u/", key: "instagram" },
  ],
  email: "ramananda.chakraborty0@gmail.com",
  resumeUrl: "#", // PLACEHOLDER: upload resume PDF and link it here
};

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export const STATS = [
  { value: "5+", label: "Projects Built" },
  { value: "10+", label: "Tech Stack" },
  { value: "AI / WEB", label: "Current Focus" },
  { value: "100%", label: "Learning Mode" },
];

export const SKILL_GROUPS = [
  {
    title: "Frontend Technologies",
    code: "FE_MODULE",
    items: ["HTML5", "CSS3", "JavaScript ES6+", "React.js", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: "Backend / Database",
    code: "BE_MODULE",
    items: ["SQL", "REST APIs", "Firebase", "Node.js (familiarity)"],
  },
  {
    title: "Python & Data Science",
    code: "DS_MODULE",
    items: ["Python", "NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn"],
  },
  {
    title: "Core Computer Science",
    code: "CS_CORE",
    items: [
      "Object-Oriented Programming",
      "Data Structures & Algorithms",
      "Operating Systems",
      "Computer Architecture",
      "Computer Networking",
      "Artificial Intelligence",
      "Compiler Design",
      "Digital Systems",
    ],
  },
];

export type Project = {
  index: string;
  title: string;
  stack: string[];
  description: string;
  demo?: string;
  repo?: string;
};

export const PROJECTS: Project[] = [
  {
    index: "01",
    title: "Luxury Calculator",
    stack: ["HTML", "CSS", "JavaScript"],
    description:
      "A premium-styled calculator interface focused on clean layout, precise interaction states and a polished visual finish.",
    demo: "https://luxarycalculator.netlify.app/",
  },
  {
    index: "02",
    title: "Global Currency Converter",
    stack: ["JavaScript", "REST API"],
    description:
      "Currency conversion tool powered by live exchange-rate data with a fast, simple conversion flow.",
    demo: "https://globalcurrencyconvert.netlify.app/",
  },
  {
    index: "03",
    title: "WeatherDefiner",
    stack: ["JavaScript", "Weather API"],
    description:
      "Weather lookup application presenting current conditions for a searched location in a compact dashboard.",
    demo: "https://weatherdefiner.netlify.app/",
  },
  {
    index: "04",
    title: "Netflix Clone",
    stack: ["HTML", "CSS"],
    description:
      "Front-end recreation of a streaming platform landing experience, built to practice responsive layout and component structure.",
  },
  {
    index: "05",
    title: "Amazon Clone",
    stack: ["HTML", "CSS", "JavaScript"],
    description:
      "E-commerce interface clone focused on grid layouts, navigation structure and responsive product presentation.",
  },
];

export const EXPERIENCE = [
  {
    index: "01",
    org: "Rooya Bangladesh",
    unit: "Level Master Team (LM)",
    role: "Data Annotation Analyst",
    period: "May 2026 — August 2026",
    location: "Dhaka, Bangladesh",
    status: "COMPLETED" as const,
    pipeline: ["RAW DATA", "ANNOTATION", "VALIDATION", "QUALITY CHECK", "STRUCTURED DATA"],
    summary:
      "First major professional experience — structured data workflows with a strict focus on accuracy, consistency and quality validation.",
    skills: [
      "Data Annotation",
      "Data Labeling",
      "Data Quality",
      "Accuracy & Consistency",
      "Data Validation",
      "Analytical Thinking",
      "Attention to Detail",
      "Structured Workflow",
      "Team Collaboration",
      "Process Discipline",
    ],
    log: [
      "EXPERIENCE_RECORD_LOADED",
      "DATA_OPERATIONS_INITIALIZED",
      "QUALITY_PROTOCOLS_COMPLETED",
      "PROFESSIONAL_EXPERIENCE_REGISTERED",
      "MISSION_STATUS: COMPLETED",
    ],
  },
  {
    index: "02",
    org: "BRAC International",
    unit: "Technology Unit",
    role: "Intern",
    period: "August 2026 — Present",
    location: "Dhaka, Bangladesh",
    status: "ACTIVE" as const,
    pipeline: ["SYSTEM ACTIVE", "CURRENTLY DEVELOPING", "TECHNOLOGY UNIT"],
    summary:
      "Current mission: transform Computer Science knowledge into practical professional experience inside a technology-focused environment.",
    skills: [
      "Technology Exposure",
      "Professional Workflows",
      "Team Collaboration",
      "Problem Solving",
      "Analytical Thinking",
      "Technology Operations",
      "Professional Communication",
      "Real-World Systems",
      "Continuous Learning",
    ],
    log: [
      "EXPERIENCE_RECORD_FOUND",
      "ORGANIZATION_IDENTIFIED",
      "ROLE_DATA_LOADED",
      "SKILLS_ANALYZED",
      "CAREER_PATH_UPDATED",
    ],
  },
];

export const CAREER_HUD = [
  { k: "Current Status", v: "Technology Intern" },
  { k: "Current Organization", v: "BRAC International" },
  { k: "Department", v: "Technology Unit" },
  { k: "Previous Role", v: "Data Annotation Analyst" },
  { k: "Professional Journey", v: "May 2026 — Present" },
  { k: "Core Domain", v: "Computer Science" },
  { k: "Primary Interest", v: "Software Engineering" },
  { k: "Secondary Interests", v: "AI / Data Science" },
  { k: "Current Development", v: "React.js / Modern Web" },
  { k: "Career Objective", v: "Full-Stack / Software Engineering" },
];

export const EDUCATION = [
  {
    degree: "BSc in Computer Science & Engineering",
    school: "Dhaka City College — National University",
    year: "2025",
    result: "CGPA 3.60 / 4.00",
  },
  {
    degree: "HSC — Science",
    school: "Govt. Hazi Asmat College",
    year: "2019",
    result: "GPA 4.00 / 5.00",
  },
  {
    degree: "SSC — Science",
    school: "Kuliarchar Govt. High School",
    year: "2016",
    result: "GPA 5.00 / 5.00",
  },
];

// PLACEHOLDER data — replace with real certifications and credential links.
export const CERTIFICATIONS = [
  {
    title: "Certification Title",
    issuer: "Issuing Organization",
    date: "YYYY",
    credential: "",
    placeholder: true,
  },
  {
    title: "Certification Title",
    issuer: "Issuing Organization",
    date: "YYYY",
    credential: "",
    placeholder: true,
  },
  {
    title: "Certification Title",
    issuer: "Issuing Organization",
    date: "YYYY",
    credential: "",
    placeholder: true,
  },
];

export const STORY_LINES = [
  "Ramananda began his professional journey in May 2026 as a Data Annotation Analyst at Rooya Bangladesh, where he gained practical experience in structured data workflows, quality-focused processes, analytical thinking, accuracy, and professional collaboration.",
  "In August 2026, he transitioned into the Technology Unit at BRAC International as an Intern, beginning a new phase of professional growth within a technology-focused environment.",
  "His long-term direction is focused on software engineering, modern web development, full-stack technologies, and AI/Data Science.",
];
