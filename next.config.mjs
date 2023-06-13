/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

import { env } from "./src/env.mjs";

/** @type {import('next').NextConfig} */
const config = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

if (process.env.npm_lifecycle_event === "cap") {
  process.env.NEXT_PUBLIC_SERVER_TYPE = "capacitor";
  config.output = "export";
}

export default config;
