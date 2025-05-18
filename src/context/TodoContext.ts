import { createContext, useContext } from "react";
import type { ITODO } from "../types";
import type { DatabaseReference } from "firebase/database";

export type TODOContextType = {
  todos: Array<[string, ITODO]>;
  completedTODOs: Array<[string, ITODO]>;
  create: (todo: ITODO) => Promise<DatabaseReference>;
  deleteTODO: (id: string) => void;
  getTodoByID: (id: number) => [string, ITODO]
  getVitalTodos: () => Array<[string, ITODO]>
};

const defaultState: TODOContextType = {
  todos: [],
  completedTODOs: [],
  create: () => {
    throw new Error("Create method is not yet implemented")
  },
  deleteTODO: () => { },
  getTodoByID: () => [],
  getVitalTodos: () => [],
};

const TodoContext = createContext(defaultState);

export default TodoContext;

export const useTodoContext = () => useContext(TodoContext);
