import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { withBase, BASE_PATH } from "@/lib/base";
import { gym } from "@/data/gym.config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { has } from "@/lib/assets";
import Behaviors from "@/components/Behaviors";
import WhatsAppButton from "@/components/WhatsAppButton";

const display = Barlow_Condensed({ subsets: ["latin"], weight: ["700", "800"], style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

const title = `${gym.name} ${gym.nameAccent} | Gym in ${gym.address.city}`;

export const metadata: Metadata = {
  metadataBase: new URL(withBase("/") , gym.siteUrl),
  title: { default: title, template: `%s | ${gym.name} ${gym.nameAccent}` },
  description: gym.description,
  openGraph: {
    type: "website", siteName: gym.name, title, description: gym.description, locale: "en_IN",
    images: [{ url: gym.assets.og, width: 1200, height: 630, alt: gym.name }],
  },
  twitter: { card: "summary_large_image", title, description: gym.description, images: [gym.assets.og] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0A0B10", colorScheme: "dark" };

// LocalBusiness / Gym structured data for Google.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthClub",
  name: `${gym.name} ${gym.nameAccent}`,
  description: gym.description,
  url: new URL(withBase("/"), gym.siteUrl).toString(),
  telephone: gym.phone,
  email: gym.email,
  image: new URL(withBase(gym.assets.og), gym.siteUrl).toString(),
  address: { "@type": "PostalAddress", streetAddress: `${gym.address.street}, ${gym.address.area}`, addressLocality: gym.address.city, addressRegion: gym.address.state, postalCode: gym.address.postalCode, addressCountry: gym.address.country },
  geo: { "@type": "GeoCoordinates", latitude: gym.geo.lat, longitude: gym.geo.lng },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: gym.hours.open[1][0], closes: gym.hours.open[1][1] },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: gym.hours.open[0][0], closes: gym.hours.open[0][1] },
  ],
  sameAs: Object.values(gym.social),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme={gym.theme} className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-accent-contrast">Skip to content</a>
        <Navbar showTrainers={gym.trainers.some((t) => has(t.image))} />
        <main id="main" className="overflow-x-clip">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Behaviors />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
