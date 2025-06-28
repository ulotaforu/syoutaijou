import { Outlet, Scripts, Links } from "react-router";
import "./style.css";

export function links() {
	return [
		process.env.NODE_ENV === "production"
			? { rel: "stylesheet", href: "/build/client/assets/style.css" }
			: { rel: "stylesheet", href: "/app/style.css" },
	];
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>結婚式web招待状</title>
				<meta name="description" content="結婚式向けweb招待状" />
				<Links />
			</head>
			<body
				style={{
					margin: "0",
					backgroundColor: "#fbfaf5",
					fontFamily: "'游明朝','Yu Mincho',YuMincho,serif",
				}}
			>
				{children}
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
