# Architecture — RC-Portfolio

> Personal portfolio of **Ramananda Chakraborty**. Created by Ramananda Chakraborty.

---

## 1. Overview

RC-Portfolio is a single-page, server-rendered React application created by Ramananda Chakraborty. It presents the owner as a "system profile" — a terminal-themed metaphor aligned with his Computer Science engineering identity.

### 1.1 Goals

1. Establish professional credibility
2. Demonstrate technical range (frontend, data science, CS fundamentals)
3. Create a memorable, differentiated experience
4. Drive contact for opportunities and collaboration

### 1.2 Target Audience

| Audience | What they care about | Where they look |
|----------|---------------------|-----------------|
| Recruiters | Experience, education, certifications | Modules 02, 05 |
| Hiring managers (tech) | Projects, tech stack, GitHub | Modules 03, 04 |
| Fellow developers | Code quality, design patterns | Whole site |
| Clients (freelance) | Contact, project samples | Modules 04, 06 |

### 1.3 Key Differentiators

- Terminal/system aesthetic
- Narrative career timeline as "records"
- Machine vocabulary describing a human story
- Clickable certificate verification

---

## 2. Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Language | TypeScript (strict) |
| Build tool | Vite |
| Package manager | Bun (npm fallback) |
| Routing | TanStack Router (file-based) |
| Styling | Tailwind CSS |
| UI components | shadcn/ui (Radix-based) |
| Animation | Framer Motion |
| Icons | Lucide |
| Deployment | Netlify |

---

## 3. Layered Architecture

```
┌─────────────────────────────────────────────┐
│  PRESENTATION  →  src/components/**         │
│  React components + Tailwind + shadcn/ui    │
├─────────────────────────────────────────────┤
│  APPLICATION   →  src/hooks, src/routes     │
│  Loaders, hooks, event handlers             │
├─────────────────────────────────────────────┤
│  DOMAIN        →  src/types, src/data       │
│  Types + content (framework-agnostic)       │
├─────────────────────────────────────────────┤
│  INFRA         →  src/services, netlify.toml│
│  Server functions, email, deployment        │
└─────────────────────────────────────────────┘
```

### Why This Layering?

| Benefit | Explanation |
|---------|-------------|
| Testability | Domain layer has zero React deps |
| Reusability | Content types usable outside UI |
| Replaceability | Swap hosts by touching only Infra |
| Onboarding | Clear home for each concern |
| SSR-safe | Domain + infra cleanly split |

---

## 4. MVC Mapping

React doesn't ship MVC. This project adapts it:

| MVC Role | Location | Responsibility |
|----------|----------|----------------|
| **Model** | `src/types/`, `src/data/` | Shape + content |
| **View** | `src/components/**` | Rendering |
| **Controller** | `src/hooks/`, `src/routes/`, `src/services/` | Orchestration |

### MVC Per Feature

| Feature | Model | View | Controller |
|---------|-------|------|------------|
| Hero | `profile.ts` | `Hero.tsx` | — |
| About System | `profile.ts` | `AboutSystem.tsx` | `useCountUp`, `useInView` |
| Professional Journey | `experience.ts` | `ProfessionalJourney.tsx` | `useInView` |
| Capability Matrix | `skills.ts` | `CapabilityMatrix.tsx` | `useInView` |
| Project Archive | `projects.ts` | `ProjectArchive.tsx` | — |
| Credentials | `certifications.ts`, `education.ts` | `Credentials.tsx` | `useCertificateModal` |
| Contact | `types/contact.ts` | `EstablishConnection.tsx` | `contact.service.ts` + server fn |

---

## 5. Data Flow Diagrams

### 5.1 Level 0 — Context

```
        ┌────────────────┐                    ┌────────────────────┐
        │                │  HTTP request      │                    │
        │     Visitor    │ ─────────────────► │                    │
        │   (Browser)    │                    │   RC-Portfolio     │
        │                │ ◄───────────────── │   Web Application  │
        └────────────────┘  Rendered HTML     │                    │
                                             └──────────┬─────────┘
        ┌────────────────┐                              │
        │   Recruiter    │ ──── views portfolio ───────►│
        └────────────────┘                              │
                                                        │ POST contact
        ┌────────────────┐                              ▼
        │  Email Service │ ◄─────────────────────────────────────
        └────────────────┘

        ┌────────────────┐
        │  Netlify CDN   │ ◄─── static assets ──── RC-Portfolio
        └────────────────┘
```

### 5.2 Level 1 — Major Processes

```
   ┌──────────────┐
   │   Visitor    │
   └──────┬───────┘
          │
          ▼
   ┌──────────────────────┐      ┌─────────────────────┐
   │  P1: Serve Portfolio │◄────►│  D1: Content Store  │
   │  (SSR + hydration)   │      │  (src/data/*)       │
   └──────┬───────────────┘      └─────────────────────┘
          │
          ├──────────────────────────────────────┐
          ▼                                      ▼
   ┌──────────────────┐                  ┌──────────────────┐
   │ P2: Animate UI   │                  │ P3: View Certs   │
   └──────────────────┘                  └────────┬─────────┘
                                                  ▼
                                         ┌──────────────────┐
                                         │ D2: Cert Images  │
                                         └──────────────────┘

   ┌──────────────┐
   │  Recruiter   │
   └──────┬───────┘
          │ submit form
          ▼
   ┌──────────────────────┐      ┌─────────────────────┐
   │ P4: Handle Contact   │◄────►│ D3: Message Store   │
   └──────┬───────────────┘      └─────────────────────┘
          ▼
   ┌──────────────────┐
   │ Email Service    │
   └──────────────────┘
```

### 5.3 Level 2 — P1 "Serve Portfolio"

```
   HTTP GET /
        │
        ▼
   ┌────────────────────────┐
   │ 1.1 Route Match        │
   └──────────┬─────────────┘
              ▼
   ┌────────────────────────┐      ┌────────────────────┐
   │ 1.2 Load Content       │◄────►│ D1.1 profile.ts    │
   │ (loader fn)            │      │ D1.2 experience.ts │
   └──────────┬─────────────┘      │ D1.3 skills.ts     │
              │                    │ D1.4 projects.ts   │
              │                    │ D1.5 certs.ts      │
              ▼                    └────────────────────┘
   ┌────────────────────────┐
   │ 1.3 SSR Render         │
   └──────────┬─────────────┘
              ▼
   ┌────────────────────────┐
   │ 1.4 Inject <head>      │
   └──────────┬─────────────┘
              ▼
   ┌────────────────────────┐
   │ 1.5 Stream HTML        │
   └──────────┬─────────────┘
              ▼
   ┌────────────────────────┐
   │ 1.6 Hydrate React      │
   └──────────┬─────────────┘
              ▼
   ┌────────────────────────┐
   │ 1.7 Trigger animations │
   └────────────────────────┘
```

### 5.4 Level 2 — P4 "Handle Contact"

```
   POST /api/contact
        │
        ▼
   ┌────────────────────────┐
   │ 4.1 Validate (zod)     │
   └──────────┬─────────────┘
              ├── invalid → 400
              ▼ valid
   ┌────────────────────────┐
   │ 4.2 Rate limit check   │
   └──────────┬─────────────┘
              ▼
   ┌────────────────────────┐
   │ 4.3 Honeypot check     │
   └──────────┬─────────────┘
              ▼
   ┌────────────────────────┐
   │ 4.4 Send email         │
   └──────────┬─────────────┘
              ▼
   ┌────────────────────────┐
   │ 4.5 Log / store        │
   └──────────┬─────────────┘
              ▼
   Return 200 { success: true }
```

---

## 6. ER Model — Content Entities

```
┌──────────────────┐          ┌──────────────────┐
│     PROFILE      │          │     PROJECT      │
├──────────────────┤          ├──────────────────┤
│ PK id            │          │ PK id            │
│    name          │          │    code          │
│    role          │          │    title         │
│    tagline       │          │    description   │
│    location      │          │    tech[]        │
│    status        │          │    demoUrl       │
│    focus         │          │ FK profileId     │
│    bio           │          └────────┬─────────┘
└────────┬─────────┘                   │
         │ 1                          *│ uses
         │                             ▼
         │                    ┌──────────────────┐
         │                    │      SKILL       │
         │                    ├──────────────────┤
         │                    │ PK id            │
         │                    │    name          │
         │                    │    category      │
         │                    └──────────────────┘
         │
         ├──────────────────────────┐
         │ *                        │ *
         ▼                          ▼
┌──────────────────┐      ┌──────────────────┐
│   EXPERIENCE     │      │ CERTIFICATION    │
├──────────────────┤      ├──────────────────┤
│ PK id            │      │ PK id            │
│    company       │      │    issuer        │
│    role          │      │    title         │
│    startDate     │      │    issueDate     │
│    endDate       │      │    imageUrl      │
│    location      │      │    credentialUrl │
│    status        │      │ FK profileId     │
│    description   │      └──────────────────┘
│    dataFlow[]    │
│    skills[]      │
│ FK profileId     │
└──────────────────┘
         │ *
         ▼
┌──────────────────┐
│    EDUCATION     │
├──────────────────┤
│ PK id            │
│    degree        │
│    institution   │
│    year          │
│    result        │
│ FK profileId     │
└──────────────────┘
```

---

## 7. Use Case Diagram

```
              ┌─────────────────────────────────────────────┐
              │            RC-Portfolio System              │
              │   (UC1) View Hero                           │
              │   (UC2) Read About                          │
              │   (UC3) Explore Journey                     │
              │   (UC4) Browse Skills                       │
              │   (UC5) View Projects                       │
              │   (UC6) Preview Certificate                 │
              │   (UC7) Download Certificate                │
              │   (UC8) Open Project Demo                   │
              │   (UC9) View Project Repo                   │
              │   (UC10) Submit Contact Form                │
              │   (UC11) Copy Email                         │
              │   (UC12) Visit Social Link                  │
              └─────────────┬───────────────────────────────┘
                            │
        ┌───────────────────┼────────────────────┐
        ▼                   ▼                    ▼
   ┌─────────┐        ┌──────────┐        ┌───────────┐
   │ Visitor │        │Recruiter │        │Developer  │
   └─────────┘        └──────────┘        └───────────┘
```

### UC10 — Submit Contact Form

| Field | Value |
|-------|-------|
| Actor | Recruiter, Visitor |
| Goal | Send a message |
| Preconditions | Form valid |
| Postconditions | Email sent; confirmation shown |
| Main flow | Fill form → submit → validate → POST → email → toast |
| Alternate | Validation fails → inline errors |
| Exceptions | Rate-limited → "try later"; network error → retry |

### UC6 — Preview Certificate

| Field | Value |
|-------|-------|
| Actor | Recruiter, Visitor |
| Goal | Verify certification |
| Preconditions | Certificate exists |
| Postconditions | Modal open with full JPG |
| Main flow | Click card → modal opens → image loads |
| Alternate | Esc / backdrop click → closes |
| Exceptions | Image 404 → placeholder + alt |

---

## 8. Sequence Diagrams

### 8.1 Page Load

```
 Visitor        Browser         Netlify       TanStack Start      React Client
    │              │                │               │                   │
    │──GET /──────►│                │               │                   │
    │              │──forward──────►│               │                   │
    │              │                │──route match─►│                   │
    │              │                │               │──import data      │
    │              │                │               │──render to HTML   │
    │              │                │◄──HTML────────│                   │
    │              │◄──HTML+JS──────│               │                   │
    │◄──paint──────│                │               │                   │
    │              │──hydrate───────────────────────────────────────────►│
    │              │──scroll────────────────────────────────────────────►│
    │              │                │               │       useInView → │
    │              │                │               │       trigger anim│
```

### 8.2 Certificate Preview

```
 User      Credentials      useCertificateModal      Dialog       Image
   │           │                   │                    │            │
   │─click────►│                   │                    │            │
   │           │─open(certId)─────►│                    │            │
   │           │                   │─setActive(cert)───►│            │
   │           │                   │                    │─mount──────►│
   │           │                   │                    │◄──img data─│
   │◄───────────────────────────modal visible────────────────────────│
   │─press Esc►│                   │                    │            │
   │           │                   │◄─onClose───────────│            │
   │◄───────────────────────────modal closed─────────────────────────│
```

### 8.3 Contact Form

```
 User      Form         Validator      Server Fn        Email       Inbox
   │        │              │              │               │           │
   │─fill──►│              │              │               │           │
   │─click─►│              │              │               │           │
   │        │─validate────►│              │               │           │
   │        │◄──ok─────────│              │               │           │
   │        │─POST /api/contact──────────►│               │           │
   │        │              │              │─zod parse────►│           │
   │        │              │              │─honeypot─────►│           │
   │        │              │              │─send()───────►│           │
   │        │              │              │               │─SMTP─────►│
   │        │              │              │◄──200─────────│           │
   │        │◄──200 success──────────────│               │           │
   │◄─toast─│              │              │               │           │
```

---

## 9. State Machines

### 9.1 Counter Animation

```
   ┌─────────┐
   │  IDLE   │
   └────┬────┘
        │ useInView fires
        ▼
   ┌─────────┐
   │ RUNNING │  (0 → target)
   └────┬────┘
        │ reach target
        ▼
   ┌─────────┐
   │  DONE   │
   └─────────┘
```

### 9.2 Certificate Modal

```
   ┌─────────┐
   │ CLOSED  │
   └────┬────┘
        │ click cert
        ▼
   ┌─────────┐
   │ LOADING │
   └────┬────┘
   ┌────┴────┐
   ▼         ▼
┌────────┐ ┌────────┐
│ OPEN   │ │ ERROR  │
└────┬───┘ └────────┘
     │ close
     ▼
┌─────────┐
│ CLOSED  │
└─────────┘
```

### 9.3 Contact Form

```
   ┌───────┐
   │ EMPTY │
   └───┬───┘
       │ user types
       ▼
   ┌───────┐
   │DIRTY  │
   └───┬───┘
       │ submit
       ▼
   ┌────────────┐
   │ VALIDATING │
   └───┬────┬───┘
   ok  │    │ invalid
       ▼    ▼
   ┌─────┐ ┌────────┐
   │SEND │ │ ERROR  │
   └──┬──┘ └───┬────┘
      │        │ fix
      ▼        │
   ┌─────┐     │
   │SENT │     │
   └──┬──┘     │
      │◄───────┘
      ▼
   ┌───────┐
   │ EMPTY │
   └───────┘
```

---

## 10. Component Hierarchy

```
<RootLayout>
 ├── <Navbar />
 └── <IndexRoute>
      ├── <Hero />
      ├── <AboutSystem />
      ├── <ProfessionalJourney />
      ├── <CapabilityMatrix />
      ├── <ProjectArchive />
      ├── <Credentials />
      └── <EstablishConnection />
```

---

## 11. Routing Map

| File | URL | Purpose |
|------|-----|---------|
| `src/routes/__root.tsx` | — | Root layout |
| `src/routes/index.tsx` | `/` | Portfolio home |
| `src/routes/api/contact.ts` | `/api/contact` | Contact endpoint |

**Optional future routes:** `/projects`, `/projects/:id`, `/blog`, `/blog/:slug`, `/uses`, `/now`.

---

## 12. Model Layer — Code

### 12.1 `src/types/content.ts`

```ts
export type SkillCategory = 'frontend' | 'backend' | 'data' | 'cs-core';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  familiarity?: 'strong' | 'working' | 'familiar' | 'academic';
}

export interface Experience {
  id: string;
  code: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  location: string;
  status: 'completed' | 'active';
  description: string;
  dataFlow: string[];
  skills: string[];
  logs: string[];
}

export interface Project {
  id: string;
  code: string;
  title: string;
  description: string;
  tech: string[];
  demoUrl?: string;
  repoUrl?: string;
  thumbnail?: string;
}

export interface Certification {
  id: string;
  issuer: string;
  title?: string;
  issueDate: string;
  duration?: string;
  imageUrl: string;
  credentialUrl?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  result: string;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  status: 'online' | 'offline';
  focus: string[];
  stats: Stat[];
  domains: Domain[];
}

export interface Stat { label: string; value: number; suffix?: string; }
export interface Domain { title: string; description: string; icon?: string; }
```

### 12.2 `src/data/profile.ts`

```ts
import type { Profile } from '@/types/content';

export const profile: Profile = {
  name: 'Ramananda Chakraborty',
  role: 'Frontend Developer',
  tagline: 'Computer Science Engineer passionate about building modern web experiences.',
  bio: 'Computer Science Engineer passionate about building modern web experiences, exploring AI and data-driven technologies, and turning ideas into interactive digital products.',
  location: 'Dhaka, Bangladesh',
  status: 'online',
  focus: ['Software', 'AI'],
  stats: [
    { label: 'Projects Built', value: 5, suffix: '+' },
    { label: 'Tech Stack', value: 24, suffix: '+' },
    { label: 'Learning Mode', value: 100, suffix: '%' },
  ],
  domains: [
    { title: 'Web Development', description: 'Building modern, responsive interfaces with React, Tailwind CSS and clean component architecture.' },
    { title: 'AI & Data Science', description: 'Exploring Python, data analysis and machine-learning fundamentals to work with data-driven systems.' },
    { title: 'Computer Science Core', description: 'Strong grounding in algorithms, operating systems, networking, architecture and OOP principles.' },
    { title: 'Future Objective', description: 'Growing towards full-stack software engineering while staying close to emerging AI technology.' },
  ],
};
```

### 12.3 `src/data/experience.ts`

```ts
import type { Experience } from '@/types/content';

export const experiences: Experience[] = [
  {
    id: 'rooya-2026',
    code: 'RECORD_01',
    company: 'Rooya Bangladesh / Level Master Team (LM)',
    role: 'Data Annotation Analyst',
    startDate: '2026-05-01',
    endDate: '2026-08-01',
    location: 'Dhaka, Bangladesh',
    status: 'completed',
    description: 'First major professional experience — structured data workflows with a strict focus on accuracy, consistency and quality validation.',
    dataFlow: ['RAW DATA', 'ANNOTATION', 'VALIDATION', 'QUALITY CHECK', 'STRUCTURED DATA'],
    skills: ['Data Annotation', 'Data Labeling', 'Data Quality', 'Accuracy & Consistency',
             'Data Validation', 'Analytical Thinking', 'Attention to Detail',
             'Structured Workflow', 'Team Collaboration', 'Process Discipline'],
    logs: [
      'EXPERIENCE_RECORD_LOADED',
      'DATA_OPERATIONS_INITIALIZED',
      'QUALITY_PROTOCOLS_COMPLETED',
      'PROFESSIONAL_EXPERIENCE_REGISTERED',
      'MISSION_STATUS: COMPLETED',
    ],
  },
  {
    id: 'brac-2026',
    code: 'RECORD_02',
    company: 'BRAC International / Technology Unit',
    role: 'Intern',
    startDate: '2026-08-01',
    endDate: null,
    location: 'Dhaka, Bangladesh',
    status: 'active',
    description: 'Current mission: transform Computer Science knowledge into practical professional experience inside a technology-focused environment.',
    dataFlow: ['SYSTEM ACTIVE', 'CURRENTLY DEVELOPING', 'TECHNOLOGY UNIT'],
    skills: ['Technology Exposure', 'Professional Workflows', 'Team Collaboration',
             'Problem Solving', 'Analytical Thinking', 'Technology Operations',
             'Professional Communication', 'Real-World Systems', 'Continuous Learning'],
    logs: [
      'EXPERIENCE_RECORD_FOUND',
      'ORGANIZATION_IDENTIFIED',
      'ROLE_DATA_LOADED',
      'SKILLS_ANALYZED',
      'CAREER_PATH_UPDATED',
    ],
  },
];
```

### 12.4 `src/data/skills.ts`

```ts
import type { Skill } from '@/types/content';

export const skills: Skill[] = [
  { id: 'html', name: 'HTML5', category: 'frontend', familiarity: 'strong' },
  { id: 'css', name: 'CSS3', category: 'frontend', familiarity: 'strong' },
  { id: 'js', name: 'JavaScript ES6+', category: 'frontend', familiarity: 'strong' },
  { id: 'react', name: 'React.js', category: 'frontend', familiarity: 'strong' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', familiarity: 'strong' },
  { id: 'bootstrap', name: 'Bootstrap', category: 'frontend', familiarity: 'working' },
  { id: 'sql', name: 'SQL', category: 'backend', familiarity: 'working' },
  { id: 'rest', name: 'REST APIs', category: 'backend', familiarity: 'working' },
  { id: 'firebase', name: 'Firebase', category: 'backend', familiarity: 'working' },
  { id: 'node', name: 'Node.js', category: 'backend', familiarity: 'familiar' },
  { id: 'python', name: 'Python', category: 'data', familiarity: 'working' },
  { id: 'numpy', name: 'NumPy', category: 'data', familiarity: 'working' },
  { id: 'pandas', name: 'Pandas', category: 'data', familiarity: 'working' },
  { id: 'matplotlib', name: 'Matplotlib', category: 'data', familiarity: 'working' },
  { id: 'seaborn', name: 'Seaborn', category: 'data', familiarity: 'working' },
  { id: 'sklearn', name: 'Scikit-learn', category: 'data', familiarity: 'working' },
  { id: 'oop', name: 'Object-Oriented Programming', category: 'cs-core', familiarity: 'academic' },
  { id: 'dsa', name: 'Data Structures & Algorithms', category: 'cs-core', familiarity: 'academic' },
  { id: 'os', name: 'Operating Systems', category: 'cs-core', familiarity: 'academic' },
  { id: 'arch', name: 'Computer Architecture', category: 'cs-core', familiarity: 'academic' },
  { id: 'net', name: 'Computer Networking', category: 'cs-core', familiarity: 'academic' },
  { id: 'ai', name: 'Artificial Intelligence', category: 'cs-core', familiarity: 'academic' },
  { id: 'compiler', name: 'Compiler Design', category: 'cs-core', familiarity: 'academic' },
  { id: 'digital', name: 'Digital Systems', category: 'cs-core', familiarity: 'academic' },
];

export const skillModules = {
  frontend: { code: 'FE_MODULE', label: 'Frontend Technologies' },
  backend: { code: 'BE_MODULE', label: 'Backend / Database' },
  data: { code: 'DS_MODULE', label: 'Python & Data Science' },
  'cs-core': { code: 'CS_CORE', label: 'Core Computer Science' },
};
```

---

## 13. View Layer — Code

### 13.1 `src/components/shared/AnimatedCounter.tsx`

```tsx
import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/hooks/useInView';

interface Props {
  value: number;
  suffix?: string;
  duration?: number;
  label: string;
}

export function AnimatedCounter({ value, suffix = '', duration = 1600, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setDisplay(value); return; }

    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setDisplay(Math.floor((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <div ref={ref} className="text-center" aria-live="polite">
      <div className="text-4xl font-bold tabular-nums">{display}{suffix}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
```

### 13.2 `src/hooks/useInView.ts`

```ts
import { useEffect, useState, RefObject } from 'react';

export function useInView<T extends Element>(
  ref: RefObject<T>,
  options: IntersectionObserverInit & { once?: boolean } = {}
) {
  const [inView, setInView] = useState(false);
  const { once = false, ...io } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) observer.unobserve(el);
      } else if (!once) {
        setInView(false);
      }
    }, io);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, once, io.root, io.rootMargin, io.threshold]);

  return inView;
}
```

### 13.3 `src/components/sections/AboutSystem.tsx`

```tsx
import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { fadeUp, stagger } from '@/lib/animations';

export function AboutSystem() {
  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeader module="01" title="About System" />

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="text-lg leading-relaxed max-w-3xl mb-16"
      >
        I am {profile.name}, a Computer Science Engineer from {profile.location}. My curiosity for
        technology started with understanding how systems work — and turned into a habit of building
        things that people can actually use.
      </motion.p>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-8 mb-20 max-w-2xl"
      >
        {profile.stats.map((s) => (
          <AnimatedCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
        ))}
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {profile.domains.map((d, i) => (
          <motion.div
            key={d.title}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="border border-border rounded-lg p-6 hover:border-accent transition-colors"
          >
            <h3 className="text-lg font-semibold mb-2">{d.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{d.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

---

## 14. Controller Layer — Route

### `src/routes/index.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router';
import { Hero } from '@/components/sections/Hero';
import { AboutSystem } from '@/components/sections/AboutSystem';
import { ProfessionalJourney } from '@/components/sections/ProfessionalJourney';
import { CapabilityMatrix } from '@/components/sections/CapabilityMatrix';
import { ProjectArchive } from '@/components/sections/ProjectArchive';
import { Credentials } from '@/components/sections/Credentials';
import { EstablishConnection } from '@/components/sections/EstablishConnection';
import { seo } from '@/lib/seo';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: seo.title },
      { name: 'description', content: seo.description },
      { property: 'og:title', content: seo.title },
      { property: 'og:description', content: seo.description },
      { property: 'og:image', content: seo.ogImage },
      { property: 'og:url', content: seo.url },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: seo.url }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <AboutSystem />
      <ProfessionalJourney />
      <CapabilityMatrix />
      <ProjectArchive />
      <Credentials />
      <EstablishConnection />
    </>
  );
}
```

---

## 15. Design Tokens

### `src/styles/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 4%;
    --foreground: 0 0% 96%;
    --muted: 0 0% 10%;
    --muted-foreground: 0 0% 55%;
    --border: 0 0% 15%;
    --accent: 150 100% 50%;
    --accent-foreground: 0 0% 4%;
  }
  html { scroll-behavior: smooth; }
  body {
    @apply bg-[hsl(var(--background))] text-[hsl(var(--foreground))] antialiased;
    font-family: 'Inter', system-ui, sans-serif;
  }
  code, pre, .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 16. Testing Strategy

| Layer | Tool | What to test |
|-------|------|--------------|
| Model | Vitest | Data shape, helpers |
| Controller | Vitest + Testing Library | Hooks |
| View | Testing Library | Render, interactions, a11y |
| E2E | Playwright | Full flows |

---

## 17. Deployment Pipeline

```
   Developer
      │ git push origin main
      ▼
   GitHub
      │ webhook
      ▼
   Netlify Build (bun install → bun run build → dist/)
      ▼
   https://ramananda-portfolio.netlify.app
```

---

## 18. Security

| Concern | Mitigation |
|---------|------------|
| Contact spam | Honeypot + rate limiting |
| XSS | React escapes; validate server-side |
| Env leakage | Netlify env vars; never commit `.env` |
| Dependencies | `bun audit` in CI |
| Clickjacking | `X-Frame-Options: DENY` via `_headers` |

### `public/_headers`

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## 19. Performance Budget

| Metric | Target |
|--------|--------|
| LCP | < 1.5s |
| CLS | < 0.05 |
| INP | < 150ms |
| JS bundle | < 200 KB gz |

---

## Appendix — Glossary

| Term | Meaning |
|------|---------|
| MVC | Model-View-Controller |
| SSR | Server-Side Rendering |
| DFD | Data Flow Diagram |
| ER | Entity-Relationship |
| LCP | Largest Contentful Paint |
| INP | Interaction to Next Paint |
| CLS | Cumulative Layout Shift |
