import { useState } from "react";
import useLocation from "src/hooks/useLocation";
import useWallet from "src/hooks/useWallet";
import WalletRoute from "src/routes/wallet";
import Router from "../Router";

type Page = {
	path: string;
	label: string;
};

const pages: Page[] = [
	{
		path: "wallet",
		label: "Wallet"
	},
	{
		path: "mix",
		label: "Mix"
	},
	{
		path: "consolidate",
		label: "Consolidate"
	}
];

const navItemClassName = "py-1 px-2 font-bold text-white rounded";
const activeNavItemClassName = navItemClassName + " bg-orange-500";
const inactiveNavItemClassName = navItemClassName + " bg-orange-400";

export default function App() {
	const { location, setLocation } = useLocation("wallet");



	return (
		<div className="flex flex-col gap-2 p-2">
			<nav className="flex gap-2">
				{pages.map((page) => (
					<a
						key={page.path}
						href={`#${page.path}`}
						className={location === page.path ? activeNavItemClassName : inactiveNavItemClassName}
					>
						{page.label}
					</a>
				))}
			</nav>
			<Router path={location} />
		</div>
	);
}