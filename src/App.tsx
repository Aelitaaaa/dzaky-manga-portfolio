import {
  useLenisSmoothScroll,
  stopLenisScroll,
  startLenisScroll,
} from "./hooks/useLenisSmoothScroll";
import { SiGithub as Github } from "@icons-pack/react-simple-icons";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Check,
  Code2,
  Copy,
  Download,
  Mail,
  Menu,
  Moon,
  RotateCcw,
  Sparkles,
  Sun,
  X,
  Zap,
} from "lucide-react";
import { profile, projects, layers, journey } from "./data/mangaData";
import type { MangaProject } from "./data/mangaData";

const nav = [
  ["about", "Tentang"],
  ["projects", "Proyek"],
  ["stack", "Teknologi"],
  ["activity", "Aktivitas"],
  ["journey", "Perjalanan"],
];
function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55 }}
    >
      {children}
    </motion.div>
  );
}
function Heading({
  number,
  title,
  note,
}: {
  number: string;
  title: string;
  note: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">
          CHAPTER {number} / {note}
        </span>
        <h2>
          {title}
          <span className="accent">.</span>
        </h2>
      </div>
      <span className="chapter-number" aria-hidden="true">
        {number}
      </span>
    </div>
  );
}
function InkCanvas({ enabled }: { enabled: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!enabled || !canvas.current) return;
    const el = canvas.current,
      ctx = el.getContext("2d");
    if (!ctx) return;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      r: number;
    }[] = [];
    let frame = 0;
    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2);
      el.width = innerWidth * dpr;
      el.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const burst = (e: PointerEvent) => {
      for (let i = 0; i < 10; i++)
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.7) * 5,
          life: 1,
          r: Math.random() * 3 + 1,
        });
      if (!frame) frame = requestAnimationFrame(draw);
    };
    function draw() {
      ctx!.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.life -= 0.025;
        ctx!.globalAlpha = Math.max(0, p.life);
        ctx!.fillStyle = "#c47183";
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
        if (p.life <= 0) particles.splice(i, 1);
      }
      frame = particles.length ? requestAnimationFrame(draw) : 0;
    }
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointerdown", burst);
    return () => {
      cancelAnimationFrame(frame);
      ctx.clearRect(0, 0, el.width, el.height);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", burst);
    };
  }, [enabled]);
  return <canvas ref={canvas} className="ink-canvas" aria-hidden="true" />;
}
function ProjectDialog({
  project,
  onClose,
}: {
  project: MangaProject | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (project) {
      ref.current?.showModal();
      const old = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = old;
      };
    }
    ref.current?.close();
  }, [project]);
  return (
    <dialog
      data-lenis-prevent
      ref={ref}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="dialog-title"
    >
      <div className="dialog-inner">
        {project && (
          <>
            <button
              className="icon-button close"
              onClick={onClose}
              aria-label="Tutup detail proyek"
            >
              <X />
            </button>
            <span className="eyebrow">PROJECT FILE / {project.symbol}</span>
            <h2 id="dialog-title">{project.title}</h2>
            <span className="tag">{project.status}</span>
            <p>{project.description}</p>
            <h3>Di balik proyek</h3>
            <ul>
              {project.details.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="tags">
              {project.stack.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
            <p className="muted">Fokus: {project.role}</p>
            <div className="button-row">
              {project.github && (
                <a
                  className="button"
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  Repository <Github size={16} />
                </a>
              )}
              {project.demo && (
                <a
                  className="button primary"
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live demo <ArrowUpRight size={16} />
                </a>
              )}
            </div>
            {!project.github && !project.demo && (
              <p className="small muted">
                Tautan publik proyek belum tersedia.
              </p>
            )}
          </>
        )}
      </div>
    </dialog>
  );
}
function Activity() {
  const [username, setUsername] = useState(profile.githubUsername),
    [input, setInput] = useState(profile.githubUsername),
    [year, setYear] = useState("last"),
    [retry, setRetry] = useState(0);
  const [data, setData] = useState<
      { date: string; count: number; level: number }[] | null
    >(null),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!username) return;
    const abort = new AbortController();
    let live = true;
    async function load() {
      setLoading(true);
      setError("");
      setData(null);
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=${year}`,
          {
            signal: AbortSignal.any([abort.signal, AbortSignal.timeout(12000)]),
          },
        );
        if (!response.ok)
          throw Error(
            "Data belum dapat dimuat. Periksa username atau coba lagi.",
          );
        const json = await response.json();
        if (!Array.isArray(json.contributions))
          throw Error("Data kontribusi tidak tersedia.");
        if (live) setData(json.contributions);
      } catch {
        if (live)
          setError(
            "Aktivitas GitHub belum dapat dimuat. Silakan coba lagi sebentar.",
          );
      } finally {
        if (live) setLoading(false);
      }
    }
    void load();
    return () => {
      live = false;
      abort.abort();
    };
  }, [username, year, retry]);
  const total = data?.reduce((a, d) => a + d.count, 0),
    active = data?.filter((d) => d.count > 0).length;
  return (
    <div className="activity-panel panel">
      <div className="activity-top">
        <div className="inline">
          <Github />
          <strong>
            {username ? `@${username}` : "Cerita di balik setiap commit"}
          </strong>
        </div>
        <label className="small">
          Periode{" "}
          <select
            aria-label="Periode kontribusi"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="last">12 bulan terakhir</option>
            {[0, 1, 2].map((offset) => {
              const y = new Date().getFullYear() - offset;
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      {!profile.githubUsername && (
        <form
          className="github-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(input.trim())) {
              setUsername(input.trim());
              setRetry((n) => n + 1);
            } else setError("Masukkan username GitHub yang valid.");
          }}
        >
          <label htmlFor="github-user">Lihat aktivitas akun GitHub</label>
          <div className="input-row">
            <input
              id="github-user"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Username GitHub"
              maxLength={39}
              required
            />
            <button className="button primary" type="submit">
              Tampilkan <ArrowUpRight size={16} />
            </button>
          </div>
        </form>
      )}
      <div className="activity-body" aria-live="polite">
        {loading ? (
          <p className="loading">Memuat halaman kontribusi…</p>
        ) : error ? (
          <div>
            <p>{error}</p>
            {username && (
              <button className="button" onClick={() => setRetry((n) => n + 1)}>
                Coba lagi <RotateCcw size={16} />
              </button>
            )}
          </div>
        ) : data ? (
          <>
            <div className="heatmap" aria-label="Kalender kontribusi GitHub">
              {Array.from(
                {
                  length:
                    new Date(`${data[0]?.date}T00:00:00Z`).getUTCDay() || 0,
                },
                (_, i) => (
                  <span key={`empty-${i}`} />
                ),
              )}
              {data.map((d) => (
                <span
                  className={`heat-cell level-${Math.max(0, Math.min(4, d.level))}`}
                  key={d.date}
                  tabIndex={0}
                  title={`${d.date}: ${d.count} kontribusi`}
                  aria-label={`${d.date}: ${d.count} kontribusi`}
                />
              ))}
            </div>
            <div className="activity-stats">
              <span>
                <strong>{total}</strong> kontribusi
              </span>
              <span>
                <strong>{active}</strong> hari aktif
              </span>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noreferrer"
              >
                Lihat profil <ArrowUpRight size={15} />
              </a>
            </div>
            <p className="small muted">
              Data kontribusi GitHub melalui
              github-contributions-api.jogruber.de.
            </p>
          </>
        ) : (
          <div className="empty-activity">
            <Code2 size={32} />
            <p>Setiap proyek dimulai dari satu commit.</p>
            <span className="small muted">
              Akun GitHub Dzaky belum dicantumkan. Kalender akan tampil setelah
              username diisi.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
export default function App() {
  const reduced = useReducedMotion();
  const [intro, setIntro] = useState(() => {
      try {
        return !sessionStorage.getItem("manga-intro");
      } catch {
        return true;
      }
    }),
    [menu, setMenu] = useState(false),
    [dark, setDark] = useState(() => {
      try {
        return localStorage.getItem("manga-theme") === "dark";
      } catch {
        return false;
      }
    }),
    [motionOn, setMotionOn] = useState(true),
    [filter, setFilter] = useState("Semua"),
    [project, setProject] = useState<MangaProject | null>(null),
    [inked, setInked] = useState(false),
    [layer, setLayer] = useState(0),
    [tech, setTech] = useState(0),
    [copied, setCopied] = useState(false);
  const effects = motionOn && !reduced;
  useLenisSmoothScroll(effects);
  useEffect(() => {
    if (project) stopLenisScroll();
    else startLenisScroll();
  }, [project, effects]);
  const [reset, setReset] = useState(0),
    [activeSection, setActiveSection] = useState("");
  const hero = useRef<HTMLDivElement>(null),
    copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollYProgress } = useScroll(),
    progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 }),
    heroY = useTransform(scrollYProgress, [0, 0.2], [0, 70]);
  useEffect(() => {
    const timer = setTimeout(
      () => {
        setIntro(false);
        try {
          sessionStorage.setItem("manga-intro", "1");
        } catch {
          /* storage optional */
        }
      },
      effects ? 1600 : 100,
    );
    return () => clearTimeout(timer);
  }, [effects]);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try {
      localStorage.setItem("manga-theme", dark ? "dark" : "light");
    } catch {
      /* storage optional */
    }
  }, [dark]);
  useEffect(() => {
    document.documentElement.dataset.motion = effects ? "on" : "off";
  }, [effects]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document
      .querySelectorAll("section[id]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );
  const selectedTech = layers[layer].items[tech];
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }
  return (
    <MotionConfig reducedMotion={effects ? "never" : "always"}>
      <div className="site">
        <a className="skip-link" href="#main">
          Langsung ke konten
        </a>
        <InkCanvas enabled={effects} />
        <motion.div className="reading-progress" style={{ scaleX: progress }} />
        <AnimatePresence>
          {intro && (
            <motion.div
              className="intro"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: effects ? "-100%" : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="intro-mark">
                DP<span>✦</span>
              </div>
              <p>MEMBUKA CHAPTER PERTAMA…</p>
              <button onClick={() => setIntro(false)}>
                Lewati intro <ArrowUpRight size={15} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <header className="header">
          <a href="#home" className="brand" aria-label="Dzaky Putra, beranda">
            dzaky<span>✦</span>
            <small>THE DEVELOPER'S JOURNAL</small>
          </a>
          <nav
            aria-label="Navigasi utama"
            className={menu ? "nav open" : "nav"}
          >
            {nav.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={activeSection === id ? "location" : undefined}
                onClick={() => setMenu(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button"
              onClick={() => setMotionOn((v) => !v)}
              aria-label={motionOn ? "Kurangi animasi" : "Aktifkan animasi"}
              aria-pressed={motionOn}
              title="Animasi"
            >
              <Zap size={17} />
            </button>
            <button
              className="icon-button"
              onClick={() => setDark((v) => !v)}
              aria-label={dark ? "Mode terang" : "Mode malam"}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a className="contact-nav" href="#contact">
              Say hello <ArrowUpRight size={16} />
            </a>
            <button
              className="icon-button mobile-menu"
              aria-label="Buka navigasi"
              aria-expanded={menu}
              onClick={() => setMenu((v) => !v)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </header>
        <main id="main">
          <section id="home" className="hero section-wrap" ref={hero}>
            <div className="hero-copy">
              <div className="eyebrow hero-eyebrow">
                <span className="status-dot" /> PERSONAL PORTFOLIO · VOL. 01
              </div>
              <p className="hello">Halo, selamat datang di cerita saya.</p>
              <h1 aria-label="Dzaky Putra.">
                <span className="name-line">
                  {Array.from("DZAKY").map((c, i) => (
                    <motion.span
                      key={`${reset}-${i}`}
                      drag={effects}
                      dragConstraints={{
                        left: -30,
                        right: 30,
                        top: -35,
                        bottom: 35,
                      }}
                      dragSnapToOrigin
                      whileHover={
                        effects ? { y: -9, rotate: i % 2 ? 5 : -5 } : undefined
                      }
                      className="drag-letter"
                      aria-hidden="true"
                    >
                      {c}
                    </motion.span>
                  ))}
                </span>
                <span className="name-outline">
                  PUTRA<span className="accent">.</span>
                </span>
              </h1>
              <div className="role-line">
                <span /> {profile.role} <span />
              </div>
              <p className="hero-description">
                Merangkai kode, membangun ide,
                <br />
                dan menulis cerita lewat karya digital.
              </p>
              <div className="button-row">
                <a className="button primary" href="#projects">
                  Jelajahi karya <ArrowUpRight size={18} />
                </a>
                <a className="button" href="#about">
                  Kenalan dulu <BookOpen size={17} />
                </a>
                {profile.cvUrl && (
                  <a className="button" href={profile.cvUrl} download>
                    CV <Download size={16} />
                  </a>
                )}
              </div>
              <div className="hero-footnote">
                <span>BASED IN INDONESIA</span>
                <span>CODE WITH A LITTLE SOUL ♡</span>
              </div>
            </div>
            <motion.div
              className="hero-art"
              style={effects ? { y: heroY } : undefined}
            >
              <div className="art-offset" />
              <div className="art-frame">
                <img
                  src="/midnight-manga.webp"
                  alt="Ilustrasi manga programmer memakai headphone di meja kerja saat malam"
                  width="1024"
                  height="1536"
                  fetchPriority="high"
                />
                <span className="art-caption">A NEW CHAPTER BEGINS.</span>
              </div>
              <motion.div
                className="speech-bubble"
                drag={effects}
                dragConstraints={hero}
                dragSnapToOrigin
                whileHover={effects ? { rotate: -6, scale: 1.06 } : undefined}
              >
                Let's build
                <br />
                <strong>something cool!</strong>
                <span>✧</span>
              </motion.div>
              <motion.button
                key={reset}
                className="sticker"
                drag={effects}
                dragConstraints={hero}
                dragSnapToOrigin
                whileTap={{ scale: 0.9 }}
                onClick={() => setReset((n) => n + 1)}
                aria-label="Mainkan ulang stiker manga"
              >
                ✦
                <small>
                  CREATE
                  <br />
                  EXPLORE
                  <br />
                  REPEAT
                </small>
              </motion.button>
              <span className="vertical-note">
                MANGA EDITION / CODE & STORIES
              </span>
            </motion.div>
            <a className="scroll-cue" href="#about">
              <ArrowDown size={17} /> SCROLL TO READ THE STORY{" "}
              <span>001 — 007</span>
            </a>
          </section>
          <div className="ticker" aria-hidden="true">
            <div>
              {Array.from({ length: 4 }, (_, i) => (
                <span key={i}>
                  CODE WITH PURPOSE ✦ BUILD WITH CURIOSITY ✦ A STORY IN EVERY
                  PIXEL ✦{" "}
                </span>
              ))}
            </div>
          </div>
          <section id="about" className="section-wrap section-space">
            <Reveal>
              <Heading number="01" title="Di balik layar" note="TENTANG SAYA" />
            </Reveal>
            <div className={`about-grid ${inked ? "is-inked" : ""}`}>
              <Reveal className="about-card panel">
                <span className="eyebrow">THE MAIN CHARACTER</span>
                <div className="portrait-crop">
                  <img
                    src="/midnight-manga.webp"
                    alt="Karakter ilustrasi untuk portofolio Dzaky"
                    loading="lazy"
                  />
                  <span>HELLO, WORLD!</span>
                </div>
                <h3>{profile.fullName}</h3>
                <p>{profile.education}</p>
                <div className="tags">
                  <span className="tag">Web development</span>
                  <span className="tag">Creative coding</span>
                </div>
              </Reveal>
              <Reveal className="about-story">
                <span className="handwritten">Sedikit tentang saya ↙</span>
                <h3>
                  Ide sederhana.
                  <br />
                  Kemungkinan <em>tak terbatas.</em>
                </h3>
                <p>{profile.bio}</p>
                <p>
                  Saya terus belajar lewat proyek nyata dan eksperimen kecil.
                  Bagi saya, proses mencoba, memperbaiki, lalu mencoba lagi
                  adalah bagian paling seru dari membuat sesuatu.
                </p>
                <div className="mini-panels">
                  <div>
                    <Code2 />
                    <strong>Build</strong>
                    <span>Dari ide ke aplikasi</span>
                  </div>
                  <div>
                    <BookOpen />
                    <strong>Learn</strong>
                    <span>Satu langkah setiap hari</span>
                  </div>
                  <div>
                    <Sparkles />
                    <strong>Explore</strong>
                    <span>Selalu ada hal baru</span>
                  </div>
                </div>
                <button
                  className="button ink-button"
                  onClick={() => setInked((v) => !v)}
                >
                  {inked ? <RotateCcw size={16} /> : <Zap size={16} />}{" "}
                  {inked ? "Gambar ulang panel" : "Tumpahkan tinta!"}
                </button>
                <span className="small muted interactive-note">
                  Psst… panel ini bisa diajak bermain.
                </span>
              </Reveal>
              <AnimatePresence>
                {inked && (
                  <motion.div
                    className="ink-spill"
                    aria-hidden="true"
                    initial={{ clipPath: "circle(0% at 85% 80%)" }}
                    animate={{ clipPath: "circle(150% at 85% 80%)" }}
                    exit={{ clipPath: "circle(0% at 85% 80%)" }}
                    transition={{ duration: effects ? 0.7 : 0 }}
                  >
                    <strong>SPLASH!</strong>
                    <span>Every mistake is a new beginning.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
          <section id="projects" className="projects-section">
            <div className="section-wrap section-space">
              <Reveal>
                <Heading
                  number="02"
                  title="Cerita dalam karya"
                  note="SELECTED PROJECTS"
                />
                <div className="section-intro">
                  <p>
                    Beberapa ide yang saya wujudkan menjadi proyek.
                    <br />
                    Buka panelnya untuk melihat cerita di balik prosesnya.
                  </p>
                  <div className="filter" aria-label="Filter proyek">
                    {["Semua", "Full-stack", "Frontend"].map((f) => (
                      <button
                        key={f}
                        aria-pressed={filter === f}
                        className={filter === f ? "selected" : ""}
                        onClick={() => setFilter(f)}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>
              <motion.div layout className="project-grid">
                <AnimatePresence mode="popLayout">
                  {projects
                    .filter((p) => filter === "Semua" || p.category === filter)
                    .map((p) => (
                      <motion.button
                        layout
                        key={p.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        whileHover={effects ? { y: -8, rotate: -1 } : undefined}
                        className={`project-card ${p.color}`}
                        onClick={() => setProject(p)}
                      >
                        <div className="project-visual">
                          <span className="project-topline">
                            {p.label}
                            <span>/{p.year}</span>
                          </span>
                          <span className="project-symbol">{p.symbol}</span>
                          <span className="project-art-title">
                            {p.artTitle.split("\n").map((line, i) => (
                              <span key={line}>
                                {i > 0 && <br />}
                                {line}
                              </span>
                            ))}
                          </span>
                          <span className="project-open">
                            <ArrowUpRight />
                          </span>
                          <span className="visual-label">
                            {p.category === "Frontend"
                              ? "INTERFACE EXPLORATION"
                              : "WEB APPLICATION"}
                          </span>
                        </div>
                        <div className="project-info">
                          <span className="small muted">{p.status}</span>
                          <h3>{p.title}</h3>
                          <p>{p.description}</p>
                          <div className="tags">
                            {p.stack.map((t) => (
                              <span className="tag" key={t}>
                                {t}
                              </span>
                            ))}
                          </div>
                          <span className="read-story">
                            Baca cerita proyek <ArrowUpRight size={17} />
                          </span>
                        </div>
                      </motion.button>
                    ))}
                </AnimatePresence>
              </motion.div>
              <a
                className="all-repos text-button"
                href="https://github.com/Aelitaaaa?tab=repositories"
                target="_blank"
                rel="noreferrer"
              >
                Lihat semua repository di GitHub <ArrowUpRight size={16} />
              </a>
            </div>
          </section>
          <section id="stack" className="section-wrap section-space">
            <Reveal>
              <Heading
                number="03"
                title="Alat di balik karya"
                note="TECH STACK"
              />
              <p className="section-description">
                Dari tampilan sampai penyimpanan data. Pilih satu teknologi
                untuk melihat perannya.
              </p>
              <div className="pipeline">
                {layers.map((l, i) => (
                  <button
                    key={l.name}
                    className={layer === i ? "layer selected" : "layer"}
                    aria-pressed={layer === i}
                    onClick={() => {
                      setLayer(i);
                      setTech(0);
                    }}
                  >
                    <span>{l.icon}</span>
                    <strong>{l.name}</strong>
                    <small>{l.caption}</small>
                    {i < 3 && <ArrowUpRight className="connector" size={20} />}
                  </button>
                ))}
              </div>
              <div className="tech-workbench panel">
                <div className="tech-list" aria-label="Daftar teknologi">
                  {layers[layer].items.map((t, i) => (
                    <button
                      key={t.name}
                      className={tech === i ? "selected" : ""}
                      aria-pressed={tech === i}
                      onClick={() => setTech(i)}
                    >
                      <Code2 size={19} />
                      {t.name}
                      <ArrowUpRight size={15} />
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTech.name}
                    className="tech-inspector"
                    initial={{ opacity: 0, x: effects ? 15 : 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <span className="eyebrow">
                      TECHNOLOGY NOTES / {layers[layer].name}
                    </span>
                    <h3>
                      {selectedTech.name}
                      <span className="accent">_</span>
                    </h3>
                    <p>{selectedTech.detail}</p>
                    {selectedTech.project && (
                      <button
                        className="text-button"
                        onClick={() =>
                          setProject(
                            projects.find(
                              (p) => p.id === selectedTech.project,
                            )!,
                          )
                        }
                      >
                        Lihat proyek terkait <ArrowUpRight size={16} />
                      </button>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>
          </section>
          <section id="activity" className="activity-section">
            <div className="section-wrap section-space">
              <Reveal>
                <Heading
                  number="04"
                  title="Sedikit, setiap hari"
                  note="GITHUB ACTIVITY"
                />
                <p className="section-description">
                  Konsistensi kecil, perjalanan panjang. Jejak belajar dan
                  membangun lewat kode.
                </p>
                <Activity />
              </Reveal>
            </div>
          </section>
          <section id="journey" className="section-wrap section-space">
            <Reveal>
              <Heading
                number="05"
                title="Chapter demi chapter"
                note="PERJALANAN"
              />
            </Reveal>
            <div className="timeline">
              {journey.map((j, i) => (
                <Reveal key={j.year} className="timeline-row">
                  <div className="timeline-year">
                    {j.year}
                    <span>0{i + 1}</span>
                  </div>
                  <div className="timeline-copy">
                    <span className="eyebrow">{j.tag}</span>
                    <h3>{j.title}</h3>
                    <p>{j.text}</p>
                  </div>
                  <span className="timeline-star" aria-hidden="true">
                    ✦
                  </span>
                </Reveal>
              ))}
            </div>
            <p className="to-be-continued">
              To be continued <span>→</span>
            </p>
          </section>
          <section id="contact" className="contact-section">
            <div className="section-wrap">
              <div className="contact-top">
                <span className="eyebrow">CHAPTER 06 / LET'S CONNECT</span>
                <span>THE NEXT CHAPTER IS OURS.</span>
              </div>
              <Reveal>
                <h2>
                  Punya ide?
                  <br />
                  Mari <em>bercerita.</em>
                  <span className="contact-star">✦</span>
                </h2>
                <p>
                  Untuk obrolan tentang web, ide proyek,
                  <br />
                  atau sekadar bertukar cerita.
                </p>
                <div className="button-row">
                  {profile.email ? (
                    <>
                      <a
                        className="button pink-button"
                        href={`mailto:${profile.email}`}
                      >
                        Kirim pesan <Mail size={18} />
                      </a>
                      <button
                        className="button dark-outline"
                        onClick={copyEmail}
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}{" "}
                        {copied ? "Email tersalin" : "Salin email"}
                      </button>
                    </>
                  ) : (
                    <span className="contact-pending">
                      Alamat kontak akan segera ditambahkan.
                    </span>
                  )}
                  {profile.githubUsername && (
                    <a
                      className="button dark-outline"
                      href={`https://github.com/${profile.githubUsername}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub <Github size={17} />
                    </a>
                  )}
                  {profile.linkedin && (
                    <a
                      className="button dark-outline"
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn <ArrowUpRight size={17} />
                    </a>
                  )}
                </div>
              </Reveal>
              <footer>
                <a className="brand" href="#home">
                  dzaky<span>✦</span>
                </a>
                <span>
                  © {new Date().getFullYear()} Dzaky Putra. Made of code &
                  curiosity.
                </span>
                <a href="#home">Kembali ke atas ↑</a>
              </footer>
            </div>
          </section>
        </main>
        <ProjectDialog project={project} onClose={() => setProject(null)} />
      </div>
    </MotionConfig>
  );
}
