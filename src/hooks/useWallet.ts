import { useQuery } from "@tanstack/react-query";
import { loadWallet } from "src/functions/wallet";
import { Bip32 } from "@ts-bitcoin/core";

export default function useWallet() {
	const masterKey = localStorage.getItem("Wallet:PrivateKey");
	const query = useQuery({
		queryKey: ["wallet", masterKey],
		queryFn: async () => {
			if (!masterKey) return null;

			return loadWallet(
				new Bip32().fromString(masterKey)
			);
		},
		enabled: !!masterKey
	});

	return {
		wallet: query.data,
		loading: query.isLoading,
	};
}