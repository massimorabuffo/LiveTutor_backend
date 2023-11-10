export interface ToDoListProps {title: string, completed?: boolean, id: number, editToDo: () => void}


const ToDoList = ({ title, completed, editToDo }: ToDoListProps) => {
    return (
        <li>
            <h2>{title}</h2>
            <h3>{completed}</h3>
            <button onClick={() => editToDo()}>Edit</button>
        </li>
    )
}

export default ToDoList