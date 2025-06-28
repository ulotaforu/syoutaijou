import type { Route } from "./+types/_index";
import Mizuhiki from "../components/mizuhiki";

export const loader = (args: Route.LoaderArgs) => {
	const extra = args.context.extra;
	const cloudflare = args.context.cloudflare;
	const myVarInVariables = args.context.hono.context.get("MY_VAR_IN_VARIABLES");
	const isWaitUntilDefined = !!cloudflare.ctx.waitUntil;
	return { cloudflare, extra, myVarInVariables, isWaitUntilDefined };
};

export default function Index({ loaderData }: Route.ComponentProps) {
	const { cloudflare, extra, myVarInVariables, isWaitUntilDefined } =
		loaderData;
	return (
		<div>
			<Mizuhiki />
		</div>
	);
}
