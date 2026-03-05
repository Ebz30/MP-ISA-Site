// Mpunga Internal Security Advisory — Landing Page
// Aesthetic: Military Intelligence × Tactical Luxury
// Stack: React + Google Material Icons (CDN)

import { useEffect, useRef, useState } from "react";

// ─── Smooth scroll helper (accounts for fixed nav height of 72px) ──────────
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navHeight = 72;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: "smooth" });
}

// ─── Intersection Observer Hook ────────────────────────────────────────────
function useReveal(threshold = 0.12) {
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
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: auto; }

  body {
    background: var(--obsidian);
    color: var(--text);
    font-family: var(--font-body);
    font-weight: 300;
    line-height: 1.7;
    overflow-x: hidden;
  }

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

  .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.22s; }
  .reveal-delay-3 { transition-delay: 0.36s; }
  .reveal-delay-4 { transition-delay: 0.5s; }

  .gold-rule {
    display: inline-block;
    width: 48px; height: 2px;
    background: linear-gradient(90deg, var(--gold), transparent);
    margin-bottom: 1.2rem;
  }

  .corner-mark::before, .corner-mark::after {
    content: '';
    position: absolute;
    width: 14px; height: 14px;
    border-color: var(--gold-dim);
    border-style: solid;
    opacity: 0.5;
  }
  .corner-mark::before { top: 0; left: 0; border-width: 1px 0 0 1px; }
  .corner-mark::after  { bottom: 0; right: 0; border-width: 0 1px 1px 0; }

  /* Primary gold button */
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 32px;
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%);
    background-size: 200% 200%;
    color: #080A0E;
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 0.82rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: background-position 0.4s ease, transform 0.2s ease, box-shadow 0.3s ease;
    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
  }
  .btn-primary:hover {
    background-position: right center;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(201,168,76,0.35);
  }

  /* Outline button */
  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    border: 1px solid var(--gold-dim);
    color: var(--gold);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.3s ease;
    background: transparent;
    cursor: pointer;
    clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
  }
  .btn-outline:hover {
    background: rgba(201,168,76,0.08);
    border-color: var(--gold);
    color: var(--gold-light);
  }

  /* Nav button — reset styles */
  .nav-btn {
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    transition: color 0.2s;
    padding: 0;
    outline: none;
  }
  .nav-btn:focus { outline: none; }
  .nav-btn:focus-visible { outline: none; }
  .nav-btn:hover { color: var(--gold); }

  /* Strip focus rings from all buttons and links globally */
  button:focus { outline: none; }
  button:focus-visible { outline: none; }
  a:focus { outline: none; }
  a:focus-visible { outline: none; }

  /* Service card */
  .service-card {
    position: relative;
    padding: 36px 32px;
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
  .service-card:hover { border-color: var(--gold-dim); transform: translateY(-4px); }
  .service-card:hover::before { transform: scaleX(1); }

  .compare-cell { padding: 20px 24px; border: 1px solid var(--border); background: var(--surface); }

  .section-label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    opacity: 0.8;
  }

  .material-icons.lg { font-size: 36px; }
  .material-icons.xl { font-size: 48px; }

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
`;

// ─── NAV ──────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "18px 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "background 0.4s ease",
      background: scrolled ? "rgba(8,10,14,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
    }}>
      {/* Logo → scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        <span className="material-icons" style={{ color: "var(--gold)", fontSize: 22 }}>verified_user</span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, letterSpacing: "0.05em", color: "var(--text)" }}>
          MPUNGA <span style={{ color: "var(--gold)" }}>ISA</span>
        </span>
      </button>

      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {/* Nav links → scrollToSection() */}
        {[
          { id: "services",  label: "Services" },
          { id: "probleme",  label: "Problématique" },
          { id: "bio",       label: "À Propos" },
        ].map(({ id, label }) => (
          <button key={id} className="nav-btn" onClick={() => scrollToSection(id)}>
            {label}
          </button>
        ))}

        {/* Contact → WhatsApp */}
        <a
          href="https://wa.me/243815695616"
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
          style={{ padding: "10px 20px", fontSize: "0.7rem" }}
        >
          <span className="material-icons" style={{ fontSize: 14 }}>chat</span>
          Contact
        </a>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "120px 48px 80px",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: "20%", right: "-5%",
        width: 600, height: 600,
        background: "radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: 140, right: 48,
        border: "2px solid rgba(201,168,76,0.2)",
        padding: "6px 16px",
        transform: "rotate(2deg)",
        opacity: 0.35,
        pointerEvents: "none",
      }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.3em", color: "var(--gold)", textTransform: "uppercase" }}>
          CONFIDENTIEL
        </span>
      </div>

      <div style={{ maxWidth: 820, position: "relative" }}>
        <div className="section-label reveal visible" style={{ marginBottom: 24 }}>
          // Mpunga Internal Security Advisory
        </div>
        <h1 className="reveal visible" style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3rem, 7vw, 6rem)",
          fontWeight: 700, lineHeight: 1.05,
          letterSpacing: "-0.02em", color: "var(--text)", marginBottom: 8,
        }}>
          Votre plus grande
          <br />
          <span style={{
            background: "linear-gradient(90deg, var(--gold-light), var(--gold))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            menace n'est pas
          </span>
          <br />
          à l'extérieur.
        </h1>
        <p className="reveal reveal-delay-1 visible" style={{
          fontSize: "1.05rem", color: "var(--muted)",
          maxWidth: 560, margin: "28px 0 44px", lineHeight: 1.8, fontWeight: 300,
        }}>
          Audit, Contrôle et Formation pour éradiquer le vol, le détournement
          et la corruption au sein de votre structure — avant qu'ils ne vous ruinent.
        </p>

        <div className="reveal reveal-delay-2 visible" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {/* CTA 1 → WhatsApp */}
          <a href="https://wa.me/243000000000" target="_blank" rel="noreferrer" className="btn-primary">
            <span className="material-icons" style={{ fontSize: 18 }}>chat</span>
            Consultation Immédiate
          </a>
          {/* CTA 2 → scroll to Services section */}
          <button className="btn-outline" onClick={() => scrollToSection("services")}>
            <span className="material-icons" style={{ fontSize: 16 }}>arrow_downward</span>
            Nos Services
          </button>
        </div>

        <div className="reveal reveal-delay-3 visible" style={{
          display: "flex", gap: 48, marginTop: 72,
          paddingTop: 36, borderTop: "1px solid var(--border)",
        }}>
          {[
            ["15+", "Années d'expérience"],
            ["200+", "Audits réalisés"],
            ["98%", "Taux de résolution"],
          ].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--gold)", lineHeight: 1 }}>{val}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROBLÈME ─────────────────────────────────────────────────────────────
function Probleme() {
  const [revealRef, visible] = useReveal();

  return (
    // id is on the <section> itself — separate from the reveal ref below
    <section id="probleme" style={{ padding: "100px 48px", background: "var(--deep)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Reveal ref on inner wrapper, not on the section */}
        <div ref={revealRef}>
          <div className={`reveal ${visible ? "visible" : ""}`}>
            <div className="gold-rule" />
            <div className="section-label" style={{ marginBottom: 12 }}>// La Problématique</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, lineHeight: 1.2, maxWidth: 600, marginBottom: 56 }}>
              La sécurité classique ne voit pas ce qui se passe{" "}
              <span style={{ color: "var(--gold)" }}>de l'intérieur.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 0, alignItems: "stretch" }}>
            <div className={`compare-cell corner-mark reveal ${visible ? "visible" : ""}`} style={{ position: "relative" }}>
              <div className="section-label" style={{ marginBottom: 20, color: "var(--muted)" }}>Sécurité Classique</div>
              {[
                ["security", "Caméras de surveillance"],
                ["lock", "Contrôle d'accès physique"],
                ["shield", "Gardes de sécurité"],
                ["wifi_off", "Pare-feux réseau"],
              ].map(([icon, label]) => (
                <div key={icon} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, opacity: 0.65 }}>
                  <span className="material-icons" style={{ fontSize: 20, color: "#4A5568" }}>{icon}</span>
                  <span style={{ fontSize: "0.9rem", color: "var(--muted)", textDecoration: "line-through", textDecorationColor: "rgba(255,255,255,0.15)" }}>{label}</span>
                </div>
              ))}
              <div style={{ marginTop: 28, padding: "12px 16px", background: "rgba(255,80,80,0.06)", border: "1px solid rgba(255,80,80,0.2)", fontSize: "0.8rem", color: "#F87171" }}>
                <span className="material-icons" style={{ fontSize: 14, verticalAlign: "middle", marginRight: 6 }}>warning</span>
                Inefficace contre les menaces internes
              </div>
            </div>

            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 80, background: "var(--obsidian)", flexDirection: "column", gap: 8,
            }}>
              <div style={{ width: 1, flex: 1, background: "var(--border)" }} />
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, color: "var(--gold)", padding: "0 12px" }}>VS</div>
              <div style={{ width: 1, flex: 1, background: "var(--border)" }} />
            </div>

            <div className={`compare-cell corner-mark reveal reveal-delay-2 ${visible ? "visible" : ""}`} style={{ position: "relative", background: "var(--surface-2)", borderColor: "var(--gold-dim)" }}>
              <div className="section-label" style={{ marginBottom: 20 }}>Sécurité Interne — Mpunga ISA</div>
              {[
                ["payments", "Détection des falsifications de factures"],
                ["engineering", "Audit des processus internes"],
                ["verified_user", "Lutte contre la corruption"],
                ["manage_accounts", "Formation à l'intégrité"],
              ].map(([icon, label]) => (
                <div key={icon} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                  <span className="material-icons" style={{ fontSize: 20, color: "var(--gold)" }}>{icon}</span>
                  <span style={{ fontSize: "0.9rem", color: "var(--text)" }}>{label}</span>
                </div>
              ))}
              <div style={{ marginTop: 28, padding: "12px 16px", background: "rgba(201,168,76,0.07)", border: "1px solid var(--gold-dim)", fontSize: "0.8rem", color: "var(--gold)" }}>
                <span className="material-icons" style={{ fontSize: 14, verticalAlign: "middle", marginRight: 6 }}>check_circle</span>
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
    {
      icon: "security", num: "01",
      title: "Audit de Sécurité Interne",
      desc: "Analyse approfondie de vos flux financiers, processus RH et chaînes d'approvisionnement. Identification précise des vulnérabilités exploitées en interne.",
      tags: ["Analyse des risques", "Rapport confidentiel", "Plan d'action"],
    },
    {
      icon: "verified_user", num: "02",
      title: "Contrôle Interne",
      desc: "Conception et mise en place de procédures de gouvernance sécurisées. Systèmes de validation croisée pour bloquer toute tentative de détournement.",
      tags: ["Procédures SOC", "Gouvernance", "Traçabilité"],
    },
    {
      icon: "engineering", num: "03",
      title: "Formation & Sensibilisation",
      desc: "Instaurer une culture de l'intégrité à tous les niveaux de votre organisation. Protocoles de détection et de remontée d'information.",
      tags: ["Ateliers en présentiel", "Culture d'intégrité", "Prévention"],
    },
  ];

  return (
    <section id="services" style={{ padding: "100px 48px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={revealRef}>
          <div className={`reveal ${visible ? "visible" : ""}`}>
            <div className="gold-rule" />
            <div className="section-label" style={{ marginBottom: 12 }}>// Nos Services</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, marginBottom: 64, lineHeight: 1.2 }}>
              Trois piliers pour{" "}
              <span style={{ color: "var(--gold)" }}>sécuriser votre organisation.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
            {services.map((s, i) => (
              <div
                key={s.num}
                className={`service-card corner-mark reveal reveal-delay-${i + 1} ${visible ? "visible" : ""}`}
                style={{ position: "relative" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
                  <span className="material-icons lg" style={{ color: "var(--gold)" }}>{s.icon}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "4rem", fontWeight: 700, color: "rgba(201,168,76,0.08)", lineHeight: 1 }}>{s.num}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 600, marginBottom: 14, lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.75, marginBottom: 24 }}>{s.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {s.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.1em",
                      textTransform: "uppercase", padding: "4px 10px",
                      border: "1px solid var(--border)", color: "var(--muted)",
                    }}>{tag}</span>
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
    <section id="bio" style={{ padding: "100px 48px", background: "var(--deep)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div ref={revealRef} style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "center" }}>
          {/* Shield visual */}
          <div className={`reveal ${visible ? "visible" : ""}`} style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative" }}>
              <div style={{
                width: 280, height: 280,
                border: "1px solid var(--border)", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative",
              }}>
                <div style={{
                  width: 220, height: 220,
                  border: "1px solid var(--gold-dim)", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "radial-gradient(circle at center, rgba(201,168,76,0.05) 0%, transparent 70%)",
                }}>
                  <div style={{ textAlign: "center" }}>
                    <span className="material-icons xl" style={{ color: "var(--gold)", display: "block", marginBottom: 8 }}>military_tech</span>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--gold)", letterSpacing: "0.08em" }}>COLONEL</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.3em", color: "var(--muted)", marginTop: 4 }}>MPUNGA · ISA</div>
                  </div>
                </div>
                {[0, 72, 144, 216, 288].map((deg) => (
                  <div key={deg} style={{
                    position: "absolute", top: "50%", left: "50%",
                    width: 6, height: 6, background: "var(--gold)", borderRadius: "50%",
                    transform: `rotate(${deg}deg) translateX(139px) translateY(-50%)`,
                    opacity: 0.5,
                  }} />
                ))}
              </div>
              {[
                { label: "EXPERT CERTIFIÉ", deg: -15, top: -20, right: -40 },
                { label: "GRADE MILITAIRE", deg: 8, bottom: -20, left: -40 },
              ].map(({ label, deg, ...pos }) => (
                <div key={label} style={{
                  position: "absolute", ...pos,
                  transform: `rotate(${deg}deg)`,
                  border: "1px solid var(--gold-dim)", padding: "5px 12px",
                  background: "var(--surface)",
                }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div className={`reveal reveal-delay-1 ${visible ? "visible" : ""}`}>
            <div className="gold-rule" />
            <div className="section-label" style={{ marginBottom: 12 }}>// À Propos du Consultant</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, lineHeight: 1.25, marginBottom: 24 }}>
              Colonel Mpunga —<br />
              <span style={{ color: "var(--gold)" }}>L'intelligence interne</span>{" "}
              au service de votre protection.
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.85, marginBottom: 20 }}>
              Fort d'une carrière militaire et d'investigations internes dans des structures
              privées et publiques, le Colonel Mpunga a développé une expertise unique
              dans la détection et la neutralisation des failles humaines et organisationnelles.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.85, marginBottom: 40 }}>
              Son approche combine rigueur opérationnelle, discrétion absolue et méthodologies
              éprouvées — pour que votre organisation retrouve une intégrité totale.
            </p>
            <a href="https://wa.me/243000000000" target="_blank" rel="noreferrer" className="btn-primary">
              <span className="material-icons" style={{ fontSize: 18 }}>chat</span>
              Consulter le Colonel Mpunga
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
    <footer style={{ padding: "60px 48px 40px", background: "var(--obsidian)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 60, marginBottom: 60 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span className="material-icons" style={{ color: "var(--gold)", fontSize: 20 }}>verified_user</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, letterSpacing: "0.05em" }}>
                MPUNGA <span style={{ color: "var(--gold)" }}>ISA</span>
              </span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.8, maxWidth: 280 }}>
              Internal Security Advisory — Audit, Contrôle et Formation pour protéger votre organisation de l'intérieur.
            </p>
          </div>

          {/* Contact */}
          <div>
            <div className="section-label" style={{ marginBottom: 20 }}>Contact Direct</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a href="https://wa.me/243815695616" target="_blank" rel="noreferrer" className="footer-link">
                <span className="material-icons" style={{ fontSize: 16, color: "var(--gold-dim)" }}>chat</span>
                WhatsApp
              </a>
              <a href="mailto:lyckensmpunga@icloud.com" className="footer-link">
                <span className="material-icons" style={{ fontSize: 16, color: "var(--gold-dim)" }}>email</span>
                contact@mpunga-isa.com
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <div className="section-label" style={{ marginBottom: 20 }}>Réseaux</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a href="https://instagram.com/colonelmpunga" target="_blank" rel="noreferrer" className="footer-link">
                <span className="material-icons" style={{ fontSize: 16, color: "var(--gold-dim)" }}>photo_camera</span>
                @colonel Mpunga
              </a>
              <a href="https://facebook.com/lickensMpunga" target="_blank" rel="noreferrer" className="footer-link">
                <span className="material-icons" style={{ fontSize: 16, color: "var(--gold-dim)" }}>people</span>
                Lickens Mpunga
              </a>
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: 28, borderTop: "1px solid var(--border)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12,
        }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--muted)", opacity: 0.5 }}>
            © {new Date().getFullYear()} MPUNGA ISA — TOUS DROITS RÉSERVÉS
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.1em", color: "var(--muted)", opacity: 0.35 }}>
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