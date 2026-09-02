import { Award, ExternalLink, GraduationCap } from "lucide-react";
import { CERTIFICATIONS, EDUCATION } from "@/data/portfolio";
import { Reveal, Section, TiltCard } from "@/components/fx/primitives";

export function Certifications() {
  return (
    <Section
      id="certifications"
      label="Module 05 // Credentials"
      title={
        <>
          Certifications & <span className="text-gradient">Academic Foundation</span>
        </>
      }
      subtitle="Verified academic record, plus credential slots ready for real certifications."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {CERTIFICATIONS.map((c, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <TiltCard className="h-full animate-float p-6" intensity={9}>
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-plasma/30 bg-plasma/10 text-plasma shadow-[var(--glow-plasma)]">
                  <Award className="h-5 w-5" />
                </span>
                {c.placeholder && (
                  <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                    Placeholder
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-base font-semibold uppercase tracking-wider">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
              <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-cyan">{c.date}</p>
              {c.credential ? (
                <a
                  href={c.credential}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan hover:underline"
                >
                  <ExternalLink className="h-3 w-3" /> View Credential
                </a>
              ) : (
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
                  Credential link pending
                </p>
              )}
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-4 w-4 text-cyan" />
          <span className="label-hud">Academic Foundation</span>
          <span className="h-px flex-1 bg-gradient-to-r from-cyan/50 to-transparent" />
        </div>
      </Reveal>

      <div className="relative mt-8 pl-6 sm:pl-10">
        <span className="absolute left-1.5 top-2 h-full w-px bg-gradient-to-b from-plasma via-primary to-transparent sm:left-3" />
        {EDUCATION.map((e, i) => (
          <Reveal key={e.degree} delay={i * 0.1} className="relative mb-6 last:mb-0">
            <span className="absolute -left-[1.35rem] top-6 h-3 w-3 rounded-full bg-primary shadow-[var(--glow-neon)] sm:-left-[2.1rem]" />
            <TiltCard className="p-6" intensity={4}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold uppercase tracking-wide">{e.degree}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{e.school}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[11px] tracking-[0.2em] text-cyan">{e.year}</p>
                  <p className="mt-1 font-mono text-[11px] text-foreground/80">{e.result}</p>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
