import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import GlobalStyle from "./globalStyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "./context";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <GlobalStyle>
      <AppProvider>
        <App />
      </AppProvider>
    </GlobalStyle>
  </QueryClientProvider>
);
