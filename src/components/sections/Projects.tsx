import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, Lock, X } from "lucide-react";
import { useState } from "react";
import { PROJECTS, type Project } from "@/data/portfolio";
import { MagneticButton, Reveal, Section, TiltCard } from "@/components/fx/primitives";

function Card({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <TiltCard className="flex h-full flex-col p-4 sm:p-6">
      <div
        role="button"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(e) => e.key === "Enter" && onOpen()}
        className="relative mb-5 aspect-[16/10] overflow-hidden rounded-lg border border-border bg-background/60"
        data-cursor
      >
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 mesh-bg opacity-70" />
        <span className="absolute inset-x-0 top-0 h-1/3 animate-sweep bg-gradient-to-b from-transparent via-cyan/20 to-transparent" />
        <span className="absolute inset-0 flex items-center justify-center font-display text-5xl font-black text-foreground/10 transition-transform duration-500 group-hover:scale-110">
          {p.index}
        </span>
        <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          › preview_module
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
          PRJ_{p.index}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <h3 className="mt-2 text-lg font-bold uppercase tracking-wide">{p.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-border bg-surface/50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-cyan/80"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {p.demo ? (
          <MagneticButton
            href={p.demo}
            target="_blank"
            rel="noreferrer"
            variant="outline"
            className="px-5 py-2 text-[10px]"
          >
            <ExternalLink className="h-3 w-3" /> Live Demo
          </MagneticButton>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
            <Lock className="h-3 w-3" /> Demo Unavailable
          </span>
        )}
        {p.repo ? (
          <MagneticButton
            href={p.repo}
            target="_blank"
            rel="noreferrer"
            variant="ghost"
            className="px-4 py-2 text-[10px]"
          >
            <Github className="h-3 w-3" /> Repository
          </MagneticButton>
        ) : (
          <span className="inline-flex items-center gap-2 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50">
            <Github className="h-3 w-3" /> Repository Unavailable
          </span>
        )}
      </div>
    </TiltCard>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <Section
      id="projects"
      label="Module 04 // Project Archive"
      title={
        <>
          Project <span className="text-gradient">Archive</span>
        </>
      }
      subtitle="Selected builds — deployed interfaces and front-end engineering practice."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.index} delay={i * 0.07}>
            <Card p={p} onOpen={() => setActive(p)} />
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-background/80 p-5 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel relative max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-y-auto p-5 sm:p-7"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-cyan"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="label-hud">Project_Record {active.index}</p>
               <h3 className="mt-3 break-words pr-8 text-xl font-bold uppercase text-gradient sm:text-2xl">
                {active.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {active.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {active.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-cyan/30 bg-cyan/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-cyan"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                {active.demo && (
                  <MagneticButton
                    href={active.demo}
                    target="_blank"
                    rel="noreferrer"
                    variant="solid"
                    className="px-6 py-2.5 text-[10px]"
                  >
                    <ExternalLink className="h-3 w-3" /> Open Live Demo
                  </MagneticButton>
                )}
                {active.repo ? (
                  <MagneticButton
                    href={active.repo}
                    target="_blank"
                    rel="noreferrer"
                    variant="ghost"
                    className="px-4 py-2.5 text-[10px]"
                  >
                    <Github className="h-3 w-3" /> View Repository
                  </MagneticButton>
                ) : (
                  <span className="inline-flex items-center gap-2 px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                    <Github className="h-3 w-3" /> Repository unavailable
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
