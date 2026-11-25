import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, IBM_Plex_Sans } from "next/font/google";
import { LangProvider } from "@/hooks/useLang";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import NavigationFeedback from "@/components/NavigationFeedback";
import MobileConsultation from "@/components/MobileConsultation";
import BackToTop from "@/components/BackToTop";
import arLocale from "@/locales/ar.json";
import "lenis/dist/lenis.css";
import "./globals.css";
const ar = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-ar", display: "swap" });
const en = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-en", display: "swap" });
const githubOwner = process.env.GITHUB_REPOSITORY?.split("/")[0];
const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL || (githubOwner ? `https://${githubOwner}.github.io` : "http://localhost:3000"));
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const ogImage = new URL(`${basePath}/profile/ahmed%20ramadan%20pro.jpg`, metadataBase);
export const metadata: Metadata = {
  metadataBase,
  title: `${arLocale.hero.name} — ${arLocale.hero.headline}`,
  description: arLocale.hero.sub[0].trim(),
  icons: {
    icon: new URL(`${basePath}/icon.png`, metadataBase),
    apple: new URL(`${basePath}/apple-icon.png`, metadataBase),
  },
  openGraph: {
    title: `${arLocale.hero.name} — ${arLocale.hero.headline}`,
    description: arLocale.hero.sub[0].trim(),
    locale: "ar_EG",
    type: "website",
    images: [{ url: ogImage, width: 1024, height: 1024, alt: arLocale.hero.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${arLocale.hero.name} — ${arLocale.hero.headline}`,
    description: arLocale.hero.sub[0].trim(),
    images: [{ url: ogImage, alt: arLocale.hero.name }],
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ld = { "@context": "https://schema.org", "@type": "Person", name: "Ahmed Ramadan", jobTitle: "Marketing Strategist", worksFor: { "@type": "Organization", name: "NovaReach" } };
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={`dark ${ar.variable} ${en.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("theme")==="light"){document.documentElement.classList.add("light");document.documentElement.classList.remove("dark");document.documentElement.style.colorScheme="light"}}catch{}` }} />
      </head>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <LangProvider>
          <SmoothScroll />
          <ScrollProgress />
          <NavigationFeedback />
          {children}
          <MobileConsultation />
          <BackToTop />
        </LangProvider>
      </body>
    </html>
  );
}
