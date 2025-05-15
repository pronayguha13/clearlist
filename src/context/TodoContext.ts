import { createContext, useContext } from "react";
import type { ITODO } from "../types";
import type { DatabaseReference } from "firebase/database";

export type TODOContextType = {
  todos: Array<ITODO>;
  completedTODOs: Array<ITODO>;
  create: (todo: ITODO) => Promise<DatabaseReference>;
  delete: (id: string) => void;
};

const defaultState: TODOContextType = {
  todos: [],
  completedTODOs: [],
  create: () => {
    throw new Error("Create method is not yet implemented")
  },
  delete: () => { },
};

const TodoContext = createContext(defaultState);

export default TodoContext;

export const useTodoContext = () => useContext(TodoContext);
