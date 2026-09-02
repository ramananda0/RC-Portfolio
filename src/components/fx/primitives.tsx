import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
  type ComponentProps,
} from "react";
import { cn } from "@/lib/utils";

/* Reveal on scroll */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? undefined : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Section shell with HUD label */
export function Section({
  id,
  label,
  title,
  subtitle,
  children,
  className,
}: {
  id: string;
  label: string;
  title: ReactNode;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8", className)}>
      <Reveal className="mb-12">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan" />
          <span className="label-hud">{label}</span>
        </div>
        <h2 className="mt-4 text-3xl font-bold uppercase tracking-wider sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">{subtitle}</p>
        )}
      </Reveal>
      {children}
    </section>
  );
}

/* 3D tilt + cursor-reactive light glass card */
export function TiltCard({
  children,
  className,
  intensity = 8,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    el.style.transform = `perspective(900px) rotateY(${(px - 0.5) * intensity}deg) rotateX(${(0.5 - py) * intensity}deg) translateZ(0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "glass-panel group relative overflow-hidden transition-[transform,box-shadow] duration-300 ease-out will-change-transform hover:shadow-[0_0_50px_-15px_var(--neon)]",
        className,
      )}
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx) var(--my), oklch(0.85 0.15 195 / 14%), transparent 65%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 -translate-y-full bg-gradient-to-b from-transparent via-cyan/10 to-transparent transition-transform duration-700 group-hover:translate-y-[400%]"
      />
      {children}
    </div>
  );
}

/* Magnetic glowing button */
export function MagneticButton({
  children,
  variant = "solid",
  className,
  ...props
}: ComponentProps<"a"> & { variant?: "solid" | "outline" | "ghost" }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.16}px, ${(e.clientY - r.top - r.height / 2) * 0.22}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return (
    <a
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] transition-[transform,box-shadow,background-color] duration-300 ease-out",
        variant === "solid" &&
          "bg-primary text-primary-foreground shadow-[var(--glow-neon)] hover:shadow-[0_0_40px_var(--neon)]",
        variant === "outline" &&
          "border border-border bg-surface/40 text-foreground backdrop-blur-md hover:border-cyan hover:text-cyan hover:shadow-[var(--glow-cyan)]",
        variant === "ghost" && "text-muted-foreground hover:text-cyan",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-foreground/20 opacity-0 transition-all duration-500 group-hover:opacity-100 hover:left-[120%] hover:opacity-100"
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </a>
  );
}

/* Animated counter / value */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const numeric = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || Number.isNaN(numeric)) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1100, 1);
      setN(Math.round(numeric * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric]);

  return (
    <span ref={ref} className={className}>
      {Number.isNaN(numeric) ? value : `${n}${suffix}`}
    </span>
  );
}

/* Terminal-style typing line */
export function TypeLine({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [out, setOut] = useState("");
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setOut(text);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [inView, text, reduce]);

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  );
}
