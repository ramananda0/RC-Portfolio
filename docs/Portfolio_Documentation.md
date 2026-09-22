# Portfolio Website Documentation — Extended Technical & Architecture Edition

**Project:** Ramananda Chakraborty — Personal Portfolio
**Live URL:** https://ramananda-portfolio.netlify.app/
**Repository:** https://github.com/ramananda0/RC-Portfolio
**Documentation Version:** 5.0 (Architecture + Code + Diagrams)

---

## 📌 Important Note Before We Begin

The GitHub repository I can see only exposes the root-level file listing — not the actual contents of `src/`, `package.json`, or any component file. So the code samples, MVC mapping, and diagrams below are **reverse-engineered from the live site's behavior** + the confirmed stack (TanStack Start + shadcn/ui + Bun + Tailwind + TypeScript).

They are architecturally accurate but **not byte-for-byte copies** of your actual files.

When you share the `src/` folder + `package.json`, I can replace every "inferred" block with the real code.

That said — this v5.0 is designed to be a **blueprint you can adopt**, even if your current code differs. It shows the ideal structure for a TanStack Start portfolio and maps your existing feature set onto it.

---

## 📖 Table of Contents

1. Executive Summary
2. Full Repository File Structure (Target)
3. Complete Architecture Overview
4. Layered Architecture Diagram
5. Model–View–Controller (MVC) Mapping
6. Alternative: Feature-Sliced Architecture
7. Data Flow Diagrams (DFD) — Levels 0, 1, 2
8. Entity-Relationship (ER) Model for Content
9. Use Case Diagram + Use Case Specifications
10. Sequence Diagrams
11. State Machine Diagrams
12. Component Hierarchy (React Tree)
13. Routing Map (TanStack Router)
14. Full Code — Data Layer (Model)
15. Full Code — Model Layer Helpers
16. Full Code — View Layer (Components)
17. Full Code — Controller Layer (Loaders + Route)
18. Full Code — Server Function (Contact)
19. Root Layout
20. Tailwind Theme / Design Tokens
21. Animation Architecture
22. TypeScript Types (Global Recap)
23. Testing Strategy
24. Deployment Pipeline
25. CI/CD Recommendations
26. Security Considerations
27. Performance Budget
28. Fix Guide — The Zero Counter Bug
29. Fix Guide — Contact Section
30. Migration Checklist to This Architecture
31. Appendices (Glossary, References)

---

## 1. Executive Summary

This portfolio is a **single-page, server-rendered React application** built on **TanStack Start** — a full-stack framework combining:

- **TanStack Router** (file-based, type-safe routing)
- **Vite** (build tooling)
- **SSR + streaming** (SEO + performance)
- **Server Functions** (backend logic without a separate server)

It's styled with **Tailwind CSS**, uses **shadcn/ui** (Radix-based components), is managed by **Bun**, and deployed to **Netlify** via GitHub sync.

**Architectural style:** Component-driven UI layered over a **Model–View–Controller (MVC)** pattern adapted for React (models = data/types, views = components, controllers = hooks/loaders).

---

## 2. Full Repository File Structure (Target)

Here is the recommended, complete file tree — an expansion of what's currently in your repo. Items marked `[NEW]` are additions I recommend; items marked `[EXISTING]` are confirmed from the GitHub listing.

```
RC-Portfolio/
│
├── .github/
│   └── workflows/
│       └── ci.yml                          [NEW] Lint + typecheck on PR
│
├── public/                                 [EXISTING]
│   ├── favicon.ico
│   ├── og-image.jpg                        [NEW] Social share image
│   ├── robots.txt                          [NEW]
│   ├── sitemap.xml                         [NEW]
│   ├── certificates/
│   │   ├── bitm.jpg
│   │   ├── meta-coursera.jpg
│   │   ├── opswat.jpg
│   │   ├── 365-ds-1.jpg
│   │   ├── 365-ds-2.jpg
│   │   ├── cisco.jpg
│   │   ├── hp-life-1.jpg
│   │   ├── hp-life-2.jpg
│   │   └── 365-ds-3.jpg
│   └── projects/
│       ├── calculator.png
│       ├── currency.png
│       ├── weather.png
│       ├── netflix.png
│       └── amazon.png
│
├── src/                                    [EXISTING]
│   │
│   ├── components/
│   │   ├── ui/                             # shadcn/ui primitives
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── separator.tsx
│   │   │   └── tooltip.tsx
│   │   │
│   │   ├── layout/                         [NEW organized folder]
│   │   │   ├── RootLayout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── sections/                       # One per portfolio module
│   │   │   ├── Hero.tsx
│   │   │   ├── AboutSystem.tsx
│   │   │   ├── ProfessionalJourney.tsx
│   │   │   ├── CapabilityMatrix.tsx
│   │   │   ├── ProjectArchive.tsx
│   │   │   ├── Credentials.tsx
│   │   │   └── EstablishConnection.tsx
│   │   │
│   │   └── shared/                         # Reusable atoms
│   │       ├── AnimatedCounter.tsx
│   │       ├── StatusDot.tsx
│   │       ├── TerminalLog.tsx
│   │       ├── SectionHeader.tsx
│   │       ├── SkillNode.tsx
│   │       ├── ProjectCard.tsx
│   │       ├── CertificateModal.tsx
│   │       └── DataFlowDiagram.tsx
│   │
│   ├── routes/                             # TanStack Router
│   │   ├── __root.tsx
│   │   ├── index.tsx
│   │   └── api/
│   │       └── contact.ts                  [NEW] server function
│   │
│   ├── data/                               # Content (Model layer)
│   │   ├── profile.ts
│   │   ├── experience.ts
│   │   ├── skills.ts
│   │   ├── projects.ts
│   │   ├── certifications.ts
│   │   ├── education.ts
│   │   └── careerStory.ts
│   │
│   ├── types/                              # Global types
│   │   ├── content.ts
│   │   ├── portfolio.ts
│   │   └── index.ts
│   │
│   ├── hooks/                              # Controllers
│   │   ├── useScrollSpy.ts
│   │   ├── useInView.ts
│   │   ├── useCountUp.ts
│   │   ├── useActiveSection.ts
│   │   └── useCertificateModal.ts
│   │
│   ├── lib/
│   │   ├── utils.ts                        # cn() helper
│   │   ├── animations.ts                   # Framer Motion variants
│   │   ├── constants.ts
│   │   └── seo.ts
│   │
│   ├── services/                           [NEW]
│   │   ├── contact.service.ts
│   │   └── analytics.service.ts
│   │
│   ├── styles/
│   │   └── globals.css                     # Tailwind + tokens
│   │
│   └── router.tsx                          # Router instance
│
├── .env.example                            [NEW]
├── .gitignore                              [EXISTING]
├── .prettierignore                         [EXISTING]
├── .prettierrc                             [EXISTING]
├── AGENTS.md                               [EXISTING]
├── README.md                               [EXISTING]
├── bun.lock                                [EXISTING]
├── bunfig.toml                             [EXISTING]
├── components.json                         [EXISTING]
├── eslint.config.js                        [EXISTING]
├── netlify.toml                            [NEW]
├── package.json                            [EXISTING]
├── tailwind.config.ts                      [NEW — verify if exists]
├── tsconfig.json                           [EXISTING]
└── vite.config.ts                          [EXISTING]
```

---

## 3. Complete Architecture Overview

The portfolio follows a **4-tier layered architecture**:

```
┌─────────────────────────────────────────────────────────────┐
│  TIER 1 — PRESENTATION (View)                               │
│  React components, Tailwind styling, shadcn/ui primitives   │
│  → What the user sees and interacts with                    │
├─────────────────────────────────────────────────────────────┤
│  TIER 2 — APPLICATION (Controller)                          │
│  Hooks, loaders, event handlers, router                     │
│  → Orchestrates data + UI, handles user interactions        │
├─────────────────────────────────────────────────────────────┤
│  TIER 3 — DOMAIN (Model)                                    │
│  TypeScript types, data files, business rules               │
│  → Pure content + shape definitions, framework-agnostic     │
├─────────────────────────────────────────────────────────────┤
│  TIER 4 — INFRASTRUCTURE                                    │
│  Server functions, Netlify, contact API, analytics, SEO     │
│  → External systems, network, deployment                    │
└─────────────────────────────────────────────────────────────┘
```

### 3.1 Why This Layering?

| Benefit | Explanation |
|---|---|
| **Testability** | Domain layer has zero React deps — easy unit tests |
| **Reusability** | Content types are usable in CLI scripts, sitemaps, RSS |
| **Replaceability** | Swap Netlify → Vercel by touching only Tier 4 |
| **Onboarding** | New devs know exactly where each concern lives |
| **SSR-safe** | Domain + infra cleanly split; no hydration mismatches |

---

## 4. Layered Architecture Diagram

```
                    ┌──────────────────────┐
                    │      USER (Browser)  │
                    └──────────┬───────────┘
                               │ HTTP
                               ▼
        ┌──────────────────────────────────────────────┐
        │           NETLIFY CDN (Edge)                 │
        └──────────┬───────────────────────────────────┘
                   │
                   ▼
    ┌────────────────────────────────────────────────────┐
    │  TANSTACK START SERVER (Node runtime)              │
    │  ┌──────────────────────────────────────────────┐  │
    │  │  Route Loader (Controller)                    │  │
    │  │  → imports data from src/data/*              │  │
    │  └──────────────┬───────────────────────────────┘  │
    │                 │                                   │
    │                 ▼                                   │
    │  ┌──────────────────────────────────────────────┐  │
    │  │  SSR Renderer                                 │  │
    │  │  → React tree → HTML string                   │  │
    │  └──────────────┬───────────────────────────────┘  │
    └─────────────────┼──────────────────────────────────┘
                      │ HTML + hydration bundle
                      ▼
    ┌────────────────────────────────────────────────────┐
    │  CLIENT (React)                                    │
    │  ┌──────────────────────────────────────────────┐  │
    │  │  View: <Hero/>, <AboutSystem/>, ...          │  │
    │  │  ↑ props                                     │  │
    │  │  Controller: useCountUp, useInView, hooks    │  │
    │  │  ↑ data                                      │  │
    │  │  Model: types + data files                   │  │
    │  └──────────────────────────────────────────────┘  │
    └────────────────────────────────────────────────────┘
                      │ fetch / POST
                      ▼
    ┌────────────────────────────────────────────────────┐
    │  SERVER FUNCTIONS (createServerFn)                 │
    │  → /api/contact                                    │
    │  → optional: /api/analytics                        │
    └────────────────────────────────────────────────────┘
                      │
                      ▼
    ┌────────────────────────────────────────────────────┐
    │  EXTERNAL SERVICES                                 │
    │  Email (Resend/Formspree), Analytics (Plausible)   │
    └────────────────────────────────────────────────────┘
```

---

## 5. Model–View–Controller (MVC) Mapping

Because React doesn't have a built-in MVC, we adapt it. Here's how the portfolio's concerns map:

| MVC Role | In this project | Files |
|---|---|---|
| **Model** | Pure data + TypeScript types + validation rules | `src/data/*`, `src/types/*` |
| **View** | React components + Tailwind + shadcn/ui | `src/components/**` |
| **Controller** | Hooks, route loaders, event handlers, server functions | `src/hooks/*`, `src/routes/*`, `src/services/*` |

### 5.1 The MVC Flow for a Section Render

```
    User scrolls to "About System"
              │
              ▼
    ┌─────────────────────────────┐
    │  VIEW: <AboutSystem />      │   ← src/components/sections/AboutSystem.tsx
    │  Renders structure          │
    └──────────┬──────────────────┘
               │ uses
               ▼
    ┌─────────────────────────────┐
    │  CONTROLLER: useCountUp()   │   ← src/hooks/useCountUp.ts
    │  Manages animation state    │
    └──────────┬──────────────────┘
               │ reads
               ▼
    ┌─────────────────────────────┐
    │  MODEL: stats[]             │   ← src/data/profile.ts
    │  { value, label, icon }     │
    └─────────────────────────────┘
```

### 5.2 MVC Mapping Per Feature

| Feature | Model | View | Controller |
|---|---|---|---|
| Hero | `profile.ts` | `Hero.tsx` | — (static) |
| About System | `profile.ts` (stats) | `AboutSystem.tsx` | `useCountUp`, `useInView` |
| Professional Journey | `experience.ts` | `ProfessionalJourney.tsx` | `useInView` (log reveals) |
| Capability Matrix | `skills.ts` | `CapabilityMatrix.tsx` | `useInView` |
| Project Archive | `projects.ts` | `ProjectArchive.tsx`, `ProjectCard.tsx` | — |
| Credentials | `certifications.ts`, `education.ts` | `Credentials.tsx`, `CertificateModal.tsx` | `useCertificateModal` |
| Contact | `types/contact.ts` | `EstablishConnection.tsx` | `contact.service.ts` + server fn |

### 5.3 MVC Folder Structure

```
src/
├── types/         ← MODEL (shapes)
├── data/          ← MODEL (content)
├── components/    ← VIEW
├── hooks/         ← CONTROLLER
├── services/      ← CONTROLLER (I/O)
└── routes/        ← CONTROLLER (routing + loaders)
```

---

## 6. Alternative: Feature-Sliced Architecture

If the portfolio grows (blog, case studies, multi-page), consider **Feature-Sliced Design (FSD)**:

```
src/
├── app/                     # App-wide setup (providers, router)
├── pages/                   # Route-level compositions
│   └── home/
├── widgets/                 # Large composite blocks
│   ├── hero/
│   ├── journey/
│   └── projects/
├── features/                # User actions
│   ├── contact-form/
│   └── certificate-preview/
├── entities/                # Business entities
│   ├── project/
│   ├── certification/
│   └── experience/
└── shared/                  # Reusable primitives
    ├── ui/
    ├── lib/
    └── config/
```

**When to migrate:** Once you exceed ~10 sections or add multiple routes.

---

## 7. Data Flow Diagrams (DFD)

### 7.1 Level 0 — Context Diagram

Shows the system as a single process interacting with external entities.

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
        │ (Resend/Forms) │
        └────────────────┘

        ┌────────────────┐
        │  Netlify CDN   │ ◄─── static assets ──── RC-Portfolio
        └────────────────┘
```

### 7.2 Level 1 — Major Processes

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
   │ (counters, logs) │                  │ (modal preview)  │
   └──────────────────┘                  └────────┬─────────┘
                                                  │
                                                  ▼
                                         ┌──────────────────┐
                                         │ D2: Cert Images  │
                                         │ (public/certs)   │
                                         └──────────────────┘

   ┌──────────────┐
   │  Recruiter   │
   └──────┬───────┘
          │ submit form
          ▼
   ┌──────────────────────┐      ┌─────────────────────┐
   │ P4: Handle Contact   │◄────►│ D3: Message Store   │
   │ (server function)    │      │ (email/log)         │
   └──────┬───────────────┘      └─────────────────────┘
          │
          ▼
   ┌──────────────────┐
   │ Email Service    │
   └──────────────────┘
```

### 7.3 Level 2 — P1 "Serve Portfolio" Expanded

```
   HTTP GET /
        │
        ▼
   ┌────────────────────────┐
   │ 1.1 Route Match        │
   │ (TanStack Router)      │
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
   │ (React → HTML string)  │
   └──────────┬─────────────┘
              ▼
   ┌────────────────────────┐
   │ 1.4 Inject <head>      │
   │ (title, meta, OG)      │
   └──────────┬─────────────┘
              ▼
   ┌────────────────────────┐
   │ 1.5 Stream HTML        │
   │ to browser             │
   └──────────┬─────────────┘
              ▼
   ┌────────────────────────┐
   │ 1.6 Hydrate React      │
   │ (client-side)          │
   └──────────┬─────────────┘
              ▼
   ┌────────────────────────┐
   │ 1.7 Trigger animations │
   │ (counters, reveals)    │
   └────────────────────────┘
```

### 7.4 Level 2 — P4 "Handle Contact" Expanded

```
   User fills form → POST /api/contact
        │
        ▼
   ┌────────────────────────┐
   │ 4.1 Validate payload   │
   │ (zod schema)           │
   └──────────┬─────────────┘
              │ valid?
              ├── no → return 400 + errors
              │
              ▼ yes
   ┌────────────────────────┐
   │ 4.2 Rate limit check   │
   │ (IP-based)             │
   └──────────┬─────────────┘
              │
              ▼
   ┌────────────────────────┐
   │ 4.3 Honeypot check     │
   │ (anti-spam)            │
   └──────────┬─────────────┘
              │
              ▼
   ┌────────────────────────┐
   │ 4.4 Send email         │
   │ (Resend API)           │
   └──────────┬─────────────┘
              │
              ▼
   ┌────────────────────────┐
   │ 4.5 Log / store        │
   └──────────┬─────────────┘
              │
              ▼
   Return 200 { success: true }
```

---

## 8. Entity-Relationship (ER) Model for Content

Although the portfolio has no database, the content entities still have relationships worth modeling.

### 8.1 ER Diagram

```
┌──────────────────┐          ┌──────────────────┐
│     PROFILE      │          │     PROJECT      │
├──────────────────┤          ├──────────────────┤
│ PK id            │          │ PK id            │
│    name          │          │    code (PRJ_XX) │
│    role          │          │    title         │
│    tagline       │          │    description   │
│    location      │          │    tech[]        │
│    status        │          │    demoUrl       │
│    focus         │          │ FK profileId     │
│    bio           │          └────────┬─────────┘
└────────┬─────────┘                   │
         │                             │
         │ 1                          *│
         │                             │
         │                             │ uses
         │                             ▼
         │                    ┌──────────────────┐
         │                    │      SKILL       │
         │                    ├──────────────────┤
         │                    │ PK id            │
         │                    │    name          │
         │                    │    category      │
         │                    └──────────────────┘
         │
         │ 1
         │
         ├──────────────────────────┐
         │                          │
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

         │ 1
         │
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

### 8.2 Relationship Summary

| Relationship | Cardinality | Meaning |
|---|---|---|
| Profile → Experience | 1 : N | One person, many jobs |
| Profile → Certification | 1 : N | One person, many certs |
| Profile → Education | 1 : N | One person, many degrees |
| Profile → Project | 1 : N | One person, many projects |
| Project ↔ Skill | N : M | Projects use many skills; skills appear in many projects |
| Experience ↔ Skill | N : M | Jobs teach many skills; skills appear in many jobs |

---

## 9. Use Case Diagram + Specifications

### 9.1 Use Case Diagram

```
              ┌─────────────────────────────────────────────┐
              │            RC-Portfolio System              │
              │                                             │
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
              │                                             │
              └─────────────┬───────────────────────────────┘
                            │
        ┌───────────────────┼────────────────────┐
        │                   │                    │
        ▼                   ▼                    ▼
   ┌─────────┐        ┌──────────┐        ┌───────────┐
   │ Visitor │        │Recruiter │        │Developer  │
   └─────────┘        └──────────┘        └───────────┘
```

### 9.2 Use Case Specifications

#### UC1 — View Hero

| Field | Value |
|---|---|
| **Actor** | Visitor, Recruiter, Developer |
| **Goal** | Instantly understand who the site belongs to and what they do |
| **Trigger** | Page loads |
| **Preconditions** | None |
| **Postconditions** | Hero section is rendered and animated in |
| **Main flow** | 1. Page loads → 2. SSR renders Hero → 3. Client hydrates → 4. Status "SYSTEM ONLINE" pulses → 5. Scroll indicator bounces |
| **Alternate flow** | Reduced motion → static render, no pulse |
| **Exceptions** | JS disabled → SSR HTML still visible |

#### UC6 — Preview Certificate

| Field | Value |
|---|---|
| **Actor** | Recruiter, Visitor |
| **Goal** | Verify a certification by viewing the original image |
| **Trigger** | Click on certification card |
| **Preconditions** | Certificate exists in `public/certificates/` |
| **Postconditions** | Modal opens showing full JPG |
| **Main flow** | 1. Click card → 2. `useCertificateModal` sets active cert → 3. `<Dialog>` opens → 4. Image loads → 5. User closes |
| **Alternate flow** | Press Esc → modal closes; click backdrop → modal closes |
| **Exceptions** | Image 404 → show placeholder + alt text |

#### UC10 — Submit Contact Form

| Field | Value |
|---|---|
| **Actor** | Recruiter, Visitor |
| **Goal** | Send a message to Ramananda |
| **Trigger** | Click "Send" after filling form |
| **Preconditions** | Form fields valid |
| **Postconditions** | Email sent; user sees confirmation |
| **Main flow** | 1. Fill name/email/message → 2. Click Send → 3. Client validates → 4. POST `/api/contact` → 5. Server validates with zod → 6. Honeypot check → 7. Resend API sends email → 8. Return 200 → 9. Show success toast |
| **Alternate flow** | Validation fails → inline errors shown |
| **Exceptions** | Network error → retry prompt; rate-limited → "Try again later" |

#### UC3 — Explore Journey

| Field | Value |
|---|---|
| **Actor** | Recruiter |
| **Goal** | Understand career progression |
| **Trigger** | Scroll to Module 02 |
| **Preconditions** | Experience data loaded |
| **Postconditions** | Timeline visible with all records |
| **Main flow** | 1. User scrolls → 2. `useInView` fires → 3. Records fade in sequentially → 4. Data flow diagram animates → 5. Log lines typewriter-reveal |
| **Alternate flow** | Reduced motion → instant reveal |

---

## 10. Sequence Diagrams

### 10.1 Page Load Sequence

```
 Visitor        Browser         Netlify       TanStack Start      React Client
    │              │                │               │                   │
    │──GET /──────►│                │               │                   │
    │              │──forward──────►│               │                   │
    │              │                │──route match─►│                   │
    │              │                │               │──import data      │
    │              │                │               │  (src/data/*)     │
    │              │                │               │──render to HTML   │
    │              │                │◄──HTML────────│                   │
    │              │◄──HTML+JS──────│               │                   │
    │◄──paint──────│                │               │                   │
    │              │──hydrate───────────────────────────────────────────►│
    │              │                │               │            attach │
    │              │                │               │            listeners
    │              │──scroll────────────────────────────────────────────►│
    │              │                │               │       useInView → │
    │              │                │               │       trigger anim│
```

### 10.2 Certificate Preview Sequence

```
 User      Credentials      useCertificateModal      Dialog       Image
   │           │                   │                    │            │
   │─click────►│                   │                    │            │
   │           │─open(certId)─────►│                    │            │
   │           │                   │─setActive(cert)───►│            │
   │           │                   │                    │─mount──────►│
   │           │                   │                    │            │─load
   │           │                   │                    │◄──img data─│
   │           │                   │                    │─render────►│
   │◄───────────────────────────modal visible────────────────────────│
   │─press Esc►│                   │                    │            │
   │           │                   │◄─onClose───────────│            │
   │           │                   │─setActive(null)───►│            │
   │           │                   │                    │─unmount───►│
   │◄───────────────────────────modal closed─────────────────────────│
```

### 10.3 Contact Form Sequence

```
 User      Form         Validator      Server Fn        Resend      Inbox
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

## 11. State Machine Diagrams

### 11.1 Counter Animation State

```
        ┌─────────┐
        │  IDLE   │  (initial)
        └────┬────┘
             │ useInView fires
             ▼
        ┌─────────┐
        │ RUNNING │  (0 → target)
        └────┬────┘
             │ reach target
             ▼
        ┌─────────┐
        │  DONE   │  (displays final)
        └─────────┘

   Edge case: prefers-reduced-motion → IDLE → DONE (instant)
```

### 11.2 Certificate Modal State

```
        ┌─────────┐
        │ CLOSED  │
        └────┬────┘
             │ click cert
             ▼
        ┌─────────┐
        │ LOADING │  (image fetching)
        └────┬────┘
             │
        ┌────┴────┐
        │         │
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

### 11.3 Contact Form State

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
       │    │
    ok │    │ invalid
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
      │ reset
      ▼
   ┌───────┐
   │ EMPTY │
   └───────┘
```

### 11.4 Route State

```
   ┌──────────┐
   │ LOADING  │  (loader running)
   └────┬─────┘
        │
   ┌────┴────┐
   │         │
   ▼         ▼
┌────────┐ ┌─────────┐
│LOADED  │ │ ERROR   │
└────────┘ └─────────┘
```

---

## 12. Component Hierarchy (React Tree)

```
<RootLayout>                         src/routes/__root.tsx
 │
 ├── <head>                          # TanStack Start head API
 │    ├── <title>
 │    ├── <meta description>
 │    ├── <meta og:*>
 │    └── <link canonical>
 │
 ├── <Navbar />                      src/components/layout/Navbar.tsx
 │    └── <NavItem /> × 6
 │
 └── <IndexRoute />                  src/routes/index.tsx
      │
      ├── <Hero />                   src/components/sections/Hero.tsx
      │    ├── <StatusBadge />
      │    ├── <h1>{name}</h1>
      │    ├── <p>{bio}</p>
      │    ├── <MetaRow /> × 3
      │    └── <ScrollIndicator />
      │
      ├── <AboutSystem />            src/components/sections/AboutSystem.tsx
      │    ├── <SectionHeader module="01" />
      │    ├── <IdentityRecord />
      │    ├── <StatsGrid>
      │    │    └── <AnimatedCounter /> × 3
      │    └── <DomainCards>
      │         └── <DomainCard /> × 4
      │
      ├── <ProfessionalJourney />    src/components/sections/ProfessionalJourney.tsx
      │    ├── <SectionHeader module="02" />
      │    ├── <RecordCard /> × 2
      │    │    ├── <RecordHeader />
      │    │    ├── <DataFlowDiagram />
      │    │    ├── <SkillTags />
      │    │    └── <TerminalLog /> × 5
      │    ├── <NextObjective />
      │    ├── <CareerHUD />
      │    └── <CareerStory />
      │
      ├── <CapabilityMatrix />       src/components/sections/CapabilityMatrix.tsx
      │    ├── <SectionHeader module="03" />
      │    ├── <StatusBar />
      │    └── <SkillModules>
      │         └── <SkillModule /> × 4
      │              └── <SkillNode /> × 6/4/6/8
      │
      ├── <ProjectArchive />         src/components/sections/ProjectArchive.tsx
      │    ├── <SectionHeader module="04" />
      │    └── <ProjectGrid>
      │         └── <ProjectCard /> × 5
      │              ├── <Thumbnail />
      │              ├── <Title />
      │              ├── <Description />
      │              ├── <TechTags />
      │              └── <CardLinks />
      │
      ├── <Credentials />            src/components/sections/Credentials.tsx
      │    ├── <SectionHeader module="05" />
      │    ├── <CertGrid>
      │    │    └── <CertCard /> × 9
      │    ├── <CertificateModal />  (portal)
      │    └── <AcademicFoundation>
      │         └── <EducationCard /> × 3
      │
      └── <EstablishConnection />    src/components/sections/EstablishConnection.tsx
           ├── <SectionHeader module="06" />
           ├── <TerminalPrompt />
           ├── <ContactForm />       (NEW — if missing)
           └── <StatusPanel />
                ├── ConnectionStatus
                ├── MessageChannel
                └── Location

<Footer />                            src/components/layout/Footer.tsx
```

---

## 13. Routing Map (TanStack Router)

### 13.1 File-Based Route Table

| File | URL | Purpose |
|---|---|---|
| `src/routes/__root.tsx` | — | Root layout wrapper |
| `src/routes/index.tsx` | `/` | Portfolio home (single page) |
| `src/routes/api/contact.ts` | `/api/contact` | Contact form server endpoint |

### 13.2 Optional Future Routes

| File | URL | Purpose |
|---|---|---|
| `src/routes/projects.tsx` | `/projects` | Full project list |
| `src/routes/projects/$id.tsx` | `/projects/:id` | Project case study |
| `src/routes/blog.tsx` | `/blog` | Writing index |
| `src/routes/blog/$slug.tsx` | `/blog/:slug` | Blog post |
| `src/routes/uses.tsx` | `/uses` | Tools & setup |
| `src/routes/now.tsx` | `/now` | Current focus |

### 13.3 Route Composition

```tsx
// src/routes/__root.tsx
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const Route = createRootRoute({
  component: RootLayout,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Ramananda Chakraborty — CS Engineer & React Developer' },
      { name: 'description', content: 'Portfolio of Ramananda Chakraborty...' },
    ],
    links: [
      { rel: 'canonical', href: 'https://ramananda-portfolio.netlify.app/' },
    ],
  }),
});

function RootLayout() {
  return (
    <>
      <Navbar />
      <main><Outlet /></main>
      <Footer />
    </>
  );
}
```

---

## 14. Full Code — Data Layer (Model)

### 14.1 `src/types/content.ts`

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
  code: string;          // "RECORD_01"
  company: string;
  role: string;
  startDate: string;     // ISO
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
  code: string;          // "PRJ_01"
  title: string;
  description: string;
  tech: string[];
  demoUrl?: string;
  repoUrl?: string;
  thumbnail?: string;
  featured?: boolean;
}

export interface Certification {
  id: string;
  issuer: string;
  title?: string;        // optional but recommended
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

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export interface Domain {
  title: string;
  description: string;
  icon?: string;
}
```

### 14.2 `src/data/profile.ts`

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

### 14.3 `src/data/experience.ts`

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

### 14.4 `src/data/skills.ts`

```ts
import type { Skill } from '@/types/content';

export const skills: Skill[] = [
  // Frontend
  { id: 'html', name: 'HTML5', category: 'frontend', familiarity: 'strong' },
  { id: 'css', name: 'CSS3', category: 'frontend', familiarity: 'strong' },
  { id: 'js', name: 'JavaScript ES6+', category: 'frontend', familiarity: 'strong' },
  { id: 'react', name: 'React.js', category: 'frontend', familiarity: 'strong' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', familiarity: 'strong' },
  { id: 'bootstrap', name: 'Bootstrap', category: 'frontend', familiarity: 'working' },
  // Backend / DB
  { id: 'sql', name: 'SQL', category: 'backend', familiarity: 'working' },
  { id: 'rest', name: 'REST APIs', category: 'backend', familiarity: 'working' },
  { id: 'firebase', name: 'Firebase', category: 'backend', familiarity: 'working' },
  { id: 'node', name: 'Node.js', category: 'backend', familiarity: 'familiar' },
  // Data Science
  { id: 'python', name: 'Python', category: 'data', familiarity: 'working' },
  { id: 'numpy', name: 'NumPy', category: 'data', familiarity: 'working' },
  { id: 'pandas', name: 'Pandas', category: 'data', familiarity: 'working' },
  { id: 'matplotlib', name: 'Matplotlib', category: 'data', familiarity: 'working' },
  { id: 'seaborn', name: 'Seaborn', category: 'data', familiarity: 'working' },
  { id: 'sklearn', name: 'Scikit-learn', category: 'data', familiarity: 'working' },
  // CS Core
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

### 14.5 `src/data/projects.ts`

```ts
import type { Project } from '@/types/content';

export const projects: Project[] = [
  {
    id: 'luxury-calculator',
    code: 'PRJ_01',
    title: 'Luxury Calculator',
    description: 'A premium-styled calculator interface focused on clean layout, precise interaction states and a polished visual finish.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: '#',
  },
  {
    id: 'currency-converter',
    code: 'PRJ_02',
    title: 'Global Currency Converter',
    description: 'Currency conversion tool powered by live exchange-rate data with a fast, simple conversion flow.',
    tech: ['JavaScript', 'REST API'],
    demoUrl: '#',
  },
  {
    id: 'weather-definer',
    code: 'PRJ_03',
    title: 'WeatherDefiner',
    description: 'Weather lookup application presenting current conditions for a searched location in a compact dashboard.',
    tech: ['JavaScript', 'Weather API'],
    demoUrl: '#',
  },
  {
    id: 'netflix-clone',
    code: 'PRJ_04',
    title: 'Netflix Clone',
    description: 'Front-end recreation of a streaming platform landing experience, built to practice responsive layout and component structure.',
    tech: ['HTML', 'CSS'],
    repoUrl: '#',
  },
  {
    id: 'amazon-clone',
    code: 'PRJ_05',
    title: 'Amazon Clone',
    description: 'E-commerce interface clone focused on grid layouts, navigation structure and responsive product presentation.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    repoUrl: '#',
  },
];
```

### 14.6 `src/data/certifications.ts` + `education.ts`

```ts
// certifications.ts
import type { Certification } from '@/types/content';

export const certifications: Certification[] = [
  { id: 'bitm', issuer: 'BITM — BASIS Institute of Technology & Management', issueDate: '2026-02', duration: '66 Hours', imageUrl: '/certificates/bitm.jpg' },
  { id: 'meta', issuer: 'Meta — via Coursera', issueDate: '2024-11', imageUrl: '/certificates/meta-coursera.jpg' },
  { id: 'opswat', issuer: 'OPSWAT Academy', issueDate: '2025-06', imageUrl: '/certificates/opswat.jpg' },
  { id: '365-1', issuer: '365 Data Science', issueDate: '2026-03', imageUrl: '/certificates/365-ds-1.jpg' },
  { id: '365-2', issuer: '365 Data Science', issueDate: '2026-03', imageUrl: '/certificates/365-ds-2.jpg' },
  { id: 'cisco', issuer: 'Cisco Networking Academy', issueDate: '2025-11', imageUrl: '/certificates/cisco.jpg' },
  { id: 'hp-1', issuer: 'HP LIFE — HP Foundation', issueDate: '2025-09', imageUrl: '/certificates/hp-life-1.jpg' },
  { id: 'hp-2', issuer: 'HP LIFE — HP Foundation', issueDate: '2025-06', imageUrl: '/certificates/hp-life-2.jpg' },
  { id: '365-3', issuer: '365 Data Science', issueDate: '2025-11', imageUrl: '/certificates/365-ds-3.jpg' },
];
```

```ts
// education.ts
import type { Education } from '@/types/content';

export const education: Education[] = [
  { id: 'bsc', degree: 'BSc in Computer Science & Engineering', institution: 'Dhaka City College — National University', year: '2025', result: 'CGPA 3.60 / 4.00' },
  { id: 'hsc', degree: 'HSC — Science', institution: 'Govt. Hazi Asmat College', year: '2019', result: 'GPA 4.00 / 5.00' },
  { id: 'ssc', degree: 'SSC — Science', institution: 'Kuliarchar Govt. High School', year: '2016', result: 'GPA 5.00 / 5.00' },
];
```

---

## 15. Full Code — Model Layer Helpers

### 15.1 `src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function groupBy<T, K extends keyof T>(arr: T[], key: K): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const k = String(item[key]);
    (acc[k] ||= []).push(item);
    return acc;
  }, {} as Record<string, T[]>);
}
```

### 15.2 `src/lib/animations.ts`

```ts
import type { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const logReveal: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.15, duration: 0.3 },
  }),
};
```

### 15.3 `src/lib/seo.ts`

```ts
import { profile } from '@/data/profile';

export const seo = {
  title: `${profile.name} — CS Engineer & React Developer`,
  description: `Portfolio of ${profile.name}, a ${profile.role} from ${profile.location}. Explore projects, skills, certifications, and experience in web development and AI.`,
  url: 'https://ramananda-portfolio.netlify.app/',
  ogImage: '/og-image.jpg',
  twitter: '@ramananda0',
};
```

---

## 16. Full Code — View Layer (Components)

### 16.1 `src/components/shared/AnimatedCounter.tsx` ⭐ (Fixes the bug)

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

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    let start: number | null = null;
    let raf: number;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <div ref={ref} className="text-center" aria-live="polite">
      <div className="text-4xl font-bold tabular-nums">
        {display}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
```

> **Why this fixes your bug:** The counter receives `value` as a prop. If you passed `0` (as the live site shows), that's a **data issue** — not a component issue. The fix is in `profile.ts` (see §14.2) where `value: 5` and `value: 24` are set.

### 16.2 `src/hooks/useInView.ts`

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

### 16.3 `src/hooks/useCountUp.ts`

```ts
import { useEffect, useState } from 'react';

export function useCountUp(target: number, active: boolean, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let raf: number;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setValue(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}
```

### 16.4 `src/hooks/useCertificateModal.ts`

```ts
import { useState, useCallback } from 'react';
import type { Certification } from '@/types/content';

export function useCertificateModal() {
  const [active, setActive] = useState<Certification | null>(null);

  const open = useCallback((c: Certification) => setActive(c), []);
  const close = useCallback(() => setActive(null), []);

  return { active, open, close, isOpen: active !== null };
}
```

### 16.5 `src/components/shared/StatusDot.tsx`

```tsx
import { cn } from '@/lib/utils';

interface Props {
  status: 'online' | 'offline' | 'active' | 'completed' | 'ready';
  label?: string;
  className?: string;
}

const colorMap: Record<Props['status'], string> = {
  online: 'bg-emerald-400',
  active: 'bg-emerald-400',
  completed: 'bg-zinc-400',
  ready: 'bg-cyan-400',
  offline: 'bg-zinc-600',
};

export function StatusDot({ status, label, className }: Props) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)} role="status">
      <span
        className={cn('h-2 w-2 rounded-full animate-pulse', colorMap[status])}
        aria-hidden="true"
      />
      {label && <span className="text-xs uppercase tracking-wider">{label}</span>}
      <span className="sr-only">{label ?? status}</span>
    </span>
  );
}
```

### 16.6 `src/components/sections/Hero.tsx`

```tsx
import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { StatusDot } from '@/components/shared/StatusDot';
import { fadeUp } from '@/lib/animations';

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div variants={fadeUp} initial="hidden" animate="visible" className="max-w-3xl text-center">
        <StatusDot status="online" label="System Online" className="mb-6" />

        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
          System Profile
        </p>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-3">
          {profile.name}
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          {profile.role}
        </p>

        <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {profile.bio}
        </p>

        <dl className="grid grid-cols-3 gap-6 mt-12 max-w-md mx-auto text-sm">
          <div>
            <dt className="text-muted-foreground">Status</dt>
            <dd className="font-medium">Online</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Role</dt>
            <dd className="font-medium">CS Engineer</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Focus</dt>
            <dd className="font-medium">Software / AI</dd>
          </div>
        </dl>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        className="absolute bottom-10 text-xs tracking-widest text-muted-foreground"
      >
        SCROLL ↓
      </motion.div>
    </section>
  );
}
```

### 16.7 `src/components/sections/AboutSystem.tsx` ⭐ (Uses fixed counter)

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

### 16.8 `src/components/shared/SectionHeader.tsx`

```tsx
interface Props { module: string; title: string; subtitle?: string; }

export function SectionHeader({ module, title, subtitle }: Props) {
  return (
    <header className="mb-12">
      <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">
        Module {module} // {title}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="text-muted-foreground mt-3 max-w-2xl">{subtitle}</p>}
    </header>
  );
}
```

### 16.9 `src/components/shared/ProjectCard.tsx`

```tsx
import type { Project } from '@/types/content';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border border-border rounded-lg overflow-hidden group hover:border-accent transition-all">
      <div className="aspect-video bg-muted relative overflow-hidden">
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">preview_module</div>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs text-muted-foreground mb-1">{project.code}</p>
        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
        <ul className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <li key={t} className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">{t}</li>
          ))}
        </ul>
        <div className="flex gap-3 text-sm">
          {project.demoUrl && <a href={project.demoUrl} className="text-accent hover:underline">Live Demo →</a>}
          {project.repoUrl && <a href={project.repoUrl} className="text-accent hover:underline">Repository →</a>}
        </div>
      </div>
    </article>
  );
}
```

### 16.10 `src/components/shared/CertificateModal.tsx`

```tsx
import * as Dialog from '@radix-ui/react-dialog';
import type { Certification } from '@/types/content';

interface Props {
  cert: Certification | null;
  open: boolean;
  onClose: () => void;
}

export function CertificateModal({ cert, open, onClose }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-4xl w-full z-50 p-4">
          <Dialog.Title className="sr-only">{cert?.issuer ?? 'Certificate'}</Dialog.Title>
          <Dialog.Description className="sr-only">Certificate preview</Dialog.Description>
          {cert && (
            <img src={cert.imageUrl} alt={`${cert.issuer} certificate`} className="w-full rounded-lg" />
          )}
          <Dialog.Close className="absolute -top-2 -right-2 bg-background rounded-full p-2">✕</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

---

## 17. Full Code — Controller Layer (Loaders + Route)

### 17.1 `src/routes/index.tsx`

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

> ⚠️ **Note:** The `head` config above references `og:image` — you must add `public/og-image.jpg`.

---

## 18. Full Code — Server Function (Contact)

### 18.1 `src/routes/api/contact.ts`

```ts
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  // honeypot — bots fill it, humans don't
  website: z.string().max(0).optional(),
});

export const submitContact = createServerFn({ method: 'POST' })
  .validator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    // Honeypot
    if (data.website) {
      return { success: true }; // silently accept, do nothing
    }

    // TODO: rate limiting (upstash/ratelimit, or IP check)
    // TODO: send email via Resend
    // await resend.emails.send({ from: 'portfolio@...', to: '...', ... });

    console.log('[contact] new message:', { name: data.name, email: data.email });

    return { success: true };
  });
```

### 18.2 `src/components/sections/EstablishConnection.tsx`

```tsx
import { useState } from 'react';
import { submitContact } from '@/routes/api/contact';
import { StatusDot } from '@/components/shared/StatusDot';
import { SectionHeader } from '@/components/shared/SectionHeader';

export function EstablishConnection() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    const fd = new FormData(e.currentTarget);
    try {
      await submitContact({
        data: {
          name: String(fd.get('name') ?? ''),
          email: String(fd.get('email') ?? ''),
          message: String(fd.get('message') ?? ''),
          website: String(fd.get('website') ?? ''),
        },
      });
      setState('sent');
      e.currentTarget.reset();
    } catch {
      setState('error');
    }
  }

  return (
    <section id="contact" className="py-24 px-6 max-w-3xl mx-auto">
      <SectionHeader module="06" title="«ESTABLISH_CONNECTION()»" subtitle="Open a channel — collaboration, opportunities, or a simple hello." />

      <p className="font-mono text-xs text-muted-foreground mb-6">rc@core:~/contact</p>

      <form onSubmit={handleSubmit} className="space-y-4 mb-12">
        {/* honeypot */}
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <input name="name" required minLength={2} placeholder="Your name" className="w-full bg-transparent border border-border rounded px-4 py-3 focus:border-accent outline-none" />
        <input name="email" type="email" required placeholder="your@email.com" className="w-full bg-transparent border border-border rounded px-4 py-3 focus:border-accent outline-none" />
        <textarea name="message" required minLength={10} rows={5} placeholder="Your message..." className="w-full bg-transparent border border-border rounded px-4 py-3 focus:border-accent outline-none resize-none" />

        <button type="submit" disabled={state === 'sending'} className="px-6 py-3 bg-accent text-accent-foreground rounded font-medium disabled:opacity-50">
          {state === 'sending' ? 'Transmitting…' : 'Send Signal'}
        </button>

        {state === 'sent' && <p className="text-emerald-400 text-sm">Signal received. I'll respond soon.</p>}
        {state === 'error' && <p className="text-red-400 text-sm">Transmission failed. Try again or email me directly.</p>}
      </form>

      <dl className="grid grid-cols-3 gap-4 text-sm border border-border rounded-lg p-6">
        <div>
          <dt className="text-muted-foreground">Connection</dt>
          <dd><StatusDot status="ready" label="Ready" /></dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Channel</dt>
          <dd><StatusDot status="online" label="Online" /></dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Location</dt>
          <dd>Dhaka, BD</dd>
        </div>
      </dl>
    </section>
  );
}
```

---

## 19. Root Layout

### `src/routes/__root.tsx`

```tsx
import { createRootRoute, Outlet } from '@tanstack/react-router';
import '@/styles/globals.css';

export const Route = createRootRoute({
  component: () => (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-background focus:px-4 focus:py-2 focus:rounded">Skip to content</a>
      <main id="main">
        <Outlet />
      </main>
    </>
  ),
});
```

---

## 20. Tailwind Theme / Design Tokens

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
    --accent: 150 100% 50%;          /* neon green */
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

### `tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        border: 'hsl(var(--border))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
} satisfies Config;
```

---

## 21. Animation Architecture

```
┌────────────────────────────────────────────────┐
│            ANIMATION PIPELINE                  │
├────────────────────────────────────────────────┤
│                                                │
│  Intersection Observer (useInView)             │
│         │                                      │
│         ▼                                      │
│  ┌──────────────────┐                          │
│  │ Trigger variants │  framer-motion           │
│  └──────┬───────────┘                          │
│         │                                      │
│    ┌────┼────────────────┐                     │
│    ▼    ▼                ▼                     │
│  fadeUp  logReveal   AnimatedCounter (RAF)     │
│    │       │              │                    │
│    └───────┴──────────────┘                    │
│              │                                 │
│              ▼                                 │
│      prefers-reduced-motion?                   │
│         ├── yes → jump to final state          │
│         └── no  → animate                      │
└────────────────────────────────────────────────┘
```

**Rules:**

- All animations must respect `prefers-reduced-motion`
- Counters must accept a `value` prop — never hardcode `0`
- Use `once: true` on scroll reveals to avoid re-triggering
- Keep durations ≤ 1.6s to avoid feeling sluggish

---

## 22. TypeScript Types (Global Recap)

Already covered in §14.1. Summary:

| Type | Purpose |
|---|---|
| `Profile` | Owner identity + stats + domains |
| `Experience` | Career record |
| `Skill` | Individual skill node |
| `Project` | Portfolio project |
| `Certification` | Credential |
| `Education` | Academic entry |
| `Stat` | Animated counter data |

---

## 23. Testing Strategy

| Layer | Tool | What to test |
|---|---|---|
| Model | Vitest | Data shape, `groupBy`, `formatDate` |
| Controller | Vitest + `@testing-library/react` | Hooks (`useCountUp`, `useInView`) |
| View | Testing Library | Render, interactions, a11y |
| E2E | Playwright | Full user flows (view → contact) |

**Example test:**

```ts
// src/hooks/useCountUp.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useCountUp } from './useCountUp';

test('counts from 0 to target', async () => {
  const { result } = renderHook(() => useCountUp(100, true, 100));
  await waitFor(() => expect(result.current).toBe(100));
});
```

---

## 24. Deployment Pipeline

```
   Developer
      │
      │ git push origin main
      ▼
   GitHub (ramananda0/RC-Portfolio)
      │
      │ webhook
      ▼
   Netlify Build
      │
      ├── bun install
      ├── bun run build   → dist/
      └── deploy to CDN
      │
      ▼
   https://ramananda-portfolio.netlify.app
```

**Also:** Any commit made in Lovable auto-syncs to GitHub, then flows through the same pipeline.

---

## 25. CI/CD Recommendations

### `.github/workflows/ci.yml`

```yaml
name: CI
on:
  pull_request:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install --frozen-lockfile
      - run: bun run lint
      - run: bunx tsc --noEmit
      - run: bun run build
```

---

## 26. Security Considerations

| Concern | Mitigation |
|---|---|
| Contact form spam | Honeypot + rate limiting |
| XSS via form input | React escapes by default; validate server-side |
| Env var leakage | Use Netlify env vars; never commit `.env` |
| Dependency vulnerabilities | `bun audit` in CI |
| Clickjacking | `X-Frame-Options: DENY` (via Netlify headers) |
| Content Security Policy | Add `_headers` file |

### `public/_headers`

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## 27. Performance Budget

| Metric | Target | Current |
|---|---|---|
| LCP | < 1.5s | TBD |
| CLS | < 0.05 | TBD |
| INP | < 150ms | TBD |
| JS bundle | < 200 KB gz | TBD |
| Total images | < 1 MB | Certificates may exceed |

**Optimizations:**

- Lazy-load certificates + project thumbnails
- Convert JPGs → WebP/AVIF
- Preconnect to Google Fonts
- Self-host fonts if possible

---

## 28. Fix Guide — The Zero Counter Bug

### Diagnosis

The `AnimatedCounter` component is fine. **The values are wrong.**

### Fix

**Step 1:** Create `src/data/profile.ts` with real stats (see §14.2).

**Step 2:** In `AboutSystem.tsx`, map over `profile.stats` (see §16.7).

**Step 3:** Verify `AnimatedCounter` receives `value` (not `0`).

**Before:**

```tsx
<AnimatedCounter value={0} label="Projects Built" />
<AnimatedCounter value={0} label="Tech Stack" />
<AnimatedCounter value={0} label="Learning Mode" />
```

**After:**

```tsx
{profile.stats.map(s => (
  <AnimatedCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
))}
```

### Verify

- [ ] Counter reaches 5+, 24+, 100%
- [ ] `aria-live="polite"` announces final value
- [ ] Reduced motion → instant final value

---

## 29. Fix Guide — Contact Section

**If no form exists:**
Follow §18.2 — add the form + server function.

**If a form exists but doesn't submit:**

1. Check `<form onSubmit={handleSubmit}>` — is `handleSubmit` defined?
2. Check the server function route — does `/api/contact` exist?
3. Check network tab — is POST firing?
4. Check Netlify function logs — any 500s?

**Minimum viable contact:**

Even without a backend, add:

```tsx
<a href="mailto:your@email.com">your@email.com</a>
```

---

## 30. Migration Checklist

To adopt this architecture:

- [ ] Create `src/data/*.ts` files (§14)
- [ ] Create `src/types/content.ts` (§14.1)
- [ ] Move components into `src/components/sections/`
- [ ] Create `src/components/shared/` for reusable atoms
- [ ] Move hooks to `src/hooks/`
- [ ] Add `src/lib/animations.ts` + `seo.ts`
- [ ] Add `src/services/contact.service.ts` (optional)
- [ ] Fix counters using real data (§28)
- [ ] Add contact form + server fn (§18)
- [ ] Add `tailwind.config.ts` with tokens (§20)
- [ ] Add `public/_headers` (§26)
- [ ] Add `netlify.toml` (§2)
- [ ] Add CI workflow (§25)
- [ ] Add alt text to all cert images
- [ ] Add `og-image.jpg`

---

## 31. Appendices

### A. Glossary

| Term | Definition |
|---|---|
| MVC | Model-View-Controller |
| SSR | Server-Side Rendering |
| DFD | Data Flow Diagram |
| ER | Entity-Relationship |
| FSD | Feature-Sliced Design |
| CVA | Class Variance Authority |
| HUD | Heads-Up Display |
| LCP | Largest Contentful Paint |
| INP | Interaction to Next Paint |
| CLS | Cumulative Layout Shift |

### B. References

- [TanStack Start Docs](https://tanstack.com/start)
- [TanStack Router](https://tanstack.com/router)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion)
- [Tailwind CSS](https://tailwindcss.com)
- [Bun](https://bun.sh)
- [Netlify](https://www.netlify.com)