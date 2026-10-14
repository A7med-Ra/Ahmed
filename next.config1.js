// اسم الريبو بيتاخد تلقائي من GitHub، فلو غيّرته تاني مش هتحتاج تعدّل هنا
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "Ahmed";
const basePath =
  process.env.NODE_ENV === "production" && !repo.endsWith(".github.io") ? "/" + repo : "";

module.exports = {
  reactStrictMode: true,
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
