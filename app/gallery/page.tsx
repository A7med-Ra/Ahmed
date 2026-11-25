import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import GalleryClient from "./GalleryClient";
import type { GalleryItem } from "@/data/gallery";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

export default function GalleryPage() {
  const galleryDirectory = path.join(process.cwd(), "public", "gallery");
  const items: GalleryItem[] = (existsSync(galleryDirectory)
    ? readdirSync(galleryDirectory, { withFileTypes: true })
    : [])
    .filter(entry => entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(entry => {
      const title = path.parse(entry.name).name.replace(/[-_]+/g, " ");
      return {
        id: entry.name,
        image: `/gallery/${encodeURIComponent(entry.name)}`,
        title,
        client: title,
      };
    });

  return <GalleryClient items={items} />;
}
