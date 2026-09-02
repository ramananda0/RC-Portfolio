import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive(vis.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.01, 0.2, 0.5] },
    );
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-1/2 top-4 z-50 w-[min(1120px,calc(100%-1.5rem))] -translate-x-1/2"
      >
        <div
          className={cn(
            "flex items-center justify-between rounded-full border border-border px-4 py-2.5 backdrop-blur-xl transition-all duration-500 sm:px-6",
            scrolled
              ? "bg-surface/70 shadow-[0_10px_40px_-20px_var(--neon)]"
              : "bg-surface/35",
          )}
        >
          <button
            onClick={() => go("home")}
            className="group flex items-center gap-2 font-display text-sm font-bold tracking-[0.2em]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-cyan/70" />
              <span className="relative h-2 w-2 rounded-full bg-cyan" />
            </span>
            <span className="text-gradient">RC</span>
            <span className="hidden font-mono text-[10px] tracking-[0.25em] text-muted-foreground sm:inline">
              /CORE
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={cn(
                  "relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
                  active === l.id ? "text-cyan" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full border border-cyan/40 bg-cyan/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[10px] tracking-[0.2em] text-muted-foreground xl:inline">
              ● SYSTEM ONLINE
            </span>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-cyan lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="fixed left-1/2 top-20 z-50 w-[min(1120px,calc(100%-1.5rem))] -translate-x-1/2 lg:hidden"
          >
            <div className="glass-panel overflow-hidden p-2">
              {NAV_LINKS.map((l, i) => (
                <motion.button
                  key={l.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  onClick={() => go(l.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors",
                    active === l.id ? "bg-cyan/10 text-cyan" : "text-muted-foreground",
                  )}
                >
                  {l.label}
                  <span className="text-[10px] opacity-60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
