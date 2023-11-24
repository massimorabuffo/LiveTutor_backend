export interface ToDoListProps {title: string, completed?: boolean, id: number, editToDo: () => void, handleDelete:()=> void}


const ToDoList = ({ title, completed, editToDo, handleDelete }: ToDoListProps) => {
    return (
        <li>
            <h2>{title}</h2>
            <h3>{completed}</h3>
            <button onClick={() => editToDo()}>Edit</button>
            <button onClick={() => handleDelete()}>Delete</button>
        </li>
    )
}

export default ToDoList