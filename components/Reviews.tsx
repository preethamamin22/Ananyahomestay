"use client";
import { useState } from "react";
import { Star, ThumbsUp, User } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Bangalore",
    avatar: "PS",
    rating: 5,
    date: "March 2025",
    review:
      "Absolutely magical! Waking up to the sound of birds and the smell of fresh coffee from the plantation was an experience unlike any other. The Achar family treated us like their own. The food — oh, the food! Authentic Kodava pandi curry and bamboo shoot curry were to die for.",
    helpful: 24,
    type: "Couple",
  },
  {
    id: 2,
    name: "Rahul & Meena Verma",
    location: "Mumbai",
    avatar: "RM",
    rating: 5,
    date: "February 2025",
    review:
      "We spent 3 nights at Ananya and cannot recommend it enough! The family suite was perfect for us and our two kids. The hosts organised a coffee plantation walk, which the kids absolutely loved. Clean, cosy, and incredibly peaceful. Will definitely return!",
    helpful: 18,
    type: "Family",
  },
  {
    id: 3,
    name: "Arjun Nair",
    location: "Chennai",
    avatar: "AN",
    rating: 5,
    date: "January 2025",
    review:
      "Best homestay experience in Coorg, hands down. The view from the room balcony is breathtaking — layers of coffee plants with morning mist rolling in. The hosts are warm and knowledgeable about local attractions. Highly recommended for solo travellers!",
    helpful: 31,
    type: "Solo",
  },
  {
    id: 4,
    name: "Sneha Kulkarni",
    location: "Pune",
    avatar: "SK",
    rating: 4,
    date: "December 2024",
    review:
      "A hidden gem in Coorg! The rooms were spotlessly clean and the home-cooked meals were fantastic. The plantation view is as good as advertised. Could have had better WiFi but everything else was perfect. Would recommend to anyone looking for a peaceful getaway.",
    helpful: 12,
    type: "Couple",
  },
  {
    id: 5,
    name: "Deepak Gowda",
    location: "Mysore",
    avatar: "DG",
    rating: 5,
    date: "November 2024",
    review:
      "Being from Karnataka, I've visited Coorg many times, but staying at Ananya gave me a completely new perspective. The Kodava hospitality here is genuine and warm. The sunrise from the garden is something I'll never forget. Five stars, no question!",
    helpful: 22,
    type: "Solo",
  },
  {
    id: 6,
    name: "Aisha Khan",
    location: "Hyderabad",
    avatar: "AK",
    rating: 5,
    date: "October 2024",
    review:
      "Perfect escape from city life! We visited with friends and had a wonderful time. The hosts were incredibly accommodating – they arranged a bonfir night for us with local stories about Coorg's history. The breakfast spread every morning was fabulous.",
    helpful: 19,
    type: "Group",
  },
];

export default function Reviews() {
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", location: "", rating: 5, review: "" });
  const [submitted, setSubmitted] = useState(false);
  const [helpfulClicked, setHelpfulClicked] = useState<Set<number>>(new Set());

  const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const toggleHelpful = (id: number) => {
    setHelpfulClicked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <section id="reviews" className="section-padding" style={{ background: "white" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="section-label">Guest Reviews</span>
          <h2 className="section-title" style={{ marginBottom: "16px" }}>
            What Our Guests Say
          </h2>
          <div className="divider" />

          {/* Overall rating */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "20px",
              background: "var(--primary-dark)",
              color: "white",
              padding: "20px 36px",
              borderRadius: "20px",
              marginTop: "24px",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "52px",
                  fontWeight: 700,
                  color: "var(--gold)",
                  lineHeight: 1,
                }}
              >
                {avgRating.toFixed(1)}
              </div>
              <div style={{ fontSize: "13px", opacity: 0.7, marginTop: "4px" }}>Overall Rating</div>
            </div>
            <div style={{ width: "1px", height: "60px", background: "rgba(255,255,255,0.2)" }} />
            <div>
              <div style={{ display: "flex", gap: "4px", marginBottom: "6px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#d4a853" color="#d4a853" />
                ))}
              </div>
              <div style={{ fontSize: "14px", fontWeight: 500 }}>Based on {reviews.length} reviews</div>
              <div style={{ fontSize: "12px", opacity: 0.7 }}>Google · TripAdvisor · Direct</div>
            </div>
          </div>
        </div>

        {/* Reviews grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            marginBottom: "48px",
          }}
          className="reviews-grid"
        >
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "16px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "16px",
                    flexShrink: 0,
                  }}
                >
                  {review.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: "var(--text-dark)", marginBottom: "2px" }}>{review.name}</div>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                    📍 {review.location} · {review.date}
                  </div>
                </div>
                <span
                  style={{
                    background: "var(--bg-green-light)",
                    color: "var(--primary)",
                    padding: "4px 10px",
                    borderRadius: "50px",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {review.type}
                </span>
              </div>

              {/* Stars */}
              <div style={{ display: "flex", gap: "3px", marginBottom: "12px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < review.rating ? "#d4a853" : "transparent"}
                    color={i < review.rating ? "#d4a853" : "#d1d5db"}
                  />
                ))}
              </div>

              {/* Review text */}
              <p style={{ color: "var(--text-muted)", fontSize: "14px", lineHeight: 1.7, marginBottom: "16px" }}>
                "{review.review}"
              </p>

              {/* Helpful */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "12px", borderTop: "1px solid var(--border)" }}>
                <button
                  onClick={() => toggleHelpful(review.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: helpfulClicked.has(review.id) ? "var(--bg-green-light)" : "transparent",
                    border: "1px solid var(--border)",
                    borderRadius: "50px",
                    padding: "6px 14px",
                    cursor: "pointer",
                    fontSize: "13px",
                    color: helpfulClicked.has(review.id) ? "var(--primary)" : "var(--text-muted)",
                    fontWeight: helpfulClicked.has(review.id) ? 600 : 400,
                    transition: "all 0.2s ease",
                  }}
                >
                  <ThumbsUp size={14} /> Helpful ({review.helpful + (helpfulClicked.has(review.id) ? 1 : 0)})
                </button>
                <div
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "12px",
                    color: "var(--text-muted)",
                  }}
                >
                  <span style={{ color: "#4285f4", fontWeight: 700 }}>G</span> Verified
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review */}
        <div
          style={{
            background: "var(--bg-green-light)",
            borderRadius: "24px",
            padding: "40px",
            border: "2px dashed rgba(45,90,39,0.25)",
          }}
        >
          {!showForm && !submitted ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>⭐</div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "26px",
                  fontWeight: 700,
                  color: "var(--primary-dark)",
                  marginBottom: "12px",
                }}
              >
                Share Your Experience
              </h3>
              <p style={{ color: "var(--text-muted)", marginBottom: "24px", maxWidth: "500px", margin: "0 auto 24px" }}>
                Stayed with us? We'd love to hear about your experience at Ananya Home Stay!
              </p>
              <button onClick={() => setShowForm(true)} className="btn-primary">
                Write a Review
              </button>
            </div>
          ) : submitted ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "50px", marginBottom: "16px" }}>🙏</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", color: "var(--primary-dark)", marginBottom: "12px" }}>
                Thank You for Your Review!
              </h3>
              <p style={{ color: "var(--text-muted)" }}>Your review is submitted and pending approval. We appreciate your feedback!</p>
            </div>
          ) : (
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", color: "var(--primary-dark)", marginBottom: "24px", textAlign: "center" }}>
                Write a Review
              </h3>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Star Rating */}
                <div>
                  <label style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-dark)", marginBottom: "10px", display: "block" }}>
                    Your Rating *
                  </label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {[1,2,3,4,5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        style={{ background: "none", border: "none", cursor: "pointer", padding: "2px" }}
                      >
                        <Star
                          size={32}
                          fill={star <= newReview.rating ? "#d4a853" : "transparent"}
                          color={star <= newReview.rating ? "#d4a853" : "#d1d5db"}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "8px" }}>Name *</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Your name"
                      value={newReview.name}
                      onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "8px" }}>City</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Your city"
                      value={newReview.location}
                      onChange={e => setNewReview({ ...newReview, location: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "8px" }}>Your Review *</label>
                  <textarea
                    className="input-field"
                    rows={4}
                    placeholder="Share your experience at Ananya Home Stay..."
                    value={newReview.review}
                    onChange={e => setNewReview({ ...newReview, review: e.target.value })}
                    required
                    style={{ resize: "vertical" }}
                  />
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button type="submit" className="btn-primary">Submit Review</button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    style={{
                      padding: "14px 24px",
                      borderRadius: "50px",
                      border: "2px solid var(--border)",
                      background: "white",
                      cursor: "pointer",
                      fontWeight: 600,
                      color: "var(--text-muted)",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .reviews-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .reviews-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
