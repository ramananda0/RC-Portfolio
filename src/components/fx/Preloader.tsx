import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const STEPS = [
  "SYSTEM BOOT",
  "NEURAL INTERFACE // ONLINE",
  "LOADING PROFILE MODULES",
  "PORTFOLIO SYSTEM // READY",
];

export function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduce) {
      setVisible(false);
      onDone();
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 2000;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setProgress(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setVisible(false);
          onDone();
        }, 320);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, onDone]);

  const step = Math.min(STEPS.length - 1, Math.floor((progress / 100) * STEPS.length));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-background px-6"
          exit={{ opacity: 0, filter: "blur(12px)", scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-0 mesh-bg" />
          <div className="absolute inset-0 scanlines opacity-50" />

          <div className="relative w-full max-w-md">
            <div className="relative mx-auto mb-10 h-28 w-28">
              <span className="absolute inset-0 animate-spin-slow rounded-full border border-cyan/50 border-t-cyan" />
              <span className="absolute inset-3 animate-spin-reverse rounded-full border border-plasma/40 border-b-plasma" />
              <span className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/20 blur-xl" />
              <span className="absolute inset-0 flex items-center justify-center font-mono text-sm text-cyan">
                {progress}%
              </span>
            </div>

            <h1 className="text-center text-2xl font-bold tracking-[0.28em] text-gradient sm:text-3xl">
              RAMANANDA.CORE
            </h1>
            <p className="mt-3 text-center label-hud">System Initializing...</p>

            <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-[image:var(--gradient-neon)] shadow-[var(--glow-neon)] transition-[width] duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            <ul className="mt-6 space-y-1.5 font-mono text-[11px] text-muted-foreground">
              {STEPS.map((s, i) => (
                <li
                  key={s}
                  className={
                    i <= step ? "text-cyan transition-colors" : "opacity-30 transition-opacity"
                  }
                >
                  {i <= step ? "› " : "· "}
                  {s}
                  {i === step && <span className="animate-blink"> _</span>}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
