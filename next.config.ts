import type { NextConfig } from "next";

const config: NextConfig = {
  agentRules: false,
  experimental: { globalNotFound: true },
  ...(process.env.PORTFOLIO_E2E === "1" && {
    distDir: ".next/playwright",
    typescript: { tsconfigPath: "tests/tsconfig.dev.json" },
  }),
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default config;
