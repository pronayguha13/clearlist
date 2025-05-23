import TaskListView from "../../components/TaskListView";
import { useTodoContext } from "../../context";

const Tasks = () => {
  const { todos } = useTodoContext();

  const getTodos = () => todos;

  return <TaskListView todos={todos} title="My tasks" fetchTODO={getTodos} />;
};

export default Tasks;
