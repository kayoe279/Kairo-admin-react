import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { AntConfigProvider } from "@/layouts/AntConfigProvider";
import { Router } from "./router";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
        staleTime: 1.5 * 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <AntConfigProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </BrowserRouter>
    </AntConfigProvider>
  );
}

export default App;
