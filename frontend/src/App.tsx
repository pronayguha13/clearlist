import { BrowserRouter } from "react-router";
import TodoContextWrapper from "./HOC/TodoContextWrapper";
import AppRoutes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter >
        <TodoContextWrapper>
          <AppRoutes />
        </TodoContextWrapper>
      </BrowserRouter >
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider >
  );
}

export default App;
