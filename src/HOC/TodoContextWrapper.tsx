import { useEffect, useState } from "react";
import { TodoContext } from "../context";
import type { ITODO } from "../types";
import {
  getDatabase,
  onValue,
  push,
  ref,
  type DatabaseReference,
} from "firebase/database";
import config from "../config/configuration";

const TodoContextWrapper = ({ children }: ContextWrapperProps) => {
  // Initialize the Firebase database with the provided configuration
  const database = getDatabase(config);
  console.log("Database : ", database);

  // Reference to the specific collection in the database
  const collectionRef = ref(database, "todos");
  const [todos, setTodos] = useState<ITODO[]>([]);

  const [completedTodos, setCompletedTodos] = useState<Array<ITODO>>([]);

  const createTODO = async (todo: ITODO): Promise<DatabaseReference> => {
    try {
      const response = await push(collectionRef, todo);
      console.log("🚀 ~ createTODO ~ response:", response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteTODO = (todoID: string) => {
    console.log("🚀 ~ deleteTODO ~ todoID:", todoID);
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
          const displayItem = Object.values(dataItem);
          console.log("data recievied from the db: ", displayItem);
          setTodos(displayItem as ITODO[]);
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
        delete: deleteTODO,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextWrapper;
