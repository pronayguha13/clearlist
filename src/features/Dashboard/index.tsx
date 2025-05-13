import TaskStatus from "../../components/TaskStatus";
import style from "./style.module.css";
const Dashboard = () => {
  return (
    <div className={style.container}>
      <h1>Dashboard</h1>
      <div className={style.center}>
        <div className="left">left side</div>
        <div className={style.right}>
          <TaskStatus />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
