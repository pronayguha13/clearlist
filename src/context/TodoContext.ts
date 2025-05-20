import { createContext, useContext } from "react";
import type { ITODO, TASK_DETAILS } from "../types";

export type TODOContextType = {
  todos: Array<ITODO>;
  completedTODOs: Array<ITODO>;
  create: (todo: TASK_DETAILS) => Promise<unknown>;
  deleteTODO: (id: string) => void;
  getTodoByID: (id: string) => Promise<Nullable<ITODO>>;
  getVitalTodos: () => Array<ITODO>;
};

const defaultState: TODOContextType = {
  todos: [],
  completedTODOs: [],
  create: () => {
    throw new Error("Create method is not yet implemented");
  },
  deleteTODO: () => {},
  getTodoByID: () => {
    throw new Error("Method is not yet implemented");
  },
  getVitalTodos: () => [] as ITODO[],
};

const TodoContext = createContext(defaultState);

export default TodoContext;

export const useTodoContext = () => useContext(TodoContext);
