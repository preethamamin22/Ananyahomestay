"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#rooms", label: "Rooms" },
    { href: "#gallery", label: "Gallery" },
    { href: "#attractions", label: "Places" },
    { href: "#activities", label: "Activities" },
    { href: "#reviews", label: "Reviews" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        transition: "all 0.4s ease",
        background: scrolled
          ? "rgba(255,255,255,0.97)"
          : "transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.08)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        padding: scrolled ? "12px 0" : "20px 0",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="#home" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "12px",
              background: scrolled ? "var(--primary)" : "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              border: scrolled ? "none" : "2px solid rgba(255,255,255,0.4)",
            }}
          >
            <Image src="/logo.png" alt="Ananya Logo" width={44} height={44} style={{ objectFit: "cover" }} />
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "18px",
                color: scrolled ? "var(--primary-dark)" : "white",
                lineHeight: 1.1,
                letterSpacing: "0.5px",
              }}
            >
              Ananya
            </div>
            <div
              style={{
                fontSize: "11px",
                color: scrolled ? "var(--text-muted)" : "rgba(255,255,255,0.8)",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Home Stay
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="hidden-mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${scrolled ? "scrolled" : ""}`}
              style={{
                color: scrolled ? "var(--text-dark)" : "rgba(255,255,255,0.92)",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+919482629145"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "50px",
              background: scrolled ? "var(--primary)" : "rgba(255,255,255,0.2)",
              color: "white",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              border: scrolled ? "none" : "1px solid rgba(255,255,255,0.4)",
              transition: "all 0.3s ease",
            }}
          >
            <Phone size={16} /> Call Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: scrolled ? "var(--text-dark)" : "white",
            display: "none",
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "white",
            padding: "20px 24px",
            borderTop: "1px solid var(--border)",
          }}
          className="mobile-menu"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                color: "var(--text-dark)",
                textDecoration: "none",
                fontWeight: 500,
                borderBottom: "1px solid var(--border)",
                fontSize: "15px",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setMenuOpen(false)}
            className="btn-primary"
            style={{ marginTop: "16px", justifyContent: "center", width: "100%" }}
          >
            Book Now
          </a>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 1024px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
