//Module to store all the api method using axios
//  methods will be exported and used in the context wrapper 

import customInstance from "../hooks/useAxiosInterceptor"
import type { ITODO, PriorityValue } from "../types";
import type { LoginCredentials, UserDetail } from "../types/Auth";

export const fetchAllTODO = async () => {
  const response = await customInstance.get("/todos/");

  return response.data.todos;
}


export const getVitalTODOs = async (priority: PriorityValue) => {
  const response = await customInstance.get(`/todos/priority=${priority}`)

  return response.data.todos;
}

export const fetchTODOByID = async (id: number) => {
  const response = await customInstance.get(`/todos/${id}/`);

  return response.data.todo
}


export const createTODO = async (newTODO: Omit<ITODO, 'id' | 'createdAt' | 'updatedAt' | "isCompleted">) => {
  const response = await customInstance.post("/todo/", newTODO)

  return response.data;
}

export const updateTODO = async (id: number, updatedTODO: Partial<ITODO>) => {
  const response = await customInstance.put(`/todo/${id}/`, updatedTODO);

  return response.data;
}


export const deleteTODO = async (id: number) => {
  const response = await customInstance.delete(`/todo/${id}/`)


  return response.data;
}

export const getTaskStatus = async () => {
  const response = await customInstance.get("/todos/status/")

  return response.data
}

export const searchTask = async (queryString: string) => {
  const queryParams = new URLSearchParams({
    q: queryString
  }).toString()


  const response = await customInstance.get(`/todos/search-tasks?${queryParams}`);

  return response.data;
}

export const login = async (credentials: LoginCredentials) => {
  const response = await customInstance.post("/login/", credentials)
  return response.data;
}

export const register = async (credential: UserDetail) => {
  const response = await customInstance.post("/register/", credential)
  return response.data;
}
