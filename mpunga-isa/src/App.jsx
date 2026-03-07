// Mpunga Internal Security Advisory — Landing Page
// Aesthetic: Military Intelligence × Tactical Luxury
// Fully responsive: mobile, tablet, desktop

import { useEffect, useRef, useState } from "react";

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navHeight = 68;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: "smooth" });
}

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Global Styles ─────────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500&family=Courier+Prime:wght@400;700&display=swap');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

  :root {
    --gold:        #C9A84C;
    --gold-light:  #E8C97A;
    --gold-dim:    #7A6230;
    --obsidian:    #080A0E;
    --deep:        #0D1117;
    --surface:     #111827;
    --surface-2:   #1A2233;
    --border:      rgba(201,168,76,0.18);
    --text:        #E8E4D9;
    --muted:       #7A8099;
    --font-display: 'Cormorant Garamond', serif;
    --font-body:    'DM Sans', sans-serif;
    --font-mono:    'Courier Prime', monospace;
    --nav-h:       68px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: auto; font-size: 16px; width: 100%; max-width: 100%; }

  body {
    background: var(--obsidian);
    color: var(--text);
    font-family: var(--font-body);
    font-weight: 300;
    line-height: 1.7;
    overflow-x: hidden;
    min-height: 100vh;
    width: 100%;
    max-width: 100%;
  }

  #root {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }

  main {
    width: 100%;
  }

  section {
    width: 100%;
    box-sizing: border-box;
  }

  footer {
    width: 100%;
    box-sizing: border-box;
  }

  /* Noise texture */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.35;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--obsidian); }
  ::-webkit-scrollbar-thumb { background: var(--gold-dim); border-radius: 2px; }

  /* Reveal animations */
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.22s; }
  .reveal-delay-3 { transition-delay: 0.36s; }

  /* Gold rule */
  .gold-rule {
    display: block;
    width: 48px; height: 2px;
    background: linear-gradient(90deg, var(--gold), transparent);
    margin-bottom: 1rem;
  }

  /* Corner marks */
  .corner-mark { position: relative; }
  .corner-mark::before, .corner-mark::after {
    content: '';
    position: absolute;
    width: 12px; height: 12px;
    border-color: var(--gold-dim);
    border-style: solid;
    opacity: 0.5;
  }
  .corner-mark::before { top: 0; left: 0; border-width: 1px 0 0 1px; }
  .corner-mark::after  { bottom: 0; right: 0; border-width: 0 1px 1px 0; }

  /* Section label */
  .section-label {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    opacity: 0.85;
  }

  /* Buttons — strip all default browser styles */
  button { -webkit-appearance: none; appearance: none; }
  button:focus, button:focus-visible,
  a:focus, a:focus-visible { outline: none; }

  /* Primary CTA */
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 28px;
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%);
    background-size: 200% 200%;
    color: #080A0E;
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: background-position 0.4s ease, transform 0.2s ease, box-shadow 0.3s ease;
    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
    white-space: nowrap;
  }
  .btn-primary:hover {
    background-position: right center;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(201,168,76,0.35);
  }

  /* Outline button */
  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 24px;
    border: 1px solid var(--gold-dim);
    color: var(--gold);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
    white-space: nowrap;
  }
  .btn-outline:hover {
    background: rgba(201,168,76,0.08);
    border-color: var(--gold);
    color: var(--gold-light);
  }

  /* Nav button */
  .nav-btn {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    transition: color 0.2s;
    padding: 4px 0;
  }
  .nav-btn:hover { color: var(--gold); }



  /* Service card */
  .service-card {
    position: relative;
    padding: 28px 24px;
    background: var(--surface);
    border: 1px solid var(--border);
    transition: border-color 0.3s ease, transform 0.3s ease;
    overflow: hidden;
  }
  .service-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }
  .service-card:hover { border-color: var(--gold-dim); transform: translateY(-3px); }
  .service-card:hover::before { transform: scaleX(1); }

  /* Compare cells */
  .compare-cell {
    padding: 24px 20px;
    border: 1px solid var(--border);
    background: var(--surface);
  }

  /* Footer links */
  .footer-link {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--muted);
    text-decoration: none;
    font-size: 0.85rem;
    transition: color 0.2s;
  }
  .footer-link:hover { color: var(--gold); }

  .material-icons.lg { font-size: 32px; }
  .material-icons.xl { font-size: 44px; }

  /* ─── RESPONSIVE BREAKPOINTS ──────────────────────────────────────────── */

  /* Desktop default: show nav links, hide hamburger and mobile menu */
  .desktop-nav-links { display: flex; }
  .hamburger { display: none; }
  .mobile-menu { display: none; }

  /* Tablet & below (≤ 900px) */
  @media (max-width: 900px) {
    .desktop-nav-links { display: none !important; }
    .hamburger { display: flex !important; }
    .mobile-menu {
      position: fixed;
      top: var(--nav-h);
      left: 0; right: 0;
      background: rgba(8,10,14,0.97);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      padding: 24px 24px 32px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      z-index: 99;
      transform: translateY(-110%);
      visibility: hidden;
      transition: transform 0.3s ease, visibility 0.3s ease;
      pointer-events: none;
    }
    .mobile-menu.open {
      transform: translateY(0);
      visibility: visible;
      pointer-events: all;
    }

    .hero-section { padding: 100px 24px 60px !important; }
    .hero-title { font-size: clamp(2.4rem, 8vw, 4rem) !important; }
    .hero-stats { gap: 32px !important; }

    .section-pad { padding: 72px 24px !important; }

    .compare-grid {
      grid-template-columns: 1fr !important;
    }
    .compare-vs {
      width: 100% !important;
      height: 48px !important;
      flex-direction: row !important;
    }
    .compare-vs .vs-bar { width: auto !important; height: 1px !important; flex: 1 !important; }

    .services-grid { grid-template-columns: 1fr !important; }

    .bio-grid {
      grid-template-columns: 1fr !important;
      gap: 48px !important;
    }
    .bio-shield { display: none !important; }

    .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
  }

  /* Mobile (≤ 600px) */
  @media (max-width: 600px) {
    .hero-section { padding: 88px 20px 48px !important; }
    .hero-title { font-size: clamp(2rem, 9vw, 3rem) !important; }
    .hero-sub { font-size: 0.95rem !important; }
    .hero-btns { flex-direction: column !important; align-items: flex-start !important; }
    .hero-stats { flex-direction: column !important; gap: 20px !important; }
    .stat-item { display: flex !important; align-items: center !important; gap: 16px !important; }

    .section-pad { padding: 60px 20px !important; }
    .section-title { font-size: clamp(1.6rem, 6vw, 2.4rem) !important; }

    .compare-cell { padding: 20px 16px !important; }

    .footer-grid { grid-template-columns: 1fr !important; }
    .footer-pad { padding: 48px 20px 32px !important; }

    .nav-pad { padding: 0 20px !important; }
  }
`;

// ─── NAV ──────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    setMenuOpen(false);
    setTimeout(() => scrollToSection(id), menuOpen ? 320 : 0);
  };

  const navLinks = [
    { id: "services",  label: "Services" },
    { id: "probleme",  label: "Problématique" },
    { id: "bio",       label: "À Propos" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: "var(--nav-h)",
        padding: "0 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "background 0.4s ease",
        background: scrolled || menuOpen ? "rgba(8,10,14,0.96)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid var(--border)" : "1px solid transparent",
      }} className="nav-pad">

        {/* Logo */}
        <button
          onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: 0, outline: "none" }}
        >
          <span className="material-icons" style={{ color: "var(--gold)", fontSize: 20 }}>verified_user</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, letterSpacing: "0.05em", color: "var(--text)" }}>
            MPUNGA <span style={{ color: "var(--gold)" }}>ISA</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="desktop-nav-links" style={{ gap: 32, alignItems: "center" }}>
          {navLinks.map(({ id, label }) => (
            <button key={id} className="nav-btn" onClick={() => handleNav(id)}>{label}</button>
          ))}
          <a href="https://wa.me/243815695616" target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: "10px 20px", fontSize: "0.68rem" }}>
            <span className="material-icons" style={{ fontSize: 14 }}>chat</span>
            Contact
          </a>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          style={{ flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4, outline: "none" }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: 22, height: 1.5,
              background: menuOpen ? (i === 1 ? "transparent" : "var(--gold)") : "var(--text)",
              transition: "transform 0.3s ease, opacity 0.3s ease",
              transform: menuOpen
                ? i === 0 ? "translateY(6.5px) rotate(45deg)"
                : i === 2 ? "translateY(-6.5px) rotate(-45deg)" : "none"
                : "none",
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {navLinks.map(({ id, label }) => (
          <button key={id} className="nav-btn" style={{ fontSize: "0.85rem", padding: "8px 0", textAlign: "left" }} onClick={() => handleNav(id)}>
            {label}
          </button>
        ))}
        <a href="https://wa.me/243815695616" target="_blank" rel="noreferrer" className="btn-primary" style={{ alignSelf: "flex-start", marginTop: 8 }}>
          <span className="material-icons" style={{ fontSize: 16 }}>chat</span>
          Consultation WhatsApp
        </a>
      </div>
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero-section" style={{
      minHeight: "100vh",
      width: "100%",
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "120px 48px 80px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Glow */}
      <div style={{ position: "absolute", top: "20%", right: "-5%", width: 500, height: 500, background: "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />
      {/* Stamp — large, centered in right free space */}
      <div style={{
        position: "absolute",
        top: "50%", right: "6%",
        transform: "translateY(-50%) rotate(-12deg)",
        pointerEvents: "none",
        userSelect: "none",
        border: "1.5px solid rgba(201,168,76,0.22)",
        padding: "8px 18px",
        opacity: 0.18,
      }}>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
          letterSpacing: "0.45em",
          color: "var(--gold)",
          textTransform: "uppercase",
          display: "block",
          whiteSpace: "nowrap",
        }}>CONFIDENTIEL</span>
        <div style={{ width: "100%", height: "2px", background: "rgba(201,168,76,0.4)", marginTop: 6 }} />
      </div>

      <div style={{ maxWidth: 820, position: "relative", width: "100%" }}>
        <div className="section-label reveal visible" style={{ marginBottom: 20 }}>
          // Mpunga Internal Security Advisory
        </div>

        <h1 className="reveal visible hero-title" style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.6rem, 6vw, 5.5rem)",
          fontWeight: 700, lineHeight: 1.08,
          letterSpacing: "-0.02em", color: "var(--text)",
        }}>
          Votre plus grande
          <br />
          <span style={{ background: "linear-gradient(90deg, var(--gold-light), var(--gold))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            menace n'est pas
          </span>
          <br />
          à l'extérieur.
        </h1>

        <p className="reveal reveal-delay-1 visible hero-sub" style={{ fontSize: "1rem", color: "var(--muted)", maxWidth: 540, margin: "24px 0 40px", lineHeight: 1.8, fontWeight: 300 }}>
          Audit, Contrôle et Formation pour éradiquer le vol, le détournement
          et la corruption au sein de votre structure — avant qu'ils ne vous ruinent.
        </p>

        <div className="reveal reveal-delay-2 visible hero-btns" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href="https://wa.me/243815695616" target="_blank" rel="noreferrer" className="btn-primary">
            <span className="material-icons" style={{ fontSize: 16 }}>chat</span>
            Consultation Immédiate
          </a>
          <button className="btn-outline" onClick={() => scrollToSection("services")}>
            <span className="material-icons" style={{ fontSize: 15 }}>arrow_downward</span>
            Nos Services
          </button>
        </div>

        <div className="reveal reveal-delay-3 visible hero-stats" style={{ display: "flex", gap: 32, marginTop: 64, paddingTop: 32, borderTop: "1px solid var(--border)", flexWrap: "wrap", alignItems: "center" }}>
          <span className="material-icons" style={{ color: "var(--gold)", fontSize: 18, opacity: 0.7 }}>verified_user</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)" }}>Licencié en Criminologie</span>
          <span style={{ color: "var(--gold-dim)", opacity: 0.4 }}>·</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)" }}>Spécialiste en Sécurité Intérieure</span>
        </div>
      </div>
    </section>
  );
}

// ─── PROBLÈME ─────────────────────────────────────────────────────────────
function Probleme() {
  const [revealRef, visible] = useReveal();
  return (
    <section id="probleme" className="section-pad" style={{ padding: "88px 48px", background: "var(--deep)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={revealRef}>
          <div className={`reveal ${visible ? "visible" : ""}`}>
            <span className="gold-rule" />
            <div className="section-label" style={{ marginBottom: 10 }}>// La Problématique</div>
            <h2 className="section-title" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2, maxWidth: 580, marginBottom: 48 }}>
              La sécurité classique ne voit pas ce qui se passe{" "}
              <span style={{ color: "var(--gold)" }}>de l'intérieur.</span>
            </h2>
          </div>

          {/* Comparison grid */}
          <div className="compare-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "stretch" }}>
            {/* Left */}
            <div className={`compare-cell corner-mark reveal ${visible ? "visible" : ""}`}>
              <div className="section-label" style={{ marginBottom: 18, color: "var(--muted)" }}>Sécurité Classique</div>
              {[["security","Caméras de surveillance"],["lock","Contrôle d'accès physique"],["shield","Gardes de sécurité"],["wifi_off","Pare-feux réseau"]].map(([icon, label]) => (
                <div key={icon} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, opacity: 0.6 }}>
                  <span className="material-icons" style={{ fontSize: 18, color: "#4A5568", flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontSize: "0.85rem", color: "var(--muted)", textDecoration: "line-through", textDecorationColor: "rgba(255,255,255,0.15)" }}>{label}</span>
                </div>
              ))}
              <div style={{ marginTop: 24, padding: "10px 14px", background: "rgba(255,80,80,0.06)", border: "1px solid rgba(255,80,80,0.2)", fontSize: "0.78rem", color: "#F87171" }}>
                <span className="material-icons" style={{ fontSize: 13, verticalAlign: "middle", marginRight: 5 }}>warning</span>
                Inefficace contre les menaces internes
              </div>
            </div>

            {/* VS */}
            <div className="compare-vs" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 70, background: "var(--obsidian)", flexDirection: "column", gap: 8 }}>
              <div className="vs-bar" style={{ width: 1, flex: 1, background: "var(--border)" }} />
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, color: "var(--gold)", padding: "0 10px" }}>VS</div>
              <div className="vs-bar" style={{ width: 1, flex: 1, background: "var(--border)" }} />
            </div>

            {/* Right */}
            <div className={`compare-cell corner-mark reveal reveal-delay-2 ${visible ? "visible" : ""}`} style={{ background: "var(--surface-2)", borderColor: "var(--gold-dim)" }}>
              <div className="section-label" style={{ marginBottom: 18 }}>Sécurité Interne — Mpunga ISA</div>
              {[["payments","Détection des falsifications de factures"],["engineering","Audit des processus internes"],["verified_user","Lutte contre la corruption"],["manage_accounts","Formation à l'intégrité"]].map(([icon, label]) => (
                <div key={icon} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span className="material-icons" style={{ fontSize: 18, color: "var(--gold)", flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontSize: "0.85rem", color: "var(--text)" }}>{label}</span>
                </div>
              ))}
              <div style={{ marginTop: 24, padding: "10px 14px", background: "rgba(201,168,76,0.07)", border: "1px solid var(--gold-dim)", fontSize: "0.78rem", color: "var(--gold)" }}>
                <span className="material-icons" style={{ fontSize: 13, verticalAlign: "middle", marginRight: 5 }}>check_circle</span>
                Neutralise la menace avant qu'elle ne s'amplifie
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────
function Services() {
  const [revealRef, visible] = useReveal();
  const services = [
    { icon: "security", num: "01", title: "Audit de Sécurité Interne", desc: "Analyse approfondie de vos flux financiers, processus RH et chaînes d'approvisionnement. Identification précise des vulnérabilités exploitées en interne.", tags: ["Analyse des risques", "Rapport confidentiel", "Plan d'action"] },
    { icon: "verified_user", num: "02", title: "Contrôle Interne", desc: "Conception et mise en place de procédures de gouvernance sécurisées. Systèmes de validation croisée pour bloquer toute tentative de détournement.", tags: ["Procédures SOC", "Gouvernance", "Traçabilité"] },
    { icon: "engineering", num: "03", title: "Formation & Sensibilisation", desc: "Instaurer une culture de l'intégrité à tous les niveaux de votre organisation. Protocoles de détection et de remontée d'information.", tags: ["Ateliers en présentiel", "Culture d'intégrité", "Prévention"] },
  ];

  return (
    <section id="services" className="section-pad" style={{ padding: "88px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={revealRef}>
          <div className={`reveal ${visible ? "visible" : ""}`}>
            <span className="gold-rule" />
            <div className="section-label" style={{ marginBottom: 10 }}>// Nos Services</div>
            <h2 className="section-title" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700, marginBottom: 48, lineHeight: 1.2 }}>
              Trois piliers pour{" "}
              <span style={{ color: "var(--gold)" }}>sécuriser votre organisation.</span>
            </h2>
          </div>

          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
            {services.map((s, i) => (
              <div key={s.num} className={`service-card corner-mark reveal reveal-delay-${i + 1} ${visible ? "visible" : ""}`}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                  <span className="material-icons lg" style={{ color: "var(--gold)" }}>{s.icon}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "3.5rem", fontWeight: 700, color: "rgba(201,168,76,0.08)", lineHeight: 1 }}>{s.num}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 600, marginBottom: 12, lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.75, marginBottom: 20 }}>{s.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.tags.map(tag => (
                    <span key={tag} style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "3px 8px", border: "1px solid var(--border)", color: "var(--muted)" }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── BIO ──────────────────────────────────────────────────────────────────
function Bio() {
  const [revealRef, visible] = useReveal();
  return (
    <section id="bio" className="section-pad" style={{ padding: "88px 48px", background: "var(--deep)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={revealRef} className="bio-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 72, alignItems: "center" }}>

          {/* Shield — hidden on mobile */}
          <div className={`bio-shield reveal ${visible ? "visible" : ""}`} style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: 260, height: 260, border: "1px solid var(--border)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <div style={{ width: 200, height: 200, border: "1px solid var(--gold-dim)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)" }}>
                  <div style={{ textAlign: "center" }}>
                    <span className="material-icons xl" style={{ color: "var(--gold)", display: "block", marginBottom: 8 }}>military_tech</span>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: "var(--gold)", letterSpacing: "0.08em" }}>LYCKENS</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.3em", color: "var(--muted)", marginTop: 4 }}>MPUNGA · ISA</div>
                  </div>
                </div>
                {[0, 72, 144, 216, 288].map((deg) => (
                  <div key={deg} style={{ position: "absolute", top: "50%", left: "50%", width: 5, height: 5, background: "var(--gold)", borderRadius: "50%", transform: `rotate(${deg}deg) translateX(129px) translateY(-50%)`, opacity: 0.45 }} />
                ))}
              </div>
              {[{ label: "CRIMINOLOGIE", deg: -15, top: -18, right: -36 }, { label: "SÉCURITÉ INTÉRIEURE", deg: 8, bottom: -18, left: -36 }].map(({ label, deg, ...pos }) => (
                <div key={label} style={{ position: "absolute", ...pos, transform: `rotate(${deg}deg)`, border: "1px solid var(--gold-dim)", padding: "4px 10px", background: "var(--surface)" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div className={`reveal reveal-delay-1 ${visible ? "visible" : ""}`}>
            <span className="gold-rule" />
            <div className="section-label" style={{ marginBottom: 10 }}>// À Propos du Consultant</div>
            <h2 className="section-title" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, lineHeight: 1.25, marginBottom: 20 }}>
              Lyckens Mpunga —<br />
              <span style={{ color: "var(--gold)" }}>Expert en sécurité intérieure</span>{" "}
              à votre service.
            </h2>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.85, marginBottom: 16 }}>
              Titulaire d'une licence en criminologie avec une spécialisation en sécurité intérieure, Lyckens Mpunga accompagne les organisations dans l'identification et la neutralisation de leurs vulnérabilités internes.
            </p>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.85, marginBottom: 36 }}>
              Son approche repose sur une méthodologie rigoureuse, une totale discrétion et un diagnostic honnête — pour bâtir une culture d'intégrité durable au sein de votre structure.
            </p>
            <a href="https://wa.me/243815695616" target="_blank" rel="noreferrer" className="btn-primary">
              <span className="material-icons" style={{ fontSize: 16 }}>chat</span>
              Consulter Lyckens Mpunga
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer-pad" style={{ padding: "56px 48px 36px", background: "var(--obsidian)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span className="material-icons" style={{ color: "var(--gold)", fontSize: 18 }}>verified_user</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, letterSpacing: "0.05em" }}>
                MPUNGA <span style={{ color: "var(--gold)" }}>ISA</span>
              </span>
            </div>
            <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.8, maxWidth: 260 }}>
              Internal Security Advisory — Audit, Contrôle et Formation pour protéger votre organisation de l'intérieur.
            </p>
          </div>

          <div>
            <div className="section-label" style={{ marginBottom: 18 }}>Contact Direct</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href="https://wa.me/243815695616" target="_blank" rel="noreferrer" className="footer-link">
                <span className="material-icons" style={{ fontSize: 15, color: "var(--gold-dim)" }}>chat</span>WhatsApp
              </a>
              <a href="mailto:lyckensmpunga@icloud.com" className="footer-link">
                <span className="material-icons" style={{ fontSize: 15, color: "var(--gold-dim)" }}>email</span>Email
              </a>
            </div>
          </div>

          <div>
            <div className="section-label" style={{ marginBottom: 18 }}>Réseaux</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href="https://instagram.com/colonel_mpunga_" target="_blank" rel="noreferrer" className="footer-link">
                <span className="material-icons" style={{ fontSize: 15, color: "var(--gold-dim)" }}>photo_camera</span>Instagram
              </a>
              <a href="https://facebook.com/lickensMpunga" target="_blank" rel="noreferrer" className="footer-link">
                <span className="material-icons" style={{ fontSize: 15, color: "var(--gold-dim)" }}>people</span>Facebook
              </a>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 24, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--muted)", opacity: 0.45 }}>
            © {new Date().getFullYear()} MPUNGA ISA — TOUS DROITS RÉSERVÉS
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.1em", color: "var(--muted)", opacity: 0.3 }}>
            CONFIDENTIEL · USAGE PROFESSIONNEL UNIQUEMENT
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{globalStyles}</style>
      <Nav />
      <main>
        <Hero />
        <Probleme />
        <Services />
        <Bio />
      </main>
      <Footer />
    </>
  );
}