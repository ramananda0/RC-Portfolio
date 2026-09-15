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
    { label: "Instagram", href: "https://www.instagram.com/rc_pritom?stkn=OTZycXFhNHRjNXY2", key: "instagram" },
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
    repo: "https://github.com/ramananda0/Calculator",
  },
  {
    index: "02",
    title: "Global Currency Converter",
    stack: ["JavaScript", "REST API"],
    description:
      "Currency conversion tool powered by live exchange-rate data with a fast, simple conversion flow.",
    demo: "https://globalcurrencyconvert.netlify.app/",
    repo: "https://github.com/ramananda0/Global-currency-converter",
  },
  {
    index: "03",
    title: "WeatherDefiner",
    stack: ["JavaScript", "Weather API"],
    description:
      "Weather lookup application presenting current conditions for a searched location in a compact dashboard.",
    demo: "https://weatherdefiner.netlify.app/",
    repo: "https://github.com/ramananda0/Weather-app",
  },
  {
    index: "04",
    title: "Netflix Clone",
    stack: ["HTML", "CSS"],
    description:
      "Front-end recreation of a streaming platform landing experience, built to practice responsive layout and component structure.",
    repo: "https://github.com/ramananda0/Netflix-Clone",
  },
  {
    index: "05",
    title: "Amazon Clone",
    stack: ["HTML", "CSS", "JavaScript"],
    description:
      "E-commerce interface clone focused on grid layouts, navigation structure and responsive product presentation.",
    repo: "https://github.com/ramananda0/Amazon-clone",
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

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  file: string;
  kind: "image" | "pdf";
  credential?: string;
};

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Data Science & Machine Learning using Python",
    issuer: "BITM — BASIS Institute of Technology & Management",
    date: "Dec 2025 — Feb 2026 · 66 Hours",
    file: "/certificates/bitm-data-science.jpg",
    kind: "image",
  },
  {
    title: "React Native",
    issuer: "Meta — via Coursera",
    date: "Nov 2024",
    file: "/certificates/react-native.png",
    kind: "image",
  },
  {
    title: "Introduction to Critical Infrastructure Protection",
    issuer: "OPSWAT Academy",
    date: "Jun 2025",
    file: "/certificates/opswat-icip.png",
    kind: "image",
    credential: "https://learn.opswatacademy.com/certificate/5ym3LHnfhQ",
  },
  {
    title: "Introduction to Python",
    issuer: "365 Data Science",
    date: "Mar 2026",
    file: "/certificates/intro-to-python-365.pdf",
    kind: "pdf",
  },
  {
    title: "SQL",
    issuer: "365 Data Science",
    date: "Mar 2026",
    file: "/certificates/sql-365-data-science.pdf",
    kind: "pdf",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "Nov 2025",
    file: "/certificates/cisco-intro-cybersecurity.pdf",
    kind: "pdf",
  },
  {
    title: "Agile Project Management",
    issuer: "HP LIFE — HP Foundation",
    date: "Sep 2025",
    file: "/certificates/agile-project-management.pdf",
    kind: "pdf",
  },
  {
    title: "Effective Leadership",
    issuer: "HP LIFE — HP Foundation",
    date: "Jun 2025",
    file: "/certificates/effective-leadership.pdf",
    kind: "pdf",
  },
  {
  title: "Intro Of Ai",
  issuer: "365 Data Science",
  date: "November 2025",
  file: "/certificates/intro-of-ai.pdf",
  kind: "pdf",
}
];


export const STORY_LINES = [
  "Ramananda began his professional journey in May 2026 as a Data Annotation Analyst at Rooya Bangladesh, where he gained practical experience in structured data workflows, quality-focused processes, analytical thinking, accuracy, and professional collaboration.",
  "In August 2026, he transitioned into the Technology Unit at BRAC International as an Intern, beginning a new phase of professional growth within a technology-focused environment.",
  "His long-term direction is focused on software engineering, modern web development, full-stack technologies, and AI/Data Science.",
];
