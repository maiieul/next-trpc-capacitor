/**
 * This is the client-side entrypoint for your tRPC API. It is used to create the `api` object which
 * contains the Next.js App-wrapper, as well as your type-safe React Query hooks.
 *
 * We also create a few inference helpers for input and output types.
 */
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";
import { env } from "~/env.mjs";
import { type AppRouter } from "~/server/api/root";

const getBaseUrl = () => {
  if (env.NEXT_PUBLIC_SERVER_TYPE === "capacitor") {
    return env.NEXT_PUBLIC_SERVER_URL; // Capacitor should use absolute url because it is deployed as a static site and has no access to api routes. Capacitor doesn't suffer from CORS issues since it uses the native http client through CapacitorHttp.
  }
  if (typeof window !== "undefined") return ""; // browser should use relative url

  // SSR - can still be used to generate ssr pages to display a blog or something. Those pages should be removed when deploying to capacitor or fall back to ssg. How to do it is up to you.
  if (env.NEXT_PUBLIC_SERVER_TYPE === "production") {
    return `https://${env.NEXT_PUBLIC_SERVER_URL}`; // SSR should use absolute url
  }
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

/** A set of type-safe react-query hooks for your tRPC API. */
export const api = createTRPCNext<AppRouter>({
  config() {
    return {
      /**
       * Transformer used for data de-serialization from the server.
       *
       * @see https://trpc.io/docs/data-transformers
       */
      transformer: superjson,

      /**
       * Links used to determine request flow from client to server.
       *
       * @see https://trpc.io/docs/links
       */
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NEXT_PUBLIC_SERVER_TYPE === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  /**
   * Whether tRPC should await queries when server rendering pages.
   *
   * @see https://trpc.io/docs/nextjs#ssr-boolean-default-false
   */
  ssr: false,
});

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
