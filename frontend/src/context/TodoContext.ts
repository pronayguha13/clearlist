import { createContext, useContext } from "react";
import type { ITODO, PriorityValue } from "../types";
import type { UseQueryResult } from "@tanstack/react-query";
import type { TaskStatus } from '../types/Todo';

export type TODOContextType = {
  todos: Array<ITODO>;
  create: unknown;
  deleteTODO: (id: number) => UseQueryResult<unknown, Error>;
  getTodoById: (id: number) => UseQueryResult<ITODO, Error>;
  getVitalTodos: (priority: PriorityValue) => void;
  getTaskStatus: () => UseQueryResult<TaskStatus, Error>
  search: (queryString: string) => UseQueryResult<ITODO[], Error>
};

const defaultState: TODOContextType = {
  todos: [],
  create: () => { },
  deleteTODO: () => ({} as UseQueryResult<unknown, Error>),
  getTodoById: () => {
    throw new Error("getTodoById method must be implemented by provider");
  },
  getVitalTodos: () => {
    throw new Error("getVitalTodos method must be implemented by provider");
  },
  getTaskStatus: () => ({} as UseQueryResult<TaskStatus, Error>),
  search: () => ({} as UseQueryResult<ITODO[], Error>),
};

const TodoContext = createContext(defaultState);

export default TodoContext;

export const useTodoContext = () => useContext(TodoContext);
