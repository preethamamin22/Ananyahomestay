"use client";
import { useState, useEffect, useMemo } from "react";
import {
  Send,
  CheckCircle,
  Calendar,
  Users,
  User,
  Phone,
  Mail,
  Flame,
  Utensils,
  Coffee,
  ChevronDown,
  Printer,
} from "lucide-react";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { getBookedDates } from '@/app/admin/actions';

const breakfastMenu = [
  "Idli with Chutney, Sambar & Kesari Bath",
  "Poori Bhaji with Kesari Bath",
  "Upma with Chutney & Kesari Bath",
  "Vegetable Bath with Raita",
  "Kadambuttu (Rice Balls) with Veg Curry",
  "Plain Dosa with Chutney & Kesari Bath",
  "Puttu with Egg/Veg Curry & Kesari Bath",
];

const dinnerMenu = [
  "Kadambuttu with Pork or Chicken Curry",
  "Nool Puttu (String Hoppers) with Chicken Curry",
  "Puttu with Coconut & Chicken Curry",
  "Akki Roti with Pork, Chicken, or Veg Curry",
  "Chapathi with Chicken or Veg Curry",
  "Ghee Rice with Chicken or Veg Curry",
  "Biryani (Chicken or Veg)",
];

type PackageType = "stay-only" | "full-experience";

export default function Booking() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
    room: "Deluxe Garden Room",
    packageType: "full-experience" as PackageType,
    breakfastChoice: "",
    dinnerChoice: "",
    requests: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [bookingId, setBookingId] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    // Client-side purely static calendar initialization
    setBookedDates([]);
  }, []);

  const guestCount = parseInt(form.guests) || 1;
  const isFullPackage = form.packageType === "full-experience";
  const pricePerPerson = isFullPackage ? 1200 : 800;
  const totalPrice = pricePerPerson * guestCount;

  const packageLabel = isFullPackage ? "Full Experience" : "Stay Only";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    if (!form.name || !form.phone || !form.email || !form.checkIn || !form.checkOut) {
      setError("Please fill in all required fields.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (isFullPackage && (!form.breakfastChoice || !form.dinnerChoice)) {
      setError("Please select your meal choices for the Full Experience package.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError("");

    try {
      // ✅ Generate a beautiful local Booking Reference ID
      const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
      const localId = `BK-${Date.now().toString().slice(-4)}-${randomPart}`;

      // Build WhatsApp message
      const mealInfo = isFullPackage
        ? `\n🍳 Breakfast: ${form.breakfastChoice}\n🍛 Dinner: ${form.dinnerChoice}`
        : "";
      const msg = `🏡 *New Booking Request at Ananya Home Stay*\n\n👤 Name: ${form.name}\n📞 Phone: ${form.phone}\n📧 Email: ${form.email}\n📦 Package: ${packageLabel}\n🏠 Room: ${form.room}\n📅 Check-in: ${form.checkIn}\n📅 Check-out: ${form.checkOut}\n👥 Guests: ${form.guests}\n💰 Total: ₹${totalPrice.toLocaleString()}${mealInfo}\n📝 Requests: ${form.requests || "None"}`;
      const waUrl = `https://wa.me/919482629145?text=${encodeURIComponent(msg)}`;

      setBookingId(localId);
      setWhatsappUrl(waUrl);
      setSubmitted(true);
      setLoading(false);

      // Async save to cloud store to notify Admin Dashboard in real time
      // Does not block the guest's redirection or UI success state!
      (async () => {
        try {
          const bookingRecord = {
            id: localId,
            name: form.name,
            phone: form.phone,
            email: form.email,
            room: form.room,
            checkin: form.checkIn,
            checkout: form.checkOut,
            guests: parseInt(form.guests),
            total: totalPrice,
            status: "pending",
            createdAt: new Date().toISOString(),
          };

          // Fetch current bookings list from bucket
          const getRes = await fetch("https://kvdb.io/K9mU6x2nBqZy7s3d8vReWp/bookings", { cache: "no-store" });
          let currentBookings = [];
          if (getRes.ok) {
            try {
              currentBookings = await getRes.json();
              if (!Array.isArray(currentBookings)) currentBookings = [];
            } catch {}
          }
          
          // Append new booking to top
          currentBookings.unshift(bookingRecord);
          
          // Save updated list
          await fetch("https://kvdb.io/K9mU6x2nBqZy7s3d8vReWp/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(currentBookings.slice(0, 100)),
          });
        } catch (cloudErr) {
          console.warn("Dashboard sync warning:", cloudErr);
        }
      })();

      // Open guest-facing WhatsApp link immediately (inside click handler to avoid popup blockers)
      window.open(waUrl, "_blank");

      // Also send an automatic admin notification via WhatsApp (separate from the guest confirmation flow)
      // This ensures admin is always notified even if the guest doesn't complete the WhatsApp step
      const adminMsg = `🔔 *NEW BOOKING ALERT — Ananya Home Stay*\n\n📋 *Booking ID:* ${localId}\n👤 *Guest Name:* ${form.name}\n📞 *Phone:* ${form.phone}\n📧 *Email:* ${form.email}\n🏠 *Room:* ${form.room}\n📦 *Package:* ${packageLabel}\n📅 *Check-in:* ${form.checkIn}\n📅 *Check-out:* ${form.checkOut}\n👥 *Guests:* ${form.guests}\n💰 *Total:* ₹${totalPrice.toLocaleString()}${isFullPackage ? `\n🍳 *Breakfast:* ${form.breakfastChoice}\n🍛 *Dinner:* ${form.dinnerChoice}` : ""}\n📝 *Special Requests:* ${form.requests || "None"}\n\n✅ Please confirm this booking with the guest.`;
      const adminWaUrl = `https://wa.me/919482629145?text=${encodeURIComponent(adminMsg)}`;
      setTimeout(() => {
        window.open(adminWaUrl, "_blank");
      }, 800); // Slight delay so both windows open cleanly

    } catch (err: any) {
      console.error("Booking error:", err);
      setError(`Booking failed: ${err?.message || "Please try again."}`);
      setLoading(false);
    }
  };


  const today = new Date().toISOString().split("T")[0];

  if (submitted) {
    return (
      <section id="booking" className="section-padding" style={{ background: "var(--bg-green-light)", minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <div className="container" style={{ maxWidth: "650px" }}>
          
          {/* Main Success Container */}
          <div
            id="booking-voucher-print"
            style={{
              background: "white",
              borderRadius: "32px",
              padding: "48px 40px",
              boxShadow: "0 24px 70px rgba(45,90,39,0.12)",
              border: "1px solid rgba(45,90,39,0.08)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top decorative accent bar */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "8px", background: "linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%)" }} />

            {/* Checkmark Icon and Heading */}
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  background: "rgba(45,90,39,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <CheckCircle size={36} color="var(--primary)" />
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "30px",
                  fontWeight: 700,
                  color: "var(--primary-dark)",
                  marginBottom: "8px",
                }}
              >
                Booking Confirmed!
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: "15px", maxWidth: "450px", margin: "0 auto", lineHeight: 1.6 }}>
                Your booking request is safely registered on our domain. Review your premium boarding pass below.
              </p>
            </div>

            {/* Ticket Card Wrapper */}
            <div
              style={{
                background: "#fafbf9",
                border: "2px solid #eef1ec",
                borderRadius: "20px",
                padding: "24px",
                marginBottom: "32px",
                position: "relative",
              }}
            >
              {/* Ticket Jagged Decorative Circles on Sides */}
              <div style={{ position: "absolute", top: "50%", left: "-12px", width: "24px", height: "24px", borderRadius: "50%", background: "white", borderRight: "2px solid #eef1ec", transform: "translateY(-50%)" }} />
              <div style={{ position: "absolute", top: "50%", right: "-12px", width: "24px", height: "24px", borderRadius: "50%", background: "white", borderLeft: "2px solid #eef1ec", transform: "translateY(-50%)" }} />

              {/* Ticket Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px dashed #d1dad0", paddingBottom: "16px", marginBottom: "16px" }}>
                <div>
                  <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)" }}>Reservation ID</div>
                  <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--primary)" }}>{bookingId}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)" }}>Status</div>
                  <div style={{ fontSize: "12px", fontWeight: 700, background: "rgba(45,90,39,0.1)", color: "var(--primary)", padding: "4px 10px", borderRadius: "20px", display: "inline-block" }}>Pending Confirmation</div>
                </div>
              </div>

              {/* Ticket Details Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 24px", marginBottom: "20px" }}>
                {[
                  ["Guest Name", form.name],
                  ["Selected Room", form.room],
                  ["Check-In Date", form.checkIn],
                  ["Check-Out Date", form.checkOut],
                  ["Total Guests", `${form.guests} Guest(s)`],
                  ["Experience Package", packageLabel],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "3px" }}>{label}</div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--primary-dark)" }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Package Inclusion Accent if Full package */}
              {isFullPackage && (
                <div
                  style={{
                    background: "rgba(245,158,11,0.08)",
                    border: "1px solid rgba(245,158,11,0.2)",
                    borderRadius: "12px",
                    padding: "14px 16px",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ fontWeight: 700, color: "#92400e", fontSize: "13px", marginBottom: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Flame size={14} /> Full Experience Extras Included
                  </div>
                  <div style={{ fontSize: "12px", color: "#78350f", lineHeight: 1.5 }}>
                    🍳 Breakfast: {form.breakfastChoice || "Not Selected"}<br />
                    🍛 Dinner: {form.dinnerChoice || "Not Selected"}<br />
                    🔥 Complimentary Evening Campfire & Music Session
                  </div>
                </div>
              )}

              {/* Divider & Price */}
              <div style={{ borderTop: "1px dashed #d1dad0", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Pricing Tier</div>
                  <div style={{ fontSize: "12px", color: "var(--primary-dark)" }}>₹{pricePerPerson.toLocaleString()} / person</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Total Due</div>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--primary-dark)" }}>₹{totalPrice.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Interactive Actions Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
              
              {/* WhatsApp Action Button */}
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    background: "#25D366",
                    borderColor: "#25D366",
                    color: "white",
                    padding: "16px",
                    borderRadius: "14px",
                    fontWeight: 700,
                    textDecoration: "none",
                    boxShadow: "0 8px 24px rgba(37,211,102,0.25)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#20ba59";
                    e.currentTarget.style.boxShadow = "0 10px 28px rgba(37,211,102,0.35)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "#25D366";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,211,102,0.25)";
                  }}
                >
                  <Send size={18} />
                  <span>Verify & Confirm on WhatsApp</span>
                </a>
              )}

              {/* Utility action buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <button
                  onClick={() => window.print()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: "#f4f6f3",
                    border: "1px solid #e2e8f0",
                    color: "var(--primary-dark)",
                    padding: "12px",
                    borderRadius: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "14px",
                    transition: "background 0.2s",
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = "#eaede8"}
                  onMouseOut={(e) => e.currentTarget.style.background = "#f4f6f3"}
                >
                  <Printer size={16} />
                  Print Receipt
                </button>

                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: "transparent",
                    border: "1px solid var(--primary)",
                    color: "var(--primary)",
                    padding: "12px",
                    borderRadius: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "14px",
                    transition: "background 0.2s",
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = "rgba(45,90,39,0.05)"}
                  onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                >
                  New Booking
                </button>
              </div>

            </div>

            {/* Subtle help notice */}
            <div style={{ marginTop: "24px", fontSize: "12px", color: "var(--text-muted)", textAlign: "center" }}>
              💡 Booking reference has been recorded on our secure local node. WhatsApp verification speeds up key allocation.
            </div>

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
            Choose your package and we&apos;ll confirm your booking within 2 hours via WhatsApp &amp; email.
          </p>
        </div>

        {/* Package Selection Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            maxWidth: "700px",
            margin: "0 auto 40px",
          }}
          className="package-grid"
        >
          {/* Stay Only */}
          <button
            type="button"
            onClick={() => setForm({ ...form, packageType: "stay-only", breakfastChoice: "", dinnerChoice: "" })}
            style={{
              background: form.packageType === "stay-only"
                ? "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)"
                : "white",
              color: form.packageType === "stay-only" ? "white" : "var(--text-dark)",
              border: form.packageType === "stay-only" ? "2px solid var(--primary)" : "2px solid var(--border)",
              borderRadius: "20px",
              padding: "28px 24px",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.3s ease",
              boxShadow: form.packageType === "stay-only" ? "0 8px 30px rgba(45,90,39,0.25)" : "0 4px 16px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: "14px", fontWeight: 600, opacity: 0.8, marginBottom: "6px", letterSpacing: "1px", textTransform: "uppercase" }}>
              Stay Only
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 700, marginBottom: "8px" }}>
              ₹800<span style={{ fontSize: "16px", fontWeight: 400 }}>/person</span>
            </div>
            <div style={{ fontSize: "14px", opacity: 0.8 }}>
              Accommodation only
            </div>
          </button>

          {/* Full Experience */}
          <button
            type="button"
            onClick={() => setForm({ ...form, packageType: "full-experience" })}
            style={{
              background: form.packageType === "full-experience"
                ? "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)"
                : "white",
              color: form.packageType === "full-experience" ? "white" : "var(--text-dark)",
              border: form.packageType === "full-experience" ? "2px solid var(--primary)" : "2px solid var(--border)",
              borderRadius: "20px",
              padding: "28px 24px",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
              boxShadow: form.packageType === "full-experience" ? "0 8px 30px rgba(45,90,39,0.25)" : "0 4px 16px rgba(0,0,0,0.06)",
            }}
          >
            {/* Recommended badge */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                background: form.packageType === "full-experience" ? "rgba(255,255,255,0.25)" : "var(--gold)",
                color: form.packageType === "full-experience" ? "white" : "white",
                padding: "4px 10px",
                borderRadius: "50px",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}
            >
              ⭐ RECOMMENDED
            </div>
            <div style={{ fontSize: "14px", fontWeight: 600, opacity: 0.8, marginBottom: "6px", letterSpacing: "1px", textTransform: "uppercase" }}>
              Full Experience
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 700, marginBottom: "8px" }}>
              ₹1,200<span style={{ fontSize: "16px", fontWeight: 400 }}>/person</span>
            </div>
            <div style={{ fontSize: "14px", opacity: 0.8 }}>
              Stay + Breakfast + Dinner + 🔥 Free Campfire
            </div>
          </button>
        </div>

        {/* Campfire Badge */}
        {isFullPackage && (
          <div
            className="campfire-badge"
            style={{
              maxWidth: "700px",
              margin: "0 auto 32px",
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              color: "white",
              borderRadius: "16px",
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow: "0 8px 24px rgba(245,158,11,0.3)",
              animation: "fadeInUp 0.4s ease",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                animation: "pulse-fire 1.5s ease-in-out infinite",
              }}
            >
              <Flame size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "16px" }}>🎉 Free Campfire Included!</div>
              <div style={{ fontSize: "13px", opacity: 0.9 }}>
                Enjoy a complimentary evening campfire with your Full Experience package.
              </div>
            </div>
          </div>
        )}

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

              {/* Room Selector */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-dark)", marginBottom: "8px" }}>
                  🏡 Select Room *
                </label>
                <select name="room" value={form.room} onChange={handleChange} className="input-field">
                  <option value="Deluxe Garden Room">Deluxe Garden Room (Max 2 Guests)</option>
                  <option value="Family Suite">Family Suite (Max 4 Guests)</option>
                  <option value="Cozy Standard Room">Cozy Standard Room (Max 2 Guests)</option>
                </select>
              </div>

              {/* Guests */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-dark)", marginBottom: "8px" }}>
                  <Users size={14} style={{ display: "inline", marginRight: "6px" }} /> Number of Guests *
                </label>
                <select name="guests" value={form.guests} onChange={handleChange} className="input-field">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} Guest{n > 1 ? "s" : ""} — Total: ₹{(pricePerPerson * n).toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Meal Selectors — only for Full Experience */}
              {isFullPackage && (
                <div
                  style={{
                    background: "var(--bg-brown-light)",
                    borderRadius: "16px",
                    padding: "24px",
                    marginBottom: "16px",
                    border: "1px solid rgba(139,94,60,0.15)",
                  }}
                >
                  <h4
                    style={{
                      fontWeight: 700,
                      color: "var(--accent)",
                      marginBottom: "16px",
                      fontSize: "15px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Utensils size={16} /> Pre-Select Your Meals
                  </h4>
                  <p style={{ color: "var(--text-muted)", fontSize: "13px", marginBottom: "16px" }}>
                    Choose one item per meal. All items served with Coffee/Tea for breakfast and
                    White Rice, Rasam, Sweet, Fried Veg &amp; Papad for dinner.
                  </p>

                  {/* Breakfast */}
                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-dark)", marginBottom: "8px" }}>
                      <Coffee size={14} style={{ display: "inline", marginRight: "6px" }} /> Breakfast Choice *
                    </label>
                    <select
                      name="breakfastChoice"
                      value={form.breakfastChoice}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">— Select Breakfast —</option>
                      {breakfastMenu.map((item, i) => (
                        <option key={i} value={item}>
                          {i + 1}. {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dinner */}
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-dark)", marginBottom: "8px" }}>
                      <Utensils size={14} style={{ display: "inline", marginRight: "6px" }} /> Dinner Choice *
                    </label>
                    <select
                      name="dinnerChoice"
                      value={form.dinnerChoice}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">— Select Dinner —</option>
                      {dinnerMenu.map((item, i) => (
                        <option key={i} value={item}>
                          {i + 1}. {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

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
                    placeholder="+91 94826 29145"
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
                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        border: "2px solid rgba(255,255,255,0.4)",
                        borderTopColor: "white",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                        display: "inline-block",
                      }}
                    />
                    Processing...
                  </span>
                ) : (
                  <>
                    <Send size={18} /> Confirm Booking
                  </>
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
                  ["Package", packageLabel],
                  ["Rate", `₹${pricePerPerson.toLocaleString()}/person`],
                  ["Guests", `${form.guests} Guest${guestCount > 1 ? "s" : ""}`],
                  ...(isFullPackage
                    ? [["Campfire", "🔥 Complimentary!"]]
                    : []),
                ].map(([label, value]) => (
                  <div
                    key={label as string}
                    style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <span style={{ opacity: 0.7, fontSize: "14px" }}>{label}</span>
                    <span style={{ fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "8px" }}>
                  <span style={{ fontWeight: 700, fontSize: "18px" }}>Total</span>
                  <span
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "var(--gold)", fontWeight: 700 }}
                  >
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
                <p style={{ fontSize: "12px", opacity: 0.6, marginTop: "4px" }}>
                  {isFullPackage
                    ? "*Includes stay, breakfast, dinner & campfire."
                    : "*Accommodation only. GST extra."}
                </p>
              </div>
            </div>

            {/* Calendar */}
            <div style={{ background: "white", borderRadius: "20px", padding: "28px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
              <h4 style={{ fontWeight: 700, color: "var(--primary-dark)", marginBottom: "16px", fontSize: "15px" }}>
                📅 Check Availability
              </h4>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "12px" }}>
                Highlighted dates are already booked.
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <DayPicker
                  mode="multiple"
                  selected={bookedDates}
                  disabled={bookedDates}
                  modifiers={{ booked: bookedDates }}
                  modifiersStyles={{ booked: { color: 'white', backgroundColor: '#dc2626' } }}
                />
              </div>
            </div>

            {/* Quick Price Calculator */}
            <div style={{ background: "white", borderRadius: "20px", padding: "28px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
              <h4 style={{ fontWeight: 700, color: "var(--primary-dark)", marginBottom: "16px", fontSize: "15px" }}>
                💰 Group Price Calculator
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {[2, 4, 6, 8, 10, 12].map((n) => (
                  <div
                    key={n}
                    style={{
                      background: guestCount === n ? "var(--primary)" : "var(--bg-green-light)",
                      color: guestCount === n ? "white" : "var(--primary-dark)",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      fontSize: "13px",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      fontWeight: guestCount === n ? 700 : 500,
                    }}
                    onClick={() => setForm({ ...form, guests: String(n) })}
                  >
                    {n} guests → <strong>₹{(pricePerPerson * n).toLocaleString()}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact options */}
            <div style={{ background: "white", borderRadius: "20px", padding: "28px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
              <h4 style={{ fontWeight: 700, color: "var(--primary-dark)", marginBottom: "16px" }}>
                Need Help? Contact Us
              </h4>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "12px" }}>
                Owner: <strong>Monish Billava Sundara</strong>
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <a
                  href="https://wa.me/919482629145"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                  style={{ justifyContent: "center", padding: "12px 20px" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
                <a
                  href="tel:+919482629145"
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
                  📞 94826 29145
                </a>
                <a
                  href="tel:+916361716785"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "12px 20px",
                    border: "2px solid var(--accent)",
                    borderRadius: "50px",
                    color: "var(--accent)",
                    fontWeight: 600,
                    fontSize: "15px",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  📞 63617 16785
                </a>
              </div>
            </div>

            {/* Why book direct */}
            <div style={{ background: "var(--bg-brown-light)", borderRadius: "20px", padding: "24px", border: "1px solid rgba(139,94,60,0.15)" }}>
              <h4 style={{ fontWeight: 700, color: "var(--accent)", marginBottom: "12px", fontSize: "15px" }}>
                🎁 Why Book Direct?
              </h4>
              {["Best price guaranteed", "Free early check-in (subject to availability)", "Complimentary campfire (Full Package)", "Personalised service", "Instant WhatsApp confirmation"].map((b) => (
                <div key={b} style={{ display: "flex", gap: "8px", marginBottom: "8px", fontSize: "14px", color: "var(--text-dark)" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 700 }}>✓</span> {b}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
