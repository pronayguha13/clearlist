import { BrowserRouter } from "react-router";
import TodoContextWrapper from "./HOC/TodoContextWrapper";
import AppRoutes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <TodoContextWrapper>
        <AppRoutes />
      </TodoContextWrapper>
    </BrowserRouter>
  );
}

export default App;
