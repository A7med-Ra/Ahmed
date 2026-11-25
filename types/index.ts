export type Lang = "ar" | "en";
export type Project = {
  id: string;
  category: string;
  image: string;
  comingSoon?: boolean;
  comingSoonTitle?: Record<Lang, string>;
  comingSoonDescription?: Record<Lang, string>;
};
