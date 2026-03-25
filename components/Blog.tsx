"use client";
import Image from "next/image";
import { Clock, User, ArrowRight } from "lucide-react";

const blogs = [
  {
    slug: "top-10-places-visit-coorg",
    title: "Top 10 Places to Visit in Coorg – The Scotland of India",
    excerpt:
      "From the misty Abbey Falls and the historical Madikeri Fort to the exotic Nagarhole wildlife sanctuary — discover Coorg's most breathtaking destinations that deserve a spot on every traveller's bucket list.",
    image: null,
    emoji: "🏔️",
    gradientFrom: "#1a3a16",
    gradientTo: "#2d5a27",
    readTime: "8 min read",
    author: "Ananya Team",
    date: "March 10, 2025",
    category: "Travel Guide",
    keywords: "Top places to visit in Coorg, Coorg tourist spots",
  },
  {
    slug: "why-choose-homestay-coorg",
    title: "Why Choose a Homestay in Coorg Over a Hotel",
    excerpt:
      "Hotels give you a bed, but homestays give you memories. Discover why thousands of travellers are choosing the authentic homestay experience in Coorg — from home-cooked meals to personalised local guidance.",
    image: "/real-exterior.jpg",
    emoji: null,
    gradientFrom: null,
    gradientTo: null,
    readTime: "6 min read",
    author: "Ananya Team",
    date: "February 22, 2025",
    category: "Homestay Life",
    keywords: "Why choose homestay in Coorg, Coorg homestay benefits",
  },
  {
    slug: "best-time-visit-coorg",
    title: "Best Time to Visit Coorg – A Complete Season Guide",
    excerpt:
      "Whether you love the lush monsoon greenery, the cool winter mist, or the warm summer sunshine — we break down each season in Coorg to help you plan the perfect trip, any time of year.",
    image: null,
    emoji: "🌿",
    gradientFrom: "#8b5e3c",
    gradientTo: "#c4905a",
    readTime: "7 min read",
    author: "Ananya Team",
    date: "January 15, 2025",
    category: "Travel Tips",
    keywords: "Best time to visit Coorg, Coorg weather seasons",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="section-padding" style={{ background: "var(--cream)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="section-label">Travel Blog</span>
          <h2 className="section-title" style={{ marginBottom: "16px" }}>
            Stories from Coorg
          </h2>
          <div className="divider" />
          <p className="section-subtitle" style={{ marginTop: "16px" }}>
            Explore our guides, travel tips, and stories to help you plan the perfect Coorg getaway.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
          }}
          className="blog-grid"
        >
          {blogs.map((blog, i) => (
            <article key={blog.slug} className="blog-card">
              {/* Image or gradient */}
              <div style={{ position: "relative", height: "220px" }}>
                {blog.image ? (
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: `linear-gradient(135deg, ${blog.gradientFrom} 0%, ${blog.gradientTo} 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "72px",
                    }}
                  >
                    {blog.emoji}
                  </div>
                )}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    background: "var(--primary)",
                    color: "white",
                    padding: "5px 14px",
                    borderRadius: "50px",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  {blog.category}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "28px" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    marginBottom: "14px",
                    fontSize: "13px",
                    color: "var(--text-muted)",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <User size={13} /> {blog.author}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Clock size={13} /> {blog.readTime}
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "var(--primary-dark)",
                    lineHeight: 1.4,
                    marginBottom: "12px",
                  }}
                >
                  {blog.title}
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" }}>
                  {blog.excerpt}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "16px",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>{blog.date}</span>
                  <a
                    href={`/blog/${blog.slug}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "var(--primary)",
                      fontWeight: 600,
                      fontSize: "14px",
                      textDecoration: "none",
                      transition: "gap 0.2s ease",
                    }}
                    className="read-more-link"
                  >
                    Read More <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* SEO Keywords section */}
        <div
          style={{
            marginTop: "48px",
            padding: "28px",
            background: "white",
            borderRadius: "16px",
            border: "1px solid var(--border)",
          }}
        >
          <p style={{ fontSize: "13px", color: "var(--text-muted)", textAlign: "center" }}>
            <strong>Popular searches:</strong>{" "}
            {[
              "Best homestay in Coorg",
              "Coorg homestay booking",
              "Affordable stay in Coorg",
              "Coorg nature stay",
              "Coffee plantation homestay",
              "Budget homestay Kodagu",
              "Madikeri homestay",
            ].map((keyword, i) => (
              <span key={i}>
                <span style={{ color: "var(--primary)", fontWeight: 500 }}>{keyword}</span>
                {i < 6 ? " · " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
        .read-more-link:hover { gap: 10px !important; }
      `}</style>
    </section>
  );
}
