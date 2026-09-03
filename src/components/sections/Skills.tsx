import { motion } from "framer-motion";
import { SKILL_GROUPS } from "@/data/portfolio";
import { Reveal, Section, TiltCard } from "@/components/fx/primitives";

function SkillNode({ label, i }: { label: string; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05, duration: 0.45 }}
      className="group/node relative flex min-w-0 max-w-full items-center gap-3 rounded-full border border-border bg-surface/50 py-2 pl-2 pr-4 transition-all duration-300 hover:border-cyan hover:shadow-[var(--glow-cyan)]"
      data-cursor
    >
      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-cyan/40 transition-transform duration-500 group-hover/node:rotate-180" />
        <span className="h-2 w-2 rounded-full bg-cyan shadow-[var(--glow-cyan)] transition-transform duration-300 group-hover/node:scale-150" />
      </span>
      <span className="min-w-0 break-words text-sm text-foreground/85 transition-colors group-hover/node:text-cyan">
        {label}
      </span>
    </motion.div>
  );
}

/** Orbital energy core visual */
function OrbitCore() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px]">
      <span className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/20 blur-3xl" />
      {[0, 1, 2].map((r) => (
        <span
          key={r}
          className={`absolute rounded-full border border-cyan/25 ${
            r === 0
              ? "inset-0 animate-spin-slow"
              : r === 1
                ? "inset-[14%] animate-spin-reverse"
                : "inset-[28%] animate-spin-slow"
          }`}
        >
          <span
            className="absolute h-2.5 w-2.5 rounded-full bg-plasma shadow-[var(--glow-plasma)]"
            style={{ top: "-5px", left: "calc(50% - 5px)" }}
          />
        </span>
      ))}
      <div className="absolute inset-[38%] flex items-center justify-center rounded-full border border-plasma/40 bg-surface/70 backdrop-blur-md">
        <span className="text-center font-mono text-[9px] uppercase tracking-[0.2em] text-cyan">
          Core
          <br />
          Online
        </span>
      </div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 200" aria-hidden>
        {[
          "M20,100 L60,60",
          "M180,100 L140,140",
          "M100,20 L140,60",
          "M100,180 L60,140",
        ].map((d) => (
          <path
            key={d}
            d={d}
            stroke="var(--cyan)"
            strokeWidth="0.8"
            fill="none"
            strokeDasharray="6 6"
            opacity="0.5"
            style={{ animation: "dash-flow 4s linear infinite" }}
          />
        ))}
      </svg>
    </div>
  );
}

export function Skills() {
  return (
    <Section
      id="skills"
      label="Module 03 // Capability Matrix"
      title={
        <>
          Tech <span className="text-gradient">Stack</span>
        </>
      }
      subtitle="Technical capabilities visualised as an active command-center matrix."
    >
      <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
        <Reveal className="order-2 lg:order-1">
             <TiltCard className="flex h-full flex-col justify-center p-4 sm:p-6" intensity={4}>
            <OrbitCore />
            <div className="mt-6 space-y-2 font-mono text-[10px] text-muted-foreground">
              <p>› CAPABILITY_MATRIX_LOADED</p>
              <p>› {SKILL_GROUPS.length} MODULES ACTIVE</p>
              <p>
                › {SKILL_GROUPS.reduce((a, g) => a + g.items.length, 0)} NODES REGISTERED
                <span className="animate-blink"> _</span>
              </p>
            </div>
          </TiltCard>
        </Reveal>

        <div className="order-1 grid gap-6 sm:grid-cols-2 lg:order-2">
          {SKILL_GROUPS.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.08}>
               <TiltCard className="h-full p-4 sm:p-6" intensity={6}>
                 <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                   <h3 className="min-w-0 break-words text-sm font-bold uppercase tracking-[0.12em] text-gradient sm:tracking-[0.18em]">
                    {g.title}
                  </h3>
                  <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground">
                    {g.code}
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {g.items.map((it, i) => (
                    <SkillNode key={it} label={it} i={i} />
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
