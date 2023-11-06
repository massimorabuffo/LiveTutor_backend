export interface ToDoListProps {title: string, completed?: boolean}


const ToDoList = ({ title, completed }: ToDoListProps) => {
    return (
        <li>
            <h2>{title}</h2>
            <h3>{completed}</h3>
        </li>
    )
}

export default ToDoList