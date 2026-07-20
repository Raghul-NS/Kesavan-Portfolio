import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Play, Mail, ArrowUpRight, Instagram, Linkedin, Youtube, Github,
  Film, Sparkles, Palette, Music, Wand2, Layers, Video, TrendingUp,
  Trophy, Medal, Star, X, Clock, Target, CheckCircle2, ArrowRight,
  Menu,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import editorPortrait from "@/assets/editor-portrait.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

/* ---------- Utilities ---------- */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeUp}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function useCounter(target: number, inView: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, inView, duration]);
  return val;
}

function Counter({ to, suffix = "", label }: { to: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const val = useCounter(to, inView);
  return (
    <div ref={ref} className="text-center sm:text-left">
      <div className="text-5xl md:text-6xl font-bold text-gradient tabular-nums">
        {val}
        {suffix}
      </div>
      <div className="mt-2 text-sm uppercase tracking-[0.2em] text-white/50">{label}</div>
    </div>
  );
}

function MagneticButton({
  children,
  variant = "primary",
  onClick,
  href,
  type,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  const base =
    "relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-colors will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-white text-black hover:bg-white/90"
      : "glass text-white hover:bg-white/10";

  const inner = (
    <motion.button
      ref={ref}
      type={type ?? "button"}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      className={`${base} ${styles}`}
    >
      {children}
    </motion.button>
  );

  if (href) return <a href={href}>{inner}</a>;
  return inner;
}

/* ---------- Data ---------- */

const services = [
  { icon: Instagram, title: "Instagram Reels", desc: "Scroll-stopping vertical edits crafted for retention & shares." },
  { icon: Youtube, title: "YouTube Shorts", desc: "Punchy openers, tight pacing, and hooks tuned for the algorithm." },
  { icon: TrendingUp, title: "Promotional Videos", desc: "Campaign-ready films that convert viewers into customers." },
  { icon: Film, title: "Brand Videos", desc: "Story-first cinematic pieces that carry your brand voice." },
  { icon: Sparkles, title: "Motion Graphics", desc: "Custom animated titles, transitions, and lower thirds." },
  { icon: Palette, title: "Color Grading", desc: "Cinematic looks — teal & orange, film emulation, mood matching." },
  { icon: Music, title: "Audio Sync", desc: "Beat-matched cuts, layered SFX, and clean dialogue mastering." },
  { icon: Target, title: "Content Optimization", desc: "Thumbnails, hooks, and pacing built for platform performance." },
];

const works = [
  { src: work1, cat: "Documentary", title: "Peaks of Silence", duration: "3:24", tall: false },
  { src: work2, cat: "Fashion", title: "Neon Alley", duration: "0:45", tall: true },
  { src: work3, cat: "Product", title: "Timepiece", duration: "0:30", tall: false },
  { src: work4, cat: "Reel", title: "Studio Motion", duration: "0:22", tall: true },
  { src: work5, cat: "Short Film", title: "Analog Dreams", duration: "2:12", tall: false },
  { src: work6, cat: "Sports", title: "Sprint", duration: "1:05", tall: true },
];

const skills = [
  { name: "Video Editing", value: 96 },
  { name: "Storytelling", value: 92 },
  { name: "Transitions", value: 90 },
  { name: "Color Grading", value: 88 },
  { name: "Motion Graphics", value: 78 },
  { name: "Creative Direction", value: 85 },
  { name: "Audio Editing", value: 82 },
];

const software = [
  { name: "Adobe Premiere Pro", level: "Expert", color: "#9999FF" },
  { name: "DaVinci Resolve", level: "Advanced", color: "#FF6B6B" },
  { name: "CapCut", level: "Advanced", color: "#4F8CFF" },
  { name: "After Effects", level: "Learning", color: "#C29CFF" },
];

const experience = [
  {
    role: "Video Editor",
    company: "Azhizen Media",
    period: "2024 — Present",
    desc: "Editing social media campaigns, promotional content, and brand films for a growing roster of creators and brands.",
  },
  {
    role: "Freelance Video Editor",
    company: "Independent",
    period: "2023 — Present",
    desc: "Delivering reels, shorts, and promotional edits for clients across fitness, fashion, and lifestyle niches.",
  },
  {
    role: "Social Media Campaigns",
    company: "Various Creators",
    period: "2023 — 2024",
    desc: "Producing consistent, on-brand content pipelines that grew audience reach into the millions.",
  },
];

const achievements = [
  { icon: Trophy, title: "Winner — GDG Graphic Design Contest", year: "2023" },
  { icon: Medal, title: "1st Place — 400m Sprint", year: "2022" },
  { icon: Trophy, title: "District Football Champion", year: "2021" },
];

const testimonials = [
  {
    name: "Aarav Menon",
    role: "Content Creator",
    review: "Kesava turns raw footage into gold. My retention jumped 40% after switching editors — end of story.",
  },
  {
    name: "Priya Sharma",
    role: "Founder, Lumen Studio",
    review: "Every cut feels intentional. He understands story pacing like an editor twice his experience.",
  },
  {
    name: "Rahul Kapoor",
    role: "Marketing Lead",
    review: "Fast, creative, and reliable. Our promo reels finally match the quality of our brand.",
  },
];

/* ---------- Sections ---------- */

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [
    ["Work", "#work"],
    ["About", "#about"],
    ["Services", "#services"],
    ["Experience", "#experience"],
    ["Contact", "#contact"],
  ];
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className={`flex items-center justify-between rounded-full px-5 py-3 transition-all ${
          scrolled ? "glass-strong" : ""
        }`}>
          <a href="#top" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-white text-black font-bold">K</div>
            <span className="text-sm font-medium tracking-wide">Kesavarajaguru</span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 transition"
            >
              Hire Me <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <button
            className="md:hidden grid h-9 w-9 place-items-center rounded-full glass"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 glass-strong rounded-2xl p-3"
            >
              {links.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl hover:bg-white/5 text-sm"
                >
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-1 block px-4 py-3 rounded-xl bg-white text-black text-sm font-medium text-center"
              >
                Hire Me
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden pt-32 pb-16">
      {/* Background layers */}
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505]" />
      </motion.div>
      {/* Floating orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#4F8CFF]/20 blur-[120px] animate-float-slow" />
        <div className="absolute top-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-[#4F8CFF]/15 blur-[120px] animate-float-medium" />
      </div>

      <motion.div style={{ opacity }} className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16 items-center">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/70">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-[#4F8CFF] animate-pulse-ring" />
                  <span className="relative rounded-full h-1.5 w-1.5 bg-[#4F8CFF]" />
                </span>
                Available for projects
              </div>
            </Reveal>
            <Reveal delay={1}>
              <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight">
                <span className="text-gradient block">Cinematic</span>
                <span className="text-gradient block">Stories.</span>
                <span className="block italic font-normal" style={{ fontFamily: "var(--font-display)" }}>
                  Edited to <span className="text-accent-gradient">Captivate.</span>
                </span>
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-8 max-w-xl text-lg text-white/60 leading-relaxed">
                I'm <span className="text-white">Kesavarajaguru G K</span> — a video editor transforming raw
                footage into engaging stories that maximize engagement, storytelling, and audience retention.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <MagneticButton href="#work">
                  <Play className="h-4 w-4 fill-current" /> View My Work
                </MagneticButton>
                <MagneticButton href="#contact" variant="ghost">
                  <Mail className="h-4 w-4" /> Hire Me
                </MagneticButton>
              </div>
            </Reveal>
            <Reveal delay={4}>
              <div className="mt-14 flex flex-wrap items-center gap-3">
                <span className="text-xs uppercase tracking-[0.2em] text-white/40">Crafted with</span>
                {["Premiere Pro", "DaVinci Resolve", "CapCut"].map((s) => (
                  <span key={s} className="glass rounded-full px-3.5 py-1.5 text-xs text-white/80">
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Laptop mockup */}
          <Reveal delay={2}>
            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-10 rounded-full bg-[#4F8CFF]/20 blur-3xl" />
              <div className="relative">
                {/* Screen */}
                <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] p-2 shadow-[0_40px_80px_-20px_rgba(79,140,255,0.35)]">
                  <div className="flex items-center gap-1.5 px-2 pb-2">
                    <span className="h-2 w-2 rounded-full bg-red-500/60" />
                    <span className="h-2 w-2 rounded-full bg-yellow-500/60" />
                    <span className="h-2 w-2 rounded-full bg-green-500/60" />
                  </div>
                  <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
                    <img src={work2} alt="Reel preview" className="h-full w-full object-cover" width={900} height={1200} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      className="absolute inset-0 m-auto grid h-16 w-16 place-items-center rounded-full bg-white/95 text-black"
                    >
                      <Play className="h-6 w-6 fill-current ml-1" />
                    </motion.button>
                    {/* timeline */}
                    <div className="absolute bottom-3 left-3 right-3 space-y-1.5">
                      <div className="h-1 rounded-full bg-white/20 overflow-hidden">
                        <motion.div
                          className="h-full bg-[#4F8CFF]"
                          initial={{ width: "0%" }}
                          animate={{ width: "60%" }}
                          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-white/60 font-mono">
                        <span>00:22</span>
                        <span>REEL_FINAL.mp4</span>
                        <span>00:45</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Base */}
                <div className="mx-auto -mt-1 h-3 w-[105%] rounded-b-2xl bg-gradient-to-b from-white/10 to-transparent" />

                {/* Floating card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-6 top-6 glass rounded-2xl p-3 hidden sm:block"
                >
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#4F8CFF]/20 text-[#4F8CFF]">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-medium">Color graded</div>
                      <div className="text-[10px] text-white/50">Teal + Orange</div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-4 bottom-8 glass rounded-2xl p-3 hidden sm:block"
                >
                  <div className="flex items-center gap-2">
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/20 text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-medium">+42% retention</div>
                      <div className="text-[10px] text-white/50">After edit</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </Reveal>
        </div>
      </motion.div>

      {/* Marquee */}
      <div className="mt-20 overflow-hidden border-y border-white/5 py-6">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {[...Array(2)].flatMap((_, r) =>
            ["Premiere Pro", "DaVinci Resolve", "CapCut", "After Effects", "Storytelling", "Color Grading", "Motion Graphics"].map(
              (t, i) => (
                <div key={`${r}-${i}`} className="flex items-center gap-4 text-2xl md:text-3xl font-medium text-white/30">
                  {t}
                  <span className="text-[#4F8CFF]">✦</span>
                </div>
              ),
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#4F8CFF]/30 to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-white/10">
                <img
                  src={editorPortrait}
                  alt="Kesavarajaguru at his editing station"
                  loading="lazy"
                  width={1280}
                  height={1600}
                  className="w-full h-[560px] object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-white/50">Studio</div>
                    <div className="text-lg font-semibold">Behind the timeline</div>
                  </div>
                  <div className="glass rounded-full px-3 py-1.5 text-xs">REC ● 4K</div>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="text-xs uppercase tracking-[0.3em] text-[#4F8CFF]">About</div>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-gradient">
                Every frame is a
                <br />
                deliberate choice.
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-6 text-white/60 leading-relaxed">
                I believe the difference between good and unforgettable content lives in the cut. My work blends
                rhythmic pacing, cinematic color, and story-first editing to hold attention from first frame to last.
              </p>
              <p className="mt-4 text-white/60 leading-relaxed">
                From viral reels to full brand films, I bring a director's eye and an editor's precision — turning raw
                footage into stories audiences remember.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-8">
              <Counter to={1} suffix="+" label="Years Experience" />
              <Counter to={100} suffix="+" label="Videos Edited" />
              <Counter to={100} suffix="%" label="Client Satisfaction" />
              <Counter to={3} suffix="M+" label="Potential Reach" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <div className="text-xs uppercase tracking-[0.3em] text-[#4F8CFF]">{eyebrow}</div>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-gradient">{title}</h2>
      </Reveal>
      {sub && (
        <Reveal delay={2}>
          <p className="mt-4 text-white/60 leading-relaxed">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="relative py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Services"
          title="What I craft, end to end."
          sub="From vertical scroll-stoppers to cinematic brand pieces — a full editing suite tuned for modern platforms."
        />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i % 4}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative h-full overflow-hidden rounded-2xl glass p-6"
              >
                <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#4F8CFF]/0 group-hover:bg-[#4F8CFF]/15 blur-3xl transition-all duration-500" />
                <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-white/5 border border-white/10 text-white group-hover:text-[#4F8CFF] group-hover:border-[#4F8CFF]/40 transition-colors">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="relative mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="relative mt-2 text-sm text-white/55 leading-relaxed">{s.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Works({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section id="work" className="relative py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Featured Works"
          title="Selected edits."
          sub="A rotating reel of recent projects — reels, shorts, brand films, and product spots."
        />
        <div className="mt-16 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {works.map((w, i) => (
            <Reveal key={w.title} delay={i % 3} className="mb-5 break-inside-avoid">
              <motion.button
                onClick={() => onOpen(i)}
                whileHover="hover"
                className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 text-left"
              >
                <div className={`relative overflow-hidden ${w.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                  <motion.img
                    src={w.src}
                    alt={w.title}
                    loading="lazy"
                    variants={{ hover: { scale: 1.08 } }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <motion.div
                    variants={{ hover: { opacity: 1 } }}
                    initial={{ opacity: 0 }}
                    className="absolute inset-0 grid place-items-center bg-black/30"
                  >
                    <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-black">
                      <Play className="h-6 w-6 fill-current ml-1" />
                    </div>
                  </motion.div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-[#4F8CFF]">{w.cat}</div>
                    <div className="mt-1 text-lg font-semibold">{w.title}</div>
                  </div>
                  <div className="glass rounded-full px-3 py-1 text-xs font-mono">{w.duration}</div>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectModal({ index, onClose }: { index: number | null; onClose: () => void }) {
  const w = index !== null ? works[index] : null;
  return (
    <AnimatePresence>
      {w && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-black/80 backdrop-blur-md p-4 sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl glass-strong bg-[#0a0a0a]/95"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full glass hover:bg-white/10"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="relative aspect-video overflow-hidden rounded-t-3xl">
              <img src={w.src} alt={w.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-xs uppercase tracking-[0.25em] text-[#4F8CFF]">{w.cat}</div>
                <h3 className="mt-2 text-3xl sm:text-4xl font-bold">{w.title}</h3>
              </div>
              <button className="absolute inset-0 m-auto grid h-20 w-20 place-items-center rounded-full bg-white/95 text-black hover:scale-105 transition">
                <Play className="h-8 w-8 fill-current ml-1" />
              </button>
            </div>
            <div className="grid gap-8 p-6 sm:p-10 md:grid-cols-2">
              <div>
                <h4 className="text-xs uppercase tracking-[0.2em] text-white/50">Before → After</h4>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="aspect-video rounded-xl bg-white/5 border border-white/10 grid place-items-center text-xs text-white/40">Raw footage</div>
                  <div className="aspect-video rounded-xl overflow-hidden border border-[#4F8CFF]/30">
                    <img src={w.src} alt="" className="h-full w-full object-cover" />
                  </div>
                </div>
                <h4 className="mt-6 text-xs uppercase tracking-[0.2em] text-white/50">Editing Process</h4>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-[#4F8CFF] shrink-0" /> Rough cut & pacing pass</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-[#4F8CFF] shrink-0" /> Sound design & beat sync</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-[#4F8CFF] shrink-0" /> Cinematic color grade</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 mt-0.5 text-[#4F8CFF] shrink-0" /> Motion graphics & titles</li>
                </ul>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-3">
                  <InfoTile label="Timeline" value="5 days" icon={Clock} />
                  <InfoTile label="Duration" value={w.duration} icon={Video} />
                  <InfoTile label="Software" value="Premiere + Resolve" icon={Layers} />
                  <InfoTile label="Deliverable" value="4K master" icon={Film} />
                </div>
                <h4 className="mt-6 text-xs uppercase tracking-[0.2em] text-white/50">Client Goals</h4>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  A cinematic {w.cat.toLowerCase()} edit that holds viewers past the 3-second scroll and drives
                  measurable engagement.
                </p>
                <h4 className="mt-4 text-xs uppercase tracking-[0.2em] text-white/50">Final Result</h4>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  Delivered on brief, on time. Retention lift of 30–45% versus the client's previous baseline.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function InfoTile({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 text-white/50">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[10px] uppercase tracking-[0.2em]">{label}</span>
      </div>
      <div className="mt-1.5 text-sm font-semibold">{value}</div>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="relative py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader eyebrow="Experience" title="A timeline of work." />
        <div className="mt-16 relative">
          <div className="absolute left-5 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
          <div className="space-y-10">
            {experience.map((e, i) => (
              <Reveal key={e.role} delay={i}>
                <div className={`relative grid sm:grid-cols-2 gap-6 ${i % 2 ? "sm:[&>*:first-child]:col-start-2" : ""}`}>
                  <div className={`pl-16 sm:pl-0 ${i % 2 ? "sm:pl-16 sm:text-left" : "sm:pr-16 sm:text-right"}`}>
                    <div className="glass rounded-2xl p-6">
                      <div className="text-xs uppercase tracking-[0.2em] text-[#4F8CFF]">{e.period}</div>
                      <h3 className="mt-2 text-xl font-semibold">{e.role}</h3>
                      <div className="text-sm text-white/60">{e.company}</div>
                      <p className="mt-3 text-sm text-white/60 leading-relaxed">{e.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-5 sm:left-1/2 top-6 -translate-x-1/2 grid h-4 w-4 place-items-center">
                    <span className="absolute inset-0 rounded-full bg-[#4F8CFF]/30 animate-pulse-ring" />
                    <span className="relative h-3 w-3 rounded-full bg-[#4F8CFF] ring-4 ring-[#050505]" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader eyebrow="Skills" title="Craft, distilled." />
        <div className="mt-16 grid gap-x-16 gap-y-6 md:grid-cols-2">
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i % 4}>
              <SkillBar name={s.name} value={s.value} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ name, value }: { name: string; value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref}>
      <div className="flex justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="tabular-nums text-white/50">{value}%</span>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg,#4F8CFF,#ffffff)" }}
        />
      </div>
    </div>
  );
}

function Software() {
  return (
    <section id="software" className="relative py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader eyebrow="Toolkit" title="Software I live in." />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {software.map((s, i) => (
            <Reveal key={s.name} delay={i}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl glass p-8 text-center"
              >
                <div
                  className="absolute inset-x-0 -top-20 h-40 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
                  style={{ background: s.color }}
                />
                <div
                  className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-white/10 text-2xl font-bold"
                  style={{ color: s.color, background: `${s.color}12` }}
                >
                  {s.name[0]}
                </div>
                <div className="relative mt-5 text-base font-semibold">{s.name}</div>
                <div className="relative mt-1 text-xs uppercase tracking-[0.2em] text-white/50">{s.level}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="relative py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader eyebrow="Achievements" title="Beyond the timeline." />
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass rounded-2xl p-8 h-full"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#4F8CFF]/15 text-[#4F8CFF]">
                  <a.icon className="h-6 w-6" />
                </div>
                <div className="mt-6 text-xs uppercase tracking-[0.2em] text-white/50">{a.year}</div>
                <div className="mt-2 text-lg font-semibold leading-snug">{a.title}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader eyebrow="Testimonials" title="Kind words from clients." />
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i}>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                className="glass rounded-2xl p-7 h-full"
              >
                <div className="flex gap-0.5 text-[#4F8CFF]">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-white/75 leading-relaxed">"{t.review}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className="grid h-11 w-11 place-items-center rounded-full text-sm font-semibold"
                    style={{
                      background: `linear-gradient(135deg, hsl(${i * 90},70%,60%), hsl(${i * 90 + 60},70%,45%))`,
                    }}
                  >
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-white/50">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };
  return (
    <section id="contact" className="relative py-32 border-t border-white/5 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 -translate-x-1/2 top-1/4 h-[400px] w-[600px] rounded-full bg-[#4F8CFF]/15 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.3em] text-[#4F8CFF]">Contact</div>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-4 text-5xl md:text-7xl font-bold leading-[1] text-gradient">
              Let's build
              <br />
              <span className="italic font-normal">something worth watching.</span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={2}>
          <form onSubmit={submit} className="mt-16 glass-strong rounded-3xl p-6 sm:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" placeholder="Your full name" />
              <Field label="Email" name="email" type="email" placeholder="you@studio.com" />
              <Field label="Project Type" name="type" placeholder="Reel, Short, Brand film…" />
              <Field label="Budget" name="budget" placeholder="$500 – $2,000" />
            </div>
            <div className="mt-5">
              <label className="block text-xs uppercase tracking-[0.2em] text-white/50">Message</label>
              <textarea
                required
                rows={5}
                placeholder="Tell me about your project, timeline, and vision…"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-[#4F8CFF]/60 focus:bg-white/[0.05] transition resize-none"
              />
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-white/50">Replies within 24 hours.</div>
              <div className="flex flex-wrap gap-3">
                <MagneticButton variant="ghost">
                  <Mail className="h-4 w-4" /> Book a Project
                </MagneticButton>
                <MagneticButton type="submit">
                  {sent ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" /> Sent
                    </>
                  ) : (
                    <>
                      Let's Work Together <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </MagneticButton>
              </div>
            </div>
          </form>
        </Reveal>

        <Reveal delay={3}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: Instagram, label: "Instagram", href: "#" },
              { icon: Linkedin, label: "LinkedIn", href: "#" },
              { icon: Youtube, label: "YouTube", href: "#" },
              { icon: Github, label: "Behance", href: "#" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="group inline-flex items-center gap-2 rounded-full glass px-4 py-2.5 text-sm hover:bg-white/10 transition"
              >
                <s.icon className="h-4 w-4 text-[#4F8CFF] group-hover:text-white transition" />
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, name, placeholder, type = "text" }: { label: string; name: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.2em] text-white/50" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-[#4F8CFF]/60 focus:bg-white/[0.05] transition"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-wrap items-center justify-between gap-4 text-sm text-white/50">
        <div>© {new Date().getFullYear()} Kesavarajaguru G K. All rights reserved.</div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Currently accepting new projects
        </div>
      </div>
    </footer>
  );
}

/* ---------- Mouse glow ---------- */
function MouseGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 100, damping: 20 });
  const sy = useSpring(y, { stiffness: 100, damping: 20 });
  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed top-0 left-0 z-40 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 mix-blend-screen hidden lg:block"
    >
      <div className="h-full w-full rounded-full bg-[#4F8CFF]/25 blur-[100px]" />
    </motion.div>
  );
}

/* ---------- Root ---------- */
function Portfolio() {
  const [modal, setModal] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#4F8CFF] selection:text-black overflow-x-hidden">
      <MouseGlow />
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Works onOpen={setModal} />
        <Experience />
        <Skills />
        <Software />
        <Achievements />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ProjectModal index={modal} onClose={() => setModal(null)} />
    </div>
  );
}
