import TaskStat from "../TaskStat";
import style from "./style.module.css";
import { Icon } from "@iconify/react";

const TaskStatus = () => {
  const getStatus = (index: number) => {
    switch (index) {
      case 0:
        return "Completed";
      case 1:
        return "In Progress";
      default:
        return "Not started";
    }
  };

  return (
    <div className={style.status_container}>
      <div className={style.header}>
        <Icon
          icon="clarity:tasks-solid"
          width="24"
          height="24"
          style={{ color: "var(--color-text-secondary)" }}
        />
        <p className={style.title}>Task Status</p>
      </div>
      <div className={style.task_statcontainer}>
        {new Array(3)
          .fill(Math.round(Math.random() * 100))
          .map((el: number, index: number) => (
            <TaskStat key={index} percentage={el} status={getStatus(index)} />
          ))}
      </div>
    </div>
  );
};

export default TaskStatus;
