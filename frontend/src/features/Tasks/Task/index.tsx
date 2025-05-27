import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useTodoContext } from "../../../context";
import type { ITODO } from "../../../types";
import TaskDetails from "../../../components/TaskDetails";
import style from "./style.module.css";

const Task = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTodoById, deleteTODO } = useTodoContext();
  const { data, refetch, isError, isLoading } = getTodoById(Number(id));

  const onBack = () => {
    navigate("/dashboard");
  };

  const onDelete = (todo: [string, ITODO]) => {
    deleteTODO(todo[0]);

    onBack();
  };

  useEffect(() => {
    if (id && !Number.isNaN(Number(id)) && Number(id) >= 0) {
      refetch()
    }
  }, [id]);


  const getContent = () => {
    if (isLoading) return <p>Loading....</p>;

    if (isError) return <p> Failed to fetch data</p>


    return data ? (
      <TaskDetails
        todo={data}
        onDelete={onDelete}
        showBackButton={true}
        onBack={onBack}
      />
    ) : (
      <p>No todo</p>
    )
  }

  return (
    <div className={style.container}>
      {getContent()}
    </div >
  );
};

export default Task;
