export default function useMasterKey() {
	return localStorage.getItem("Wallet:PrivateKey");
}