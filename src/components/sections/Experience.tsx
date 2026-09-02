import { motion } from "framer-motion";
import { ArrowRight, Building2, MapPin, Radio } from "lucide-react";
import { CAREER_HUD, EXPERIENCE, STORY_LINES } from "@/data/portfolio";
import { Reveal, Section, TiltCard, TypeLine } from "@/components/fx/primitives";
import { cn } from "@/lib/utils";

function Pipeline({ stages }: { stages: string[] }) {
  return (
    <div className="mt-6 rounded-lg border border-border bg-surface/40 p-4">
      <p className="label-hud mb-4">Data Flow</p>
      <div className="flex flex-wrap items-center gap-2">
        {stages.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <motion.span
              initial={{ opacity: 0.35 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-md border border-cyan/30 bg-cyan/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-cyan"
            >
              {s}
            </motion.span>
            {i < stages.length - 1 && (
              <span className="relative h-px w-6 overflow-hidden bg-border">
                <motion.span
                  className="absolute inset-y-0 w-2 bg-cyan"
                  animate={{ x: ["-100%", "300%"] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.25 }}
                />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      label="Module 02 // Professional Journey"
      title={
        <>
          Professional <span className="text-gradient">Journey</span>
        </>
      }
      subtitle="A career timeline rendered as a system log — every mission recorded, every skill registered."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* timeline */}
        <div className="relative pl-6 sm:pl-10">
          <span className="absolute left-1.5 top-2 h-full w-px bg-gradient-to-b from-cyan via-primary to-transparent sm:left-3" />
          {EXPERIENCE.map((x, i) => (
            <Reveal key={x.index} delay={i * 0.1} className="relative mb-10 last:mb-0">
              <span className="absolute -left-[1.35rem] top-6 flex h-3 w-3 sm:-left-[2.1rem]">
                <span
                  className={cn(
                    "absolute inset-0 animate-ping rounded-full",
                    x.status === "ACTIVE" ? "bg-cyan/70" : "bg-primary/50",
                  )}
                />
                <span
                  className={cn(
                    "relative h-3 w-3 rounded-full",
                    x.status === "ACTIVE" ? "bg-cyan" : "bg-primary",
                  )}
                />
              </span>

              <TiltCard className="p-6 sm:p-7" intensity={5}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
                      RECORD_{x.index}
                    </p>
                    <h3 className="mt-2 text-xl font-bold uppercase tracking-wide">{x.role}</h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-cyan">
                      <span className="inline-flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5" /> {x.org}
                      </span>
                      <span className="text-muted-foreground">/ {x.unit}</span>
                    </p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]",
                      x.status === "ACTIVE"
                        ? "border-cyan/50 bg-cyan/10 text-cyan"
                        : "border-border bg-surface/60 text-muted-foreground",
                    )}
                  >
                    ● {x.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] text-muted-foreground">
                  <span>{x.period}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" /> {x.location}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{x.summary}</p>

                <Pipeline stages={x.pipeline} />

                <div className="mt-6">
                  <p className="label-hud">Skills Acquired</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {x.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border bg-surface/50 px-3 py-1 text-[11px] text-foreground/80 transition-colors hover:border-plasma hover:text-plasma"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-lg border border-border bg-background/60 p-4 font-mono text-[10px] leading-relaxed text-cyan/80">
                  {x.log.map((l) => (
                    <p key={l}>« {l} »</p>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          ))}

          {/* next objective */}
          <Reveal className="relative">
            <span className="absolute -left-[1.35rem] top-5 h-3 w-3 rounded-full border border-plasma bg-background sm:-left-[2.1rem]" />
            <div className="glass-panel flex items-center gap-3 p-5">
              <ArrowRight className="h-4 w-4 text-plasma" />
              <div>
                <p className="label-hud">Next Objective</p>
                <p className="mt-1 font-display text-sm font-bold uppercase tracking-wider text-plasma">
                  Software Engineering
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* HUD */}
        <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <TiltCard className="p-6" intensity={4}>
              <div className="flex items-center gap-2">
                <Radio className="h-4 w-4 animate-pulse text-cyan" />
                <p className="label-hud">Career Status HUD</p>
              </div>
              <dl className="mt-5 space-y-3">
                {CAREER_HUD.map((r) => (
                  <div key={r.k} className="border-b border-border/60 pb-2 last:border-0">
                    <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                      {r.k}
                    </dt>
                    <dd className="mt-0.5 text-sm font-medium text-foreground">
                      <TypeLine text={r.v} />
                    </dd>
                  </div>
                ))}
              </dl>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.1}>
            <TiltCard className="p-6" intensity={4}>
              <p className="label-hud">Career Story</p>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {STORY_LINES.map((line, i) => (
                  <Reveal key={i} delay={i * 0.15}>
                    <p>{line}</p>
                  </Reveal>
                ))}
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
