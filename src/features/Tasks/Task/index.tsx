import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useTodoContext } from "../../../context";
import type { ITODO } from "../../../types";
import TaskDetails from "../../../components/TaskDetails";
import style from "./style.module.css";

const Task = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTodoByID, deleteTODO } = useTodoContext();
  const [todo, setTodo] = useState<[string, ITODO]>([]);

  const onBack = () => {
    navigate("/dashboard");
  };

  const onDelete = (todo: [string, ITODO]) => {
    deleteTODO(todo[0]);

    onBack();
  };

  useEffect(() => {
    if (id && !Number.isNaN(Number(id)) && Number(id) >= 0) {
      const fetchedTODO = getTodoByID(Number(id));
      setTodo(fetchedTODO);
    }
  }, [id]);

  return (
    <div className={style.container}>
      {todo && todo.length ? (
        <TaskDetails
          todo={todo}
          onDelete={onDelete}
          showBackButton={true}
          onBack={onBack}
        />
      ) : (
        <p>No todo</p>
      )}
    </div>
  );
};

export default Task;
