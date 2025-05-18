import TaskListView from "../../../components/TaskListView";

import { useTodoContext } from "../../../context";

const VitalTasks = () => {
  const { getVitalTodos } = useTodoContext();

  return (
    <TaskListView
      todos={getVitalTodos()}
      title="Vital tasks"
      fetchTODO={getVitalTodos}
    />
  );
};

export default VitalTasks;
