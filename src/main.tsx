import { createRoot } from "react-dom/client";
import App from "./components/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

(() => {
	const container = document.getElementById("root");
	if (!container) {
		throw "could not find root container";
	}
	const root = createRoot(container);
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
			}
		}
	});

	root.render(
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	);
})();