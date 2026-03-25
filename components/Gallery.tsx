"use client";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

const images = [
  { src: "/real-exterior.jpg", alt: "Ananya Home Stay – Front view of the property in Parane, Coorg" },
  { src: "/real-common.jpg", alt: "Spacious living and dining room with wooden furniture" },
  { src: "/real-living.jpg", alt: "Cozy bedroom with wooden ceiling and red curtains" },
  { src: "/real-garden.jpg", alt: "Guest sitting area with traditional Kodava wooden seating" },
  { src: "/real-bedroom.jpg", alt: "Clean marble-tiled attached bathroom" },
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
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "repeat(2, 280px)",
            gap: "12px",
          }}
          className="gallery-grid"
        >
          {images.map((img, i) => {
            // Spanning: [0]=col 1-7 row 1-2, [1]=col 8-12 row 1, [2]=col 8-10 row 2, [3]=col 11-12 row 2, [4]=hidden on desktop shown in mobile
            const spans = [
              { gridColumn: "1 / 8", gridRow: "1 / 3" },
              { gridColumn: "8 / 13", gridRow: "1 / 2" },
              { gridColumn: "8 / 11", gridRow: "2 / 3" },
              { gridColumn: "11 / 13", gridRow: "2 / 3" },
              { display: "none" as const },
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
