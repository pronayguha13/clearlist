import { useEffect, useState } from "react";
import type { ITODO } from "../../types";
import SmallCard from "../SmallCard";
import TaskDetails from "../TaskDetails";
import { useTodoContext } from "../../context";
import style from "./style.module.css";

type TaskListViewProps = {
  todos: ITODO[];
  title: string;
  fetchTODO: () => ITODO[];
};
const TaskListView = ({ todos, title, fetchTODO }: TaskListViewProps) => {
  const { deleteTODO } = useTodoContext();

  const [selectedTODO, setSelectedTODO] = useState<ITODO>(
    todos.length ? todos[0] : fetchTODO()[0],
  );

  const onTodoClick = (targetTODO: ITODO) => {
    setSelectedTODO(targetTODO);
  };

  const onDeleteTODO = (todo: ITODO) => {
    deleteTODO(todo.id);
  };

  useEffect(() => {
    if (todos.length) {
      setSelectedTODO(todos[0]);
    }
  }, [todos]);

  return (
    <div className={style.container}>
      <section className={style.left}>
        <h3 className={style.heading}>{title}</h3>
        <div className={style.tasks}>
          {todos.map((todo, index) => (
            <SmallCard
              key={index}
              todo={todo}
              onClick={(targetTODO: ITODO) => onTodoClick(targetTODO)}
            />
          ))}
        </div>
      </section>
      <section className={style.right}>
        {selectedTODO ? (
          <TaskDetails todo={selectedTODO} onDelete={onDeleteTODO} />
        ) : (
          <h1>Click on a task to view the details</h1>
        )}
      </section>
    </div>
  );
};

export default TaskListView;
