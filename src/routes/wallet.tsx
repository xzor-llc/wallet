import useWallet from "src/hooks/useWallet";

export default function WalletRoute() {
	const { wallet, loading } = useWallet();

	if (loading) return "Loading wallet...";

	if (!wallet) return "No wallet found";

	return (
		<div>
			<h1 className="text-2xl">Total Balance: {wallet.balance.confirmed}</h1>

			<table>
				<thead>
					<tr>
						<th>Path</th>
						<th>Address</th>
						<th>Balance</th>
					</tr>
				</thead>
				<tbody>
					{wallet.addresses.map(({ address, path, balance }) => {
						return (
							<tr key={address}>
								<td>{path}</td>
								<td>{address}</td>
								<td>
									{balance.confirmed}
									{balance.unconfirmed > 0 && `/${balance.unconfirmed}`}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	)
}