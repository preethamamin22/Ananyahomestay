"use client";
import Image from "next/image";
import { MapPin, Star, Coffee, Home, Leaf } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "700px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/real-exterior.jpg"
          alt="Ananya Home Stay Parane Coorg – Orange house exterior"
          fill
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
          priority
          quality={90}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(26,58,22,0.88) 0%, rgba(45,90,39,0.75) 40%, rgba(139,94,60,0.6) 100%)",
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${8 + i * 4}px`,
            height: `${8 + i * 4}px`,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            top: `${15 + i * 12}%`,
            left: `${5 + i * 15}%`,
            animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
            zIndex: 1,
          }}
        />
      ))}

      {/* Content */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "white",
        }}
      >
        {/* Location badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            padding: "8px 20px",
            borderRadius: "50px",
            border: "1px solid rgba(255,255,255,0.25)",
            marginBottom: "28px",
            animation: "fadeInUp 0.6s ease forwards",
          }}
        >
          <MapPin size={14} />
          <span style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "1px" }}>
            Parane, Madikeri · Coorg, Karnataka
          </span>
        </div>

        {/* Rating */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            marginBottom: "20px",
            animation: "fadeInUp 0.6s ease 0.1s forwards",
            opacity: 0,
          }}
        >
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} fill="#d4a853" color="#d4a853" />
          ))}
          <span style={{ fontSize: "15px", fontWeight: 600, marginLeft: "4px" }}>4.9</span>
          <span style={{ fontSize: "14px", opacity: 0.8 }}>(128 Reviews)</span>
        </div>

        {/* Main heading */}
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(38px, 7vw, 80px)",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: "24px",
            animation: "fadeInUp 0.7s ease 0.2s forwards",
            opacity: 0,
          }}
        >
          Experience Serenity at<br />
          <span
            style={{
              background: "linear-gradient(135deg, #d4a853 0%, #f0c878 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Ananya Home Stay
          </span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: "clamp(16px, 2.5vw, 20px)",
            maxWidth: "600px",
            margin: "0 auto 40px",
            lineHeight: 1.7,
            animation: "fadeInUp 0.7s ease 0.3s forwards",
            opacity: 0,
          }}
        >
          Wake up to misty coffee plantation views, savour authentic Kodava cuisine,
          and immerse yourself in the tranquil beauty of Coorg.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "64px",
            animation: "fadeInUp 0.7s ease 0.4s forwards",
            opacity: 0,
          }}
        >
          <a href="#booking" className="btn-primary">
            🏡 Book Your Stay
          </a>
          <a
            href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20book%20a%20stay%20at%20Ananya%20Home%20Stay%20Coorg"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Contact on WhatsApp
          </a>
        </div>

        {/* Feature highlights */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            flexWrap: "wrap",
            animation: "fadeInUp 0.7s ease 0.5s forwards",
            opacity: 0,
          }}
        >
          {[
            { icon: <Leaf size={20} />, text: "Peaceful Stay" },
            { icon: <Coffee size={20} />, text: "Coffee Plantation View" },
            { icon: <Home size={20} />, text: "Home-Cooked Food" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(10px)",
                padding: "12px 20px",
                borderRadius: "50px",
                border: "1px solid rgba(255,255,255,0.2)",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          animation: "float 2s ease-in-out infinite",
        }}
      >
        <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", letterSpacing: "2px" }}>SCROLL</span>
        <div
          style={{
            width: "2px",
            height: "40px",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)",
            borderRadius: "2px",
          }}
        />
      </div>
    </section>
  );
}
