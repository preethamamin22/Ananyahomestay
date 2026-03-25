"use client";
import Image from "next/image";
import { Award, Heart, Users, Star } from "lucide-react";

export default function About() {
  const stats = [
    { icon: <Users size={24} />, value: "500+", label: "Happy Guests" },
    { icon: <Star size={24} />, value: "4.9", label: "Average Rating" },
    { icon: <Award size={24} />, value: "10+", label: "Years of Hospitality" },
    { icon: <Heart size={24} />, value: "100%", label: "Family-Run" },
  ];

  return (
    <section id="about" className="section-padding" style={{ background: "var(--cream)" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Image side */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
                position: "relative",
                aspectRatio: "4/5",
              }}
            >
              <Image
                src="/real-exterior.jpg"
                alt="Ananya Home Stay - Orange house in Parane, Coorg"
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
            {/* Second photo inset */}
            <div
              style={{
                position: "absolute",
                bottom: "-24px",
                right: "-24px",
                width: "160px",
                height: "130px",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                border: "4px solid white",
              }}
            >
              <Image
                src="/real-garden.jpg"
                alt="Cozy living room at Ananya Home Stay"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            {/* Decorative element */}
            <div
              style={{
                position: "absolute",
                top: "-20px",
                left: "-20px",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
                opacity: 0.15,
              }}
            />
          </div>

          {/* Content side */}
          <div>
            <span className="section-label">Our Story</span>
            <h2 className="section-title" style={{ marginBottom: "24px" }}>
              Where Coorg's Soul <br />
              <em>Meets Warm Hospitality</em>
            </h2>
            <div
              style={{
                width: "48px",
                height: "4px",
                background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
                borderRadius: "2px",
                marginBottom: "28px",
              }}
            />

            <p style={{ color: "var(--text-muted)", fontSize: "16px", lineHeight: 1.8, marginBottom: "20px" }}>
              Nestled in the heart of Coorg's verdant coffee estates, <strong>Ananya Home Stay</strong> was born from
              a simple dream — to share the natural beauty and rich Kodava culture of this magical land with the world.
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "16px", lineHeight: 1.8, marginBottom: "32px" }}>
              Founded in 2014 by the Achar family, we opened our home to travellers seeking an authentic experience
              away from cookie-cutter hotels. Every morning, guests wake to the scent of fresh coffee, mist rolling
              over the hills, and the sound of birds in the plantation. Our home-cooked Kodava meals, prepared with
              love using locally grown spices and produce, complete the experience.
            </p>

            {/* Values */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
              {[
                { emoji: "🌿", title: "Eco-friendly", desc: "Sustainable living with solar power & organic farming" },
                { emoji: "🍽️", title: "Authentic Cuisine", desc: "Traditional Kodava recipes passed down generations" },
                { emoji: "🤝", title: "Personal Touch", desc: "Every guest is treated like family" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "var(--bg-green-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      flexShrink: 0,
                    }}
                  >
                    {item.emoji}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: "var(--primary-dark)", marginBottom: "2px" }}>{item.title}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "14px" }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <a href="#booking" className="btn-primary">
              Plan Your Visit
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
            marginTop: "80px",
            background: "var(--primary-dark)",
            borderRadius: "24px",
            padding: "40px",
          }}
          className="stats-grid"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                color: "white",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.15)" : "none",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 14px",
                  color: "var(--gold)",
                }}
              >
                {stat.icon}
              </div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "36px",
                  fontWeight: 700,
                  color: "var(--gold)",
                  marginBottom: "4px",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "14px", opacity: 0.75 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
