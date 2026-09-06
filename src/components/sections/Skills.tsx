import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { FaCss3Alt } from "react-icons/fa6";
import {
  LuBinary,
  LuBrainCircuit,
  LuBraces,
  LuChartSpline,
  LuCpu,
  LuDatabase,
  LuNetwork,
  LuWorkflow,
} from "react-icons/lu";
import {
  SiBootstrap,
  SiFirebase,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiTailwindcss,
} from "react-icons/si";
import { TbApi, TbChartDots3, TbCube } from "react-icons/tb";
import { SKILL_GROUPS } from "@/data/portfolio";
import { Reveal, Section, TiltCard } from "@/components/fx/primitives";

const SKILL_ICONS: Record<string, IconType> = {
  HTML5: SiHtml5,
  CSS3: FaCss3Alt,
  "JavaScript ES6+": SiJavascript,
  "React.js": SiReact,
  "Tailwind CSS": SiTailwindcss,
  Bootstrap: SiBootstrap,
  SQL: SiMysql,
  "REST APIs": TbApi,
  Firebase: SiFirebase,
  "Node.js (familiarity)": SiNodedotjs,
  Python: SiPython,
  NumPy: SiNumpy,
  Pandas: SiPandas,
  Matplotlib: LuChartSpline,
  Seaborn: TbChartDots3,
  "Scikit-learn": SiScikitlearn,
  "Object-Oriented Programming": TbCube,
  "Data Structures & Algorithms": LuWorkflow,
  "Operating Systems": LuCpu,
  "Computer Architecture": LuDatabase,
  "Computer Networking": LuNetwork,
  "Artificial Intelligence": LuBrainCircuit,
  "Compiler Design": LuBraces,
  "Digital Systems": LuBinary,
};

function SkillNode({ label, i }: { label: string; i: number }) {
  const Icon = SKILL_ICONS[label] ?? LuCpu;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05, duration: 0.45 }}
      className="group/node relative flex min-w-0 max-w-full items-center gap-3 rounded-full border border-border bg-surface/50 py-2 pl-2 pr-4 transition-all duration-300 hover:border-cyan hover:shadow-[var(--glow-cyan)]"
      data-cursor
    >
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan/35 bg-background/60 text-cyan shadow-[inset_0_0_10px_var(--surface-2)] transition-all duration-300 group-hover/node:border-cyan group-hover/node:shadow-[var(--glow-cyan)]">
        <Icon
          aria-hidden
          className="h-4 w-4 transition-transform duration-300 group-hover/node:scale-110"
        />
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
