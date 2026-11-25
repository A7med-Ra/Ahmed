import { Project } from "@/types";
export const projects: Project[] = [
  { id: "p1", category: "software", image: "/projects/1.jpg" },
  { id: "p2", category: "software", image: "/projects/2.jpg" },
  { id: "p3", category: "clean services", image: "/projects/3.jpg" },
  { id: "p4", category: "jewelry", image: "/projects/4.jpg" },
  { id: "p5", category: "marketing", image: "/projects/5.jpg" },
  {
    id: "cleanova",
    category: "services",
    image: "",
    comingSoon: true,
    comingSoonTitle: { ar: "كلينوفا", en: "Cleanova" },
    comingSoonDescription: {
      ar: "إعادة صياغة رسائل الثقة والأمان لخدمات النظافة الاحترافية.",
      en: "Reframing trust and safety messages for professional cleaning services.",
    },
  },
  {
    id: "silver-sparkle",
    category: "services",
    image: "",
    comingSoon: true,
    comingSoonTitle: { ar: "سيلفر سباركل", en: "Silver Sparkle" },
    comingSoonDescription: {
      ar: "تحويل العروض التقليدية لهوية بصرية ورسائل بيعية تخطف العميل.",
      en: "Turning traditional offers into a distinctive visual identity and sales messages that grab attention.",
    },
  },
  {
    id: "ratib",
    category: "software",
    image: "",
    comingSoon: true,
    comingSoonTitle: { ar: "رتب", en: "Ratib" },
    comingSoonDescription: {
      ar: "تبسيط نظام إدارة مكاتب الاستقدام برسائل واضحة تخاطب صاحب المكتب.",
      en: "Simplifying recruitment office management with clear messages for office owners.",
    },
  },
  {
    id: "alkhwarizmi",
    category: "software",
    image: "",
    comingSoon: true,
    comingSoonTitle: { ar: "الخوارزمي", en: "Alkhwarizmi" },
    comingSoonDescription: {
      ar: "من بيع 'نظام كاشير وفوترة إلكترونية وإدارة فنادق' لبيع راحة البال والسيطرة الكاملة على التشغيل.",
      en: "From selling cashier, e-invoicing, and hotel management software to selling peace of mind and full operational control.",
    },
  },
  {
    id: "online-dental-store",
    category: "services",
    image: "",
    comingSoon: true,
    comingSoonTitle: { ar: "أونلاين دنتل ستور", en: "Online Delta Store" },
    comingSoonDescription: {
      ar: "تسويق كراسي وتجهيزات العيادات الطبية بزاوية الراحة والاحترافية للطبيب.",
      en: "Marketing medical clinic chairs and equipment around comfort and professionalism for doctors.",
    },
  },
];
