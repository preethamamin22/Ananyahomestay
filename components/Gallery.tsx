"use client";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

const images = [
  { src: "/real-exterior.jpg", alt: "Ananya Home Stay – Front view of the property in Parane, Coorg" },
  { src: "/gallery-plantation.jpg", alt: "Beautiful view of the homestay and coffee plantation" },
  { src: "/real-common.jpg", alt: "Spacious living and dining room with wooden furniture" },
  { src: "/gallery-bedding.jpg", alt: "Cozy deluxe room interior showcasing comfortable bedding" },
  { src: "/deluxe-room.jpg", alt: "Elegant Deluxe Room with plantation views" },
  { src: "/gallery-nature.jpg", alt: "Scenic surrounding nature and mist-covered hills of Coorg" },
  { src: "/real-garden.jpg", alt: "Guest sitting area with traditional Kodava wooden seating" },
  { src: "/family-suite.jpg", alt: "Spacious Family Suite bedroom featuring comfortable beds" },
  { src: "/family-suite-1.jpg", alt: "Cozy sitting area and wooden details inside the Family Suite" },
  { src: "/family-suite-2.jpg", alt: "Warm and welcoming interior of the Family Suite room" },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="gallery" className="section-padding" style={{ background: "var(--cream)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="section-label">Gallery</span>
          <h2 className="section-title" style={{ marginBottom: "16px" }}>
            Glimpses of Paradise
          </h2>
          <div className="divider" />
          <p className="section-subtitle" style={{ marginTop: "16px" }}>
            Every frame tells a story of nature, warmth, and the authentic Coorg experience.
          </p>
          <div style={{ marginTop: "24px" }}>
            <a href="https://photos.app.goo.gl/M8UGNLN5gMbSXEpv5" target="_blank" rel="noopener noreferrer" className="btn-primary">
              View Full Gallery
            </a>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridAutoRows: "280px",
            gap: "12px",
          }}
          className="gallery-grid"
        >
          {images.map((img, i) => {
            // Spanning logic for 10 images
            const spans = [
              { gridColumn: "1 / 8", gridRow: "span 2" },
              { gridColumn: "8 / 13", gridRow: "span 1" },
              { gridColumn: "8 / 11", gridRow: "span 1" },
              { gridColumn: "11 / 13", gridRow: "span 1" },
              { gridColumn: "1 / 6", gridRow: "span 1" },
              { gridColumn: "6 / 13", gridRow: "span 1" },
              { gridColumn: "1 / 8", gridRow: "span 1" },
              { gridColumn: "8 / 13", gridRow: "span 1" },
              { gridColumn: "1 / 5", gridRow: "span 1" },
              { gridColumn: "5 / 13", gridRow: "span 1" },
            ];
            const span = spans[i] || { display: "none" as const };

            return (
              <div
                key={i}
                onClick={() => setLightbox(img.src)}
                style={{
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  ...span,
                }}
                className="gallery-item"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  unoptimized={img.src.startsWith('http')}
                  style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                  className="gallery-img"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                  className="gallery-overlay"
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "16px",
                    right: "16px",
                    color: "white",
                    fontSize: "13px",
                    opacity: 0,
                    transform: "translateY(8px)",
                    transition: "all 0.3s ease",
                  }}
                  className="gallery-caption"
                >
                  {img.alt}
                </div>
              </div>
            );
          })}
        </div>

        {/* Lightbox */}
        {lightbox && (
          <div
            onClick={() => setLightbox(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.92)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              cursor: "pointer",
            }}
          >
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "rgba(255,255,255,0.2)",
                border: "none",
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "white",
              }}
            >
              <X size={24} />
            </button>
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "900px",
                maxHeight: "85vh",
                borderRadius: "16px",
                overflow: "hidden",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox}
                alt="Gallery preview"
                width={900}
                height={600}
                unoptimized={lightbox.startsWith('http')}
                style={{ width: "100%", height: "auto", display: "block", maxHeight: "85vh", objectFit: "contain" }}
              />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .gallery-item:hover .gallery-img { transform: scale(1.06); }
        .gallery-item:hover .gallery-overlay { opacity: 1; }
        .gallery-item:hover .gallery-caption { opacity: 1; transform: translateY(0); }
        .gallery-item:hover { box-shadow: 0 16px 48px rgba(0,0,0,0.2); }
        @media (max-width: 768px) {
          .gallery-grid { 
            grid-template-columns: 1fr !important; 
            grid-template-rows: auto !important;
            gap: 16px !important;
          }
          .gallery-item { 
            grid-column: 1 / 2 !important; 
            grid-row: auto !important; 
            aspect-ratio: 4/3;
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}
