import { BalanceSchema } from "src/schemas";
import { z } from "zod";
import { BulkBalanceResponseSchema, BulkUnspentResponseSchema } from "./schemas";

function chunkAddresses(addresses: string[], chunkSize = 20): string[][] {
	const chunks: string[][] = [];
	const totalChunks = Math.ceil(addresses.length / chunkSize);
	for (let i = 0; i < totalChunks; i++) {
		const chunk: string[] = [];
		for (let j = i * chunkSize; j < i * chunkSize + chunkSize; j++) {
			if (!addresses[j]) break;

			chunk.push(addresses[j]);
		}
		chunks.push(chunk);
	}
	return chunks;
}

export async function fetchAddressBalance(address: string) {
	return fetch(
		`https://api.whatsonchain.com/v1/bsv/main/address/${address}/balance`
	).then((res) => res.json()).then(BalanceSchema.parse);
}

export async function fetchBulkAddressBalance(addresses: string[]) {
	const chunks = chunkAddresses(addresses);

	return Promise.all(
		chunks.map(async (addresses) => {
			return fetch("https://api.whatsonchain.com/v1/bsv/main/addresses/balance", {
				method: "POST",
				body: JSON.stringify({
					addresses,
				})
			}).then((res) => res.json()).then(BulkBalanceResponseSchema.parse)
		})
	).then((results) => {
		return results.reduce((p, c) => {
			return [...p, ...c];
		});
	});
}

export async function fetchBulkUnspent(addresses: string[]) {
	const chunks = chunkAddresses(addresses);

	return Promise.all(
		chunks.map(async (addresses) => {
			return fetch("https://api.whatsonchain.com/v1/bsv/main/addresses/unspent", {
				method: "POST",
				body: JSON.stringify({
					addresses,
				})
			}).then((res) => res.json()).then(BulkUnspentResponseSchema.parse)
		})
	).then((all) => {
		return all.reduce((p, c) => {
			return [...p, ...c]
		});
	});
}