import { BalanceSchema } from "src/schemas";
import { z } from "zod";

export type Address = {
	path: string;
	address: string;
};

export type DetailedAddress = Address & {
	balance: Balance;
};

export type Balance = z.infer<typeof BalanceSchema>;

export type Wallet = {
	addresses: DetailedAddress[];
	balance: Balance;
};