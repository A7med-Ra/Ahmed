import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetails from "@/components/ProjectDetails";
import { projects } from "@/data/projects";
import arLocale from "@/locales/ar.json";

type PageProps = { params: { slug: string } };
type LocalizedProject = { name: string; summary: string };

// Next 14 dev server expects a static fallback mode for output: export routes.
// It maps `true` to that mode in development, while export builds must keep
// dynamic params disabled so only the generated project slugs are emitted.
export const dynamicParams = process.env.NODE_ENV === "development";

export function generateStaticParams() {
  return projects.filter(project => !project.comingSoon).map(project => ({ slug: project.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = projects.find(item => item.id === params.slug);
  const content = (arLocale.cases.items as Record<string, LocalizedProject>)[params.slug];
  if (!project || project.comingSoon || !content) return {};

  const githubOwner = process.env.GITHUB_REPOSITORY?.split("/")[0];
  const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL || (githubOwner ? `https://${githubOwner}.github.io` : "http://localhost:3000"));
  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
  const canonical = new URL(`${basePath}/projects/${project.id}/`, metadataBase);
  const image = new URL(`${basePath}${project.image}`, metadataBase);
  const title = `${content.name} — ${content.summary}`;

  return {
    metadataBase,
    title,
    description: content.summary,
    alternates: { canonical },
    openGraph: {
      title,
      description: content.summary,
      locale: "ar_EG",
      type: "article",
      url: canonical,
      images: [{ url: image, width: 1920, height: 1080, alt: content.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: content.summary,
      images: [{ url: image, alt: content.name }],
    },
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = projects.find(item => item.id === params.slug);
  if (!project) notFound();
  return <ProjectDetails projectId={project.id} />;
}
