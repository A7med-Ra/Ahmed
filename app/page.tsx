import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Hero from "@/sections/Hero";
import GrowthAudit from "@/components/GrowthAudit";
const Process = dynamic(() => import("@/sections/Process"));
const Why = dynamic(() => import("@/sections/Why"));
const CaseStudies = dynamic(() => import("@/sections/CaseStudies"));
const Testimonials = dynamic(() => import("@/sections/Testimonials"));
const Partners = dynamic(() => import("@/sections/Partners"));
const Contact = dynamic(() => import("@/sections/Contact"));
const Footer = dynamic(() => import("@/sections/Footer"));
const Outcomes = dynamic(() => import("@/sections/Outcomes").then(m => m.Outcomes));

export default function Page() {
  return (
    <> 
      <Navbar />
      <main id="page-content">
        <Hero /><Why /><Process /><CaseStudies /><GrowthAudit /><Outcomes /><Testimonials /><Partners /><Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
