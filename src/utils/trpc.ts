import { BASEURL } from "@/config";
import type { ServerRouter } from "@/server/router";
import { httpBatchLink } from "@trpc/client";
import { WithTRPCNoSSROptions, WithTRPCSSROptions, createTRPCNext } from "@trpc/next";

export const trpcConfig: WithTRPCNoSSROptions<ServerRouter> | WithTRPCSSROptions<ServerRouter> = {
    config({ ctx }) {
		return {
			links: [
				httpBatchLink({
					url: `${BASEURL}/api/trpc`,
				}),
			],
		};
	},
	ssr: false,
}

export const trpc = createTRPCNext<ServerRouter>(trpcConfig);
