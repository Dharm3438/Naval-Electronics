import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * The whole site is a single prerendered page with client-side React for the
   * calculator, FAQ and lead form — there is no server-side work at runtime.
   * `output: "export"` therefore emits plain HTML/CSS/JS into `out/`, which can
   * be uploaded to any static host (Hostinger public_html, Render static site,
   * Netlify, Vercel, S3, Cloudflare Pages).
   *
   * Remove this line if you later add route handlers, server actions or any
   * other server-rendered behaviour; `npm run start` then serves the app with
   * a Node process instead.
   */
  output: "export",
  /**
   * Emit `consultation/index.html` rather than `consultation.html`, so the
   * shareable /consultation link works on any static host without rewrites.
   */
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
