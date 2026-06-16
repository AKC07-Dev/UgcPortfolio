import { useRef, useState, useEffect, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Magnetic({ children, strength = 0.35, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  }
  function onLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const THEME_KEY = "aura-theme";
type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem(THEME_KEY)) as Theme | null;
    const initial: Theme = stored ?? "dark";
    apply(initial);
    setTheme(initial);
  }, []);

  function apply(t: Theme) {
    const root = document.documentElement;
    root.classList.toggle("light", t === "light");
    root.classList.toggle("dark", t === "dark");
  }

  function toggle(e: MouseEvent<HTMLButtonElement>) {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const x = e.clientX;
    const y = e.clientY;
    const max = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const ripple = document.createElement("div");
    ripple.className = "theme-ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = `${max * 2}px`;
    ripple.style.height = `${max * 2}px`;
    ripple.style.background = next === "light" ? "oklch(0.985 0.003 90)" : "oklch(0.14 0.005 270)";
    document.body.appendChild(ripple);

    requestAnimationFrame(() => {
      ripple.style.transform = "translate(-50%,-50%) scale(1)";
    });

    setTimeout(() => {
      apply(next);
      setTheme(next);
      localStorage.setItem(THEME_KEY, next);
    }, 450);
    setTimeout(() => ripple.remove(), 950);
  }

  return (
    <Magnetic className="fixed top-6 right-6 z-50">
      <button
        onClick={toggle}
        aria-label="Toggle theme"
        className="relative grid h-12 w-12 place-items-center rounded-full border border-border bg-surface/70 backdrop-blur-xl text-foreground shadow-lg hover:scale-105 transition-transform"
      >
        <span className="sr-only">Toggle theme</span>
        {theme === "dark" ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        )}
      </button>
    </Magnetic>
  );
}
