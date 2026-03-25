"use client";
import { useState } from "react";
import { Send, CheckCircle, Calendar, Users, Home, User, Phone, Mail } from "lucide-react";

const rooms = [
  { id: "deluxe", label: "Deluxe Garden Room – ₹3,500/night" },
  { id: "family", label: "Family Suite – ₹5,500/night" },
  { id: "budget", label: "Cozy Standard Room – ₹2,200/night" },
];

export default function Booking() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    room: "deluxe",
    requests: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getTotalNights = () => {
    if (!form.checkIn || !form.checkOut) return 0;
    const a = new Date(form.checkIn);
    const b = new Date(form.checkOut);
    const diff = (b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const getPrice = () => {
    const prices: Record<string, number> = { deluxe: 3500, family: 5500, budget: 2200 };
    return prices[form.room] || 3500;
  };

  const getTotalPrice = () => getTotalNights() * getPrice();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    if (!form.name || !form.phone || !form.email || !form.checkIn || !form.checkOut) {
      setError("Please fill in all required fields.");
      return false;
    }
    if (getTotalNights() <= 0) {
      setError("Check-out date must be after check-in date.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate API call / WhatsApp redirect
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);

    // WhatsApp notification
    const msg = `🏡 *New Booking at Ananya Home Stay*\n\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n📧 Email: ${form.email}\n🛏️ Room: ${form.room}\n📅 Check-in: ${form.checkIn}\n📅 Check-out: ${form.checkOut}\n👥 Guests: ${form.guests}\n💰 Total: ₹${getTotalPrice().toLocaleString()}\n📝 Requests: ${form.requests || 'None'}`;
    const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(msg)}`;
    setTimeout(() => window.open(waUrl, "_blank"), 2000);
  };

  const today = new Date().toISOString().split("T")[0];

  if (submitted) {
    return (
      <section id="booking" className="section-padding" style={{ background: "var(--bg-green-light)" }}>
        <div className="container" style={{ maxWidth: "600px" }}>
          <div
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "60px 40px",
              textAlign: "center",
              boxShadow: "0 24px 60px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "var(--bg-green-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
                animation: "pulse-green 2s infinite",
              }}
            >
              <CheckCircle size={40} color="var(--primary)" />
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "32px",
                fontWeight: 700,
                color: "var(--primary-dark)",
                marginBottom: "16px",
              }}
            >
              Booking Request Sent!
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "16px", lineHeight: 1.7, marginBottom: "24px" }}>
              Thank you, <strong>{form.name}</strong>! We have received your booking request for{" "}
              <strong>{getTotalNights()} night(s)</strong>. Our team will confirm your booking via WhatsApp and email
              within 2 hours.
            </p>
            <div
              style={{
                background: "var(--bg-green-light)",
                borderRadius: "16px",
                padding: "20px",
                marginBottom: "32px",
                textAlign: "left",
                border: "1px solid rgba(45,90,39,0.2)",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  ["Check-in", form.checkIn],
                  ["Check-out", form.checkOut],
                  ["Room", rooms.find((r) => r.id === form.room)?.label.split(" – ")[0] || ""],
                  ["Guests", form.guests],
                  ["Total Amount", `₹${getTotalPrice().toLocaleString()}`],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{label}</div>
                    <div style={{ fontWeight: 600, color: "var(--primary-dark)" }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "24px" }}>
              📲 We are opening WhatsApp to confirm your booking details…
            </p>
            <button onClick={() => setSubmitted(false)} className="btn-primary">
              Make Another Booking
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="section-padding" style={{ background: "var(--bg-green-light)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <span className="section-label">Reservations</span>
          <h2 className="section-title" style={{ marginBottom: "16px" }}>
            Book Your Stay
          </h2>
          <div className="divider" />
          <p className="section-subtitle" style={{ marginTop: "16px" }}>
            Fill in your details and we will confirm your booking within 2 hours via WhatsApp &amp; email.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: "40px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
          className="booking-grid"
        >
          {/* Form */}
          <div
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "40px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
            }}
          >
            <form onSubmit={handleSubmit}>
              {/* Dates */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-dark)", marginBottom: "8px" }}>
                    <Calendar size={14} style={{ display: "inline", marginRight: "6px" }} /> Check-in Date *
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={form.checkIn}
                    onChange={handleChange}
                    min={today}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-dark)", marginBottom: "8px" }}>
                    <Calendar size={14} style={{ display: "inline", marginRight: "6px" }} /> Check-out Date *
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={form.checkOut}
                    onChange={handleChange}
                    min={form.checkIn || today}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              {/* Guests & Room */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-dark)", marginBottom: "8px" }}>
                    <Users size={14} style={{ display: "inline", marginRight: "6px" }} /> Number of Guests *
                  </label>
                  <select name="guests" value={form.guests} onChange={handleChange} className="input-field">
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guest{n>1?"s":""}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-dark)", marginBottom: "8px" }}>
                    <Home size={14} style={{ display: "inline", marginRight: "6px" }} /> Room Type *
                  </label>
                  <select name="room" value={form.room} onChange={handleChange} className="input-field">
                    {rooms.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Personal Info */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-dark)", marginBottom: "8px" }}>
                  <User size={14} style={{ display: "inline", marginRight: "6px" }} /> Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="input-field"
                  required
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-dark)", marginBottom: "8px" }}>
                    <Phone size={14} style={{ display: "inline", marginRight: "6px" }} /> Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-dark)", marginBottom: "8px" }}>
                    <Mail size={14} style={{ display: "inline", marginRight: "6px" }} /> Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    className="input-field"
                    required
                  />
                </div>
              </div>
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-dark)", marginBottom: "8px" }}>
                  Special Requests (Optional)
                </label>
                <textarea
                  name="requests"
                  value={form.requests}
                  onChange={handleChange}
                  placeholder="Any dietary preferences, accessibility needs, or special occasions..."
                  className="input-field"
                  rows={3}
                  style={{ resize: "vertical" }}
                />
              </div>

              {error && (
                <div
                  style={{
                    background: "#fee2e2",
                    color: "#991b1b",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    fontSize: "14px",
                    marginBottom: "16px",
                  }}
                >
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.8 : 1 }}
                disabled={loading}
              >
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                    Processing...
                  </span>
                ) : (
                  <><Send size={18} /> Confirm Booking</>
                )}
              </button>

              <p style={{ textAlign: "center", fontSize: "13px", color: "var(--text-muted)", marginTop: "16px" }}>
                🔒 No payment required now. We confirm via WhatsApp &amp; email.
              </p>
            </form>
          </div>

          {/* Summary Panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Pricing summary */}
            <div
              style={{
                background: "var(--primary-dark)",
                borderRadius: "24px",
                padding: "32px",
                color: "white",
              }}
            >
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", marginBottom: "24px" }}>
                Booking Summary
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  ["Room", rooms.find(r => r.id === form.room)?.label.split(" – ")[0] || "Deluxe Room"],
                  ["Rate", `₹${getPrice().toLocaleString()}/night`],
                  ["Nights", getTotalNights() || "—"],
                  ["Guests", `${form.guests} Guests`],
                ].map(([label, value]) => (
                  <div key={label as string} style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <span style={{ opacity: 0.7, fontSize: "14px" }}>{label}</span>
                    <span style={{ fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "8px" }}>
                  <span style={{ fontWeight: 700, fontSize: "18px" }}>Total</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "var(--gold)", fontWeight: 700 }}>
                    {getTotalNights() > 0 ? `₹${getTotalPrice().toLocaleString()}` : "—"}
                  </span>
                </div>
                <p style={{ fontSize: "12px", opacity: 0.6, marginTop: "4px" }}>*GST extra. Breakfast included.</p>
              </div>
            </div>

            {/* Contact options */}
            <div style={{ background: "white", borderRadius: "20px", padding: "28px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
              <h4 style={{ fontWeight: 700, color: "var(--primary-dark)", marginBottom: "16px" }}>
                Need Help? Contact Us
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ justifyContent: "center", padding: "12px 20px" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
                <a
                  href="tel:+919876543210"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "12px 20px",
                    border: "2px solid var(--primary)",
                    borderRadius: "50px",
                    color: "var(--primary)",
                    fontWeight: 600,
                    fontSize: "15px",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  📞 Call Directly
                </a>
              </div>
            </div>

            {/* Why book direct */}
            <div style={{ background: "var(--bg-brown-light)", borderRadius: "20px", padding: "24px", border: "1px solid rgba(139,94,60,0.15)" }}>
              <h4 style={{ fontWeight: 700, color: "var(--accent)", marginBottom: "12px", fontSize: "15px" }}>
                🎁 Why Book Direct?
              </h4>
              {["Best price guaranteed", "Free early check-in (subject to availability)", "Complimentary coffee on arrival", "Personalised service", "Instant WhatsApp confirmation"].map(b => (
                <div key={b} style={{ display: "flex", gap: "8px", marginBottom: "8px", fontSize: "14px", color: "var(--text-dark)" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 700 }}>✓</span> {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .booking-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
