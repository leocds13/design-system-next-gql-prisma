import type { ServerRouter } from "@/server/router";
import { httpBatchLink } from "@trpc/client";
import { WithTRPCNoSSROptions, WithTRPCSSROptions, createTRPCNext } from "@trpc/next";

function getBaseUrl() {
	if (typeof window !== "undefined")
		// browser should use relative path
		return "";
	if (process.env.VERCEL_URL)
		// reference for vercel.com
		return `https://${process.env.VERCEL_URL}`;
	if (process.env.RENDER_INTERNAL_HOSTNAME)
		// reference for render.com
		return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
	// assume localhost
	return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpcConfig: WithTRPCNoSSROptions<ServerRouter> | WithTRPCSSROptions<ServerRouter> = {
    config({ ctx }) {
		return {
			links: [
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
		};
	},
	ssr: false,
}

export const trpc = createTRPCNext<ServerRouter>(trpcConfig);
