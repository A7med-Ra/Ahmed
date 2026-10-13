const basePath = process.env.NODE_ENV === "production" ? "/AhmedR" : ""; // اسم الريبو
module.exports = {
  reactStrictMode: true,
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
