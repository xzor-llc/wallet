import { z } from "zod";

export const BalanceSchema = z.object({
	confirmed: z.number(),
	unconfirmed: z.number(),
});