// server/index.ts
import { drizzle } from "drizzle-orm/d1";
import { type Context, Hono } from "hono";
import { wedding } from "./db/schema";
import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js";
import Google from "@auth/core/providers/google";
import { HTTPException } from "hono/http-exception";
import "dotenv/config";

type HonoContexts = {
	Bindings: {
		MY_VAR: string;
		DB: D1Database;
	};
	Variables: {
		MY_VAR_IN_VARIABLES: string;
	};
};

export type HonoContext = Context<HonoContexts, "*">;

const app = new Hono<HonoContexts>();

app.use(
	"*",
	initAuthConfig((c) => ({
		secret: c.env.AUTH_SECRET,
		providers: [Google],
	})),
);
app.onError((err, c) => {
	console.error(err);
	if (err instanceof HTTPException && err.status === 401) {
		return c.redirect("/");
	}
	return c.text("Error", 500);
});

app.use(async (c, next) => {
	c.set("MY_VAR_IN_VARIABLES", "My variable set in c.set");
	await next();
	c.header("X-Powered-By", "React Router and Hono");
});

app.get("/api/test", async (c) => {
	const db = drizzle(c.env.DB);
	const selectResult = await db.select().from(wedding);
	console.log(selectResult);
	return c.json({
		selectResult,
	});
});

export default app;
