import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { TodoContext } from "../context/index.ts";
import database from "../config/configuration.ts";
// Types import
import type { ITODO, TASK_DETAILS } from "../types/index.ts";

const TodoContextWrapper = ({ children }: ContextWrapperProps) => {
  const collectionRef = collection(database, "todo");
  const [todos, setTodos] = useState<ITODO[]>([]);
  /**
   * @description Function to create a document in the database
   * @param { TASK_DETAILS } todo details of the document to be created
   * @returs {Promise<unknown>} returns a promise of the response received else throws an console.error()
   */
  const create = async (todo: TASK_DETAILS) => {
    const response = await addDoc(collection(database, "todo"), todo);

    console.log("response ", response);
    return response;
  };

  /**
   * @description Function to fetch the todos where the priority is "Extreme"
   * @returns {ITODO[]} vitalTODOs List of all the todos where the priority is Extreme
   */
  const getVitalTodos = (): ITODO[] => {
    if (!todos.length) return [];
    const vitalTODOs: ITODO[] = [] as ITODO[];
    todos.forEach((todo) => {
      if (todo.task.priority === "Extreme") {
        vitalTODOs.push(todo);
      }
    });

    return vitalTODOs;
  };

  const getTodoByID = async (id: string) => {
    const docRef = doc(database, "todo", id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        task: docSnap.data() as TASK_DETAILS,
      };
    } else {
      return null;
    }
  };

  const deleteTODO = async (id: string) => {
    if (!id || !id.length) throw new Error("No id found");
    else {
      await deleteDoc(doc(database, "todo", id));
    }
  };

  useEffect(() => {
    const fetchTODO = async () => {
      try {
        const fetchedTodos: ITODO[] = [];
        const response = await getDocs(collectionRef);
        response.forEach((snapshot) => {
          console.log(snapshot.data(), "Data");
          fetchedTodos.push({
            id: snapshot.id,
            task: snapshot.data(),
          } as ITODO);
        });
        console.log("Fetched todos:", fetchedTodos);
        setTodos(fetchedTodos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTODO();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos: todos,
        completedTODOs: [] as ITODO[],
        deleteTODO: deleteTODO,
        create: create,
        getVitalTodos: getVitalTodos,
        getTodoByID: getTodoByID,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextWrapper;
