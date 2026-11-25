// بيضيف /AhmedR قدام مسارات الصور لما الموقع يتبني لـ GitHub Pages
export const asset = (p: string) => (p.startsWith("/") ? (process.env.NEXT_PUBLIC_BASE_PATH || "") + p : p);
