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
  const [todo, setTodo] = useState<Nullable<ITODO>>();

  const onBack = () => {
    navigate("/dashboard");
  };

  const onDelete = (todo: ITODO) => {
    deleteTODO(todo.id);

    onBack();
  };

  useEffect(() => {
    console.log("ID", id);

    if (id && !Number.isNaN(Number(id)) && Number(id) >= 0) {
      const fetchedTODO = getTodoByID(id);
      console.log("Fetched TODO", fetchedTODO);
      setTodo(fetchedTODO);
    }
  }, [id]);

  return (
    <div className={style.container}>
      {todo ? (
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
