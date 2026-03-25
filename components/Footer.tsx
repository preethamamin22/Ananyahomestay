"use client";
import Image from "next/image";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer style={{ background: "var(--primary-dark)", color: "white" }}>
      {/* Main footer */}
      <div className="container" style={{ padding: "80px 24px 40px" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "48px" }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  border: "2px solid rgba(255,255,255,0.2)",
                }}
              >
                <Image src="/logo.png" alt="Ananya Logo" width={48} height={48} style={{ objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700 }}>Ananya</div>
                <div style={{ fontSize: "12px", opacity: 0.6, letterSpacing: "2px" }}>HOME STAY</div>
              </div>
            </div>
            <p style={{ opacity: 0.75, fontSize: "14px", lineHeight: 1.8, marginBottom: "24px", maxWidth: "280px" }}>
              Experience the true essence of Coorg with warm Kodava hospitality, coffee plantation views,
              and home-cooked meals that taste like love.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { icon: <InstagramIcon />, href: "#", color: "#e1306c" },
                { icon: <FacebookIcon />, href: "#", color: "#1877f2" },
                { icon: <YoutubeIcon />, href: "#", color: "#ff0000" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: social.color,
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", marginBottom: "20px", color: "var(--gold)" }}>
              Quick Links
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                ["Home", "#home"],
                ["About Us", "#about"],
                ["Our Rooms", "#rooms"],
                ["Book a Stay", "#booking"],
                ["Gallery", "#gallery"],
                ["Reviews", "#reviews"],
                ["Blog", "#blog"],
                ["Contact", "#contact"],
                ["Admin", "/admin"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    textDecoration: "none",
                    fontSize: "14px",
                    transition: "color 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span style={{ color: "var(--gold)", fontSize: "10px" }}>▸</span> {label}
                </a>
              ))}
            </div>
          </div>

          {/* Rooms */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", marginBottom: "20px", color: "var(--gold)" }}>
              Our Rooms
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                ["Deluxe Garden Room", "₹3,500/night"],
                ["Family Suite", "₹5,500/night"],
                ["Cozy Standard Room", "₹2,200/night"],
              ].map(([name, price]) => (
                <div key={name}>
                  <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px", fontWeight: 500 }}>{name}</div>
                  <div style={{ color: "var(--gold)", fontSize: "13px" }}>{price}</div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "24px",
                padding: "16px",
                background: "rgba(255,255,255,0.07)",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ fontSize: "12px", opacity: 0.7, marginBottom: "8px" }}>Check Availability</div>
              <a href="#booking" className="btn-primary" style={{ padding: "10px 20px", fontSize: "14px" }}>
                Book Now →
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", marginBottom: "20px", color: "var(--gold)" }}>
              Contact Us
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { icon: <MapPin size={16} />, text: "Near Madikeri Town,\nCoorg, Karnataka 571201" },
                { icon: <Phone size={16} />, text: "+91 98765 43210" },
                { icon: <Mail size={16} />, text: "info@ananyahomestay.com" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--gold)", marginTop: "2px", flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ marginTop: "20px", padding: "12px 20px", fontSize: "14px" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "24px" }}>
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p style={{ fontSize: "14px", opacity: 0.65 }}>
            © {new Date().getFullYear()} Ananya Home Stay, Coorg. All rights reserved.
          </p>
          <p style={{ fontSize: "14px", opacity: 0.65, display: "flex", alignItems: "center", gap: "6px" }}>
            Made with <Heart size={14} color="#e74c3c" fill="#e74c3c" /> for Coorg lovers
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy Policy", "Terms of Service", "Sitemap"].map((link) => (
              <a
                key={link}
                href="#"
                style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", textDecoration: "none" }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
