import { useEffect, useState } from "react";
import { TodoContext } from "../context";
import type { ITODO } from "../types";
import { getDatabase, push, ref } from "firebase/database";
import config from "../config/configuration";


const TodoContextWrapper = ({ children }: ContextWrapperProps) => {
    const [todos, setTodos] = useState<ITODO[]>([]);

    const [completedTodos, setCompletedTodos] = useState<Array<ITODO>>([]);


    const createTODO = (title: string, description: string = "") => {
        console.log('data received', title, description)
    }

    const deleteTODO = (todoID: string) => {
        console.log('🚀 ~ deleteTODO ~ todoID:', todoID)

    }

    /*----------------*/
    useEffect(() => {

        // Initialize the Firebase database with the provided configuration
        const database = getDatabase(config);
        console.log("Database : ", database);


        // Reference to the specific collection in the database
        const collectionRef = ref(database, "todos");

        // Function to fetch data from the database
        // const fetchData = () => {
        //     // Listen for changes in the collection
        //     onValue(collectionRef, (snapshot) => {
        //         const dataItem = snapshot.val();

        //         // Check if dataItem exists
        //         if (dataItem) {
        //             // Convert the object values into an array
        //             const displayItem = Object.values(dataItem);
        //             console.log("data recievied from the db: ", displayItem)
        //             // setTodos(displayItem);
        //         }
        //     });
        // };

        // // Fetch data when the component mounts
        // fetchData();

        //create dummy todo 
        const initDB = async () => {
            try {
                const response = await push(collectionRef, {
                    title: "todo 1",
                    description: "This is the first todo"
                })

                window.alert(`Data added successfully , ${response.key}`)
            } catch (error) {
                console.error("Error", error)
            }

        }

        // initDB();
    }, [])
    /*----------------*/
    return (
        <TodoContext.Provider value={{
            todos: todos,
            completedTODOs: completedTodos,
            create: createTODO,
            delete: deleteTODO
        }} >{children}</TodoContext.Provider>
    )
}

export default TodoContextWrapper