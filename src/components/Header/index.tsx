import { useTodoContext } from "../../context"

const Hedaer = () => {

    const { todos } = useTodoContext();

    console.log("Todos ", todos)
    return (
        <div>Hedaer</div>
    )
}

export default Hedaer