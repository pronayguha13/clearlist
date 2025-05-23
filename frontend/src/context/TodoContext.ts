import { createContext, useContext } from "react";
import type { ITODO, PriorityValue } from "../types";
import type { UseQueryResult } from "@tanstack/react-query";
// import type { UseQueryResult } from "@tanstack/react-query";

export type TODOContextType = {
  todos: Array<ITODO>;
  // create: (todo: Omit<ITODO, 'id' | 'createdAt' | 'updatedAt'>) => Promise<ITODO>;
  // deleteTODO: (id: string) => void;
  // getTodoById: (id: number) => UseQueryResult<ITODO | null, Error>;
  getVitalTodos: (priority: PriorityValue) => void;
};

const defaultState: TODOContextType = {
  todos: [],
  // create: () => {
  //   throw new Error("Create method is not yet implemented")
  // },
  // deleteTODO: () => { },
  // getTodoById: () => {
  //   throw new Error("getTodoById method must be implemented by provider");
  // },
  getVitalTodos: () => {
    throw new Error("getVitalTodos method must be implemented by provider");
  },
};

const TodoContext = createContext(defaultState);

export default TodoContext;

export const useTodoContext = () => useContext(TodoContext);
