export const asset = (p: string) => (p.startsWith("/") ? "." + p : p);
