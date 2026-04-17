"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

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

function QuickContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  return sent ? (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div style={{ fontSize: "40px", marginBottom: "12px" }}>✅</div>
      <p style={{ fontWeight: 600, color: "var(--primary-dark)" }}>Message Sent!</p>
      <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>We'll get back to you shortly.</p>
    </div>
  ) : (
    <form
      onSubmit={(e) => { e.preventDefault(); setSent(true); }}
      style={{ display: "flex", flexDirection: "column", gap: "14px" }}
    >
      <input
        type="text"
        className="input-field"
        placeholder="Your name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        type="email"
        className="input-field"
        placeholder="Your email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
      />
      <textarea
        className="input-field"
        rows={3}
        placeholder="Your message..."
        value={form.message}
        onChange={e => setForm({ ...form, message: e.target.value })}
        required
        style={{ resize: "vertical" }}
      />
      <button type="submit" className="btn-primary" style={{ justifyContent: "center" }}>
        Send Message
      </button>
    </form>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="section-padding" style={{ background: "var(--cream)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title" style={{ marginBottom: "16px" }}>
            Find Us in Coorg
          </h2>
          <div className="divider" />
          <p className="section-subtitle" style={{ marginTop: "16px" }}>
            We'd love to host you at Ananya. Reach out via any channel — we respond within 2 hours.
          </p>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}
          className="contact-grid"
        >
          {/* Info */}
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "32px" }}>
              {[
                {
                  icon: <MapPin size={22} color="var(--primary)" />,
                  title: "Address",
                  lines: ["Ananya Home Stay", "Parane Post, Konajageri", "Madikeri, Coorg, Karnataka 571218"],
                  action: { label: "Get Directions", href: "https://maps.app.goo.gl/gui1Fvy7freZyStC7" },
                },
                {
                  icon: <Phone size={22} color="var(--primary)" />,
                  title: "Phone (Monish Billava Sundara)",
                  lines: ["+91 94826 29145 (WhatsApp)", "+91 63617 16785"],
                  action: { label: "Call Now", href: "tel:+919482629145" },
                },
                {
                  icon: <Mail size={22} color="var(--primary)" />,
                  title: "Email",
                  lines: ["info@ananyahomestay.com"],
                  action: { label: "Send Email", href: "mailto:info@ananyahomestay.com" },
                },
                {
                  icon: <Clock size={22} color="var(--primary)" />,
                  title: "Check-in / Check-out",
                  lines: ["Check-in: 12:00 PM onwards", "Check-out: 11:00 AM"],
                  action: null,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "white",
                    borderRadius: "20px",
                    padding: "22px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                    display: "flex",
                    gap: "18px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "14px",
                      background: "var(--bg-green-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--primary-dark)", marginBottom: "6px" }}>{item.title}</div>
                    {item.lines.map((line, j) => (
                      <div key={j} style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: 1.7 }}>{line}</div>
                    ))}
                    {item.action && (
                      <a
                        href={item.action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          marginTop: "8px",
                          color: "var(--primary)",
                          fontWeight: 600,
                          fontSize: "14px",
                          textDecoration: "none",
                          borderBottom: "1px solid var(--primary)",
                        }}
                      >
                        {item.action.label} →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social media */}
            <div style={{ background: "var(--primary-dark)", borderRadius: "20px", padding: "28px", color: "white" }}>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", marginBottom: "16px" }}>
                Follow Our Journey
              </h4>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {[
                  { icon: <InstagramIcon />, label: "@ananya_homestay", href: "#", color: "#e1306c" },
                  { icon: <FacebookIcon />, label: "Ananya Home Stay", href: "#", color: "#1877f2" },
                  { icon: <YoutubeIcon />, label: "Ananya Coorg", href: "#", color: "#ff0000" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "rgba(255,255,255,0.1)",
                      padding: "10px 16px",
                      borderRadius: "50px",
                      color: "white",
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: 500,
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    <span style={{ color: social.color }}>{social.icon}</span>
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Map + Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
                height: "360px",
                border: "3px solid white",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.97!2d75.7189313!3d12.2678302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba475e3b6b2d7c7%3A0x0!2zMTLCsDE2JzA0LjIiTiA3NcKwNDMnMDguMiJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ananya Home Stay Location – Coorg, Karnataka"
              />
            </div>

            <div style={{ background: "white", borderRadius: "24px", padding: "32px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "22px",
                  color: "var(--primary-dark)",
                  marginBottom: "20px",
                }}
              >
                Quick Enquiry
              </h3>
              <QuickContactForm />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
