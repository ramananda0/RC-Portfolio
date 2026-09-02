import { Facebook, Github, Instagram, Linkedin } from "lucide-react";
import { PROFILE } from "@/data/portfolio";

const ICONS = { github: Github, linkedin: Linkedin, facebook: Facebook, instagram: Instagram };

export function Footer() {
  return (
    <footer className="relative mt-10 border-t border-border">
      <span className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-12 sm:px-8 lg:flex-row lg:justify-between">
        <div className="text-center lg:text-left">
          <p className="font-display text-lg font-bold tracking-[0.16em] text-gradient">
            {PROFILE.name}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {PROFILE.tagline}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {PROFILE.socials.map((s) => {
            const Icon = ICONS[s.key as keyof typeof ICONS];
            return (
              <a
                key={s.key}
                href={s.href}
                aria-label={s.label}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-1 hover:border-cyan hover:text-cyan hover:shadow-[var(--glow-cyan)]"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>

        <div className="text-center font-mono text-[10px] tracking-[0.2em] text-muted-foreground lg:text-right">
          <p className="text-cyan">SYSTEM STATUS ● ONLINE</p>
          <p className="mt-1">© 2026 {PROFILE.name}</p>
        </div>
      </div>
    </footer>
  );
}
