import { useEffect, useState } from "react";

function getLocation(hash: string, defaultLocation: string) {
	return hash ? hash.substring(1) : defaultLocation
}

export default function useLocation(defaultLocation: string) {
	const [location, setLocation] = useState<string>(
		getLocation(window.location.hash, defaultLocation)
	);

	useEffect(() => {
		const onHashChange = (e: HashChangeEvent) => {
			setLocation(
				getLocation(window.location.hash, defaultLocation)
			);
		};
		window.addEventListener("hashchange", onHashChange);
		return () => {
			window.removeEventListener("hashchange", onHashChange);
		}
	}, [defaultLocation]);

	return {
		location,
		setLocation
	}
}