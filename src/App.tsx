
import style from './App.module.css'

import Hedaer from "./components/Header";
import TodoContextWrapper from "./HOC/TodoContextWrapper";

function App() {

  return (
    <TodoContextWrapper>

      <Hedaer />
      <div className={style.center_container}>
        <div className={style.left_container}>left nav</div>
        <div className={style.middle_container}>middle container</div>
      </div>
    </TodoContextWrapper>
  )
}

export default App
