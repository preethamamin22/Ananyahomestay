"use client";
import Image from "next/image";
import { Wifi, Car, Utensils, Droplets, Wind, Tv, Coffee, TreePine, Users, Bed } from "lucide-react";

const rooms = [
  {
    id: "family-suite",
    name: "Family Suite",
    image: "/real-common.jpg",
    description: "Spacious family suite featuring 2 Double Beds — ideal for families or groups of friends. Enjoy a warm, homely atmosphere with connecting living space and authentic Coorg decor.",
    size: "550 sq ft",
    capacity: 4,
    beds: "2 Double Beds",
    totalRooms: 2,
    amenities: ["WiFi", "Parking", "Hot Water", "TV", "Sitting Area"],
    highlights: ["2 Double Beds", "Family Friendly", "Group Ready"],
    badge: "Best for Families",
  },
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    image: "/real-living.jpg",
    description: "Elegant deluxe room with 1 King Size Bed — perfect for couples seeking extra comfort and privacy. Wake up to misty plantation views and serene Coorg mornings.",
    size: "350 sq ft",
    capacity: 2,
    beds: "1 King Size Bed",
    totalRooms: 2,
    amenities: ["WiFi", "Parking", "Hot Water", "TV"],
    highlights: ["King Size Bed", "Couple Friendly", "Extra Comfort"],
    badge: "Perfect for Couples",
  },
];

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi size={16} />,
  Parking: <Car size={16} />,
  Breakfast: <Coffee size={16} />,
  "All Meals": <Utensils size={16} />,
  "Hot Water": <Droplets size={16} />,
  AC: <Wind size={16} />,
  TV: <Tv size={16} />,
  "Sitting Area": <TreePine size={16} />,
  Fan: <Wind size={16} />,
};

export default function Rooms() {
  return (
    <section id="rooms" className="section-padding" style={{ background: "white" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="section-label">Accommodation</span>
          <h2 className="section-title" style={{ marginBottom: "16px" }}>
            Our Comfortable Rooms
          </h2>
          <div className="divider" />
          <p className="section-subtitle" style={{ marginTop: "16px" }}>
            4 rooms total, accommodating up to <strong>12 guests</strong>. Each room is
            thoughtfully designed for comfort, nature, and authentic Coorg charm.
          </p>
        </div>

        {/* Capacity Banner */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            flexWrap: "wrap",
            marginBottom: "48px",
          }}
          className="capacity-banner"
        >
          {[
            { icon: <Bed size={22} />, label: "4 Rooms Total", sub: "2 Family + 2 Deluxe" },
            { icon: <Users size={22} />, label: "12 Guests Max", sub: "Total Capacity" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                background: "var(--bg-green-light)",
                padding: "16px 28px",
                borderRadius: "16px",
                border: "1px solid rgba(45,90,39,0.15)",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "var(--primary)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: "var(--primary-dark)", fontSize: "16px" }}>
                  {item.label}
                </div>
                <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "32px",
            maxWidth: "960px",
            margin: "0 auto",
          }}
          className="rooms-grid"
        >
          {rooms.map((room) => (
            <div key={room.id} className="card" style={{ border: "1px solid var(--border)" }}>
              {/* Image */}
              <div style={{ position: "relative", height: "260px" }}>
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
                {/* Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    background: "var(--primary)",
                    color: "white",
                    padding: "6px 14px",
                    borderRadius: "50px",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                  }}
                >
                  {room.badge}
                </div>
                {/* Room count */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(8px)",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "50px",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  🏠 {room.totalRooms} Rooms Available
                </div>
                {/* Capacity */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "16px",
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(8px)",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "50px",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  👤 {room.capacity} guests / room · 🛏️ {room.beds}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "28px" }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "var(--primary-dark)",
                    marginBottom: "8px",
                  }}
                >
                  {room.name}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>
                  {room.description}
                </p>

                {/* Room highlights */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
                  {room.highlights.map((h) => (
                    <span
                      key={h}
                      style={{
                        background: "var(--bg-green-light)",
                        color: "var(--primary-dark)",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 500,
                        border: "1px solid rgba(45,90,39,0.15)",
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Amenities */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px",
                    marginBottom: "24px",
                    paddingBottom: "24px",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {room.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        color: "var(--text-muted)",
                        fontSize: "13px",
                      }}
                    >
                      <span style={{ color: "var(--primary)" }}>{amenityIcons[amenity]}</span>
                      {amenity}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                  <div>
                    <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "2px" }}>
                      Starting from
                    </div>
                    <div className="price-tag" style={{ fontSize: "26px" }}>₹800<span style={{ fontSize: "14px", fontWeight: 400, color: "var(--text-muted)" }}>/person</span></div>
                  </div>
                  <a
                    href="#booking"
                    className="btn-primary"
                    style={{ padding: "12px 24px", fontSize: "14px" }}
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            padding: "24px",
            background: "var(--bg-green-light)",
            borderRadius: "16px",
            border: "1px solid rgba(45,90,39,0.15)",
          }}
        >
          <p style={{ color: "var(--primary-dark)", fontSize: "14px", lineHeight: 1.7 }}>
            💡 <strong>Stay Only</strong> at ₹800/person · <strong>Full Experience</strong> (Stay + Meals + Campfire) at ₹1,200/person
            <br />
            Contact us for group bookings and custom packages.
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .rooms-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
