"use client";
import { useState } from "react";
import { Coffee, Utensils, ChefHat, Flame, Soup } from "lucide-react";

const breakfastItems = [
  { name: "Idli with Chutney, Sambar & Kesari Bath", emoji: "🍚", tag: "Classic" },
  { name: "Poori Bhaji with Kesari Bath", emoji: "🫓", tag: "Popular" },
  { name: "Upma with Chutney & Kesari Bath", emoji: "🥣", tag: "Light" },
  { name: "Vegetable Bath with Raita", emoji: "🍛", tag: "Healthy" },
  { name: "Kadambuttu (Rice Balls) with Veg Curry", emoji: "🍙", tag: "Coorg Special" },
  { name: "Plain Dosa with Chutney & Kesari Bath", emoji: "🥞", tag: "Favourite" },
  { name: "Puttu with Egg/Veg Curry & Kesari Bath", emoji: "🧁", tag: "Kerala Style" },
];

const dinnerItems = [
  { name: "Kadambuttu with Pork or Chicken Curry", emoji: "🍙", tag: "Coorg Special" },
  { name: "Nool Puttu (String Hoppers) with Chicken Curry", emoji: "🍝", tag: "Traditional" },
  { name: "Puttu with Coconut & Chicken Curry", emoji: "🧁", tag: "Kerala Style" },
  { name: "Akki Roti with Pork, Chicken, or Veg Curry", emoji: "🫓", tag: "Local Fav" },
  { name: "Chapathi with Chicken or Veg Curry", emoji: "🥙", tag: "Classic" },
  { name: "Ghee Rice with Chicken or Veg Curry", emoji: "🍚", tag: "Aromatic" },
  { name: "Biryani (Chicken or Veg)", emoji: "🥘", tag: "Popular" },
];

export default function Menu() {
  const [activeTab, setActiveTab] = useState<"breakfast" | "dinner">("breakfast");
  const [selectedBreakfast, setSelectedBreakfast] = useState<number | null>(null);
  const [selectedDinner, setSelectedDinner] = useState<number | null>(null);

  const items = activeTab === "breakfast" ? breakfastItems : dinnerItems;
  const selected = activeTab === "breakfast" ? selectedBreakfast : selectedDinner;
  const setSelected = activeTab === "breakfast" ? setSelectedBreakfast : setSelectedDinner;

  return (
    <section id="menu" className="section-padding" style={{ background: "var(--cream)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <span className="section-label">Cuisine</span>
          <h2 className="section-title" style={{ marginBottom: "16px" }}>
            Our Authentic Menu
          </h2>
          <div className="divider" />
          <p className="section-subtitle" style={{ marginTop: "16px" }}>
            Savour authentic Kodava &amp; Kerala cuisine, lovingly prepared with local ingredients.
            Guests choose one item per meal from the lists below.
          </p>
        </div>

        {/* Tab switcher */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "40px",
          }}
        >
          <button
            onClick={() => setActiveTab("breakfast")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "50px",
              fontWeight: 600,
              fontSize: "15px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              border: "none",
              background:
                activeTab === "breakfast"
                  ? "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)"
                  : "white",
              color: activeTab === "breakfast" ? "white" : "var(--text-dark)",
              boxShadow:
                activeTab === "breakfast"
                  ? "0 4px 20px rgba(45,90,39,0.3)"
                  : "0 2px 10px rgba(0,0,0,0.06)",
            }}
          >
            <Coffee size={18} />
            Breakfast
          </button>
          <button
            onClick={() => setActiveTab("dinner")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              borderRadius: "50px",
              fontWeight: 600,
              fontSize: "15px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              border: "none",
              background:
                activeTab === "dinner"
                  ? "linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)"
                  : "white",
              color: activeTab === "dinner" ? "white" : "var(--text-dark)",
              boxShadow:
                activeTab === "dinner"
                  ? "0 4px 20px rgba(139,94,60,0.3)"
                  : "0 2px 10px rgba(0,0,0,0.06)",
            }}
          >
            <Utensils size={18} />
            Lunch / Dinner
          </button>
        </div>

        {/* Served with note */}
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto 32px",
            background: activeTab === "breakfast" ? "var(--bg-green-light)" : "var(--bg-brown-light)",
            borderRadius: "14px",
            padding: "14px 20px",
            textAlign: "center",
            border:
              activeTab === "breakfast"
                ? "1px solid rgba(45,90,39,0.15)"
                : "1px solid rgba(139,94,60,0.15)",
          }}
        >
          <p style={{ fontSize: "14px", color: "var(--text-muted)", margin: 0 }}>
            {activeTab === "breakfast"
              ? "☕ All breakfast items are served with Coffee / Tea"
              : "🍚 All items served with White Rice, Rasam, Sweet, Fried Veg & Papad"}
          </p>
        </div>

        {/* Menu Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "16px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
          className="menu-grid"
        >
          {items.map((item, index) => {
            const isSelected = selected === index;
            return (
              <div
                key={index}
                onClick={() => setSelected(isSelected ? null : index)}
                style={{
                  background: isSelected
                    ? activeTab === "breakfast"
                      ? "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)"
                      : "linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)"
                    : "white",
                  borderRadius: "16px",
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: isSelected
                    ? "2px solid transparent"
                    : "2px solid var(--border)",
                  boxShadow: isSelected
                    ? "0 8px 24px rgba(0,0,0,0.15)"
                    : "0 2px 10px rgba(0,0,0,0.04)",
                  transform: isSelected ? "scale(1.02)" : "scale(1)",
                }}
              >
                {/* Number */}
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: isSelected
                      ? "rgba(255,255,255,0.25)"
                      : "var(--bg-green-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    flexShrink: 0,
                  }}
                >
                  {item.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: isSelected ? "white" : "var(--text-dark)",
                      lineHeight: 1.4,
                      marginBottom: "4px",
                    }}
                  >
                    {index + 1}. {item.name}
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: "50px",
                      background: isSelected ? "rgba(255,255,255,0.2)" : "var(--bg-brown-light)",
                      color: isSelected ? "rgba(255,255,255,0.9)" : "var(--accent)",
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
                {/* Check */}
                {isSelected && (
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: "white",
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom info */}
        <div
          style={{
            maxWidth: "900px",
            margin: "48px auto 0",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "20px",
          }}
          className="menu-info-grid"
        >
          {[
            {
              icon: <Flame size={22} color="var(--gold)" />,
              title: "Complimentary Campfire",
              desc: "Included with the Full Experience package",
            },
            {
              icon: <Soup size={22} color="var(--primary)" />,
              title: "Home-Cooked Goodness",
              desc: "Fresh, authentic local recipes daily",
            },
            {
              icon: <Coffee size={22} color="var(--accent)" />,
              title: "Tea & Coffee",
              desc: "Complimentary with every breakfast",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "24px",
                textAlign: "center",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  background: "var(--bg-green-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 14px",
                }}
              >
                {item.icon}
              </div>
              <h4 style={{ fontWeight: 700, color: "var(--primary-dark)", fontSize: "15px", marginBottom: "6px" }}>
                {item.title}
              </h4>
              <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .menu-grid { grid-template-columns: 1fr !important; }
          .menu-info-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
