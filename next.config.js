// GitHub Pages serves this project from /Ahmed; allow an explicit override for other hosts.
const basePath =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BASE_PATH ?? "/Ahmed"
    : "";

module.exports = {
  reactStrictMode: true,
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
