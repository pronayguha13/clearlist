
// import style from './App.module.css'

import Hedaer from "./components/Header";
import TodoContextWrapper from "./HOC/TodoContextWrapper";

function App() {

  return (
    <TodoContextWrapper>

      <Hedaer />

    </TodoContextWrapper>
  )
}

export default App
