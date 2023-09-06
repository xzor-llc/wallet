import * as bsv from "@ts-bitcoin/core";
import { Address } from "src/types";

export function generateAddresses(
	masterKey: bsv.Bip32,
	parentGroups: number = 2,
	childGroups: number = 20
): Address[] {
	const addresses: Address[] = [];
	for (let a = 0; a < parentGroups; a++) {
		for (let b = 0; b < childGroups; b++) {
			const path = `m/${a}/${b}`;
			const { privKey } = masterKey.derive(path);
			const address = new bsv.Address().fromPrivKey(privKey);
			addresses.push({
				path,
				address: address.toString()
			});
		}
	}
	return addresses;
}