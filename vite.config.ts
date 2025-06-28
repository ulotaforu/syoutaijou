import build from "@hono/vite-build/cloudflare-workers";
import adapter from "@hono/vite-dev-server/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import honox from "honox/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		honox({
			devServer: { adapter },
			client: { input: ["./app/style.css"] },
		}),
		tailwindcss(),
		build(),
	],
	server: {
		host: "0.0.0.0",
		port: 5173,
	},
});
