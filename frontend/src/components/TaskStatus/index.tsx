import { useEffect } from "react";
import { useTodoContext } from "../../context";
import TaskStat from "../TaskStat";
import style from "./style.module.css";
import { Icon } from "@iconify/react";

const TaskStatus = () => {
  const { getTaskStatus } = useTodoContext();
  const { data, isFetching, isLoading, isError, refetch } = getTaskStatus()
  useEffect(() => {

    refetch()
  }, [])


  const getUI = () => {
    if (isLoading || isFetching) return <p>Loading....</p>
    if (isError) return <p>Failed to fetch status</p>

    if (data) {
      return (<div className={style.task_statcontainer}>
        {Object.entries(data).map(([status, percentage], index: number) => (
          <TaskStat key={index} percentage={percentage} status={status} />
        ))}
      </div>)
    }
  }

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
      {getUI()}
    </div>
  );
};

export default TaskStatus;
