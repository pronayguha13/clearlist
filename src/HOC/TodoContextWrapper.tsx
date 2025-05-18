import { useEffect, useState } from "react";
import { TodoContext } from "../context";
import type { ITODO } from "../types";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  type DatabaseReference,
} from "firebase/database";
import config from "../config/configuration";

const TodoContextWrapper = ({ children }: ContextWrapperProps) => {
  // Initialize the Firebase database with the provided configuration
  const database = getDatabase(config);

  // Reference to the specific collection in the database
  const collectionRef = ref(database, "todos");
  const [todos, setTodos] = useState<[string, ITODO][]>([]);

  const [completedTodos, setCompletedTodos] = useState<[string, ITODO][]>([]);

  const createTODO = async (todo: ITODO): Promise<DatabaseReference> => {
    try {
      const response = await push(collectionRef, todo);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteTODO = async (todoID: string) => {
    const todoRef = ref(database, `todos/${todoID}`);

    try {
      await remove(todoRef);
    } catch (error) {
      console.error(error);
    }
  };

  const getTodoByID = (id: number): [string, ITODO] => {
    return todos && todos.length ? todos[id] : [];
  };

  const getVitalTodos = () => {
    return todos.filter((todo) => todo[1].priority === "Extreme");
  };

  /*----------------*/
  useEffect(() => {
    // Function to fetch data from the database
    const fetchData = () => {
      // Listen for changes in the collection
      onValue(collectionRef, (snapshot) => {
        const dataItem = snapshot.val();

        // Check if dataItem exists
        if (dataItem) {
          // Convert the object values into an array
          const todos = Object.entries<ITODO>(dataItem);
          setTodos(todos);
        }
      });
    };

    // Fetch data when the component mounts
    fetchData();
  }, []);

  /*----------------*/
  return (
    <TodoContext.Provider
      value={{
        todos: todos,
        completedTODOs: completedTodos,
        create: createTODO,
        deleteTODO: deleteTODO,
        getTodoByID: getTodoByID,
        getVitalTodos: getVitalTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextWrapper;
