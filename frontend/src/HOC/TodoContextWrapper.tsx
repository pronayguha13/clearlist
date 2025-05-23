import { TodoContext } from "../context";
import type { ITODO, PriorityValue } from "../types";
import { useQuery } from "@tanstack/react-query";
import { fetchAllTODO, getVitalTODOs } from "../services/api";
const TodoContextWrapper = ({ children }: ContextWrapperProps) => {
  // query to fetch all the todo
  const { data: todos } = useQuery<Array<ITODO>>({
    queryKey: ["todos"],
    queryFn: fetchAllTODO,
    initialData: []
  })

  // const createTODO = async (todo: ITODO) => {
  //   // try {
  //   //   const response = await push(collectionRef, todo);
  //   //   return response;
  //   // } catch (error) {
  //   //   console.error(error);
  //   //   throw error;
  //   // }
  // };

  // const deleteTODO = async (todoID: string) => {
  //   // const todoRef = ref(database, `todos/${todoID}`);

  //   // try {
  //   //   await remove(todoRef);
  //   // } catch (error) {
  //   //   console.error(error);
  //   // }
  // };

  // const getTodoByID = (id: number): Promise<ITODO> => {
  //   return axios.get(`${import.meta.env.VITE_API_URL
  //     }/todos/${id}`)
  // };

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

  /*----------------*/


  // const { isLoading, data, error } = useQuery<ITODO[]>({
  //   queryKey: ["todos"], queryFn: async () => {
  //     const res = await axios.get<ITODO[]>(`${import.meta.env.VITE_API_URL}/todos`);
  //     return res.data ?? [];
  //   }
  // })


  // const fetchTODOByID = (todoID: number): Partial<UseQueryResult> => {
  //   const { isFetching, data, refetch } = useQuery<ITODO | null>({
  //     queryKey: ["todo", todoID],
  //     queryFn: () => getTodoByID(todoID),
  //     enabled: false
  //   })

  //   return { isFetching, data, refetch }
  // }

  /*----------------*/
  return (
    <TodoContext.Provider
      value={{
        todos: todos,
        // create: createTODO,
        // deleteTODO: deleteTODO,
        // getTodoByID: fetchTODOByID,
        getVitalTodos: getVitalTodoQuery,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextWrapper;
