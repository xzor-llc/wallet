import { BalanceSchema } from "src/schemas";
import { z } from "zod";

export const BulkBalanceResponseSchema = z.array(
	z.object({
		address: z.string(),
		balance: BalanceSchema,
		error: z.string(),
	})
);

export const UnspentSchema = z.object({
	height: z.number(),
	tx_pos: z.number(),
	tx_hash: z.string(),
	value: z.number(),
});

export const BulkUnspentResponseSchema = z.array(
	z.object({
		address: z.string(),
		unspent: z.array(UnspentSchema),
		error: z.string(),
	})
);