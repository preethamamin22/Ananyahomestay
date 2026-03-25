"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What are your check-in and check-out times?",
    a: "Check-in is from 12:00 PM onwards and check-out is by 11:00 AM. Early check-in and late check-out may be arranged subject to availability — just let us know in advance!",
  },
  {
    q: "Is breakfast included in the room price?",
    a: "Yes, a complimentary breakfast for 2 guests is included in all our room prices. We serve a combination of traditional Kodava breakfast and continental options using fresh, local ingredients.",
  },
  {
    q: "Do you have WiFi at the property?",
    a: "Yes, we have complimentary high-speed WiFi throughout the property. However, do keep in mind that we are in a nature setting, so speeds may occasionally vary.",
  },
  {
    q: "Is parking available at Ananya Home Stay?",
    a: "Absolutely! We have ample free parking space for cars, bikes, and SUVs within the property.",
  },
  {
    q: "How far is the property from Madikeri town?",
    a: "We are located approximately 2–3 km from Madikeri town centre, easily accessible by road. We can also arrange local transport for your convenience.",
  },
  {
    q: "Can you arrange guided tours or sightseeing?",
    a: "Yes! We offer guided coffee plantation tours, and can arrange local taxi bookings for popular attractions like Abbey Falls, Dubare Elephant Camp, Talacauvery, and more. Contact us in advance for best rates.",
  },
  {
    q: "Are pets allowed at the homestay?",
    a: "We love animals! Small, well-behaved pets are allowed with prior notice. Please inform us while booking so we can make appropriate arrangements.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Cancellations made 7 days before check-in receive a full refund. Cancellations within 48–72 hours receive a 50% refund. No-shows are non-refundable. For special circumstances, please contact us directly.",
  },
  {
    q: "Is it safe for solo female travellers?",
    a: "Absolutely! Safety and comfort of all our guests is our top priority. The property has 24/7 host presence, good lighting, and a secure environment. Solo female travellers have often praised their experience with us.",
  },
  {
    q: "Do you offer special packages for couples or honeymoon stays?",
    a: "Yes, we have romantic getaway packages for couples that include special room decoration, a candlelight dinner, coffee plantation walk, and more. Contact us via WhatsApp for custom packages.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding" style={{ background: "var(--bg-green-light)" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="section-label">FAQs</span>
          <h2 className="section-title" style={{ marginBottom: "16px" }}>
            Frequently Asked Questions
          </h2>
          <div className="divider" />
          <p className="section-subtitle" style={{ marginTop: "16px" }}>
            Have more questions? Reach us on WhatsApp — we respond within minutes.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="faq-item"
              style={{
                borderColor: open === i ? "var(--primary)" : "var(--border)",
                boxShadow: open === i ? "0 4px 20px rgba(45,90,39,0.12)" : "none",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  background: "white",
                  border: "none",
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: open === i ? "var(--primary)" : "var(--bg-green-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: open === i ? "white" : "var(--primary)",
                      fontSize: "12px",
                      fontWeight: 700,
                      flexShrink: 0,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <span
                    style={{
                      fontWeight: 600,
                      color: "var(--primary-dark)",
                      fontSize: "16px",
                      lineHeight: 1.4,
                    }}
                  >
                    {faq.q}
                  </span>
                </div>
                <ChevronDown
                  size={20}
                  color="var(--primary)"
                  style={{
                    flexShrink: 0,
                    transition: "transform 0.3s ease",
                    transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
              {open === i && (
                <div
                  style={{
                    background: "white",
                    padding: "0 24px 20px 66px",
                    color: "var(--text-muted)",
                    fontSize: "15px",
                    lineHeight: 1.75,
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
            Still have questions? We're here to help!
          </p>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat with Us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
