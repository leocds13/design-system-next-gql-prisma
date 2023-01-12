import { BASEURL } from "@/config";
import type { ServerRouter } from "@/server/router";
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";

export const trpc = createTRPCNext<ServerRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: `${BASEURL}/api/trpc`,
        }),
      ],
    };
  },
  ssr: false,
});
