import type { Context } from "hono";
import type { HonoContext } from "server";
import type { PlatformProxy } from "wrangler";

type Env = {
	Bindings: {
		MY_VAR: string;
		DB: D1Database;
	};
	Variables: {
		MY_VAR_IN_VARIABLES: string;
	};
};

type GetLoadContextArgs = {
	request: Request;
	context: {
		cloudflare: Omit<
			PlatformProxy<Env["Bindings"]>,
			"dispose" | "caches" | "cf"
		> & {
			caches: PlatformProxy<Env>["caches"] | CacheStorage;
			cf: Request["cf"];
		};
		hono: {
			context: HonoContext;
		};
	};
};

declare module "react-router" {
	interface AppLoadContext extends ReturnType<typeof getLoadContext> {
		// This will merge the result of `getLoadContext` into the `AppLoadContext`
		extra: string;
		hono: {
			context: Context<Env>;
		};
	}
}

export function getLoadContext({ context }: GetLoadContextArgs) {
	return {
		...context,
		extra: "stuff",
	};
}
