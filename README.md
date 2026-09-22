# RC-Portfolio

> Personal portfolio of **Ramananda Chakraborty**. Created by Ramananda Chakraborty.

[![Live Site](https://img.shields.io/badge/live-ramananda--portfolio.netlify.app-00C7B7?style=flat-square&logo=netlify)](https://ramananda-portfolio.netlify.app/)
[![Built with TanStack Start](https://img.shields.io/badge/built%20with-TanStack%20Start-FF4154?style=flat-square)](https://tanstack.com/start)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg?style=flat-square)](./LICENSE)

---

## 🖥️ Overview

A single-page, server-rendered portfolio created by **Ramananda Chakraborty** that presents him as a "system profile" — a deliberate terminal-themed metaphor that aligns with his CS engineering identity. It showcases:

- **Identity** — who Ramananda is, what he builds, and where he's heading
- **Professional Journey** — a timeline of work experience rendered as system records
- **Capability Matrix** — 24 technical skills across 4 modules
- **Project Archive** — 5 selected front-end builds
- **Credentials** — 9 certifications + 3 academic qualifications
- **Contact** — a signal channel for collaboration and opportunities

**Live:** https://ramananda-portfolio.netlify.app/

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 **Terminal / System aesthetic** | Log lines, status dots, monospace prompts |
| ⚡ **Server-side rendered (SSR)** | Fast first paint, SEO-friendly |
| 📱 **Fully responsive** | Mobile → tablet → desktop |
| ♿ **Accessible primitives** | Radix UI via shadcn/ui |
| 🎞️ **Scroll-triggered animations** | Framer Motion reveals |
| 🔢 **Animated counters** | Count-up on scroll into view |
| 📜 **Career timeline** | Reverse-chronological records |
| 🏆 **Certificate previews** | Modal-based image viewer |
| 🌗 **Reduced-motion support** | Respects `prefers-reduced-motion` |

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | [TanStack Start](https://tanstack.com/start) (full-stack React) |
| **Language** | TypeScript (strict) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **Package Manager** | [Bun](https://bun.sh/) (primary) — npm fallback supported |
| **Routing** | TanStack Router (file-based) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) (Radix-based) |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide](https://lucide.dev/) |
| **Deployment** | [Netlify](https://www.netlify.com/) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>= 20` (use [nvm](https://github.com/nvm-sh/nvm) to manage versions)
- **Bun** `>= 1.1` — [install](https://bun.sh/docs/installation)
- *(Optional)* **npm** if you prefer it over Bun

### Installation

```bash
# Clone
git clone https://github.com/ramananda0/RC-Portfolio.git
cd RC-Portfolio

# Install dependencies (Bun)
bun install

# OR with npm
npm install
```

### Development

```bash
# Start dev server (Vite + TanStack Start)
bun run dev

# → http://localhost:3000
```

### Build & Preview

```bash
# Production build
bun run build

# Preview the production build locally
bun run preview
```

### Lint & Format

```bash
bun run lint        # ESLint
bun run format      # Prettier
```

---

## 📁 Project Structure

```
RC-Portfolio/
├── public/                     # Static assets (favicon, certificates, images)
├── src/
│   ├── components/
│   │   ├── ui/                 # shadcn/ui primitives
│   │   ├── layout/             # Navbar, Footer, RootLayout
│   │   ├── sections/           # One per portfolio module
│   │   └── shared/             # Reusable atoms (Counter, StatusDot, etc.)
│   ├── data/                   # Content (profile, skills, projects, ...)
│   ├── hooks/                  # Custom React hooks (controllers)
│   ├── lib/                    # Utilities, animations, SEO
│   ├── routes/                 # TanStack Router file-based routes
│   │   ├── __root.tsx          # Root layout
│   │   ├── index.tsx           # Home page
│   │   └── api/                # Server functions
│   ├── services/               # External I/O (contact, analytics)
│   ├── styles/                 # Global CSS + Tailwind
│   └── types/                  # Global TypeScript types
├── .github/workflows/          # CI
├── netlify.toml                # Netlify config
├── components.json             # shadcn/ui config
├── tailwind.config.ts          # Tailwind theme
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite config
└── package.json
```

---

## 🏗️ Architecture

The app follows a **layered architecture** adapted to React:

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

### MVC Mapping

| Role | Location | Responsibility |
|------|----------|----------------|
| **Model** | `src/types/`, `src/data/` | Shape + content |
| **View** | `src/components/**` | Rendering |
| **Controller** | `src/hooks/`, `src/routes/` | Orchestration |

### Data Flow

```
Route loader → imports data → SSR render → hydrate → animate
```

See [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) for full DFDs, ER model, use cases, and sequence diagrams.

---

## 🎨 Design System

### Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `hsl(0 0% 4%)` | Page base |
| `--foreground` | `hsl(0 0% 96%)` | Text |
| `--muted` | `hsl(0 0% 10%)` | Cards |
| `--border` | `hsl(0 0% 15%)` | Dividers |
| `--accent` | `hsl(150 100% 50%)` | Status, links, CTAs |

### Typography

- **Sans:** Inter (headings, body)
- **Mono:** JetBrains Mono (terminal, log lines)

### Motion Rules

- All animations respect `prefers-reduced-motion`
- Scroll reveals run `once: true`
- Durations capped at 1.6s

---

## 🧩 Page Modules

| Module | Section | Component |
|--------|---------|-----------|
| — | Hero | `Hero.tsx` |
| 01 | About System | `AboutSystem.tsx` |
| 02 | Professional Journey | `ProfessionalJourney.tsx` |
| 03 | Capability Matrix | `CapabilityMatrix.tsx` |
| 04 | Project Archive | `ProjectArchive.tsx` |
| 05 | Credentials | `Credentials.tsx` |
| 06 | Establish Connection | `EstablishConnection.tsx` |

---

## 📝 Editing Content

All content lives in `src/data/` — **no need to touch components** to update text.

| File | What it controls |
|------|------------------|
| `profile.ts` | Name, role, bio, stats, domains |
| `experience.ts` | Work history records |
| `skills.ts` | Skill matrix (24 nodes) |
| `projects.ts` | Project archive cards |
| `certifications.ts` | Certificate list |
| `education.ts` | Academic entries |
| `careerStory.ts` | Narrative summary |

**Example — adding a new project:**

```ts
// src/data/projects.ts
export const projects: Project[] = [
  // ...existing
  {
    id: 'new-project',
    code: 'PRJ_06',
    title: 'New Project',
    description: 'What it does and why you built it.',
    tech: ['React', 'Tailwind'],
    demoUrl: 'https://...',
    repoUrl: 'https://github.com/...',
    thumbnail: '/projects/new-project.png',
  },
];
```

---

## 🖼️ Adding Assets

| Asset type | Location | Notes |
|------------|----------|-------|
| Certificates | `public/certificates/*.jpg` | Add alt text in `certifications.ts` |
| Project thumbnails | `public/projects/*.png` | Prefer 16:9, < 200 KB |
| OG image | `public/og-image.jpg` | 1200×630 |
| Favicon | `public/favicon.ico` | 32×32 or SVG |

---

## 🌐 Deployment

### Netlify (Automatic)

Any push to `main` triggers a Netlify build:

```
git push origin main  →  Netlify builds  →  Deploys to CDN
```

### Netlify Config (`netlify.toml`)

```toml
[build]
  command = "bun run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables

Copy `.env.example` → `.env` and fill in:

```bash
# Optional — contact form
RESEND_API_KEY=
CONTACT_TO_EMAIL=

# Optional — analytics
PLAUSIBLE_DOMAIN=
```

Set the same values in **Netlify → Site settings → Environment variables**.

---

## 🧪 Testing

```bash
# Unit tests (Vitest)
bun run test

# Type check
bunx tsc --noEmit

# Lint
bun run lint
```

---

## 🛠️ Troubleshooting

| Problem | Fix |
|---------|-----|
| `bun: command not found` | Install Bun: `curl -fsSL https://bun.sh/install \| bash` |
| Port 3000 in use | `bun run dev --port 3001` |
| Counters show `0+` | Verify `src/data/profile.ts` → `stats[].value` |
| Contact form silent | Check `src/routes/api/contact.ts` + Netlify function logs |
| Certificates not opening | Ensure files exist in `public/certificates/` |
| Build fails on Netlify | Confirm `bun.lock` is committed and `NODE_VERSION=20` |

---

## 🗺️ Roadmap

- [ ] Fix placeholder counters (`0+` → real values)
- [ ] Add visible email + social links
- [ ] Add contact form (server function)
- [ ] Add resume / CV download
- [ ] Deploy Netflix & Amazon clones
- [ ] Add alt text to all certificate images
- [ ] Add `og-image.jpg` + JSON-LD
- [ ] Add `sitemap.xml` + `robots.txt`
- [ ] Add `netlify.toml` + `_headers`
- [ ] Add CI workflow
- [ ] Add Plausible analytics
- [ ] Custom domain (e.g., `ramananda.dev`)

See [`docs/ROADMAP.md`](./docs/ROADMAP.md) for full details.

---

## 🤝 Contributing

This is the personal portfolio of **Ramananda Chakraborty**, created and maintained by him. Issues and suggestions are welcome:

1. Open an issue describing the problem or idea
2. For PRs, fork → branch → commit → push → open PR
3. Follow the existing code style (Prettier + ESLint enforced)

---

## 📄 License

[MIT](./LICENSE) © 2026 Ramananda Chakraborty

---

## 🔗 Connect

| Channel | Link |
|---------|------|
| 🌐 **Portfolio** | [ramananda-portfolio.netlify.app](https://ramananda-portfolio.netlify.app/) |
| 💻 **GitHub** | [@ramananda0](https://github.com/ramananda0) |
| 💼 **LinkedIn** | [@ramananda](https://www.linkedin.com/in/ramananda-chakraborty/) |
| 📧 **Email** | [ramananda.chakraborty0@gmail.com] |
| 📍 **Location** | Dhaka, Bangladesh |

---

<p align="center">
  <sub>Created by <strong>Ramananda Chakraborty</strong></sub><br/>
  <sub>Built with React, TanStack Start, Tailwind CSS, and a lot of curiosity.</sub><br/>
  <sub>« SYSTEM ONLINE »</sub>
</p>
