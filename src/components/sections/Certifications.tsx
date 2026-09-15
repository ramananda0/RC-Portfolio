import { useState } from "react";
import { Award, ExternalLink, GraduationCap, X, Eye } from "lucide-react";
import { CERTIFICATIONS, EDUCATION, type Certification } from "@/data/portfolio";
import { Reveal, Section, TiltCard } from "@/components/fx/primitives";

export function Certifications() {
  const [active, setActive] = useState<Certification | null>(null);
  const [previewError, setPreviewError] = useState(false);

  const openPreview = (certification: Certification) => {
    setPreviewError(false);
    setActive(certification);
  };

  return (
    <Section
      id="certifications"
      label="Module 05 // Credentials"
      title={
        <>
          Certifications & <span className="text-gradient">Academic Foundation</span>
        </>
      }
      subtitle="Click any certification title to preview the original certificate."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {CERTIFICATIONS.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06}>
            <TiltCard
              className="h-full cursor-pointer p-4 sm:p-6"
              intensity={9}
              onClick={() => openPreview(c)}
            >
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-plasma/30 bg-plasma/10 text-plasma shadow-[var(--glow-plasma)]">
                  <Award className="h-5 w-5" />
                </span>
                <span className="rounded-full border border-border px-2 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground min-[360px]:text-[9px] min-[360px]:tracking-[0.18em]">
                  {c.kind === "pdf" ? "PDF" : "JPG"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => openPreview(c)}
                className="mt-4 block w-full text-left text-base font-semibold uppercase tracking-wider transition-colors hover:text-cyan"
              >
                {c.title}
              </button>
              <p className="mt-1 text-sm text-muted-foreground">{c.issuer}</p>
              <p className="mt-3 font-mono text-[10px] tracking-[0.2em] text-cyan">{c.date}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => openPreview(c)}
                  className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan hover:underline"
                >
                  <Eye className="h-3 w-3" /> Preview
                </button>
                {c.credential && (
                  <a
                    href={c.credential}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-cyan hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" /> Verify
                  </a>
                )}
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-background/85 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} certificate preview`}
          onClick={() => setActive(null)}
        >
          <div
            className="glass-panel relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden p-3 sm:p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold uppercase tracking-wider sm:text-base">
                  {active.title}
                </h3>
                <p className="mt-1 truncate text-xs text-muted-foreground">{active.issuer}</p>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close preview"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-cyan hover:text-cyan"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 min-h-0 flex-1 overflow-auto rounded-lg border border-border bg-surface/40">
              {previewError ? (
                <div className="flex min-h-[18rem] flex-col items-center justify-center px-6 text-center">
                  <Award className="h-8 w-8 text-plasma" />
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-cyan">
                    Certificate file unavailable
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                    Add the original certificate file to the project&apos;s public/certificates folder
                    to preview it locally.
                  </p>
                </div>
              ) : active.kind === "image" ? (
                <img
                  src={active.file}
                  alt={`${active.title} certificate issued by ${active.issuer}`}
                  className="h-auto w-full"
                  loading="lazy"
                  onError={() => setPreviewError(true)}
                />
              ) : (
                <iframe
                  src={active.file}
                  title={`${active.title} certificate`}
                  className="h-[70vh] w-full"
                  onError={() => setPreviewError(true)}
                />
              )}
            </div>

            <a
              href={active.file}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan hover:underline"
            >
              <ExternalLink className="h-3 w-3" /> Open in new tab
            </a>
          </div>
        </div>
      )}

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
            <TiltCard className="p-4 sm:p-6" intensity={4}>
              <div className="grid min-w-0 gap-3 min-[400px]:grid-cols-[minmax(0,1fr)_auto] min-[400px]:items-start">
                <div className="min-w-0">
                  <h3 className="text-base font-bold uppercase tracking-wide">{e.degree}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{e.school}</p>
                </div>
                <div className="text-left min-[400px]:text-right">
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
