import type { Route } from "./+types/$uuid";
import Mizuhiki from "../components/mizuhiki";
import Information from "../components/information";
import { wedding, user } from "../../server/db/schema";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import GuestForm, { action as guestFormAction } from "~/components/guestForm";

export const loader = async ({ context, params }: Route.LoaderArgs) => {
	// URLからuuidパラメータを取得
	const uuid = params.uuid;
	console.log("UUID from URL:", uuid);

	// uuidがない場合は404を返す
	if (!uuid) {
		throw new Response(null, { status: 404 });
	}

	// UUIDの形式を検証する
	const isValidUUID =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
			uuid,
		);

	if (!isValidUUID) {
		throw new Response(null, { status: 404 });
	}

	const db = drizzle(context.cloudflare.env.DB);
	// uuidが確実に存在することを確認したので、安全に使用できる
	const weddingResults = await db
		.select({
			wedding: wedding,
			user: {
				male_name: user.male_name,
				female_name: user.female_name,
			},
		})
		.from(wedding)
		.innerJoin(user, eq(wedding.user_id, user.id))
		.where(eq(wedding.id, uuid));

	if (!weddingResults || weddingResults.length === 0) {
		throw new Response(null, { status: 404 });
	}

	return { weddingData: weddingResults[0] };
};

export const action = guestFormAction;

export default function WeddingDetails({ loaderData }: Route.ComponentProps) {
	const { weddingData } = loaderData;

	return (
		<div>
			<Mizuhiki />
			<Information
				groom={weddingData.user.male_name}
				bride={weddingData.user.female_name}
				sendData={weddingData.wedding.send_at}
				date={weddingData.wedding.date}
				time={weddingData.wedding.time}
				place={weddingData.wedding.place}
			/>
			<br />
			<GuestForm />
		</div>
	);
}
