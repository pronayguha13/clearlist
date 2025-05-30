import { BrowserRouter } from "react-router";
import TodoContextWrapper from "./HOC/TodoContextWrapper";
import AppRoutes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import AuthContextWrapper from "./HOC/AuthContextWrapper";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter >
        <AuthContextWrapper>
          <TodoContextWrapper>
            <AppRoutes />
          </TodoContextWrapper>
        </AuthContextWrapper>
      </BrowserRouter >
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider >
  );
}

export default App;
