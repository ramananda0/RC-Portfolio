import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, Facebook, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import profileAsset from "@/assets/profile.jpeg.asset.json";
import { PROFILE } from "@/data/portfolio";
import { MagneticButton } from "@/components/fx/primitives";

const ICONS = { github: Github, linkedin: Linkedin, facebook: Facebook, instagram: Instagram };

const HUD_PANELS = [
  { k: "Status", v: "Online" },
  { k: "Role", v: "CS Engineer" },
  { k: "Focus", v: "Software / AI" },
];

function ProfileOrb() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - (r.left + r.width / 2)) / r.width;
      const py = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `perspective(1000px) rotateY(${px * 12}deg) rotateX(${-py * 12}deg)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <div className="animate-float" data-cursor>
        <div
          ref={wrapRef}
          className="relative aspect-square w-full transition-transform duration-300 ease-out will-change-transform"
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
      <div className="mt-6 grid grid-cols-3 gap-2 sm:absolute sm:-left-6 sm:top-4 sm:mt-0 sm:block sm:space-y-3 lg:-left-14">
        {HUD_PANELS.map((p, i) => (
          <motion.div
            key={p.k}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.15, duration: 0.6 }}
            className="glass-panel px-3 py-2 sm:w-[128px]"
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
    <section id="home" className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-5 pb-16 pt-32 sm:px-8">
      <div className="grid w-full items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="inline-flex items-center gap-3 rounded-full border border-border bg-surface/40 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" />
            <span className="label-hud">System Profile // 2035</span>
          </motion.div>

          <h1 className="mt-6 text-[clamp(2.4rem,7.5vw,5.2rem)] font-black leading-[0.95] uppercase">
            {words.map((w, wi) => (
              <span key={w} className="mr-4 inline-block whitespace-nowrap">
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

          <div className="mt-4 flex h-9 items-center gap-3 overflow-hidden">
            <span className="h-px w-8 bg-cyan/60" />
            <AnimatePresence mode="wait">
              <motion.span
                key={PROFILE.roles[roleIndex]}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45 }}
                className="font-mono text-sm uppercase tracking-[0.25em] text-cyan sm:text-base"
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
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#projects" variant="solid">
              Explore My Work
            </MagneticButton>
            <MagneticButton href="#contact" variant="outline">
              <Mail className="h-3.5 w-3.5" /> Contact Me
            </MagneticButton>
            <MagneticButton href={PROFILE.resumeUrl} variant="ghost" download>
              <Download className="h-3.5 w-3.5" /> Download Resume
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-9 flex items-center gap-3"
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
