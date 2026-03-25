"use client";

const attractions = [
  {
    emoji: "🏔️",
    name: "Tadiandamol Peak",
    distance: "15 km",
    description: "The highest peak in Coorg at 1,748m. Spectacular trekking trails through shola forests with panoramic views of the Western Ghats.",
    bestTime: "Oct – May",
    category: "Trekking",
  },
  {
    emoji: "🏯",
    name: "Nalknad Palace",
    distance: "12 km",
    description: "Historic 18th-century Kodava palace at the foot of Tadiandamol, renowned for its intricate murals and traditional architecture.",
    bestTime: "All year",
    category: "Heritage",
  },
  {
    emoji: "🌊",
    name: "Chelavara Falls",
    distance: "18 km",
    description: "A stunning waterfall cascading 150 feet over a uniquely shaped 'tortoise rock'. Surrounded by dense coffee and cardamom estates.",
    bestTime: "Jul – Feb",
    category: "Nature",
  },
  {
    emoji: "🛕",
    name: "Padi Igguthappa Temple",
    distance: "25 km",
    description: "One of the most sacred Kodava temples dedicated to Lord Igguthappa. A unique fusion of Kodava culture and spiritual heritage.",
    bestTime: "All year",
    category: "Spiritual",
  },
  {
    emoji: "🌄",
    name: "Kabbe Hills Viewpoint",
    distance: "8 km",
    description: "Breathtaking hilltop viewpoint offering sweeping views of the Kerala border, shola forests, and the lush Parane valley.",
    bestTime: "Oct – Mar",
    category: "Nature",
  },
  {
    emoji: "🐘",
    name: "Dubare Elephant Camp",
    distance: "45 km",
    description: "Get up close with majestic elephants on the banks of River Cauvery. Feeding, bathing, and jungle walks with these gentle giants.",
    bestTime: "Oct – May",
    category: "Wildlife",
  },
  {
    emoji: "🌊",
    name: "Abbey Falls",
    distance: "35 km",
    description: "Coorg's most iconic waterfall cascading through a canopy of coffee plants and wild creepers. A must-visit near Madikeri.",
    bestTime: "Jul – Oct",
    category: "Nature",
  },
  {
    emoji: "🙏",
    name: "Talacauvery",
    distance: "60 km",
    description: "Sacred origin of River Cauvery with a hilltop temple and panoramic Brahmagiri views. One of Karnataka's most revered pilgrimage sites.",
    bestTime: "Oct – Mar",
    category: "Spiritual",
  },
];

const activities = [
  {
    emoji: "☕",
    name: "Coffee Plantation Walk",
    duration: "1.5 hrs",
    description: "Walk through our lush coffee and pepper estate. Learn to identify Arabica and Robusta beans, understand the harvest process, and taste freshly brewed estate coffee.",
    included: true,
    difficulty: "Easy",
    color: "#fef3c7",
    textColor: "#92400e",
  },
  {
    emoji: "🔥",
    name: "Evening Bonfire",
    duration: "2 hrs",
    description: "Gather around a crackling bonfire under the stars. Share stories, roast marshmallows, and experience the magic of a Coorg night sky away from city lights.",
    included: true,
    difficulty: "Easy",
    color: "#ffedd5",
    textColor: "#c2410c",
  },
  {
    emoji: "🥾",
    name: "Nature Trek",
    duration: "3–4 hrs",
    description: "Guided trek through the hills and forests surrounding Parane village. Spot endemic birds, Malabar giant squirrels, and discover hidden streams.",
    included: false,
    difficulty: "Moderate",
    color: "#dcfce7",
    textColor: "#166534",
  },
  {
    emoji: "🦅",
    name: "Birdwatching",
    duration: "2 hrs",
    description: "Coorg is a birdwatcher's paradise. Spot Malabar Grey Hornbills, Malabar Whistling Thrush, Rufous Babbler, and over 300 endemic species at dawn.",
    included: false,
    difficulty: "Easy",
    color: "#dbeafe",
    textColor: "#1e40af",
  },
  {
    emoji: "💧",
    name: "Stream Walk",
    duration: "1 hr",
    description: "Explore the crystal-clear streams and natural pools near the estate. A refreshing walk through bamboo groves and wild orchid patches.",
    included: true,
    difficulty: "Easy",
    color: "#e0f2fe",
    textColor: "#0369a1",
  },
  {
    emoji: "🌅",
    name: "Sunrise View",
    duration: "1 hr",
    description: "Wake up early for a guided walk to the best sunrise viewpoint near Parane. Watch the mist lift over the Ghats as the valley comes alive in golden light.",
    included: true,
    difficulty: "Easy",
    color: "#fce7f3",
    textColor: "#9d174d",
  },
  {
    emoji: "🍳",
    name: "Kodava Cooking Class",
    duration: "2 hrs",
    description: "Learn to cook traditional Kodava dishes — Pandi Curry, Kadambuttu, and Bamboo Shoot curry — alongside our host family using freshly picked spices.",
    included: false,
    difficulty: "Easy",
    color: "#f3e8ff",
    textColor: "#6d28d9",
  },
  {
    emoji: "🚴",
    name: "Village Cycling Tour",
    duration: "2–3 hrs",
    description: "Cycle through Parane and neighbouring Konajageri village. Visit the local market, interact with Kodava families, and discover authentic rural Coorg life.",
    included: false,
    difficulty: "Moderate",
    color: "#dcfce7",
    textColor: "#166534",
  },
];

const categoryColors: Record<string, string> = {
  Trekking: "#ffedd5",
  Heritage: "#fef3c7",
  Nature: "#dcfce7",
  Wildlife: "#dbeafe",
  Spiritual: "#fce7f3",
};

const categoryTextColors: Record<string, string> = {
  Trekking: "#c2410c",
  Heritage: "#92400e",
  Nature: "#166534",
  Wildlife: "#1e40af",
  Spiritual: "#9d174d",
};

export default function Attractions() {
  return (
    <>
      {/* Nearby Attractions */}
      <section id="attractions" className="section-padding" style={{ background: "white" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="section-label">Explore Parane &amp; Coorg</span>
            <h2 className="section-title" style={{ marginBottom: "16px" }}>
              Nearby Attractions
            </h2>
            <div className="divider" />
            <p className="section-subtitle" style={{ marginTop: "16px" }}>
              Ananya Home Stay in <strong>Parane, Madikeri</strong> is perfectly placed to explore Coorg's
              most iconic destinations. We arrange guided tours and transportation for all our guests.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
            className="attractions-grid"
          >
            {attractions.map((attr, i) => (
              <div key={i} className="attraction-card" style={{ padding: "24px" }}>
                <div style={{ fontSize: "36px", marginBottom: "14px" }}>{attr.emoji}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <h3 style={{ fontWeight: 700, color: "var(--primary-dark)", fontSize: "16px", flex: 1 }}>{attr.name}</h3>
                  <span
                    style={{
                      background: categoryColors[attr.category] || "#f3f4f6",
                      color: categoryTextColors[attr.category] || "#374151",
                      padding: "3px 10px",
                      borderRadius: "50px",
                      fontSize: "11px",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      marginLeft: "8px",
                    }}
                  >
                    {attr.category}
                  </span>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "13px", lineHeight: 1.6, marginBottom: "16px" }}>
                  {attr.description}
                </p>
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "var(--primary)", fontWeight: 600 }}>
                    📍 {attr.distance}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    🗓️ {attr.bestTime}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tour CTA */}
          <div
            style={{
              marginTop: "48px",
              background: "linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)",
              borderRadius: "24px",
              padding: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ color: "white" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", marginBottom: "8px" }}>
                Need Help Exploring Coorg?
              </h3>
              <p style={{ opacity: 0.8, fontSize: "15px" }}>
                We arrange guided tours, trekking, taxi bookings, and local experience packages from <strong>Parane</strong>.
              </p>
            </div>
            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20planning%20my%20Coorg%20trip%20from%20Ananya%20Home%20Stay%20Parane"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ whiteSpace: "nowrap" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Plan My Tour
            </a>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 1024px) {
            .attractions-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 640px) {
            .attractions-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* Activities Section */}
      <section id="activities" className="section-padding" style={{ background: "var(--bg-green-light)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="section-label">At The Homestay</span>
            <h2 className="section-title" style={{ marginBottom: "16px" }}>
              Activities &amp; Experiences
            </h2>
            <div className="divider" />
            <p className="section-subtitle" style={{ marginTop: "16px" }}>
              Beyond just a place to sleep — Ananya is a place to experience Coorg. From bonfire nights to
              dawn treks, every activity is designed to connect you with nature and Kodava culture.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "20px", flexWrap: "wrap" }}>
              <span
                style={{
                  background: "#dcfce7",
                  color: "#166534",
                  padding: "6px 16px",
                  borderRadius: "50px",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "1px solid rgba(22,101,52,0.2)",
                }}
              >
                ✅ Included activities = complimentary for guests
              </span>
              <span
                style={{
                  background: "#fef3c7",
                  color: "#92400e",
                  padding: "6px 16px",
                  borderRadius: "50px",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "1px solid rgba(146,64,14,0.2)",
                }}
              >
                💛 Premium activities = on request with small fee
              </span>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
            className="activities-grid"
          >
            {activities.map((activity, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "24px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                  border: "1px solid var(--border)",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="activity-card"
              >
                {/* Included badge */}
                {activity.included && (
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      background: "#dcfce7",
                      color: "#166534",
                      padding: "3px 10px",
                      borderRadius: "50px",
                      fontSize: "11px",
                      fontWeight: 700,
                    }}
                  >
                    FREE
                  </div>
                )}

                {/* Accent bar */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: activity.color,
                  }}
                />

                <div style={{ fontSize: "38px", marginBottom: "14px", lineHeight: 1 }}>{activity.emoji}</div>
                <h3 style={{ fontWeight: 700, color: "var(--primary-dark)", fontSize: "17px", marginBottom: "8px" }}>
                  {activity.name}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "13px", lineHeight: 1.65, marginBottom: "16px" }}>
                  {activity.description}
                </p>

                <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "12px",
                      color: "var(--text-muted)",
                      background: "#f9fafb",
                      padding: "5px 10px",
                      borderRadius: "8px",
                    }}
                  >
                    ⏱️ {activity.duration}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      background: activity.color,
                      color: activity.textColor,
                      padding: "5px 10px",
                      borderRadius: "8px",
                    }}
                  >
                    {activity.difficulty}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bonfire highlight banner */}
          <div
            style={{
              marginTop: "48px",
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
              borderRadius: "24px",
              padding: "48px 40px",
              color: "white",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              gap: "40px",
              flexWrap: "wrap",
            }}
          >
            {/* Decorative elements */}
            {["✨", "⭐", "🌟", "💫"].map((star, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: `${10 + i * 20}%`,
                  right: `${5 + i * 8}%`,
                  fontSize: `${16 + i * 4}px`,
                  opacity: 0.4,
                  animation: `float ${2 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                {star}
              </div>
            ))}

            <div style={{ fontSize: "80px", flexShrink: 0 }}>🔥</div>
            <div style={{ flex: 1, minWidth: "260px" }}>
              <div
                style={{
                  fontSize: "12px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#fbbf24",
                  marginBottom: "10px",
                  fontWeight: 600,
                }}
              >
                ⭐ Guest Favourite
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(24px, 3vw, 36px)",
                  fontWeight: 700,
                  marginBottom: "14px",
                  lineHeight: 1.2,
                }}
              >
                Coorg Bonfire Nights
              </h3>
              <p style={{ opacity: 0.85, fontSize: "16px", lineHeight: 1.7, marginBottom: "24px", maxWidth: "520px" }}>
                Our nightly bonfires are the stuff of Coorg legends. Gather around the fire, share stories
                with fellow travellers, listen to folk tales from our host family, gaze at a sky full of
                stars, and sip on homemade Coorg coffee. Complimentary for all guests.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  {["🌿 Complimentary", "🌙 Every Evening", "☕ Coffee Included"].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        padding: "8px 14px",
                        borderRadius: "50px",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <a href="#booking" className="btn-primary" style={{ whiteSpace: "nowrap", flexShrink: 0, background: "#f59e0b" }}>
              🏡 Book Your Night
            </a>
          </div>
        </div>

        <style jsx>{`
          @media (max-width: 1024px) {
            .activities-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 640px) {
            .activities-grid { grid-template-columns: 1fr !important; }
          }
          .activity-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 36px rgba(0,0,0,0.12) !important;
          }
        `}</style>
      </section>
    </>
  );
}
