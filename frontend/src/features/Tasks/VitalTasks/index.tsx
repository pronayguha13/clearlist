import { useEffect } from "react";
import TaskListView from "../../../components/TaskListView";

import { useTodoContext } from "../../../context";
import { PRIORITY_CHOICES } from "../../../types";

const VitalTasks = () => {
  const { getVitalTodos } = useTodoContext();

  const { data, refetch } = getVitalTodos(PRIORITY_CHOICES.LOW)
  console.log('🚀 ~ VitalTasks ~ data:', data)

  useEffect(() => {
    refetch()
  }, [])
  return (
    <TaskListView
      todos={data}
      title="Vital tasks"
      fetchTODO={refetch}
    />
  );
};

export default VitalTasks;
