import { Brain, Code2, Cpu, Rocket } from "lucide-react";
import { STATS } from "@/data/portfolio";
import { Counter, Reveal, Section, TiltCard } from "@/components/fx/primitives";

const MODULES = [
  {
    icon: Code2,
    title: "Web Development",
    body: "Building modern, responsive interfaces with React, Tailwind CSS and clean component architecture.",
  },
  {
    icon: Brain,
    title: "AI & Data Science",
    body: "Exploring Python, data analysis and machine-learning fundamentals to work with data-driven systems.",
  },
  {
    icon: Cpu,
    title: "Computer Science Core",
    body: "Strong grounding in algorithms, operating systems, networking, architecture and OOP principles.",
  },
  {
    icon: Rocket,
    title: "Future Objective",
    body: "Growing towards full-stack software engineering while staying close to emerging AI technology.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      label="Module 01 // About System"
      title={
        <>
          About <span className="text-gradient">System</span>
        </>
      }
      subtitle="A personal system profile — who I am, what I build, and where I am heading."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <TiltCard className="h-full p-4 sm:p-9" intensity={5}>
            <p className="label-hud">Identity_Record</p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              I am{" "}
              <span className="font-semibold text-foreground">Ramananda Chakraborty</span>, a
              Computer Science Engineer from Dhaka, Bangladesh. My curiosity for technology started
              with understanding how systems work — and turned into a habit of building things that
              people can actually use.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              I focus on modern web development with React, and I keep expanding into Python, data
              analysis and artificial intelligence fundamentals. I currently work as an intern in
              the Technology Unit at BRAC International, converting academic knowledge into
              real-world professional practice.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              My long-term direction is software engineering — full-stack development supported by
              a solid computer-science foundation and continuous learning.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:grid-cols-4 sm:gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="rounded-lg border border-border bg-surface/40 p-3">
                  <Counter
                    value={s.value}
                    className="block font-display text-xl font-bold text-gradient sm:text-2xl"
                  />
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </TiltCard>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {MODULES.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.08}>
              <TiltCard className="h-full p-4 sm:p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan/30 bg-cyan/10 text-cyan shadow-[var(--glow-cyan)]">
                  <m.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold uppercase tracking-wider">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
