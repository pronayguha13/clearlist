import { createContext, useContext } from "react";
import type { ITODO } from "../types";

export type TODOContextType = {
  todos: Array<ITODO>;
  completedTODOs: Array<ITODO>;
  create: (title: string, description: string) => void;
  delete: (id: string) => void;
};

const defaultState: TODOContextType = {
  todos: [],
  completedTODOs: [],
  create: () => {},
  delete: () => {},
};

const TodoContext = createContext(defaultState);

export default TodoContext;

export const useTodoContext = () => useContext(TodoContext);
