import { ReactElement } from "react";
import WalletRoute from "src/routes/wallet";

export type RouterProps = {
	path: string;
};

const routes: Record<string, ReactElement> = {
	"wallet": <WalletRoute />
}

export default function Router({
	path,
}: RouterProps) {
	const route = routes[path];

	if (!route) {
		return (
			<h1 className="text-4xl">Page not found</h1>
		);
	}
	return route;
}