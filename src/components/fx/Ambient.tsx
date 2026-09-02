import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Canvas particle field + neural links. Density adapts to viewport. */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -999, y: -999 };

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let pts: P[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const density = w < 640 ? 16000 : w < 1100 ? 12000 : 9000;
      const count = Math.min(110, Math.floor((w * h) / density));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.5,
      }));
    };

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(150,200,255,0.55)";
        ctx.fill();
      }
      const max = w < 640 ? 90 : 130;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < max) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(120,160,255,${0.16 * (1 - d / max)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
        const a = pts[i];
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < 170) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(190,120,255,${0.3 * (1 - dm / 170)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" />;
}

/** Fixed cinematic background: mesh, perspective grid, particles, streaks, scanlines. */
export function AmbientBackground() {
  const reduce = useReducedMotion();
  const [heavy, setHeavy] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setHeavy(mq.matches && !reduce);
  }, [reduce]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-x-0 bottom-0 h-[60vh] [perspective:600px]">
        <div className="grid-bg h-[140%] w-full origin-bottom [transform:rotateX(70deg)] opacity-60" />
      </div>
      <div className="absolute inset-0 grid-bg opacity-25" />
      {heavy && <ParticleField />}
      {!reduce && (
        <>
          <div className="absolute left-0 top-[18%] h-px w-1/2 animate-streak bg-gradient-to-r from-transparent via-cyan to-transparent" />
          <div
            className="absolute left-0 top-[62%] h-px w-1/3 animate-streak bg-gradient-to-r from-transparent via-plasma to-transparent"
            style={{ animationDelay: "2.5s" }}
          />
        </>
      )}
      <div className="absolute inset-0 scanlines opacity-40" />
      <div className="noise absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_40%,var(--background)_100%)]" />
    </div>
  );
}

/** Mouse-follow ambient light (desktop only). */
export function MouseLight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      aria-hidden
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 -z-10 h-[600px] w-[600px] rounded-full opacity-40 blur-3xl transition-transform duration-200 ease-out"
      style={{
        background:
          "radial-gradient(circle, oklch(0.72 0.19 250 / 22%), oklch(0.68 0.22 300 / 10%) 45%, transparent 70%)",
      }}
    />
  );
}

/** Futuristic custom cursor (desktop only). */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      const t = e.target as HTMLElement | null;
      const interactive = t?.closest("a,button,input,textarea,[data-cursor]");
      ring.current?.classList.toggle("scale-[2.1]", Boolean(interactive));
      ring.current?.classList.toggle("border-plasma", Boolean(interactive));
    };
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    document.body.style.cursor = "none";
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      document.body.style.cursor = "";
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_12px_var(--cyan)]"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-cyan/70 transition-[transform,border-color,scale] duration-200 ease-out"
      />
    </>
  );
}
