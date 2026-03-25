import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ananya Home Stay – Best Homestay in Coorg Parane | Coffee Plantation View",
  description:
    "Experience the best homestay in Coorg at Parane, Madikeri. Beautiful coffee plantation views, home-cooked Kodava food, bonfire nights, plantation walks, and warm hospitality. Book Ananya Home Stay for an affordable and serene stay in Coorg, Karnataka.",
  keywords:
    "best homestay in Coorg, Coorg homestay booking, affordable stay in Coorg, Ananya Home Stay Parane, Parane Madikeri homestay, coffee plantation stay Coorg, Kodava hospitality, homestay near Tadiandamol",
  openGraph: {
    title: "Ananya Home Stay – Best Homestay in Coorg",
    description:
      "Experience serene stays surrounded by lush coffee plantations in Coorg. Book now for the best rates.",
    url: "https://ananyahomestay.com",
    siteName: "Ananya Home Stay",
    images: [{ url: "/hero.png", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ananya Home Stay – Best Homestay in Coorg",
    description: "Experience serene stays surrounded by lush coffee plantations.",
    images: ["/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  authors: [{ name: "Ananya Home Stay" }],
  creator: "Ananya Home Stay",
  metadataBase: new URL("https://ananyahomestay.com"),
};

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Ananya Home Stay",
  description:
    "A premium homestay in Coorg, Karnataka offering coffee plantation views, home-cooked food, and warm Kodava hospitality.",
  url: "https://ananyahomestay.com",
  telephone: "+91-9876543210",
  email: "info@ananyahomestay.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Parane Post, Konajageri",
    addressLocality: "Madikeri",
    addressRegion: "Coorg, Karnataka",
    postalCode: "571218",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 12.2678302,
    longitude: 75.7189313,
  },
  image: "https://ananyahomestay.com/hero.png",
  priceRange: "₹₹",
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "Home Cooked Meals", value: true },
    { "@type": "LocationFeatureSpecification", name: "Hot Water", value: true },
  ],
  starRating: { "@type": "Rating", ratingValue: "4.9" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "128",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
