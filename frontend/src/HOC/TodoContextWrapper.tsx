import { TodoContext } from "../context";
import type { ITODO, PriorityValue } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTODO, deleteTODO, fetchAllTODO, fetchTODOByID, getTaskStatus, getVitalTODOs, searchTask } from "../services/api";
import type { AxiosError } from "axios";
import type { TaskStatus } from "../types/Todo";
import { useEffect } from "react";
import useAuthContext from "../context/AuthContext";
const TodoContextWrapper = ({ children }: ContextWrapperProps) => {
  const { isAuthenticated } = useAuthContext()
  const queryClient = useQueryClient();
  // query to fetch all the todo
  const { data: todos, refetch } = useQuery<Array<ITODO>>({
    queryKey: ["todos"],
    queryFn: fetchAllTODO,
    initialData: [],
    enabled: false
  })

  const createTODOMutation = useMutation<ITODO, AxiosError, Omit<ITODO, 'id' | 'createdAt' | 'updatedAt' | "isCompleted">, unknown
  >({
    mutationKey: ["create-todo"],
    mutationFn: createTODO,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
      queryClient.invalidateQueries({ queryKey: ["task-status"] })
    },
    onError: (error: Error) => {
      console.log('🚀 ~ TodoContextWrapper ~ error:', error)
      window.alert("Failed to create task")
    }
  })


  const getTodoByIDQuery = (id: number) => {
    return useQuery<ITODO>({
      queryKey: ["todo", id],
      queryFn: () => fetchTODOByID(id),
      enabled: false
    })
  }

  const getVitalTodoQuery = (priority: PriorityValue): unknown => {
    //query to fetch all the priority tasks
    const { data, refetch } = useQuery({
      queryKey: ["vital-todos", priority],
      queryFn: () => getVitalTODOs(priority),
      initialData: [],
      enabled: false
    })

    return { data, refetch }
  };


  const getTaskStatusQuery = () => {
    return useQuery<TaskStatus>({
      queryKey: ["task-status"],
      queryFn: getTaskStatus,
      enabled: false
    })
  }
  const searchtaskQuery = (queryString: string) => {
    return useQuery<ITODO[]>({
      queryKey: ["search-task", queryString],
      queryFn: () => searchTask(queryString),
      enabled: false,
    })
  }

  const deleteTODOQuery = (todoID: number) => {
    return useQuery<unknown>({
      queryKey: ["delete-task", todoID],
      queryFn: () => deleteTODO(todoID),
      enabled: false
    })
  }
  /*----------------*/

  useEffect(() => {
    if (isAuthenticated) refetch()
  }, [isAuthenticated])

  /*----------------*/
  return (
    <TodoContext.Provider
      value={{
        todos: todos,
        create: createTODOMutation,
        deleteTODO: deleteTODOQuery,
        getTodoById: getTodoByIDQuery,
        getVitalTodos: getVitalTodoQuery,
        getTaskStatus: getTaskStatusQuery,
        search: searchtaskQuery,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextWrapper;
