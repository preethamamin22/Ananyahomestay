"use client";
import Image from "next/image";
import { Wifi, Car, Utensils, Droplets, Wind, Tv, Coffee, TreePine } from "lucide-react";
import { useState } from "react";

const rooms = [
  {
    id: "deluxe",
    name: "Deluxe Garden Room",
    image: "/real-living.jpg",
    price: 3500,
    description: "Cozy room with a wooden-ceiling interior, red curtains and a comfortable double bed. Perfect for couples seeking a peaceful retreat in Parane.",
    size: "320 sq ft",
    capacity: 2,
    amenities: ["WiFi", "Parking", "Breakfast", "Hot Water", "AC", "TV"],
    highlights: ["Wooden Ceiling", "Queen Bed", "Garden Access"],
    badge: "Most Popular",
  },
  {
    id: "family",
    name: "Family Suite",
    image: "/real-common.jpg",
    price: 5500,
    description: "Spacious family suite with a large common room, dining table, TV lounge, and connecting bedrooms. Ideal for families and groups.",
    size: "550 sq ft",
    capacity: 4,
    amenities: ["WiFi", "Parking", "All Meals", "Hot Water", "AC", "TV", "Sitting Area"],
    highlights: ["Dining Room", "TV Lounge", "Two Bedrooms"],
    badge: "Best Value",
  },
  {
    id: "budget",
    name: "Cozy Standard Room",
    image: "/real-garden.jpg",
    price: 2200,
    description: "Bright and spacious common sitting area with traditional wooden furniture for a comfortable and homely experience in Coorg.",
    size: "220 sq ft",
    capacity: 2,
    amenities: ["WiFi", "Parking", "Breakfast", "Hot Water", "Fan"],
    highlights: ["Sitting Lounge", "Attached Bathroom", "Daily Housekeeping"],
    badge: "Budget Pick",
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
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

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
            Each room is thoughtfully designed to give you the perfect blend of comfort,
            nature, and authentic Coorg charm.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
          }}
          className="rooms-grid"
        >
          {rooms.map((room) => (
            <div key={room.id} className="card" style={{ border: "1px solid var(--border)" }}>
              {/* Image */}
              <div style={{ position: "relative", height: "240px" }}>
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
                {/* Capacity */}
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
                  👤 {room.capacity} guests
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "28px" }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "22px",
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

                {/* Price & CTA */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                  <div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "2px" }}>Per night</div>
                    <div className="price-tag">₹{room.price.toLocaleString()}</div>
                  </div>
                  <a
                    href={`#booking`}
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
            padding: "20px",
            background: "var(--bg-green-light)",
            borderRadius: "16px",
            border: "1px solid rgba(45,90,39,0.15)",
          }}
        >
          <p style={{ color: "var(--primary-dark)", fontSize: "14px" }}>
            💡 <strong>All prices include</strong> breakfast for 2 guests. GST extra. Contact us for group discounts and long-stay offers.
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .rooms-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .rooms-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
