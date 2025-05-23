//Module to store all the api method using axios
//  methods will be exported and used in the context wrapper 

import customInstance from "../hooks/useAxiosInterceptor"
import type { ITODO, PriorityValue } from "../types";

export const fetchAllTODO = async () => {
    const response = await customInstance.get("/todos/");

    return response.data.todos;
}


export const getVitalTODOs = async (priority: PriorityValue) => {
    const response = await customInstance.get(`/todos/${priority}`)

    return response.data.todos;
}

export const fetchTODOByID = async (id: number) => {
    const response = await customInstance.get(`/todos/${id}/`);

    return response.data
}


export const createTODO = async (newTODO: Omit<ITODO, 'id' | 'created_at' | 'updated_at'>) => {
    const response = await customInstance.post("/todo/", newTODO)

    return response.data;
}

export const updateTODO = async (id: number, updatedTODO: Partial<ITODO>) => {
    const response = await customInstance.put(`/todo/${id}/`, updatedTODO);

    return response.data;
}


export const deleteTODO = async (id: number) => {
    const response = await customInstance.delete(`/todo/${id}`)


    return response.data;
}