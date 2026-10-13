import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, IBM_Plex_Sans } from "next/font/google";
import { LangProvider } from "@/hooks/useLang";
import "./globals.css";
const ar = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-ar", display: "swap" });
const en = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-en", display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: { title: "AhmedR — Marketing that people remember", locale: "ar_EG", type: "website" }, title: "AhmedR — Marketing that people remember", description: "Positioning, emotional marketing and communication that business owners can trust." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ld = { "@context": "https://schema.org", "@type": "Person", name: "Ahmed Ramadan", jobTitle: "Marketing Strategist", worksFor: { "@type": "Organization", name: "NovaReach" } };
  return (
    <html lang="ar" dir="rtl" className={`${ar.variable} ${en.variable}`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
