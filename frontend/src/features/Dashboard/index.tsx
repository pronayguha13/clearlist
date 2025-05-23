import { useState } from "react";
import { useNavigate } from "react-router";
import TaskStatus from "../../components/TaskStatus";
import style from "./style.module.css";
import { useTodoContext } from "../../context";
import SmallCard from "../../components/SmallCard";
import { Icon } from "@iconify/react";
import AddTask from "./components/Add-Task";
import type { ITODO } from "../../types";

const Dashboard = () => {
  const { todos } = useTodoContext();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleAddTaskModalClose = () => {
    setIsModalVisible(false);
  };

  const onTODOClick = (todo: ITODO, index: number) => {
    navigate(`/tasks/${index}`);
  };
  return (
    <div className={style.container}>
      <h1>Dashboard</h1>
      <div className={style.center}>
        <div className={style.left}>
          <div className={style.header}>
            <div className={style.main_header}>
              <div className={style.heading_container}>
                <Icon
                  icon="ic:sharp-pending-actions"
                  width="24"
                  height="24"
                  style={{ color: "var(--color-text-secondary)" }}
                />
                <label className={style.heading}> To-Do</label>
              </div>
              <div className={style.addtask_container}>
                <Icon
                  icon="material-symbols:add-rounded"
                  width="32"
                  height="32"
                  style={{ color: "var(--color-brand-primary)" }}
                  onClick={() => setIsModalVisible(true)}
                />
                <label>Add Task</label>
              </div>
            </div>
            <div className={style.sub_header}>
              <p>
                {new Date().getDate()}{" "}
                {new Date().toLocaleString("default", { month: "long" })}
              </p>
            </div>
          </div>
          <div className={style.todays_task}>
            {todos && todos.length ? (
              todos.map((todo, index) =>
                index % 2 ? (
                  <SmallCard
                    key={index}
                    todo={todo}
                    onClick={(targetTODO) => onTODOClick(targetTODO, index)}
                  />
                ) : null
              )
            ) : (
              <p>No todo</p>
            )}
          </div>
          <div className={style.separator}></div>
          <div className={style.priority_task}>
            {todos.length ? (
              <SmallCard
                todo={todos[todos.length - 1]}
                onClick={(targetTODO) =>
                  onTODOClick(targetTODO, todos.length - 1)
                }
              />
            ) : (
              <p> No todo </p>
            )}
          </div>
        </div>
        <div className={style.right}>
          <TaskStatus />
        </div>
      </div>
      {isModalVisible ? <AddTask onClose={handleAddTaskModalClose} /> : null}
    </div>
  );
};

export default Dashboard;
