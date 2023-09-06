import { Bip32 } from "@ts-bitcoin/core";
import { generateAddresses } from "./address";
import { fetchBulkAddressBalance } from "src/lib/woc/functions";
import { Balance, DetailedAddress } from "src/types";

export async function loadWallet(masterKey: Bip32) {
	const addresses = generateAddresses(masterKey);
	const balances = await fetchBulkAddressBalance(addresses.map(({ address }) => address));
	const totalBalance: Balance = {
		confirmed: 0,
		unconfirmed: 0,
	};
	const detailed: DetailedAddress[] = addresses.map((address) => {
		const balance = balances.find((item) => item.address === address.address)?.balance || {
			confirmed: 0,
			unconfirmed: 0,
		};
		totalBalance.confirmed += balance.confirmed;
		totalBalance.unconfirmed += balance.unconfirmed;

		return {
			...address,
			balance,
		};
	});
	return {
		addresses: detailed,
		balance: totalBalance,
	};
}