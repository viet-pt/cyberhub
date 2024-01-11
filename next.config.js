const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const path = require("path");
const { i18n } = require('./i18n.config')

module.exports = withBundleAnalyzer({
  env: {
    environment: process.env.NODE_ENV,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    GA_ID: process.env.GA_ID,
  },
  sassOptions: {
    fiber: false,
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
      {
        protocol: "https",
        hostname: "tec-strapi.hungnong.me",
      },
    ],
  },
  i18n,
  distDir: "build",
  // exportPathMap: async function (
  //   defaultPathMap,
  //   { dev, dir, outDir, distDir, buildId }
  // ) {
  //   return {
  //     "/": { page: "/" },
  //     "/about": { page: "/about" },
  //   };
  // },
  poweredByHeader: false,
  trailingSlash: false,
  basePath: "",
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  staticPageGenerationTimeout: 1000,
});
