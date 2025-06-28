import { Outlet, Scripts, useLocation } from "react-router";
import { useEffect } from "react";

function TitleUpdater() {
	const location = useLocation();
	useEffect(() => {
		const site = "Kakeibo";
		let title = site;
		if (location.pathname === "/") {
			title = site;
		} else if (location.pathname === "/home") {
			title = `ホーム - ${site}`;
		} else if (location.pathname.startsWith("/household")) {
			title = `家計簿 - ${site}`;
		} else {
			// その他のルートは "パス - Kakeibo" 形式
			title = `${location.pathname.replace(/^\//, "")} - ${site}`;
		}
		document.title = title;
	}, [location.pathname]);
	return null;
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>Kakeibo</title>
				<meta name="description" content="共有できる家計簿webAPP" />
			</head>
			<body style={{ margin: 0 }}>
				<TitleUpdater />
				{children}
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
