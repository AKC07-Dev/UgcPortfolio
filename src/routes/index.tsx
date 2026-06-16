import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { Magnetic, ThemeToggle } from "@/components/portfolio/Interactive";
import heroImg from "@/assets/hero.jpg";
import wBeauty from "@/assets/work-beauty.jpg";
import wFashion from "@/assets/work-fashion.jpg";
import wTech from "@/assets/work-tech.jpg";
import wWellness from "@/assets/work-wellness.jpg";
import wTravel from "@/assets/work-travel.jpg";
import wFood from "@/assets/work-food.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AURA — UGC Creator crafting viral visual stories" },
      { name: "description", content: "Premium Instagram UGC creator portfolio. High-hook reels that convert for beauty, fashion and lifestyle brands." },
    ],
  }),
  component: Page,
});

/* ----------------------------- Data ----------------------------- */

const STATS = [
  { k: "5.2M+", v: "Total Views" },
  { k: "8.4%", v: "Avg. Engagement" },
  { k: "120+", v: "Reels Shipped" },
  { k: "48", v: "Brands Partnered" },
];

const BRANDS = ["SEPHORA", "NIKE", "REVOLVE", "GLOSSIER", "RARE BEAUTY", "AESOP", "SKIMS", "DYSON", "CHARLOTTE TILBURY", "ZARA"];

const WORK = [
  { id: 1, cat: "Beauty", title: "Glow Serum Launch", img: wBeauty, brand: "Glossier", goal: "Drive launch awareness for a new niacinamide serum.", hook: "POV: the serum that made my pores disappear in 7 days.", results: "1.8M views · 11.2% ER · 4.3x ROAS" },
  { id: 2, cat: "Fashion", title: "Editorial Drop", img: wFashion, brand: "Revolve", goal: "Position Fall '25 capsule as the it-collection.", hook: "Outfits that make you the main character.", results: "920K views · 9.1% ER · 2.7x ROAS" },
  { id: 3, cat: "Tech", title: "Workspace Reset", img: wTech, brand: "Apple", goal: "Lifestyle integration for the new MacBook line.", hook: "5 tools that made me unfireable.", results: "640K views · 7.8% ER" },
  { id: 4, cat: "Wellness", title: "Morning Ritual", img: wWellness, brand: "Rare Beauty", goal: "Warm intro for a new wellness sub-brand.", hook: "The 6am routine that fixed my anxiety.", results: "1.1M views · 12.4% ER" },
  { id: 5, cat: "Travel", title: "Golden Hour Tour", img: wTravel, brand: "Aesop", goal: "Sensory storytelling for the travel-size kit.", hook: "Romanticize the 14-hour flight.", results: "780K views · 8.9% ER" },
  { id: 6, cat: "Food", title: "Slow Mornings", img: wFood, brand: "Nespresso", goal: "Drive in-app orders via lifestyle reel.", hook: "Make your kitchen feel like Paris.", results: "510K views · 6.4% ER · 3.1x ROAS" },
];

const SERVICES = [
  { n: "01", t: "Concept Ideation", d: "Hook-first scripts engineered from current trends, audience psychology and your brand voice." },
  { n: "02", t: "High-Hook Editing", d: "Snappy cuts, sound design, captions and pacing tuned for the first 1.7 seconds." },
  { n: "03", t: "Aesthetic Curation", d: "Cohesive moodboards, color and prop styling that scroll-stop without screaming 'ad'." },
  { n: "04", t: "Scriptwriting", d: "POV, listicle and storytime formats — written to be felt, not just watched." },
];

const PROCESS = [
  { t: "Discovery", d: "We dig into your audience, goals and the offer." },
  { t: "Concepting", d: "3–5 hook angles per deliverable, approved before we shoot." },
  { t: "Production", d: "Self-shot in natural light or studio, fully art-directed." },
  { t: "Delivery", d: "Edited, captioned, optimized for IG + TikTok." },
];

const TESTIMONIALS = [
  { q: "Aura's reels did in 2 weeks what our last agency couldn't do in 6 months. Our launch sold out.", a: "Maya R.", r: "Brand Manager, Glossier" },
  { q: "Best creator we've ever worked with. Hooks are insane.", a: "Daniel K.", r: "Growth Lead, Revolve" },
  { q: "Genuinely felt like an in-house creative director, not a freelancer.", a: "Priya S.", r: "CMO, indie skincare" },
  { q: "Conversion rate doubled the week her reel went live.", a: "Jordan M.", r: "DTC Director" },
  { q: "Pure taste. Every frame felt intentional.", a: "Sofia L.", r: "Founder, fashion label" },
];

/* ----------------------------- Page ----------------------------- */

function Page() {
  return (
    <main className="relative overflow-x-hidden bg-background text-foreground">
      <ThemeToggle />
      <Nav />
      <Hero />
      <Stats />
      <Marquee />
      <Portfolio />
      <Services />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

/* ----------------------------- Nav ----------------------------- */

function Nav() {
  return (
    <header className="fixed top-6 left-1/2 z-40 -translate-x-1/2">
      <nav className="flex items-center gap-1 rounded-full border border-border bg-surface/60 px-2 py-2 backdrop-blur-xl">
        <a href="#top" className="px-4 py-1.5 text-sm font-display font-bold tracking-tight">AURA<span className="text-accent">.</span></a>
        <div className="hidden md:flex items-center gap-1 text-sm">
          {[["Work","#work"],["Services","#services"],["Reviews","#love"],["Contact","#contact"]].map(([l,h]) => (
            <a key={l} href={h} className="px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">{l}</a>
          ))}
        </div>
      </nav>
    </header>
  );
}

/* ----------------------------- Hero ----------------------------- */

function SplitText({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className="inline-block">
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: delay + i * 0.07, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] pt-32 pb-16 px-5 md:px-10 noise">
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[40rem] w-[40rem] rounded-full bg-accent/20 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute top-1/3 -right-32 h-[34rem] w-[34rem] rounded-full bg-accent-2/20 blur-3xl animate-blob" style={{ animationDelay: "-6s" }} />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Headline */}
        <div className="lg:col-span-7 flex flex-col justify-end">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8"
          >
            <span className="h-px w-10 bg-foreground/40" /> Instagram UGC Creator · Est. 2021
          </motion.div>

          <h1 className="font-display text-[14vw] leading-[0.88] tracking-tight md:text-[9vw] lg:text-[7.2vw]">
            <SplitText text="Crafting viral" />
            <br />
            <span className="italic font-light"><SplitText text="visual stories" delay={0.25} /></span>
            <br />
            <SplitText text="that convert." delay={0.5} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-10 max-w-md text-base text-muted-foreground text-balance"
          >
            I'm <span className="text-foreground">Aura</span> — a UGC creator helping premium beauty, fashion and lifestyle brands ship reels people actually finish.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a href="#work" className="group inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 text-background font-medium">
                View Reels
                <span className="grid h-7 w-7 place-items-center rounded-full bg-background/15 transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
            <a href="#contact" className="text-sm underline-offset-4 hover:underline text-muted-foreground hover:text-foreground">or book a project →</a>
          </motion.div>
        </div>

        {/* Visual */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-surface"
            style={{ y }}
          >
            <motion.img src={heroImg} alt="Creator portrait" style={{ scale }} className="h-full w-full object-cover" width={1280} height={1600} />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-foreground/80">Now booking</div>
                <div className="font-display text-2xl text-foreground">Q3 · 2026</div>
              </div>
              <span className="grid h-3 w-3 place-items-center"><span className="h-2 w-2 rounded-full bg-accent-2 animate-ping" /><span className="absolute h-2 w-2 rounded-full bg-accent-2" /></span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Stats ----------------------------- */

function Stats() {
  return (
    <section className="px-5 md:px-10 py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="font-display text-4xl md:text-6xl tracking-tight max-w-2xl text-balance">Numbers that <span className="italic font-light">do the talking.</span></h2>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground hidden md:block">— Social Proof</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {STATS.map((s, i) => (
            <Reveal key={s.v} delay={i * 0.07}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-6 md:p-8 transition-colors hover:border-accent/60">
                <div className="absolute -top-1/2 -right-1/3 h-[200%] w-[80%] rounded-full bg-accent/0 blur-3xl transition-all duration-700 group-hover:bg-accent/15" />
                <div className="relative font-display text-5xl md:text-7xl tracking-tight">{s.k}</div>
                <div className="relative mt-3 text-sm text-muted-foreground">{s.v}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Marquee ----------------------------- */

function Marquee() {
  const [reverse, setReverse] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setReverse(y < lastY.current);
      lastY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [...BRANDS, ...BRANDS];

  return (
    <section className="border-y border-border bg-surface/50 py-8 overflow-hidden">
      <div className={`flex w-max gap-16 whitespace-nowrap ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {items.map((b, i) => (
          <span key={i} className="font-display text-3xl md:text-5xl tracking-tight text-foreground/40 hover:text-foreground transition-colors">
            {b} <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- Portfolio ----------------------------- */

function Portfolio() {
  const [active, setActive] = useState<typeof WORK[number] | null>(null);
  const cats = ["All", "Beauty", "Fashion", "Tech", "Wellness", "Travel", "Food"];
  const [filter, setFilter] = useState("All");
  const items = filter === "All" ? WORK : WORK.filter(w => w.cat === filter);

  return (
    <section id="work" className="px-5 md:px-10 py-24 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <h2 className="font-display text-5xl md:text-7xl tracking-tight text-balance">Selected <span className="italic font-light">work.</span></h2>
            <div className="flex flex-wrap gap-1.5">
              {cats.map(c => (
                <button key={c} onClick={() => setFilter(c)}
                  className={`rounded-full border border-border px-4 py-1.5 text-xs uppercase tracking-widest transition-colors ${filter===c ? "bg-foreground text-background border-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((w, i) => (
            <Reveal key={w.id} delay={(i % 3) * 0.08}>
              <button
                onClick={() => setActive(w)}
                className="group relative block w-full overflow-hidden rounded-3xl border border-border bg-surface text-left"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={w.img} alt={w.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
                  <div className="absolute top-4 left-4 rounded-full bg-background/70 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.2em]">{w.cat}</div>
                  <div className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground opacity-0 transition-opacity group-hover:opacity-100">▶</div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-xs text-muted-foreground">{w.brand}</div>
                  <div className="font-display text-2xl mt-1">{w.title}</div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] grid place-items-center bg-background/80 backdrop-blur-xl p-4"
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.96 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-border bg-surface md:grid-cols-[1.2fr_1fr]"
            >
              <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[560px]">
                <img src={active.img} alt={active.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-7 md:p-10">
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{active.cat} · {active.brand}</div>
                  <button onClick={() => setActive(null)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-muted">×</button>
                </div>
                <h3 className="mt-4 font-display text-4xl tracking-tight">{active.title}</h3>
                <div className="mt-8 space-y-5">
                  <Field label="The Goal" v={active.goal} />
                  <Field label="The Hook" v={`"${active.hook}"`} />
                  <Field label="Results" v={active.results} accent />
                </div>
                <a href="#contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm text-background">
                  Brief a similar reel →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Field({ label, v, accent }: { label: string; v: string; accent?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
      <div className={`mt-1.5 ${accent ? "font-display text-2xl text-accent" : "text-base text-foreground"}`}>{v}</div>
    </div>
  );
}

/* ----------------------------- Services ----------------------------- */

function Services() {
  const [open, setOpen] = useState(0);
  return (
    <section id="services" className="px-5 md:px-10 py-24 md:py-36 bg-surface/40">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-5">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">— What I do</span>
          <h2 className="mt-4 font-display text-5xl md:text-6xl tracking-tight text-balance">Why <span className="italic font-light">UGC?</span></h2>
          <p className="mt-6 text-muted-foreground max-w-md">Polished ads feel like ads. UGC feels like a friend's recommendation — and the algorithm knows the difference.</p>
        </Reveal>

        <div className="lg:col-span-7 divide-y divide-border border-y border-border">
          {SERVICES.map((s, i) => (
            <button key={s.n} onClick={() => setOpen(i)} className="block w-full text-left">
              <div className="flex items-center justify-between py-7">
                <div className="flex items-baseline gap-6">
                  <span className="font-display text-sm text-muted-foreground">{s.n}</span>
                  <span className="font-display text-3xl md:text-4xl">{s.t}</span>
                </div>
                <span className={`grid h-10 w-10 place-items-center rounded-full border border-border transition-transform ${open===i ? "rotate-45 bg-accent text-accent-foreground border-accent" : ""}`}>+</span>
              </div>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-7 max-w-xl text-muted-foreground">{s.d}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Process ----------------------------- */

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 30%"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="px-5 md:px-10 py-24 md:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="font-display text-5xl md:text-6xl tracking-tight text-center text-balance">A process built like <span className="italic font-light">a brief.</span></h2>
        </Reveal>
        <div className="relative mt-16 pl-12 md:pl-0">
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
          <motion.div style={{ height: h }} className="absolute left-3 md:left-1/2 top-0 w-px bg-gradient-to-b from-accent via-accent-2 to-accent-3 md:-translate-x-1/2 shadow-[0_0_20px_var(--color-accent)]" />
          <ul className="space-y-16">
            {PROCESS.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.05}>
                <li className={`relative md:grid md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>div:first-child]:order-2 md:text-left" : "md:text-right"}`}>
                  <span className="absolute -left-12 md:left-1/2 md:-translate-x-1/2 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-background border-2 border-accent">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <div>
                    <div className="font-display text-xs uppercase tracking-[0.3em] text-accent">Step 0{i+1}</div>
                    <h3 className="mt-2 font-display text-3xl md:text-4xl tracking-tight">{p.t}</h3>
                    <p className="mt-3 text-muted-foreground max-w-sm md:inline-block">{p.d}</p>
                  </div>
                  <div />
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Testimonials ----------------------------- */

function Testimonials() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section id="love" className="py-24 md:py-36 border-t border-border bg-surface/40 overflow-hidden">
      <div className="px-5 md:px-10 mx-auto max-w-7xl">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-12">
            <h2 className="font-display text-5xl md:text-6xl tracking-tight text-balance">Wall of <span className="italic font-light">love.</span></h2>
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground hidden md:block">— What brands say</span>
          </div>
        </Reveal>
      </div>
      <div className="relative">
        <div className="flex w-max gap-5 animate-marquee">
          {loop.map((t, i) => (
            <figure key={i} className="w-[88vw] sm:w-[420px] shrink-0 rounded-3xl border border-border bg-card p-7">
              <div className="flex gap-1 text-accent">{"★★★★★"}</div>
              <blockquote className="mt-4 font-display text-xl leading-snug text-balance">"{t.q}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/20 text-accent font-display">{t.a[0]}</span>
                <div>
                  <div className="text-sm">{t.a}</div>
                  <div className="text-xs text-muted-foreground">{t.r}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Contact ----------------------------- */

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "hello@aura.studio";

  async function copy() {
    try { await navigator.clipboard.writeText(email); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section id="contact" className="relative px-5 md:px-10 py-28 md:py-44 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <h2 className="font-display text-[14vw] md:text-[10vw] leading-[0.88] tracking-tight text-balance">
            Let's make your brand <span className="italic font-light">trend.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Form */}
          <Reveal>
            <form onSubmit={(e) => { e.preventDefault(); alert("Thanks! I'll be in touch within 24h."); }} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input label="Your name" name="name" />
                <Input label="Brand" name="brand" />
              </div>
              <Input label="Email" name="email" type="email" />
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Budget</label>
                <select required className="mt-2 block w-full rounded-2xl border border-border bg-background px-4 py-4 text-sm outline-none focus:border-accent">
                  <option>Under $3K</option>
                  <option>$3K – $8K</option>
                  <option>$8K – $20K</option>
                  <option>$20K+</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Project details</label>
                <textarea required rows={4} className="mt-2 block w-full rounded-2xl border border-border bg-background px-4 py-4 text-sm outline-none focus:border-accent resize-none" />
              </div>
              <Magnetic>
                <button type="submit" className="inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 text-background font-medium">
                  Send Brief
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-background/15">→</span>
                </button>
              </Magnetic>
            </form>
          </Reveal>

          {/* Links */}
          <Reveal>
            <div className="lg:pl-10">
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Or reach me directly</div>
              <Magnetic className="mt-4 inline-block">
                <button onClick={copy} className="group inline-flex items-center gap-4 rounded-full border border-border bg-surface px-6 py-4 text-left">
                  <span className="font-display text-xl md:text-2xl tracking-tight">{copied ? "Copied! 🎉" : email}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:rotate-12">
                    {copied ? "✓" : "⧉"}
                  </span>
                </button>
              </Magnetic>

              <div className="mt-12 grid grid-cols-1 gap-2">
                {[
                  { l: "Instagram", h: "@aura.creates", u: "https://instagram.com" },
                  { l: "TikTok", h: "@aura.creates", u: "https://tiktok.com" },
                  { l: "Pinterest", h: "/aurastudio", u: "https://pinterest.com" },
                ].map(s => (
                  <a key={s.l} href={s.u} target="_blank" rel="noreferrer"
                     className="group flex items-center justify-between border-b border-border py-5">
                    <span className="font-display text-2xl md:text-3xl tracking-tight">{s.l}</span>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{s.h} →</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Input({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</label>
      <input required name={name} type={type}
        className="mt-2 block w-full rounded-2xl border border-border bg-background px-4 py-4 text-sm outline-none focus:border-accent" />
    </div>
  );
}

/* ----------------------------- Footer ----------------------------- */

function Footer() {
  return (
    <footer className="border-t border-border px-5 md:px-10 py-10">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} AURA Studio · Crafted with obsession in NYC.</div>
        <div className="flex gap-4">
          <a href="#top" className="hover:text-foreground">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------------- Reveal helper ----------------------------- */

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
