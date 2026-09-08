import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Download, Facebook, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import profileAsset from "@/assets/profile.jpeg.asset.json";
import resumeAsset from "@/assets/Ramananda_Chakraborty_CV.pdf.asset.json";
import { PROFILE } from "@/data/portfolio";
import { MagneticButton } from "@/components/fx/primitives";

const ICONS = { github: Github, linkedin: Linkedin, facebook: Facebook, instagram: Instagram };

const HUD_PANELS = [
  { k: "Status", v: "Online" },
  { k: "Role", v: "CS Engineer" },
  { k: "Focus", v: "Software / AI" },
];

function ProfileOrb() {
  return (
    <div className="group relative mx-auto min-w-0 w-full max-w-[420px]">
      <div className="animate-float" data-cursor>
        <div
          className="relative aspect-square w-full transition-transform duration-500 ease-out will-change-transform hover:scale-[1.03]"
        >
          {/* rotating HUD rings */}
          <span className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-cyan/35" />
          <span className="absolute inset-4 animate-spin-reverse rounded-full border border-plasma/30" />
          <span className="absolute -inset-3 animate-pulse-glow rounded-full bg-primary/15 blur-3xl" />
          <svg className="absolute inset-0 h-full w-full animate-spin-slow" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="96"
              fill="none"
              stroke="var(--cyan)"
              strokeWidth="0.6"
              strokeDasharray="18 10 4 10"
              opacity="0.5"
            />
          </svg>

          {/* frame */}
          <div className="absolute inset-[9%] overflow-hidden rounded-full border border-border bg-surface shadow-[0_0_60px_-15px_var(--neon)]">
            <img
              src={profileAsset.url}
              alt="Portrait of Ramananda Chakraborty, Computer Science Engineer"
              className="h-full w-full object-cover object-top"
              loading="eager"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-primary/10" />
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1/3 animate-sweep bg-gradient-to-b from-transparent via-cyan/25 to-transparent" />
            <span className="pointer-events-none absolute inset-0 scanlines opacity-40" />
          </div>

          {/* corner brackets */}
          {["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2", "left-0 bottom-0 border-l-2 border-b-2", "right-0 bottom-0 border-r-2 border-b-2"].map(
            (c) => (
              <span key={c} className={`absolute h-8 w-8 border-cyan/60 ${c}`} />
            ),
          )}
        </div>
      </div>

      {/* floating data panels */}
      <div className="mt-6 grid grid-cols-1 gap-2 min-[360px]:grid-cols-3 sm:absolute sm:-left-6 sm:top-4 sm:mt-0 sm:block sm:space-y-3 lg:-left-14">
        {HUD_PANELS.map((p, i) => (
          <motion.div
            key={p.k}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.15, duration: 0.6 }}
            className="glass-panel min-w-0 px-3 py-2 sm:w-[128px]"
          >
            <p className="label-hud text-[9px]">{p.k}</p>
            <p className="mt-0.5 font-mono text-[11px] text-foreground">{p.v}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % PROFILE.roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  const words = PROFILE.name.split(" ");

  return (
    <section id="home" className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center overflow-hidden px-4 pb-16 pt-28 sm:px-8 sm:pt-32">
      <div className="grid min-w-0 w-full grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
        <div className="min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-surface/40 px-3 py-1.5 backdrop-blur-md sm:gap-3 sm:px-4"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
            <span className="label-hud whitespace-nowrap text-[0.55rem] min-[360px]:text-[0.65rem]">SYSTEM PROFILE
</span>
          </motion.div>

          <h1 className="mt-6 min-w-0 text-[2rem] font-black leading-[0.98] uppercase min-[360px]:text-[2.35rem] sm:text-[clamp(2.8rem,7.5vw,5.2rem)]">
            {words.map((w, wi) => (
              <span key={w} className="mr-2 inline-block whitespace-nowrap sm:mr-4">
                {w.split("").map((c, ci) => (
                  <motion.span
                    key={`${w}-${ci}`}
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      delay: 0.5 + wi * 0.25 + ci * 0.035,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={wi === 1 ? "inline-block text-gradient" : "inline-block text-glow"}
                  >
                    {c}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <div className="mt-4 grid h-9 min-w-0 grid-cols-[1.5rem_minmax(0,1fr)] items-center gap-2 overflow-hidden sm:grid-cols-[2rem_minmax(0,1fr)] sm:gap-3">
            <span className="h-px w-full bg-cyan/60" />
            <AnimatePresence mode="wait">
              <motion.span
                key={PROFILE.roles[roleIndex]}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45 }}
                className="truncate font-mono text-xs uppercase tracking-[0.14em] text-cyan min-[360px]:text-sm sm:text-base sm:tracking-[0.25em]"
              >
                {PROFILE.roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {PROFILE.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.7 }}
            className="mt-8 flex flex-col items-start gap-3 lg:flex-row lg:items-center"
          >
            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton href="#projects" variant="solid">
                Explore My Work
              </MagneticButton>
              <MagneticButton href="#contact" variant="outline">
                <Mail className="h-3.5 w-3.5" /> Contact Me
              </MagneticButton>
            </div>
            <MagneticButton href={PROFILE.resumeUrl} variant="accent" download className="lg:ms-auto">
              <Download className="h-3.5 w-3.5" /> Download Resume
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-8 flex min-w-0 flex-wrap items-center gap-3"
          >
            {PROFILE.socials.map((s) => {
              const Icon = ICONS[s.key as keyof typeof ICONS];
              return (
                <a
                  key={s.key}
                  href={s.href}
                  aria-label={s.label}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/40 text-muted-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan hover:text-cyan hover:shadow-[var(--glow-cyan)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
            <span className="ml-1 font-mono text-[10px] text-muted-foreground/70">
              // links pending
            </span>
          </motion.div>
        </div>

        <ProfileOrb />
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground sm:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.3em]">SCROLL</span>
        <ArrowDown className="h-4 w-4 animate-bounce text-cyan" />
      </motion.a>
    </section>
  );
}
